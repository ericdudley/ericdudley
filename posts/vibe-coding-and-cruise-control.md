---
title: Vibe Coding and Cruise Control
date: 2025-11-25
author: eric.dudley
draft: true
---

Using a code editor with AI deeply embedded, feels like driving a car where you can't turn off cruise control, here's how I realized how different vibe coding really is, and how I've created a workspace that let's me work with it.

# VS Code a retrospective

I've been using VS Code since ~2018, and for me, it achieved the perfect balance of speed, extensibility, and control. It could have a ton of language specific features, or I could strip it down to just the basics. It could be highly performant and interactive, or it could be bogged down with language servers and background processes. I could have one base tool with known shortcuts and UX, and tweak it to each project I work with.

The alternatives were:

1. Heavy IDEs like Visual Studio or JetBrains which are highly functional but also highly language specific, slow, and difficult to remember.
2. Lighter editors like Notepad++ which are light on features, and require you to use other tools for deeper integration with the language you're using.
3. Low-level editors like vim, which are highly customizable and lightweight, but have a high learning curve and require lots of tweaking to get them working the way you want.

With VS Code, you kind of got all of the above:
1. Simplistic interface and base functionality that's fast like a lightweight editor.
2. IDE-like functionality only when you need it, and supported by a large catalog of third-party extensions.
3. Capability to tweak and control your editor settings, even supporting a built-in Vim mode that you can enable or disable as you learn. 

In summary, VS Code was fast, extensible, and let you go as simple or as complicated as you wanted.

# From typing to tabbing

It started with the first iterations of Copilot embedded into VS Code in ~2023->2024, at this time it could predict ahead the rest of the line you were typing, sometimes a few lines, and you could accept with Tab. It felt like the existing intellisense, just better, like instead of just showing me the first alphanumeric symbol or the closest one in the file, it recommended the "best" symbol to auto-complete.

As time went by, the recommendations got faster and better, eventually evolving into "next edit" recommendations, which not only would complete your current line/block, but even recommend jumping forward or back and modifying existing code without any input from the user. 

With next edit predictions, now you can seed some code with a comment, and just accept the next edit until the entire update is finished, sometimes doing dozens of predictions in a row. If it's wrong, you just type in the correct thing to do, and chances are when it picks up the next edit again, it'll be accurate again with the improved context you provided.

# Agents

Just when you think we've solved it, now there's agents! No longer are you accepting next edits, but now we can do it in an automated loop, read files as context, recommend next edits, accept the edits, and keep going until you're done (even running tools to validate changes or look up issues). Now, rather than seeding code or writing comments, the user seeds with a prompt, controlling the input context with `@` file references and other prompting techniques, and then trusting the predictions so much that it can go on mostly unobserved for many iterations. 

# The problem (and what this has to do with cruise control)

It doesn't always work.

Just like cruise control in a car, even though we have radars, and improved vision models, and improved vehicle controls, it still doesn't work all the time. A human driver can take over and immediately the car drives like a car drove decades ago.

AI is so deeply embedded in VS Code now, that it feels like even when the AI predictions have gone awry, you can't go back to "manual driving". Sure, you could disable features, disable auto-complete, toggle panels, but that just makes it more difficult to use these features when you want to.

Performance also goes down, with constant predictions running in the background, language servers, and extensions running all the time, VS Code just keeps getting slower. Yes, you could be more intentional about extensions, but the same argument holds, you're just negatively affecting the featureful experience you want when you want to.

# The solution

I don't want to stop using AI tools, but I want to be able to break out of them, when they aren't serving me. 

Zed is a highly performant editor, that has a lot of similarities with VS Code, from general UX, to extensibility. It even has deeply integrated AI, but it has a setting that turns off all AI features, it completely disables all LLM AI features.

I now have two main workspaces, my AI code editor (VS Code) and my non-AI code editor (Zed).

1. Establishing a new pattern?
2. Defining the structure for a refactor?
3. Solving a new problem with ambiguity?
Pop into Zed, focus, and build exactly what I want without having to fight with AI.

1. Extending an existing system, with well defined patterns?
2. Applying a refactor with existing examples of the new pattern?
3. Solving a problem with high complexity but low ambiguity?
Pop into VS Code, and use agents and next edits to speed along these tasks.

# The counter-arguments

You wouldn't disable auto-complete in Zed to go back to "raw" editing, so why do you want to disable AI? 

Legacy intellisense is trying to accelerate your process by reducing the amount of typing you have to do, very rarely are you going to get to a different result because intellisense recommended a symbol to you. With AI next-edit predictions, it's like if a person was standing over you shoulder as you worked and constantly was saying "Ok, but what if you did it this way? Or maybe this? Oh nevermind, I see what you're doing now, try this actually." It's like trying to write a new song while listening to another artist's song, or not thinking about an elephant when someone tells you to, you can't help but be manipulated by this other entities ideas and input.

Using AI to code, and coding by hand have diverged so much, that it feels like the difference between working alone, and collaborating with someone else. Sometimes you just want to work alone! Even if in the future this means, writing a high quality prompt, sketching some ideas, recording some audio, and feeding all of the in to a model that can turn that input into something real and useful.

# Back to cruise control

Ok, so let's apply the same logic to self-driving cars. As self-driving cars get more intelligent, using them feels less like using tool, like using a wheel and throttle/brake, and more like a collaboration, hey car please drive conservatively and get me here. At the end of the day though, you still want to be able to make the decision about where you're going, and little bit about how you'll get there.

I've realized that I need to stop treating my AI-based development as if it's totally compatible with creative workflows and ideation, my brain still needs a "safe space" where it can imagine, make mistakes, problem solve, without having to worry about collaborating with someone (or in this case "something") else.
