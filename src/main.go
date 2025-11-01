package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"html/template"
	"log"
	"os"
)

// loadConfig loads configuration from config.json
func loadConfig() (Config, error) {
	var config Config

	// Set defaults
	config.Site.Title = template.HTML("p<span class=\"name-emphasis\">ERIC</span>o<span class=\"name-emphasis\">D</span>ic")
	config.Site.Author = "ERIC DUDLEY"
	config.Site.Description = "A minimal personal website and blog"
	config.Directories.Output = "public"
	config.Directories.Posts = "posts"
	config.Directories.Pages = "pages"
	config.Build.CleanOutput = true
	config.Build.CreateBlogPage = true
	config.Build.Mode = "dev"
	config.Styling.MaxWidth = "512px"
	config.Styling.FontFamily = "monospace"
	config.Styling.LinkColor = "#0000EE"
	config.Styling.VisitedColor = "#551A8B"
	config.Styling.ContentBackground = "#f5f5f5"
	config.Styling.HeaderBorderColor = "#ccc"
	config.Styling.TextColor = "#333"
	config.Styling.MetaColor = "#666"

	// Try to load from config file
	file, err := os.Open("../config.json")
	if err != nil {
		// If config file doesn't exist, use defaults
		fmt.Println("No config.json found, using defaults")
		return config, nil
	}
	defer file.Close()

	// First decode into a temporary struct with string title
	var tempConfig struct {
		Site struct {
			Title       string `json:"title"`
			Author      string `json:"author"`
			Description string `json:"description"`
		} `json:"site"`
		Directories struct {
			Output string `json:"output"`
			Posts  string `json:"posts"`
			Pages  string `json:"pages"`
		} `json:"directories"`
		Build struct {
			CleanOutput    bool   `json:"clean_output"`
			CreateBlogPage bool   `json:"create_blog_page"`
			Mode           string `json:"mode"`
		} `json:"build"`
		Styling struct {
			MaxWidth          string `json:"max_width"`
			FontFamily        string `json:"font_family"`
			LinkColor         string `json:"link_color"`
			VisitedColor      string `json:"visited_color"`
			ContentBackground string `json:"content_background"`
			HeaderBorderColor string `json:"header_border_color"`
			TextColor         string `json:"text_color"`
			MetaColor         string `json:"meta_color"`
		} `json:"styling"`
	}

	decoder := json.NewDecoder(file)
	err = decoder.Decode(&tempConfig)
	if err != nil {
		return config, fmt.Errorf("error parsing config.json: %v", err)
	}

	// Copy values from temp config to main config, converting title to template.HTML
	config.Site.Title = template.HTML(tempConfig.Site.Title)
	config.Site.Author = tempConfig.Site.Author
	config.Site.Description = tempConfig.Site.Description
	config.Directories = tempConfig.Directories
	config.Build = tempConfig.Build
	config.Styling = tempConfig.Styling

	fmt.Printf("Loaded configuration from config.json\n")
	return config, nil
}

// main is the entry point for the static site generator.
// It reads markdown files from the posts/ and pages/ directories and generates
// a complete static website in the configured output directory.
func main() {
	// Parse command line flags
	buildMode := flag.String("mode", "", "Build mode: 'dev' or 'prod' (overrides config)")
	flag.Parse()

	fmt.Println("Generating static site...")

	// Load configuration
	config, err := loadConfig()
	if err != nil {
		log.Fatal("Error loading config:", err)
	}

	// Override build mode if specified via command line
	if *buildMode != "" {
		config.Build.Mode = *buildMode
	}

	fmt.Printf("Build mode: %s\n", config.Build.Mode)

	// Clean and create output directory
	outputPath := "../" + config.Directories.Output
	if config.Build.CleanOutput {
		os.RemoveAll(outputPath)
	}
	err = os.MkdirAll(outputPath+"/post", 0755)
	if err != nil {
		log.Fatal("Error creating output directory:", err)
	}

	// Load all posts from the posts/ directory
	posts, err := loadPosts(config)
	if err != nil {
		log.Fatal("Error loading posts:", err)
	}

	// Load all pages from the pages/ directory
	pages, err := loadPages(config)
	if err != nil {
		log.Fatal("Error loading pages:", err)
	}

	// Generate the blog listing page
	if config.Build.CreateBlogPage {
		err = generateBlog(posts, pages, config)
		if err != nil {
			log.Fatal("Error generating blog:", err)
		}
	}

	// Generate individual HTML pages for each post
	for _, post := range posts {
		err = generatePost(post, pages, config)
		if err != nil {
			log.Fatal("Error generating post:", err)
		}
	}

	// Generate individual HTML pages for each page
	for _, page := range pages {
		err = generatePage(page, pages, config)
		if err != nil {
			log.Fatal("Error generating page:", err)
		}
	}

	fmt.Printf("Generated %d posts and %d pages to ./%s/\n", len(posts), len(pages), config.Directories.Output)
	fmt.Println("Site generated successfully!")
}
