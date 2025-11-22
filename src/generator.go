package main

import (
	"fmt"
	"html/template"
	"io"
	"io/fs"
	"os"
	"path/filepath"
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

// copyStaticFiles copies all files from the static directory to the output directory
// preserving the directory structure
func copyStaticFiles(config Config) error {
	staticPath := "../" + config.Directories.Static
	outputPath := "../" + config.Directories.Output

	// Check if static directory exists
	if _, err := os.Stat(staticPath); os.IsNotExist(err) {
		// Static directory doesn't exist, which is fine - just return
		return nil
	}

	// Walk through all files in the static directory
	err := filepath.WalkDir(staticPath, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		// Calculate the relative path from the static directory
		relPath, err := filepath.Rel(staticPath, path)
		if err != nil {
			return fmt.Errorf("error calculating relative path: %v", err)
		}

		// Calculate the destination path
		destPath := filepath.Join(outputPath, relPath)

		if d.IsDir() {
			// Create directory in output
			err = os.MkdirAll(destPath, 0755)
			if err != nil {
				return fmt.Errorf("error creating directory %s: %v", destPath, err)
			}
		} else {
			// Copy file
			err = copyFile(path, destPath)
			if err != nil {
				return fmt.Errorf("error copying file %s to %s: %v", path, destPath, err)
			}
		}

		return nil
	})

	if err != nil {
		return fmt.Errorf("error copying static files: %v", err)
	}

	return nil
}

// copyFile copies a single file from src to dst
func copyFile(src, dst string) error {
	// Open source file
	srcFile, err := os.Open(src)
	if err != nil {
		return err
	}
	defer srcFile.Close()

	// Create destination file
	dstFile, err := os.Create(dst)
	if err != nil {
		return err
	}
	defer dstFile.Close()

	// Copy file contents
	_, err = io.Copy(dstFile, srcFile)
	if err != nil {
		return err
	}

	// Copy file permissions
	srcInfo, err := os.Stat(src)
	if err != nil {
		return err
	}
	err = os.Chmod(dst, srcInfo.Mode())
	if err != nil {
		return err
	}

	return nil
}
