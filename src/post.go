package main

import (
	"fmt"
	"io/fs"
	"log"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"time"
)

// parsePostFrontmatter extracts metadata and content from a blog post markdown file
func parsePostFrontmatter(content string, processor *ContentProcessor) (Post, error) {
	var post Post

	if !strings.HasPrefix(content, "---\n") {
		return post, fmt.Errorf("no frontmatter found")
	}

	parts := strings.SplitN(content, "---\n", 3)
	if len(parts) < 3 {
		return post, fmt.Errorf("invalid frontmatter format")
	}

	frontmatter := parts[1]
	rawContent := strings.TrimSpace(parts[2])

	lines := strings.Split(frontmatter, "\n")
	for _, line := range lines {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}

		parts := strings.SplitN(line, ":", 2)
		if len(parts) != 2 {
			continue
		}

		key := strings.TrimSpace(parts[0])
		value := strings.TrimSpace(parts[1])

		switch key {
		case "title":
			post.Title = value
		case "date":
			post.Date = value
		case "author":
			post.Author = value
		case "draft":
			post.Draft = strings.ToLower(value) == "true"
		}
	}

	// Process content through the content pipeline
	post.Content = processor.ProcessPostContent(rawContent)

	return post, nil
}

// parsePageFrontmatter extracts metadata and content from a page markdown file
func parsePageFrontmatter(content string, processor *ContentProcessor) (Page, error) {
	var page Page

	if !strings.HasPrefix(content, "---\n") {
		return page, fmt.Errorf("no frontmatter found")
	}

	parts := strings.SplitN(content, "---\n", 3)
	if len(parts) < 3 {
		return page, fmt.Errorf("invalid frontmatter format")
	}

	frontmatter := parts[1]
	rawContent := strings.TrimSpace(parts[2])

	lines := strings.Split(frontmatter, "\n")
	for _, line := range lines {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}

		parts := strings.SplitN(line, ":", 2)
		if len(parts) != 2 {
			continue
		}

		key := strings.TrimSpace(parts[0])
		value := strings.TrimSpace(parts[1])

		switch key {
		case "title":
			page.Title = value
		case "author":
			page.Author = value
		case "draft":
			page.Draft = strings.ToLower(value) == "true"
		}
	}

	// Process content through the content pipeline
	page.Content = processor.ProcessPageContent(rawContent)

	return page, nil
}

// loadPosts reads all markdown files from the posts directory and returns them sorted by date
func loadPosts(config Config) ([]Post, error) {
	var posts []Post

	// Create content processor
	processor := NewContentProcessor(config)

	postsPath := "../" + config.Directories.Posts
	err := filepath.WalkDir(postsPath, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		if d.IsDir() || !strings.HasSuffix(path, ".md") {
			return nil
		}

		content, err := os.ReadFile(path)
		if err != nil {
			return err
		}

		post, err := parsePostFrontmatter(string(content), processor)
		if err != nil {
			log.Printf("Error parsing %s: %v", path, err)
			return nil
		}

		// Extract slug from filename
		filename := filepath.Base(path)
		post.Slug = strings.TrimSuffix(filename, ".md")

		// Filter drafts based on build mode
		if post.Draft && config.Build.Mode == "prod" {
			// Skip draft posts in production builds
			return nil
		}

		posts = append(posts, post)
		return nil
	})

	if err != nil {
		return nil, err
	}

	// Sort posts by date (newest first)
	sort.Slice(posts, func(i, j int) bool {
		dateI, _ := time.Parse("2006-01-02", posts[i].Date)
		dateJ, _ := time.Parse("2006-01-02", posts[j].Date)
		return dateI.After(dateJ)
	})

	return posts, nil
}

// loadPages reads all markdown files from the pages directory and returns them
func loadPages(config Config) ([]Page, error) {
	var pages []Page

	// Create content processor
	processor := NewContentProcessor(config)

	// Check if pages directory exists
	pagesPath := "../" + config.Directories.Pages
	if _, err := os.Stat(pagesPath); os.IsNotExist(err) {
		return pages, nil // Return empty slice if no pages directory
	}

	err := filepath.WalkDir(pagesPath, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		if d.IsDir() || !strings.HasSuffix(path, ".md") {
			return nil
		}

		content, err := os.ReadFile(path)
		if err != nil {
			return err
		}

		page, err := parsePageFrontmatter(string(content), processor)
		if err != nil {
			log.Printf("Error parsing %s: %v", path, err)
			return nil
		}

		// Extract slug from filename
		filename := filepath.Base(path)
		page.Slug = strings.TrimSuffix(filename, ".md")

		// Filter drafts based on build mode
		if page.Draft && config.Build.Mode == "prod" {
			// Skip draft pages in production builds
			return nil
		}

		pages = append(pages, page)
		return nil
	})

	if err != nil {
		return nil, err
	}

	return pages, nil
}
