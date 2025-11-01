# Content Processing Architecture

## Overview

The static site generator now includes a modular content processing pipeline that allows for extensible content transformation. All post and page content is processed through a centralized `ContentProcessor` before being rendered.

## Architecture

### Content Processor (`src/content.go`)

The `ContentProcessor` is responsible for transforming raw content into processed content. It provides:

- **Centralized Processing**: All content goes through the same pipeline
- **Configurable**: Uses site configuration for processing rules
- **Extensible**: Easy to add new processing steps
- **Type-Specific**: Separate methods for posts vs pages

### Key Components

1. **`ContentProcessor` struct**: Main processor with configuration
2. **`ProcessContent()`**: Core processing pipeline
3. **`ProcessPostContent()`**: Post-specific processing
4. **`ProcessPageContent()`**: Page-specific processing
5. **`cleanupContent()`**: Basic content cleanup

### Current Processing Steps

1. **Content Cleanup**:
   - Trim whitespace
   - Normalize line endings (`\r\n` → `\n`)
   - Remove excessive blank lines (max 2 consecutive)

2. **HTML Sections**:
   - Process `~html~...~html~` delimited sections
   - Insert raw HTML verbatim between markers
   - Remove the `~html~` markers themselves
   - Supports multiple HTML sections per document
   - Processed before other content to preserve raw HTML

3. **Markdown Headings**:
   - Convert `# Heading` to `<h1>Heading</h1>`
   - Convert `## Heading` to `<h2>Heading</h2>`
   - Supports all levels from `#` to `######` (h1-h6)
   - Requires space after hash characters
   - Ignores invalid formats (no space, >6 hashes, empty text)

### Integration Points

The content processor is integrated at the parsing level:

- `parsePostFrontmatter()` calls `processor.ProcessPostContent()`
- `parsePageFrontmatter()` calls `processor.ProcessPageContent()`
- Both `loadPosts()` and `loadPages()` create a processor instance

## Future Extensions

The architecture is designed to easily support additional content processing features:

### Planned Features
- **More Markdown Processing**: Links, emphasis, lists, code blocks
- **Custom Syntax Extensions**: Site-specific markup
- **Link Processing**: Auto-linking, link validation
- **Code Highlighting**: Syntax highlighting for code blocks
- **Image Handling**: Image optimization, responsive images
- **Table of Contents**: Auto-generate TOCs for pages
- **Reading Time**: Calculate estimated reading time
- **Auto-linking**: Convert URLs to clickable links

### Adding New Processing Steps

To add a new processing step:

1. Add the processing logic to `ProcessContent()` or type-specific methods
2. Add any configuration options to the `Config` struct
3. Update the configuration file with new options
4. The processing will automatically apply to all content

## Example Usage

### HTML Sections
```markdown
Regular content here.

~html~
<div style="background: #f0f8ff; padding: 20px;">
    <h3>Custom HTML Section</h3>
    <p>This HTML will be inserted <strong>verbatim</strong>!</p>
</div>
~html~

More regular content.
```

### Markdown Headings
```markdown
# Main Heading (becomes <h1>)
## Sub Heading (becomes <h2>)
### Section (becomes <h3>)
```

### Programmatic Usage
```go
// Create processor with configuration
processor := NewContentProcessor(config)

// Process content (happens automatically during parsing)
processedContent := processor.ProcessPostContent(rawContent)
```

## Draft Support

The content system supports draft posts and pages that can be hidden in production builds:

### Frontmatter Draft Field
```markdown
---
title: My Draft Post
date: 2025-10-07
author: eric.dudley
draft: true
---
This content is still being worked on...
```

### Build Modes
- **Development Mode** (`dev`): Shows all content including drafts
- **Production Mode** (`prod`): Hides draft content

### Usage
```bash
# Development build (includes drafts)
make generate-dev

# Production build (excludes drafts)
make generate-prod

# Override config via command line
cd src && go run . -mode=prod
```

## Benefits

- **Maintainable**: Single place to modify content processing
- **Testable**: Easy to unit test content transformations
- **Consistent**: All content gets the same processing
- **Extensible**: Add new features without changing parsing logic
- **Configurable**: Processing rules can be customized per site
- **Draft Support**: Work on content without publishing immediately
