package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"
	"os/signal"
	"path/filepath"
	"runtime"
	"sync"
	"syscall"
	"time"

	"github.com/fsnotify/fsnotify"
)

type DevServer struct {
	port        string
	dir         string
	mode        string
	openBrowser bool
	watcher     *fsnotify.Watcher
	server      *http.Server
	ctx         context.Context
	cancel      context.CancelFunc
	wg          sync.WaitGroup
}

func main() {
	// Parse command line flags
	port := flag.String("port", "8080", "Port to serve on")
	mode := flag.String("mode", "dev", "Build mode: 'dev' or 'prod'")
	openBrowser := flag.Bool("open", true, "Open browser automatically")
	serveOnly := flag.Bool("serve-only", false, "Only serve files, don't watch or generate")
	flag.Parse()

	// Create dev server instance
	devServer := &DevServer{
		port:        *port,
		dir:         "public",
		mode:        *mode,
		openBrowser: *openBrowser,
	}

	// Create context for graceful shutdown
	devServer.ctx, devServer.cancel = context.WithCancel(context.Background())

	// Handle graceful shutdown
	devServer.setupGracefulShutdown()

	if *serveOnly {
		// Just serve the files without watching or generating
		devServer.serveOnly()
	} else {
		// Full development mode with generation and watching
		devServer.runDevelopmentMode()
	}
}

// setupGracefulShutdown sets up signal handling for graceful shutdown
func (ds *DevServer) setupGracefulShutdown() {
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)

	go func() {
		<-c
		fmt.Println("\nShutting down gracefully...")
		ds.cancel()

		// Close watcher if it exists
		if ds.watcher != nil {
			ds.watcher.Close()
		}

		// Shutdown HTTP server
		if ds.server != nil {
			ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
			defer cancel()
			ds.server.Shutdown(ctx)
		}

		// Wait for all goroutines to finish
		ds.wg.Wait()
		fmt.Println("Server stopped")
		os.Exit(0)
	}()
}

// serveOnly just serves the static files without watching or generation
func (ds *DevServer) serveOnly() {
	// Check if public directory exists
	if _, err := os.Stat(ds.dir); os.IsNotExist(err) {
		log.Fatalf("Directory '%s' does not exist. Run 'make generate' first.", ds.dir)
	}

	// Get absolute path for better error messages
	absDir, err := filepath.Abs(ds.dir)
	if err != nil {
		log.Fatalf("Error getting absolute path: %v", err)
	}

	// Start the HTTP server
	ds.startHTTPServer(absDir)
}

// runDevelopmentMode runs the full development workflow
func (ds *DevServer) runDevelopmentMode() {
	fmt.Println("Starting development mode...")

	// Generate the site initially
	if err := ds.generateSite(); err != nil {
		log.Fatalf("Initial site generation failed: %v", err)
	}

	// Check if public directory exists after generation
	if _, err := os.Stat(ds.dir); os.IsNotExist(err) {
		log.Fatalf("Directory '%s' was not created by site generation", ds.dir)
	}

	// Get absolute path for better error messages
	absDir, err := filepath.Abs(ds.dir)
	if err != nil {
		log.Fatalf("Error getting absolute path: %v", err)
	}

	// Start file watcher
	if err := ds.setupFileWatcher(); err != nil {
		log.Fatalf("Failed to setup file watcher: %v", err)
	}

	// Start HTTP server in a goroutine
	ds.wg.Add(1)
	go func() {
		defer ds.wg.Done()
		ds.startHTTPServer(absDir)
	}()

	// Wait for server to be ready and open browser
	if ds.openBrowser {
		ds.wg.Add(1)
		go func() {
			defer ds.wg.Done()
			ds.waitForServerAndOpenBrowser()
		}()
	}

	// Wait for context cancellation
	<-ds.ctx.Done()
}

// generateSite runs the site generation process
func (ds *DevServer) generateSite() error {
	fmt.Printf("Generating site in %s mode...\n", ds.mode)

	cmd := exec.Command("go", "run", ".", "-mode="+ds.mode)
	cmd.Dir = "src"
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	return cmd.Run()
}

