# pERICodic - Minimal Static Site Generator
# Makefile for common development tasks

.PHONY: build clean generate generate-dev generate-prod dev serve serve-go test fmt vet check install help watch

# Default target
all: generate

# Build the binary
build:
	@echo "Building pericodic..."
	cd src && go build -o ../bin/pericodic .
	@echo "Binary built at ./bin/pericodic"

# Generate the static site (uses config default mode)
generate:
	@echo "Generating static site..."
	cd src && go run .
	@echo "Site generated successfully!"

# Generate in development mode (includes drafts)
generate-dev:
	@echo "Generating static site in development mode..."
	cd src && go run . -mode=dev
	@echo "Site generated successfully!"

# Generate in production mode (excludes drafts)
generate-prod:
	@echo "Generating static site in production mode..."
	cd src && go run . -mode=prod
	@echo "Site generated successfully!"

# Clean generated files and build artifacts
clean:
	@echo "Cleaning up..."
	rm -rf public/
	rm -rf bin/
	rm -rf .tmp/
	@echo "Cleanup complete!"



# Development mode - generate, watch for changes, serve locally, and open browser
dev:
	@echo "Starting development mode..."
	@go run dev-server.go -mode=dev

# Serve the generated site locally using Go
serve-go:
	@go run dev-server.go -serve-only

# Serve the generated site locally (alias to serve-go)
serve: serve-go

# Watch for changes and regenerate (requires fswatch or inotify-tools)
watch:
	@echo "Watching for changes in posts/, src/, and pages/..."
	@echo "Press Ctrl+C to stop"
	@bash -c ' \
		trap "echo \"Stopping watch...\"; exit 0" INT TERM EXIT; \
		if command -v fswatch >/dev/null 2>&1; then \
			fswatch -o posts/ src/ pages/ | while read f; do \
				echo "Changes detected, regenerating..."; \
				$(MAKE) generate; \
			done; \
		elif command -v inotifywait >/dev/null 2>&1; then \
			while true; do \
				inotifywait -r -e modify,create,delete posts/ src/ pages/ && { \
					echo "Changes detected, regenerating..."; \
					$(MAKE) generate; \
				}; \
			done; \
		else \
			echo "Error: fswatch (macOS) or inotify-tools (Linux) required for watch mode"; \
			echo "Install with: brew install fswatch (macOS) or apt-get install inotify-tools (Linux)"; \
			exit 1; \
		fi; \
	'

# Run tests (when we add them)
test:
	@echo "Running tests..."
	cd src && go test ./...

# Format Go code
fmt:
	@echo "Formatting Go code..."
	cd src && go fmt ./...

# Run go vet for static analysis
vet:
	@echo "Running go vet..."
	cd src && go vet ./...

# Run all checks (format, vet, test)
check: fmt vet test

# Install dependencies (currently none, but useful for future)
install:
	@echo "Installing dependencies..."
	cd src && go mod tidy
	@echo "Dependencies installed!"

# Create a new blog post template
new-post:
	@read -p "Enter post slug (e.g., my-new-post): " slug; \
	if [ -z "$$slug" ]; then \
		echo "Error: Post slug cannot be empty"; \
		exit 1; \
	fi; \
	if [ -f "posts/$$slug.md" ]; then \
		echo "Error: Post posts/$$slug.md already exists"; \
		exit 1; \
	fi; \
	echo "---" > "posts/$$slug.md"; \
	echo "title: " >> "posts/$$slug.md"; \
	echo "date: $$(date +%Y-%m-%d)" >> "posts/$$slug.md"; \
	echo "author: " >> "posts/$$slug.md"; \
	echo "draft: true" >> "posts/$$slug.md"; \
	echo "---" >> "posts/$$slug.md"; \
	echo "" >> "posts/$$slug.md"; \
	echo "Your post content goes here." >> "posts/$$slug.md"; \
	echo "Created new post: posts/$$slug.md"

# Deploy to a directory (useful for copying to web server)
deploy:
	@read -p "Enter deployment directory: " dir; \
	if [ -z "$$dir" ]; then \
		echo "Error: Deployment directory cannot be empty"; \
		exit 1; \
	fi; \
	if [ ! -d "public" ]; then \
		echo "Error: No public directory found. Run 'make generate' first."; \
		exit 1; \
	fi; \
	echo "Deploying to $$dir..."; \
	cp -r public/* "$$dir/"; \
	echo "Deployment complete!"

# Show help
help:
	@echo "pERICodic - Minimal Static Site Generator"
	@echo ""
	@echo "Available commands:"
	@echo "  make generate      - Generate the static site (uses config default)"
	@echo "  make generate-dev  - Generate in development mode (includes drafts)"
	@echo "  make generate-prod - Generate in production mode (excludes drafts)"
	@echo "  make build         - Build the binary"
	@echo "  make clean         - Clean generated files"
	@echo "  make dev           - Development mode: generate, watch, serve, open browser"
	@echo "  make serve         - Serve the site locally (using Go)"
	@echo "  make test          - Run tests"
	@echo "  make fmt           - Format Go code"
	@echo "  make vet           - Run go vet"
	@echo "  make check         - Run fmt, vet, and test"
	@echo "  make install       - Install dependencies"
	@echo "  make new-post      - Create a new blog post"
	@echo "  make deploy        - Deploy to a directory"
	@echo "  make watch         - Watch for changes and regenerate"
	@echo "  make help          - Show this help"