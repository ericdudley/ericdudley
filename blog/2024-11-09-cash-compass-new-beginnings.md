---
slug: cash-compass-new-beginnings
title: "Cash Compass: New Beginnings"
authors: me
tags: []
draft: true
---

At the beginning of 2023, I embarked on a new journey to build the best tool for tracking finances, that solved the problems I had with existing tools. I wanted to create a tool that was simple, fast, and easy to use. I wanted to create a tool that was private, secure, and free from ads. Personally, I don't care that much for tracking which account is used for which purpose or budgeting every dollar in a very specific way. At it's core, Cash Compass tries to solve two main problems.
1. **Where is my money going?** What are my expenses, independent of credit card, cash, or debit card. How much am I spending and where?
2. **How much money do I have?** What is my net worth? How much money do I have in total, and how much of that is liquid?
3. Provide a great user experience, for tracking all of this data without having to depend on unreliable and potentially insecure third-party services. Basically, a spreadsheet but with a nice interface.

After building this for myself, I used it for several months before realizing that it could be useful for others as well. I decided to pivot from developing new features, and instead focus on all the things that a public applications needs.
1. **Security** - I had to make sure that the application was secure, and that user data was safe.
2. **Performance** - I had to make sure that the application was fast, and that it could handle a large number of users.
3. **Logistics** - You need to be able to send emails, and comply with unsubscribe requests. You need to be able to handle payments, and comply with tax laws. You need to be able to handle support requests, and comply with privacy laws. Users need somewhere to learn about the tool, so that's another website to build. You need a place for users to see the roadmap, and submit issues.
4. **Pricing** - How do I make money from this? Or at least how do I ensure that I can cover the costs of running the application without users being able to blow up my costs?

This led to the next 6-8 months of basically being stuck in this land. While I learned a lot about the core infrastructure that a new application requires, this project being a side passion project, it got rather demotivating, where every time I sat down to work on my project, I had to work on something that had nothing to do with personal finance.

This leads to today, almost two years later, and I have decided to (almost) start fresh with some new core principles.

## Open Source

We're going open source. I think this is an important decision for a few reasons.

## Offline First + Self Hostable
## Commercialization Last
## Simplification
With Cash Compass 1.0, I ended up taking side-quests in order to satisfy my technical interests. Oh look, OpenAI released a new speech-to-text API, let's integrate that. Oh wow, I bet I could use ChatGPT functions to have GenAI based input. What about a recommendation system? What about a tool system that implements random functionality that I happen to need?

While it was fun to dig into each of these topics, as a product, it weakened the focus on core functionality. From a technical perspective, it led to a lof ot technical debt, and dependencies that had to be updated and maintained. From a user perspective, it led to a lot of features that were not used, and a lot of features that were not polished.

In Cash Compass 2.0, I want to focus on the core functionality. I want to make sure that the application is as simple as possible, and that it does what it is supposed to do as well as possible. It should have minimal dependencies, and not depend on the next "shiny" thing. If I'm going to introduce general financial tool functionality, it should be a first party feature, with an extension-like interface that makes the system extensible and maintainable.


## Same dedication to providing a "glorified spreadsheet" for managing personal finance without getting overwhelmed by complicated mental models.