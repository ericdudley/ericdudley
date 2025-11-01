---
title: Building Web Servers in Go
date: 2025-10-05
author: eric.dudley
draft: true
---

# All in STD go?

Go's standard library is incredibly powerful for web development.

You can build a complete web server without any external dependencies:

net/http - HTTP server and client
html/template - Template engine
path/filepath - File system operations
io/fs - File system interface

This blog system is built entirely with the standard library.
Here's what it does:

1. Serves static content
2. Parses frontmatter from markdown files
3. Renders HTML templates
4. Handles routing
5. Sorts posts by date

All in less than 300 lines of code!

The beauty of Go's standard library is that it's:
- Stable (rarely breaking changes)
- Well-documented
- Performant
- Secure
- Maintained by the Go team

When you build with the standard library,
you're building on a foundation that will last.

No need to worry about:
- Package vulnerabilities
- Breaking changes in dependencies
- Abandoned packages
- Complex dependency trees
- Version conflicts

Sometimes the best tool is the one that's already there.

Go's philosophy of "a little copying is better than a little dependency"
really shines in projects like this.
