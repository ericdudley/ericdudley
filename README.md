# pERICodic - Minimal Static Site Generator

A "forever" codebase for a personal blog with zero dependencies, built in pure Go.

## Features

- 🚀 **Zero dependencies** - Uses only Go standard library
- 📁 **File-based content** - Write posts as simple markdown files
- 🎨 **Minimal design** - Clean, fast-loading HTML
- 🔗 **Static output** - Generates deployable HTML files
- 📝 **Simple frontmatter** - Basic metadata format

## Usage

### Generate the site

```bash
go run .
```

This creates a `./public/` directory with your complete static website.

### Add a new blog post

1. Create a new `.md` file in the `posts/` directory
2. Use this frontmatter format:

```markdown
---
title: Your Post Title
date: 2025-10-05
author: your.name
---
Your post content goes here.
It will be displayed exactly as written,
preserving line breaks and formatting.
```

3. Run `go run .` to regenerate the site

### Deploy

Upload the entire `./public/` folder to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- Any web server

## File Structure

```
./
├── main.go              # Entry point and CLI logic
├── types.go             # Data structures (Post, IndexData, PostData)
├── post.go              # Post loading and frontmatter parsing
├── generator.go         # HTML generation functions
├── templates.go         # HTML templates
├── go.mod               # Go module definition
├── posts/               # Your blog posts
│   ├── hello-world.md
│   └── ...
└── public/              # Generated static site
    ├── index.html       # Home page
    └── post/            # Individual posts
        ├── hello-world.html
        └── ...
```

## Code Organization

The codebase is organized following Go best practices:

- **`main.go`** - Entry point with CLI logic and orchestration
- **`types.go`** - All data structures and type definitions
- **`post.go`** - Post loading, frontmatter parsing, and content management
- **`generator.go`** - HTML generation and file writing logic
- **`templates.go`** - HTML template definitions
- **`go.mod`** - Go module definition (zero external dependencies)

Each file has a single responsibility, making the code easy to understand and maintain.

## Philosophy

This is designed to be a "forever" codebase that will work for decades without updates or dependency management. Pure Go standard library means no security vulnerabilities, no breaking changes, and no maintenance overhead.

Simple is better.
