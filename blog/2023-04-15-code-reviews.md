---
slug: code-review-mindset
title: Code Review Mindset
authors: me
tags: ['code review', 'best practices', 'software engineering', 'software development']
---

## Let's be honest...

code reviews can be a **pain**. 

If you're the reviewer, you're trekking through someone else's code, potentially in a code base you're not familiar with, trying to balance your inner pedant with "approving to unblock 👍". 

On the other side, you throw your code out there for other people to judge, and you either make the reviewer's requested change and resolve the comment, or spend 10 minutes writing a comprehensive response about why you called your class `Manager` instead of `Store`. 

You might call me a bit dramatic, and I would agree. There's certainly a lot of value in doing code reviews, that's why we do them! Let's first discuss some of the goals of code reviews, and then see what kind of mindset we can build that will achieve these goals.

### Knowledge Sharing

This should almost always be the top priority of a healthy code review process. Ultimately, only one person can actually write any given code, but it's important that teammates and anyone else who might need to interact with the code understands where it fits in.

#### As a PR author

It is your responsibility to make sure that your PR title and description are targeted towards your reviewers and any other engineers (including yourself) who might need to refer back to your PR in the future.

> A reviewer shouldn't have to look at the code to understand what a PR is doing and why it is being done.

Let's take an example of a PR that is refactoring date formatting logic into a shared `utils/date-format.ts` module.

First, the PR title:
# refactor: [JIRA-1234] Standardize date formatting in shared date-format module

Immediately, a reviewer understands the following:

1. The scope of this PR is limited to refactoring, so there is no need to look our for new features.
2. The Jira issue key enables them to quickly find **why** this work is being done.
3. A meaningful and searchable description of the changes that can be easily found at a later date.

Next, the PR description:

> Created `utils/date-format` which exposes functions for formatting dates in long and short formats. Found all places in the code that formatted Date objects, and updated them to use this new shared module. Any new code that does date formatting, should be using this shared module.
>
> Added `date-format.spec.ts` that tests the date formatting and handles edge cases like undefined dates.

This PR description is short and succinct and focuses on educating the reviewer about the changes, and how it affects the code base.

> Even if the reviewer didn't look at the code, they would now know about this new module and that they should be using it in their own PRs.

Your mindset should be: 
> "I want to maximize the "knowledge gained" to "time" ratio for my reviewers."
> 
> **You**

#### As a reviewer

It is your job to take the time to read the PR title and description. If the PR author followed the guidelines above, then you will gain a ton of useful knowledge by reading this content. If the PR author did not provide a useful title/description, then you should ask them to! Ultimately, it will be much easier for the PR author to write this, then having each reviewer independently have to glean the same information by reading through all the code.

Your mindset should be: 
> "I want to understand the changes in this PR, so that I can make better decisions in the future."
> 
> **You**

#### Overall 

In order for any codebase to be effective in the long-term, it's important that overall understanding of the codebase be diffused amongst many engineers. It's too risky to have all the knowledge siloed into single engineers, so use the mindsets above when approaching a PR.

### Code Quality

Surprising, I know, but code quality comes second to knowledge sharing most of the time. Moreover, we are not talking about code *correctness* here; code correctness should be handled by automated testing and a QA process, but this is a topic for another article. 

#### As a PR author

As a PR author, once you have achieved the functionality that you desire, your goal should be on maximizing readability and (generally) uniformity. These concepts will mean different things in different code bases, but here are some high-level concepts that you can think about:

##### Standard patterns

If you are not solving a new *type* of problem in your PR, then you should probably be adopting the common solution for that problem in your codebase. For example, if you are in a React codebase entirely written with Redux, then you probably shouldn't use your own data store in just your part of the codebase. While it may seem like you're using "the best tool for the job", there is a long-term cost to introducing different ways of achieving the same thing in a codebase that ultimately will make the codebase less readable and maintainable in the future.

##### Readable patterns

If you are writing code that will likely need to be adjusted and updated in the future, then focus on writing readable code over elegant or efficient code. 

But what if you found a really cool way of doing a computation that is twice as fast but less readable? That's fine! Make sure you organize your code in such a way that the region of the code that is readable won't need to be changed in the future. What do I mean?

