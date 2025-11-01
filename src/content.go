package main

import (
	"fmt"
	"html/template"
	"strings"
)

// ContentProcessor handles the transformation of raw content into processed content
type ContentProcessor struct {
	config Config
}

// NewContentProcessor creates a new content processor with the given configuration
func NewContentProcessor(config Config) *ContentProcessor {
	return &ContentProcessor{
		config: config,
	}
}

// ProcessContent takes raw content and processes it through the content pipeline
// This is where future content syntax extensions will be added (markdown, custom syntax, etc.)
func (cp *ContentProcessor) ProcessContent(rawContent string) string {
	content := rawContent

	// Step 1: Basic content cleanup
	content = cp.cleanupContent(content)

	// Step 2: Process style sections (before other processing to apply styling)
	content = cp.processStyleSections(content)

	// Step 3: Process HTML sections (before other processing to preserve raw HTML)
	content = cp.processHTMLSections(content)

	// Step 4: Process markdown-style headings
	content = cp.processHeadings(content)

	// Step 4: Future processing steps will go here
	// - More markdown processing (links, emphasis, etc.)
	// - Custom syntax extensions
	// - Link processing
	// - Code highlighting
	// - Image handling
	// etc.

	return content
}

// cleanupContent performs basic content cleanup operations
func (cp *ContentProcessor) cleanupContent(content string) string {
	// Trim whitespace
	content = strings.TrimSpace(content)

	// Normalize line endings
	content = strings.ReplaceAll(content, "\r\n", "\n")
	content = strings.ReplaceAll(content, "\r", "\n")

	// Remove excessive blank lines (more than 2 consecutive)
	lines := strings.Split(content, "\n")
	var result []string
	blankCount := 0

	for _, line := range lines {
		if strings.TrimSpace(line) == "" {
			blankCount++
			if blankCount <= 2 {
				result = append(result, line)
			}
		} else {
			blankCount = 0
			result = append(result, line)
		}
	}

	return strings.Join(result, "\n")
}

// processHTMLSections processes ~html~ delimited sections for raw HTML insertion
func (cp *ContentProcessor) processHTMLSections(content string) string {
	marker := "~html~"

	// Process all HTML sections
	for {
		// Find the first marker (start of HTML section)
		startIndex := strings.Index(content, marker)
		if startIndex == -1 {
			// No more HTML sections found
			break
		}

		// Find the second marker (end of HTML section) after the first
		searchStart := startIndex + len(marker)
		endIndex := strings.Index(content[searchStart:], marker)
		if endIndex == -1 {
			// No matching end marker found, leave the remaining content as-is
			break
		}

		// Calculate actual end position
		endIndex = searchStart + endIndex

		// Extract the HTML content between the two markers
		htmlContent := content[startIndex+len(marker) : endIndex]

		// Replace the entire section (including both markers) with just the HTML content
		before := content[:startIndex]
		after := content[endIndex+len(marker):]
		content = before + htmlContent + after
	}

	return content
}

// processHeadings converts markdown-style headings (# ## ###) to HTML heading tags
func (cp *ContentProcessor) processHeadings(content string) string {
	lines := strings.Split(content, "\n")
	var result []string

	for _, line := range lines {
		processedLine := cp.processHeadingLine(line)
		result = append(result, processedLine)
	}

	return strings.Join(result, "\n")
}

// processHeadingLine processes a single line for heading conversion
func (cp *ContentProcessor) processHeadingLine(line string) string {
	trimmed := strings.TrimSpace(line)

	// Check if line starts with # characters
	if !strings.HasPrefix(trimmed, "#") {
		return line
	}

	// Count the number of # characters at the start
	hashCount := 0
	for _, char := range trimmed {
		if char == '#' {
			hashCount++
		} else {
			break
		}
	}

	// Only process if we have 1-6 # characters and they're followed by a space
	if hashCount < 1 || hashCount > 6 {
		return line
	}

	// Check if there's a space after the # characters
	if len(trimmed) <= hashCount || trimmed[hashCount] != ' ' {
		return line
	}

	// Extract the heading text (everything after "# ")
	headingText := strings.TrimSpace(trimmed[hashCount+1:])
	if headingText == "" {
		return line
	}

	// Convert to HTML heading tag
	headingTag := fmt.Sprintf("h%d", hashCount)
	return fmt.Sprintf("<%s>%s</%s>", headingTag, headingText, headingTag)
}

// ProcessPostContent processes content specifically for blog posts
// This allows for post-specific processing rules if needed
func (cp *ContentProcessor) ProcessPostContent(rawContent string) template.HTML {
	content := cp.ProcessContent(rawContent)

	// Future post-specific processing can go here
	// - Auto-linking
	// - Post metadata extraction
	// - Reading time calculation
	// etc.

	return template.HTML(content)
}

// ProcessPageContent processes content specifically for static pages
// This allows for page-specific processing rules if needed
func (cp *ContentProcessor) ProcessPageContent(rawContent string) template.HTML {
	content := cp.ProcessContent(rawContent)

	// Future page-specific processing can go here
	// - Table of contents generation
	// - Page-specific syntax
	// etc.

	return template.HTML(content)
}

// processStyleSections processes ~style~ delimited sections and wraps subsequent content
func (cp *ContentProcessor) processStyleSections(content string) string {
	marker := "~style~"

	// Find all style blocks and their positions
	var styleBlocks []struct {
		start int
		end   int
		css   string
	}

	searchPos := 0
	for {
		startIndex := strings.Index(content[searchPos:], marker)
		if startIndex == -1 {
			break
		}
		startIndex += searchPos

		// Find the closing marker
		endSearchStart := startIndex + len(marker)
		endIndex := strings.Index(content[endSearchStart:], marker)
		if endIndex == -1 {
			break
		}
		endIndex += endSearchStart

		// Extract CSS content
		cssContent := strings.TrimSpace(content[startIndex+len(marker) : endIndex])

		styleBlocks = append(styleBlocks, struct {
			start int
			end   int
			css   string
		}{
			start: startIndex,
			end:   endIndex + len(marker),
			css:   cssContent,
		})

		searchPos = endIndex + len(marker)
	}

	// If no style blocks found, return original content
	if len(styleBlocks) == 0 {
		return content
	}

	var result strings.Builder
	lastPos := 0

	for i, block := range styleBlocks {
		// Add content before this style block
		beforeContent := content[lastPos:block.start]
		if strings.TrimSpace(beforeContent) != "" {
			result.WriteString(beforeContent)
		}

		// Find content after this style block (until next style block or end)
		var afterContent string
		if i+1 < len(styleBlocks) {
			// Content until next style block
			afterContent = content[block.end:styleBlocks[i+1].start]
		} else {
			// Content until end of document
			afterContent = content[block.end:]
		}

		// Wrap the following content in a div with the styles
		if strings.TrimSpace(afterContent) != "" {
			result.WriteString(fmt.Sprintf(`<div style="%s">`, block.css))
			result.WriteString(afterContent)
			result.WriteString("</div>")
		}

		lastPos = block.end
		if i+1 < len(styleBlocks) {
			lastPos = styleBlocks[i+1].start
		}
	}

	return result.String()
}
