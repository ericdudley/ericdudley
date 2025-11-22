package main

import "html/template"

// Config represents the site configuration
type Config struct {
	Site struct {
		Title       template.HTML `json:"title"`
		Author      string        `json:"author"`
		Description string        `json:"description"`
	} `json:"site"`
	Directories struct {
		Output string `json:"output"`
		Posts  string `json:"posts"`
		Pages  string `json:"pages"`
		Static string `json:"static"`
	} `json:"directories"`
	Build struct {
		CleanOutput    bool   `json:"clean_output"`
		CreateBlogPage bool   `json:"create_blog_page"`
		Mode           string `json:"mode"` // "dev" or "prod"
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

// Post represents a blog post with metadata and content
type Post struct {
	Slug    string
	Title   string
	Date    string
	Author  string
	Draft   bool
	Content template.HTML
}

// Page represents a static page with metadata and content
type Page struct {
	Slug    string
	Title   string
	Author  string
	Draft   bool
	Content template.HTML
}

// TemplateData holds common data for all page templates
type TemplateData struct {
	PageTitle string
	BasePath  string
	Pages     []Page
	Config    Config
}

// BlogData holds the data for rendering the blog listing page
type BlogData struct {
	TemplateData
	Posts []Post
}

// PostData holds the data for rendering an individual post page
type PostData struct {
	TemplateData
	Post Post
}

// PageData holds the data for rendering an individual page
type PageData struct {
	TemplateData
	Page Page
}
