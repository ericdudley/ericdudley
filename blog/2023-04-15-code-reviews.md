---
slug: code-review-mindset
title: Code Review Mindset
authors: me
tags:
  [
    "code review",
    "best practices",
    "software engineering",
    "software development",
  ]
---

<h1 className="!mb-2">Let's be honest...</h1>
<h2 className="!m-0 text-gray-500">code reviews can sometimes be a <span className="text-red-700">pain</span>.</h2>

import codeReviewWomanMan from '../static/img/code-review-woman-man.jpeg';

<div className="flex flex-col gap-1 max-w-sm mx-auto py-8">
  <img {...codeReviewWomanMan} alt="engineers" />
  <span className="text-gray-800 dark:text-gray-300">Photo by Desola Lanre-Ologun from 
  <a href="https://unsplash.com/photos/kwzWjTnDPLk"
    target="_blank" rel="noopener noreferrer"
  >Unsplash</a></span>
</div>

<!--truncate-->

If you're the reviewer, you're trekking through someone else's code, potentially in a code base you're not familiar with, trying to balance your inner pedant with "approving to unblock 👍".

On the other side, as the PR author, you have to be vulnerable and expose your code to others for potential judgement. In the simple case, you're quickly making the requested changes and resolving comments, but sometimes you'll spend 15 minutes crafting a comprehensive response explaining your design choices, like why you named a class `FooManager` instead of `FooStore`.

Despite these challenges, there's certainly a lot of value in doing code reviews, that's why we do them! Let's first discuss some of the goals of code reviews, and then see what kind of mindset we can build that will achieve these goals.

### Knowledge Sharing

Knowledge sharing should be a top priority in a healthy code review process. Ultimately, only one person can actually write any given code, but it's important that teammates and anyone else who might need to interact with the code understands where it fits in.

#### As a PR author

It is your responsibility to make sure that your PR title and description are targeted towards your reviewers and any other engineers (including yourself) who might need to refer back to your PR in the future.

:::tip
A reviewer shouldn't have to look at the code to understand what a PR is doing and why it is being done.
:::

Let's take a look at an example PR that is refactoring date formatting logic into a shared `utils/date-format.ts` module.

##### First, the PR title:

> ## refactor: [JIRA-1234] Standardize date formatting in shared date-format module

Given this title, a reviewer immediately understands the following:

1. The scope of this PR is limited to refactoring, so there is no need to look out for new features.
2. The Jira issue key enables them to quickly find **why** this work is being done.
3. A meaningful and searchable description of the changes that can be easily found at a later date.

##### Next, the PR description:

> Created `utils/date-format` which exposes functions for formatting dates in long and short formats. Found all places in the code that formatted Date objects, and updated them to use this new shared module. Any new code that does date formatting, should be using this shared module.
>
> Added `date-format.spec.ts` that tests the date formatting and handles edge cases like undefined dates.

This PR description is short and succinct and focuses on educating the reviewer about the impact of the changes rather then explaining the code itself. Even if the reviewer didn't look at the code, they would know that this new module exists and that they should be using it in their own PRs.

:::tip Mindset
I want to maximize the "knowledge gained" to "time" ratio for my reviewers.

\- **You**
:::

#### As a reviewer

It is your job to take the time to read the PR title and description. If the PR author followed the guidelines above, then you will gain a ton of useful knowledge by reading this content.

If the PR author did not provide a useful title/description, then you should ask them to! Ultimately, it will be much easier for the PR author to write this, then having each reviewer independently have to glean the same information by reading through all the code.

Your mindset should be:

:::tip Mindset
I want to understand the changes in this PR well enough so that I can make better decisions in the future.

\- **You**
:::

#### Overall

In order for any codebase to be effective in the long-term, it's important that overall understanding of the codebase be diffused amongst many engineers. It's too risky to have all the knowledge siloed into single engineers; using the mindsets above, you can work towards creating a culture of knowledge sharing.

### Code Quality

It may be surprising, but code quality often comes second to knowledge sharing. It's essential first to ensure that your team understands what you're trying to accomplish and why it's important. Once that foundation is established, you can then focus on bringing your code up to the standard of the codebase.

:::note
We are not talking about code _correctness_ here; code correctness should be handled by testing and a QA process, but this is a topic for another article.
:::

#### As a PR author

As a PR author, once you have achieved the functionality that you desire, and you have communicated in your PR title/description the meaning of your changes, then you should focus on making your code as readable and maintainable as possible. These concepts will mean different things in different code bases, but here are some high-level guidelines that you can use.

##### Standard patterns

If you are not solving a new _type_ of problem in your PR, then you should probably be adopting the common solution for that problem in your codebase. For example, if you are in a React codebase entirely written with Redux, then you probably shouldn't use your own data store in just your part of the codebase. While it may seem like you're using "the best tool for the job", there is a long-term cost to introducing different ways of achieving the same thing in a codebase that ultimately will make the codebase less readable and maintainable in the future.

##### Readable patterns

If you are writing code that will likely need to be adjusted and updated in the future, then focus on writing readable code over elegant or efficient code.

