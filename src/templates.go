package main

// globalCSS defines the shared CSS styles for all pages
const globalCSS = `
        /* CSS Reset - Eric Meyer's Reset CSS v2.0 */
        html, body, div, span, applet, object, iframe,
        h1, h2, h3, h4, h5, h6, p, blockquote, pre,
        a, abbr, acronym, address, big, cite, code,
        del, dfn, em, img, ins, kbd, q, s, samp,
        small, strike, strong, sub, sup, tt, var,
        b, u, i, center,
        dl, dt, dd, ol, ul, li,
        fieldset, form, label, legend,
        table, caption, tbody, tfoot, thead, tr, th, td,
        article, aside, canvas, details, embed,
        figure, figcaption, footer, header, hgroup,
        menu, nav, output, ruby, section, summary,
        time, mark, audio, video {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
        }
        /* HTML5 display-role reset for older browsers */
        article, aside, details, figcaption, figure,
        footer, header, hgroup, menu, nav, section {
            display: block;
        }
        body {
            line-height: 1;
        }
        ol, ul {
            list-style: none;
        }
        blockquote, q {
            quotes: none;
        }
        blockquote:before, blockquote:after,
        q:before, q:after {
            content: '';
            content: none;
        }
        table {
            border-collapse: collapse;
            border-spacing: 0;
        }

        /* Matrix-style base theme */
        body {
            max-width: {{.Config.Styling.MaxWidth}};
            margin: 0 auto;
            font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
            padding: 20px;
            line-height: 1.6;
            color: #00ff00;
            background-color: #000000;
            text-shadow: 0 0 5px #00ff00;
        }
        h1 {
          font-size: 2em;
        }



        a {
            color: #00ff41;
            text-decoration: underline;
            text-shadow: 0 0 3px #00ff41;
            transition: all 0.3s ease;
        }
        a:visited { color: #00cc33; }
        a:hover {
            text-decoration: underline;
            color: #00ff00;
            text-shadow: 0 0 8px #00ff00;
        }
        header {
            border-bottom: 1px solid #00ff00;
            margin-bottom: 20px;
            padding-bottom: 10px;
            box-shadow: 0 1px 0 #00ff00;
        }
        nav a { margin-right: 15px; }
        .post-list { margin: 20px 0; }
        .post-item {
            margin: 15px 0;
            border-left: 2px solid #003300;
            padding-left: 10px;
            transition: border-color 0.3s ease;
        }
        .post-item:hover {
            border-left-color: #00ff00;
        }
        .post-date {
            color: #00cc00;
            font-size: 0.9em;
            margin-top: 5px;
            opacity: 0.8;
        }
        .post-meta {
            color: #00cc00;
            margin: 10px 0;
            opacity: 0.8;
        }
        .content {
            background: #001100;
            border: 1px solid #003300;
            padding: 15px;
            margin: 20px 0;
            white-space: pre-wrap;
            font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
            box-shadow: 0 0 10px rgba(0, 255, 0, 0.1);
            border-radius: 3px;
        }
        .site-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            background: linear-gradient(90deg, #000000 0%, #001100 50%, #000000 100%);
            padding: 10px 0;
            margin-bottom: 10px;
        }
        .site-header h1 {
            margin: 0;
            color: #00aa00;
            text-shadow: 0 0 5px #00aa00;
            font-weight: bold;
        }
        .page-title {
            margin-bottom: 20px;
            color: #00ff00;
            text-shadow: 0 0 5px #00ff00;
            border-bottom: 1px solid #003300;
            padding-bottom: 10px;
        }
        .page-header { border-bottom: none; }

        /* Additional matrix effects */
        h1, h2, h3, h4, h5, h6 {
            color: #00ff00;
            text-shadow: 0 0 5px #00ff00;
        }

        /* Name emphasis styling for ERIC D */
        .name-emphasis {
            color: #00ff41;
            text-shadow: 0 0 15px #00ff41, 0 0 25px #00ff41;
            font-weight: bold;
            font-size: 1.2em;
            animation: glow-pulse 2s ease-in-out infinite alternate;
        }

        @keyframes glow-pulse {
            from {
                text-shadow: 0 0 15px #00ff41, 0 0 25px #00ff41;
            }
            to {
                text-shadow: 0 0 20px #00ff41, 0 0 35px #00ff41, 0 0 45px #00ff41;
            }
        }

        /* Scrollbar styling for webkit browsers */
        ::-webkit-scrollbar {
            width: 12px;
        }
        ::-webkit-scrollbar-track {
            background: #000000;
        }
        ::-webkit-scrollbar-thumb {
            background: #003300;
            border-radius: 6px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #00ff00;
        }
`

// baseLayout defines the common HTML structure for all pages
const baseLayout = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{.PageTitle}} - {{.Config.Site.Title}}</title>
    <meta name="description" content="{{.Config.Site.Description}}">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>{{template "globalCSS" .}}</style>
</head>
<body>
    <header class="site-header">
        <a href="{{$.BasePath}}">
            <h1>{{.Config.Site.Title}}</h1>
        </a>
        <nav class="site-nav">
            {{template "navigation" .}}
        </nav>
    </header>
    <main>
        {{template "content" .}}
    </main>
</body>
</html>`

// navigation defines the site navigation
const navigation = `
<a href="{{$.BasePath}}blog.html">Blog</a>
{{range $.Pages}}{{if ne .Slug "index"}}
<a href="{{$.BasePath}}{{.Slug}}.html">{{.Title}}</a>
{{end}}{{end}}
<a href="{{$.BasePath}}resume.pdf">Resume</a>
<a href="https://www.linkedin.com/in/eric-dudley-894721106/">LinkedIn</a>
`

// blogContent defines the content template for the blog listing page
const blogContent = `
<div class="post-list">
    {{range .Posts}}
    <div class="post-item">
        <a href="post/{{.Slug}}.html">{{.Title}}</a>
        <div class="post-date">{{.Date}} by {{.Author}}</div>
    </div>
    {{end}}
</div>`

// postContent defines the content template for individual blog posts
const postContent = `<article>
    <header>
        <h1 class="page-title">{{.Post.Title}}</h1>
        <div class="post-meta">
            Posted: {{.Post.Date}}<br>
            Author: {{.Post.Author}}
        </div>
    </header>
    <div class="content">{{.Post.Content}}</div>
</article>`

// pageContent defines the content template for individual pages
const pageContent = `<article>
    {{if .Page.Title}}<header class="page-header">
        <h1 class="page-title">{{.Page.Title}}</h1>
    </header>{{end}}
    <div class="content">{{.Page.Content}}</div>
</article>`

// Template composition functions - these combine the base layout with content

// blogTemplate combines base layout with blog content
const blogTemplate = `{{define "globalCSS"}}` + globalCSS + `{{end}}
{{define "navigation"}}` + navigation + `{{end}}
{{define "content"}}` + blogContent + `{{end}}
` + baseLayout

// postTemplate combines base layout with post content
const postTemplate = `{{define "globalCSS"}}` + globalCSS + `{{end}}
{{define "navigation"}}` + navigation + `{{end}}
{{define "content"}}` + postContent + `{{end}}
` + baseLayout

// pageTemplate combines base layout with page content
const pageTemplate = `{{define "globalCSS"}}` + globalCSS + `{{end}}
{{define "navigation"}}` + navigation + `{{end}}
{{define "content"}}` + pageContent + `{{end}}
` + baseLayout
