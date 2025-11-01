package main

import (
	"fmt"
	"html/template"
	"os"
)

// generateBlog creates the blog.html file with a list of all posts
func generateBlog(posts []Post, pages []Page, config Config) error {
	tmpl, err := template.New("blog").Parse(blogTemplate)
	if err != nil {
		return fmt.Errorf("template error: %v", err)
	}

	filename := "../" + config.Directories.Output + "/blog.html"
	file, err := os.Create(filename)
	if err != nil {
		return fmt.Errorf("error creating blog.html: %v", err)
	}
	defer file.Close()

	data := BlogData{
		TemplateData: TemplateData{
			PageTitle: "Blog",
			BasePath:  "",
			Pages:     pages,
			Config:    config,
		},
		Posts: posts,
	}
	err = tmpl.Execute(file, data)
	if err != nil {
		return fmt.Errorf("template execution error: %v", err)
	}

	return nil
}

// generatePost creates an individual HTML file for a blog post
func generatePost(post Post, pages []Page, config Config) error {
	tmpl, err := template.New("post").Parse(postTemplate)
	if err != nil {
		return fmt.Errorf("template error: %v", err)
	}

	filename := fmt.Sprintf("../%s/post/%s.html", config.Directories.Output, post.Slug)
	file, err := os.Create(filename)
	if err != nil {
		return fmt.Errorf("error creating %s: %v", filename, err)
	}
	defer file.Close()

	data := PostData{
		TemplateData: TemplateData{
			PageTitle: post.Title,
			BasePath:  "../",
			Pages:     pages,
			Config:    config,
		},
		Post: post,
	}
	err = tmpl.Execute(file, data)
	if err != nil {
		return fmt.Errorf("template execution error: %v", err)
	}

	return nil
}

// generatePage creates an individual HTML file for a page
func generatePage(page Page, pages []Page, config Config) error {
	tmpl, err := template.New("page").Parse(pageTemplate)
	if err != nil {
		return fmt.Errorf("template error: %v", err)
	}

	// Special case: if slug is "index", create it as index.html (homepage)
	var filename string
	outputDir := "../" + config.Directories.Output
	if page.Slug == "index" {
		filename = outputDir + "/index.html"
	} else {
		filename = fmt.Sprintf("%s/%s.html", outputDir, page.Slug)
	}

	file, err := os.Create(filename)
	if err != nil {
		return fmt.Errorf("error creating %s: %v", filename, err)
	}
	defer file.Close()

	data := PageData{
		TemplateData: TemplateData{
			PageTitle: page.Title,
			BasePath:  "/",
			Pages:     pages,
			Config:    config,
		},
		Page: page,
	}
	err = tmpl.Execute(file, data)
	if err != nil {
		return fmt.Errorf("template execution error: %v", err)
	}

	return nil
}