// startHTTPServer starts the HTTP file server
func (ds *DevServer) startHTTPServer(absDir string) {
	// Create file server with logging
	fs := http.FileServer(http.Dir(ds.dir))

	// Wrap file server with logging
	loggedHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Printf("[%s] %s %s\n", r.Method, r.URL.Path, r.RemoteAddr)
		fs.ServeHTTP(w, r)
	})

	// Create server
	ds.server = &http.Server{
		Addr:    ":" + ds.port,
		Handler: loggedHandler,
	}

	// Start server
	fmt.Printf("Starting development server...\n")
	fmt.Printf("Serving files from: %s\n", absDir)
	fmt.Printf("Server running at: http://localhost:%s\n", ds.port)
	fmt.Printf("Press Ctrl+C to stop\n\n")

	// Start the server (this blocks)
	if err := ds.server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Printf("Server failed: %v", err)
	}
}

// setupFileWatcher sets up file system watching for automatic regeneration
func (ds *DevServer) setupFileWatcher() error {
	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		return fmt.Errorf("failed to create watcher: %v", err)
	}
	ds.watcher = watcher

	// Add directories to watch
	watchDirs := []string{"posts", "src", "pages"}
	for _, dir := range watchDirs {
		if _, err := os.Stat(dir); err == nil {
			if err := watcher.Add(dir); err != nil {
				return fmt.Errorf("failed to watch %s: %v", dir, err)
			}
			fmt.Printf("Watching %s/ for changes...\n", dir)
		}
	}

	// Start watching in a goroutine
	ds.wg.Add(1)
	go func() {
		defer ds.wg.Done()
		ds.watchForChanges()
	}()

	return nil
}

// watchForChanges handles file system events
func (ds *DevServer) watchForChanges() {
	for {
		select {
		case event, ok := <-ds.watcher.Events:
			if !ok {
				return
			}
			if event.Op&fsnotify.Write == fsnotify.Write ||
				event.Op&fsnotify.Create == fsnotify.Create ||
				event.Op&fsnotify.Remove == fsnotify.Remove {
				fmt.Printf("Changes detected in %s, regenerating...\n", event.Name)
				if err := ds.generateSite(); err != nil {
					log.Printf("Error regenerating site: %v", err)
				} else {
					fmt.Println("Site regenerated successfully!")
				}
			}
		case err, ok := <-ds.watcher.Errors:
			if !ok {
				return
			}
			log.Printf("Watcher error: %v", err)
		case <-ds.ctx.Done():
			return
		}
	}
}

// waitForServerAndOpenBrowser waits for the server to be ready and opens the browser
func (ds *DevServer) waitForServerAndOpenBrowser() {
	// Wait for server to be ready
	fmt.Println("Waiting for server to be ready...")
	for i := 0; i < 10; i++ {
		select {
		case <-ds.ctx.Done():
			return
		default:
			// Try to connect to the server
			resp, err := http.Get(fmt.Sprintf("http://localhost:%s", ds.port))
			if err == nil {
				resp.Body.Close()
				fmt.Println("Server is ready!")
				ds.openBrowserURL()
				return
			}
			fmt.Printf("Waiting... (%d/10)\n", i+1)
			time.Sleep(500 * time.Millisecond)
		}
	}
	fmt.Println("Warning: Server may not be ready yet, but continuing...")
	ds.openBrowserURL()
}

// openBrowserURL opens the browser to the local server
func (ds *DevServer) openBrowserURL() {
	url := fmt.Sprintf("http://localhost:%s", ds.port)
	fmt.Printf("Opening browser to %s...\n", url)

	var cmd *exec.Cmd
	switch runtime.GOOS {
	case "darwin":
		cmd = exec.Command("open", url)
	case "linux":
		cmd = exec.Command("xdg-open", url)
	case "windows":
		cmd = exec.Command("rundll32", "url.dll,FileProtocolHandler", url)
	default:
		fmt.Printf("Could not detect a way to open the browser automatically on %s\n", runtime.GOOS)
		fmt.Printf("Please open your browser and navigate to: %s\n", url)
		return
	}

	if err := cmd.Start(); err != nil {
		fmt.Printf("Could not open browser automatically: %v\n", err)
		fmt.Printf("Please open your browser and navigate to: %s\n", url)
	}
}
