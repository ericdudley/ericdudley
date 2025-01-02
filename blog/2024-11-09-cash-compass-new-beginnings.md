---
slug: cash-compass-new-beginnings
title: "Cash Compass: New Beginnings"
authors: me
tags: [cash-compass]
---

# Cash Compass: New Beginnings

It's been some time since Cash Compass started, and I've decided to take it in a new and (hopefully) better direction.

<!--truncate-->

At the beginning of 2023, I embarked on a new journey to build the best tool for tracking finances, that solved the problems I had with existing tools. I wanted to create a tool that was simple, fast, and easy to use. I wanted to create a tool that was private, fast, and free from ads. At it's core, Cash Compass tries to solve two main problems.
1. **Where is my money going?** What are my expenses, independent of specific cards or accounts,  how much am I spending and where?
2. **How much money do I have?** What is my net worth? How much money do I have in total, and how much of that is liquid?
3. Provide a great user experience, for tracking all of this data without having to depend on unreliable and potentially insecure third-party services. Basically, a spreadsheet but with a nice interface.

With this I moved forward building a Remix application, with serverless SSR, DynamoDB database, and a React frontend.

After building this for myself, I used it for several months before realizing that it could be useful for others as well. I decided to pivot from developing new features, and instead focus on all the things that a public applications needs.
1. **Security** - I had to make sure that the application was secure, and that user data was safe.
2. **Performance** - I had to make sure that the application was fast, and that it could handle a large number of users.
3. **Logistics** - I had to be able to send emails, and comply with unsubscribe requests. I had to be able to handle payments, and comply with tax laws. I had to be able to handle support requests, and comply with privacy laws. Users need somewhere to learn about the tool and how it works.
4. **Pricing** - How do I make money from this? Or at least how do I ensure that I can cover the costs of running the application without users being able to blow up my costs?

This led to the next 8 months of basically being stuck in this world of "production-ization". While I learned a lot about the core infrastructure that a new application requires, it was demotivating as I found myself spending more and more time on logistics and less on the actual features of the application.

This leads to today, almost two years later, and I have decided to (almost) start fresh with some new central principles.

1. Offline First
2. Keep it Simple
3. Open Source

## Offline First

A main goal of this project from the beginning was to create a tool that was as quick and responsive as a spreadsheet, but with better UI and tools to interact with the specific needs of financial data. It should be fast! However, as I got deeper into the project and started adding more and more dependencies and features, the application started to get slow. My serverless architecture was struggling with cold starts, and even without cold starts, each interaction required a round trip to the server and back.

The reality is that personal finance data just isn't that big. Most computers would be able to hold a decades worth of personal finance data in its memory let alone in its storage. As such, it's a great candidate for an offline first application, where the entire dataset is available locally on your machine and all database updates are performed locally (just like a spreadsheet). Optionally, you can also sync your local database with a cloud storage, that gets automatically synchronized to your devices in almost real-time. This gives you the best of both worlds, super responsive apps with data that is available on all your devices.

## Keep it Simple
With Cash Compass 1.0, I ended up going on side-quests in order to satisfy my technical interests. Oh look, OpenAI released a new speech-to-text API, let's integrate that. Oh wow, I bet I could use ChatGPT functions to have GenAI based input. What about a recommendation system? What about a tool system that implements random functionality that I happen to need?

While it was fun to dig into each of these topics, it weakened the focus on the quality of core features. From a technical perspective, it led to a lot of technical debt, and required maintenance of each of these features and 3rd party dependencies. From a user perspective, it led to a lot of features that were not polished and not used.

In Cash Compass 2.0, I want to focus on a smaller set of super intuitive and reliable features. It should have minimal 3rd party dependencies; any features that do require 3rd party dependencies should be optional. Additional one-off tools, like the Portfolio Rebalance tool will not exist within Cash Compass 2.0, but there are plans to implement a plugin like architecture that will support these use cases without bloating the main codebase.

## Open Source

Cash Compass is going open source. This is primarily to shift the focus from commercialization to simply building a high-quality product, that others can review and contribute to. Currently, Cash Compass 2.0 exists as an offline app, and if you want cloud sync you must create your own Dexie.js Cloud Sync account which may come at a monthly cost. I can imagine a future where there is a hosted version of Cash Compass 2.0 that comes with syncing by default for a price, with the option to change your syncing endpoint to a separately hosted one if desired. However, this offering would be far down the line, and only make sense if the app is good enough that people start asking for a simpler way to access it.


# Conclusion

Cash Compass 2.0 is actively under development, and it is feature complete enough that I have already migrated all of my personal Cash Compass 1.0 data to Cash Compass 2.0 and am using it as my daily driver. However, this post does not man I am dropping everything and focusing completely on this project, if anything I expect slower but more continuous development, since I'll be spending less time on boring logistics and more time on actual features and fixes!

For now, Cash Compass 1.0 is still up and running, and since the hosting costs are low, I will continue to maintain it until Cash Compass 2.0 is ready for broader release with onboarding documentation.

Onwards and upwards.