Let's say we have a function `doThing`
```
function doThing(args) {
    simple data validation

    fetch from database

    ...do complex computation...

    write to database

    return
}
```

This function is achieving a lot, and our complex computation that we can optimize is right in the middle. The `doThing` function will likely be changed in the future as the codebase changes databases or data validation.

What we can do in this situation, is refactor `...do complex computation...` into the most stable minimal version.

```
/*
 * Clear documentation on what this function's purpose is.
 */
function doComplexComputation(args){
    ...do complex computation...
}
```

In this case, this function implementation won't need to be touched, and other parts of the code can depend on it. If the complex computation needs to be changed, then an engineer can still dive in and try to update the complex code, or they can just swap out the implementation with a new one without having to update other parts of the code.

##### Documentation

As much as possible, you should focus on first writing readable code, and if the code itself is not readable enough, then fall back on writing great documentation. Often, the most valuable documentation happens at the module level, answering questions like:
1. What problem does this module solve?
2. When should I use this module?
3. What assumptions does this module make?

Your mindset should be: 
> "I want to make other engineers think it is easier to read, understand, and maintain my code then replacing it with their own."
> 
> **You**


#### The Self Review

This PR habit has made a huge difference in the quality of my PRs. As soon as you think your PR is ready for sharing with others, take a pass through your own PR as if you were asked to review it.

1. Read the PR title and description, make sure you can understand what is going on.
2. Go over each file and look for **obvious** mistakes or gaps in your code quality. If you can anticipate the majority of PR feedback, then you can greatly save time for your reviewers and yourself, allowing your reviewers to focus on providing higher-level feedback on your design.
3. Make any changes from your self review (no need to actually leave comments), and commit the changes in a `refactor: self review` commit.

Your mindset should be: 
> "I want to get high quality feedback from my reviewers, so I'm going to make sure there is no low hanging fruit to distract them."
> 
> **You**

#### As a reviewer

This is where we are truly tested. It is easy to leave countless comments about how you would have implemented this differently, or how you don't like the style of the code. To make sure you provide the most value to the PR author and others, you should be categorizing your comments. Here are some examples:

1. `important: Do not use this deprecated method` These comments **must** be resolved before the PR should be merged.
2. `recommend: Use built-in language feature that does this` Recommendations that are not required but would likely bring meaningful improvements to the code.
3. `style: Naming scheme` Style comments that are part of the codebase's explicitly agreed upon style guide or are undocumented standards within the codebase. This should **not** be subjective comments based on your preferences.
4. `question: How does this work?` Non-blocking questions about the code, focusing on knowledge sharing.
5. `nit: Use functional methods instead of procedural` Non-blocking subjective feedback.
6. `supernit: Maybe call this function XYZ?` Non-blocking subjective feedback, that you feel the need to comment on, but want to make it clear to the PR author that you're aware it is not very important.

By categorizing all of our feedback, we are enabling the PR author to make better decisions. If they have minimal time, then they should only focus on resolving the blocking feedback; if they have more time, then they can also go through the non-blocking comments and improve their PR even more.

Your mindset should be: 
> "I want to share my unique perspective on the code in this PR, while best enabling the PR author to conform to quality standards and ultimately deliver their code."
> 
> **You**


### Conclusion

Code reviews are an essential part of a software engineer's responsibilities, and it offers a unique challenge of mixing interpersonal, communication, and technical skills. In this article, we've delved into the two main goals of PR reviews "knowledge sharing" and "code quality". If there's anything I want you to takeaway, it is the mindset that you should have when acting as a reviewer or a PR author.

#### As a PR author

Your mindset should be: 
> "I want to maximize the "knowledge gained" to "time" ratio for my reviewers, and I want to make other engineers think it is easier to read, understand, and maintain my code then replacing it with their own."
> 
> **You**

#### As a reviewer

Your mindset should be: 
> "I want to understand the changes in this PR, so that I can make better decisions in the future, and I want to share my unique perspective on the code in this PR, while best enabling the PR author to conform to quality standards and ultimately deliver their code."
> 
> **You**

If you can internalize these mindsets, then it will be much easier for you to adopt healthy PR habits and be a great teammate.