But what if you found a really cool way of doing a computation that is twice as fast but less readable? That's fine! Make sure you organize your code in such a way that the region of the code that is readable won't need to be changed in the future. What do I mean?

Let's say we have a function `doThing`

```js
function doThing(args) {
    // simple data validation

    // fetch from database

    // ! do complex computation !

    // write to database

    return;
}
```

This function is achieving a lot, and our complex computation that we can optimize is right in the middle. If we were to be changing the database logic, then we would need to update this function, since the complex computation is in this function, the person updating the database logic would also have to read and understand the complex computation to make sure they didn't break it.

To resolve this, we can refactor `...do complex computation...` into the most stable minimal version.

```js
/**
 * Clear documentation on what this function's purpose is.
 */
function doComplexComputation(args){
    ...do complex computation...
}
```

In this case, this function implementation won't need to be touched, and other parts of the code can depend on it. If the complex computation needs to be changed, then an engineer can still dive in and try to update the complex code, or they can just swap out the implementation with a new one without having to update other parts of the code. In either case, the complexity of the code is isolated to a single function, and the rest of the code is free to be written in a more readable way.

##### Documentation

As much as possible, you should focus on first writing readable code, and if the code itself is not readable enough, then fall back on writing great documentation. Often, the most valuable documentation happens at the module level, answering questions like:

1. What problem does this module solve?
2. When should I use this module?
3. What assumptions does this module make?

Given our `format-date` example above, we could write the following documentation:

```js
/**
 * This module provides functions for formatting dates into human
 * readable strings.
 *
 * The functions in this module are designed to be used in UI components, and
 * should  almost always be used in place of the native `Date` object.
 *
 * The functions in this module assume that there is a user timezone 
 * set in the global store, if not, then the functions default to 
 * using the browser's timezone.
 */
```

:::tip Mindset
I want to make other engineers think it is easier to read, understand, and maintain my code then replacing it with their own.

\- **You**
:::

#### The Self Review

This PR habit has made a huge difference in the quality of my PRs. As soon as you think your PR is ready for sharing with others, take a pass through your own PR as if you were asked to review it.

1. Read the PR title and description, make sure you can understand what is going on.
2. Go over each file and look for **obvious** mistakes or gaps in your code quality. If you can anticipate the majority of PR feedback, then you can save time for your reviewers and yourself to focus on higher-level feedback on your design.
3. Make any changes from your self review (no need to actually leave comments), and commit the changes in a `refactor: self review` commit.

Your mindset should be:
:::tip Mindset
I want to get high quality feedback from my reviewers, so I'm going to make sure there is no low-hanging fruit that I could identify myself.

\- **You**
:::

#### As a reviewer

This is where we are truly tested. It is easy to leave countless comments about how you would have implemented this differently, or how you don't like the style of the code. To make sure you provide the most value to the PR author and others, you should be categorizing your comments. Here are some examples:

| Tag                                                       | Description                                                                                                                                                                                                |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `important: Do not use this deprecated method`            | These comments **must** be resolved before the PR should be merged.                                                                                                                                        |
| `style: Naming scheme`                                    | Style comments that are part of the codebase's explicitly agreed upon style guide or are undocumented standards within the codebase. This should **not** be subjective comments based on your preferences. |
| `question: How does this work?`                           | Non-blocking questions about the code, focusing on knowledge sharing.                                                                                                                                      |
| `recommend: Use built-in language feature that does this` | Recommendations that are not required but would likely bring meaningful improvements to the code.                                                                                                          |
| `nit: Use functional methods instead of procedural`       | Non-blocking subjective feedback.                                                                                                                                                                          |
| `supernit: Maybe call this function XYZ?`                 | Non-blocking subjective feedback, that you feel the need to comment on, but want to make it clear to the PR author that you're aware it is your personal preference and not very important.                |

By categorizing all of our feedback, we are setting up the PR author to make better decisions. If they have minimal time, then they should only focus on resolving the blocking feedback; if they have more time, then they can also go through the non-blocking comments and improve their PR even more.

:::tip Mindset
My goal is to communicate my unique perspective about this PR, while supporting the author in upholding quality benchmarks and completing their task.

\- **You**
:::

### Conclusion

Code reviews are an essential part of a software engineer's responsibilities, and they offer a unique challenge of mixing interpersonal, communication, and technical skills. In this article, we've delved into the two main goals of PR reviews: "knowledge sharing" and "code quality." The most important takeaways from this article should be the mindsets that help guide you while acting as a reviewer or a PR author.

#### As a PR author

:::tip Mindset
I want to maximize the "knowledge gained" to "time" ratio for my reviewers and ensure my code is understandable and maintainable, making it easier for other engineers to work with rather than replace with their own.

\- **You**
:::

#### As a reviewer

:::tip Mindset
I want to understand the changes in this PR so that I can make better decisions in the future, and share my unique perspective on the code, while best enabling the PR author to conform to quality standards and ultimately deliver their code.

\- **You**
:::

If you can internalize these mindsets, then it will be much easier for you to adopt healthy PR habits and be a great teammate.
