# AI Context Guide for pERICodic Website

This guide provides context for AI assistants working on posts and pages for this static site generator.

## Overview

pERICodic is a minimal static site generator built in pure Go with zero dependencies. It converts markdown files into static HTML pages.

## Content Types

### Blog Posts
- Location: `posts/` directory
- File format: `.md` (markdown)
- URL pattern: `/post/{slug}.html`
- Displayed on: Blog listing page (`/blog.html`)

### Static Pages
- Location: `pages/` directory
- File format: `.md` (markdown)
- URL pattern: `/{slug}.html`
- Displayed in: Site navigation header

### Static Files
- Location: `static/` directory
- File formats: Any file type (PDF, images, CSS, JS, etc.)
- URL pattern: Direct mapping (e.g., `static/resume.pdf` → `/resume.pdf`)
- Purpose: Serve files directly without processing (assets, documents, etc.)

## Frontmatter Format

All posts and pages require YAML frontmatter at the top of the file.

### Post Frontmatter
```markdown
---
title: Your Post Title
date: 2025-10-05
author: eric.dudley
draft: true
---
```

**Fields:**
- `title` (required): Display title of the post
- `date` (required): Publication date in YYYY-MM-DD format
- `author` (required): Author name (typically "eric.dudley")
- `draft` (optional): Set to `true` to hide in production builds

### Page Frontmatter
```markdown
---
title: Your Page Title
author: eric.dudley
draft: false
---
```

**Fields:**
- `title` (required): Display title of the page
- `author` (required): Author name
- `draft` (optional): Set to `true` to hide in production builds

## Content Syntax

The content processor supports several syntax features:

### 1. Markdown Headings
```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

Converts to `<h1>`, `<h2>`, etc. tags.

### 2. Markdown Links
```markdown
[link text](https://example.com)
```

Converts to: `<a href="https://example.com" target="_blank" rel="noopener noreferrer">link text</a>`

**Note:** All links open in new tabs with security attributes. Internal site navigation is not yet supported.

### 3. Raw HTML Sections
```markdown
~html~
<div class="custom">
  <p>Any raw HTML goes here</p>
</div>
~html~
```

Content between `~html~` markers is inserted verbatim without processing.

### 4. Style Sections
```markdown
~style~
background-color: #e8f4fd; padding: 20px; border-left: 4px solid #2196F3;
~style~

Content here will be wrapped in a div with the above inline styles.
```

The CSS between `~style~` markers is applied to all content that follows until the next style section or end of document.

## Build Modes

- **Development** (`mode: "dev"` in config.json): Shows all content including drafts
- **Production** (`mode: "prod"` in config.json): Hides draft posts and pages

## File Naming

- **Slug**: The filename (without `.md` extension) becomes the URL slug
- Example: `posts/hello-world.md` → `/post/hello-world.html`
- Use lowercase with hyphens for multi-word slugs

## Content Guidelines

1. **Keep it simple**: The site philosophy is minimalism
2. **Plain text first**: Content is displayed preserving line breaks and formatting
3. **Use drafts**: Set `draft: true` while working on content
4. **Author consistency**: Use "eric.dudley" as the author name
5. **Date format**: Always use YYYY-MM-DD format for dates
6. **Static files**: Place any assets (PDFs, images, etc.) in the `static/` directory for direct serving

## Example Post

```markdown
---
title: My New Post
date: 2025-11-15
author: eric.dudley
draft: false
---

This is the introduction to my post.

## Section Heading

Here's some content with a [link to example](https://example.com).

~style~
background-color: #f0f0f0; padding: 15px;
~style~

This paragraph has custom styling applied.

~html~
<div class="special">
  <strong>Custom HTML</strong> when needed.
</div>
~html~
```

## Example Page

```markdown
---
title: About
author: eric.dudley
---

This is a simple static page.

Check out my [LinkedIn](https://www.linkedin.com/in/eric-dudley-894721106/).
```

## Regenerating the Site

After creating or editing posts/pages, regenerate the site:
```bash
cd src && go run .
```

Or use the Makefile:
```bash
make generate-dev   # Development build (includes drafts)
make generate-prod  # Production build (excludes drafts)
```

## Static Files

The site generator supports static files that are copied directly to the output directory without processing.

### Usage

1. Place any static files in the `static/` directory
2. Files maintain their directory structure in the output
3. Access files directly via their path (e.g., `static/resume.pdf` becomes `/resume.pdf`)

### Examples

```
static/
├── resume.pdf          → /resume.pdf
├── favicon.ico         → /favicon.ico
├── assets/
│   ├── style.css      → /assets/style.css
│   └── images/
│       └── logo.png   → /assets/images/logo.png
```

### Supported File Types

- Documents: PDF, DOC, TXT, etc.
- Images: PNG, JPG, GIF, SVG, etc.
- Stylesheets: CSS files
- Scripts: JavaScript files
- Any other file type you need to serve directly

## Current Limitations

- No support for code syntax highlighting (yet)
- No support for lists, bold, italic markdown (use raw HTML if needed)
- No support for internal site links (use raw HTML if needed)
- No support for tables (use raw HTML if needed)

