---
title: Functional Vibe Coding - A Tale of Two Editors
date: 2025-11-25
author: eric.dudley
draft: false
---

How my relationship with AI coding tools has changed over the last few years and the changes I've made in my development process to make it functional.

# Intro

I've been using VS Code since ~2018, and for me, it achieved the perfect balance of speed, extensibility, and control. I could install a ton of extensions and build an IDE experience, or I could strip it down to just the basics. The tool has improved over the years, there are more and more mature extensions, UX has become smoother, but overall my "coding" process has stayed fairly stable. 

Until a few years ago.

/-----\
| O O |
|  V  | Beep boop, how can I assist you?
| === |
\-----/

# From typing to tabbing
---------
|  Tab  | 
--------- 

It started with the first releases of Copilot, embedded into VS Code. At this time, Copilot would predict ahead the rest of the line you were typing, sometimes a few lines, and you could accept with Tab. It felt like an extension of existing intellisense, just smarter. 

Instead of just auto-completing the next symbol, it recommended a function call with the parameters that made sense, given the rest of the file as context. It felt like it generally knew what I was "trying to do" for the next few symbols, and helped me get them out faster.

# From tabbing to spamming
---------  --------- ---------
|  Tab  |  |  Tab  | |  Tab  |
---------  --------- ---------

As time went by, the recommendations got faster and better, eventually evolving into "next edit" completions, which not only would complete your current line/block, but even jump up or down into other parts of the file as needed.

With next edit completions, you could seed some code or write a comment, and spam Tab until the change you were working on was complete, chaining dozens of edits in a row. You just had to make small corrections or nudges in the right direction, before going back to spamming Tab.

# From spamming to vibing
------------ 
|  Send >  | 
------------ 

\   /  |  |-\  |--
 \ /   |  |-<  |--
  V    |  |-/  |--

Pressing Tab is now automated, you simply type a prompt into an agent chat, press Send and watch it go. An agent can read multiple files as context, recommend next edits, accept said edits, and keep going until it's done (even running tools to run tests or look up issues). 

You can now avoid making actual edits to the code at all, just type "you did it wrong, do it this way" in the chat, and the agent will try to align with your wishes. This is what people call vibe coding.

# The problem

Coding with AI is like turning on advanced self-driving in a car, as the human, you aren't driving faster, you don't have improved handling or more ergonomic seats, you're just doing different tasks. Now instead of constantly managing the throttle and brake, you're instead setting a target speed, or perhaps even a speed "preference". Rather than interpreting road signs and lane lines, you're interpreting the GPS map, and ensuring that the input destination is accurate enough. The more advanced the self-driving features are, the less it feels like "driving" and the more it feels like you're sitting in a taxi telling the driver where you'd like to go.

As the AI-coding tools have evolved, they've moved farther from "coding" and closer to "collaborating", the AI-tools are no longer tools that improve the coding experience but are now collaborators with input of their own.

/-----\  (\\\\\)
| O O |  | o o |
|  V  |  |  v  |
| === |  \ \_/ /
\-----/   -----
  bot      me

If you try to use AI-coding tools for every task, it feels like you're in a 24/7 pair coding meeting with another engineer. For smaller tasks, you supervise them doing things and they often do a good job. For complex or highly ambiguous tasks, at first you try to guide them in a direction until they eventually fail. You then take over the keyboard, but as you problem solve, between each keystroke they're constantly interrupting your work with suggestions, trying to pull the keyboard back from you, even before you know which direction you yourself are trying to go in.

After having to constantly adjust my work habits as AI coders has evolved, I think I've found a structure that (hopefully) will work sustainably for me.

# The solution

I don't want to stop using AI tools, but I want to be able to break out of the 24/7 pair coding when I need to "code" rather than "collaborate".

My solution? A second code editor. While any secondary editor would suffice, I've chosen Zed. Zed is a highly performant editor, that has a lot of similarities with VS Code, from general UX, to extensibility. It even has its own integrated AI features, but, importantly, it has a single setting that turns off all AI features. By using a second editor, I have strong psychological separation between the two very different mindsets of collaborating with an AI coder versus working on problems by myself. 

------------------  
| o o o     Zed  |  
|----------------|  
|                |  
|                |  
------------------

I now have two main workspaces, my AI code editor (VS Code) and my non-AI code editor (Zed). 


I treat my AI-code editor more like Slack, where I can talk to another engineer, maybe give them little code snippets and pointers of where to look in the repo. Maybe we'll "pair code", and I'll guide them to different files and enter some initial edits before they start predicting what the next edits should be on their own. If they get stuck on a problem or aren't quite doing things right, my job is to break it down and unblock them by reducing ambiguity. When I need to solve these problems myself, I jump over to my non-AI editor Zed.

In Zed, I can explore, build, fail, and in general create without having to constantly deal with the "presence" of the AI editing tools. Not only do they not interrupt my thoughts or push me in directions I wasn't planning on going in, but I'm also stopped from the temptation to reach out to the AIs for ideation. It's similar to how you might be tempted to ask someone in the room with you to solve a problem or think of how to approach something, even if you would really benefit from the process of solving it yourself.

This doesn't mean I never ideate with AI, of course. Utilizing AI in a read-only mode, with exploratory prompts is great for exploring a problem space and having a brainstorming partner to bounce ideas off of.

Bringing this all together, here's a summary of a common process I use these days:
1. Use an AI chat interface to explore a topic, come up with some options, learn about things I didn't know about. Going back and forth with the model.
2. Go into my personal notes to solidify the direction I want to go in, before jumping into Zed to implement some high quality code, establishing patterns and architecture, leaving in the "gaps" that I think my AI collaborator can handle.
3. Jump over to VS Code, and delegate filling in the gaps to the AI agent, using a prompt that directs it to plan, implement, run tests, and iterate until it's achieved the goal. 

While I have the AI working on one task, I can jump back to step 1 or step 2 and move on to the next problem while my AI collaborator is working for me. 

# Conclusion

I now have what feels like a "functional" relationship with AI-coding tools, as they improve, it feels like my collaboration sessions require less hand-holding and I can delegate higher complexity tasks. Likewise, as my prompting skills and general awareness of the AI systems capabilities improve, I get better work out of them. 

However, importantly, my creative process, my problem solving process, the time spent deciding what to do and how I want to achieve it, can stay in its own space. 

Maybe one day soon, that time will actually just be spent drafting technical docs, drawing wire frames, and recording audio descriptions of what I want and watching the AI build entire systems, never touching any code at all. Even in such a world, there is still a crucial need for this non-AI creative space.

For now, with this process I've been able to both maintain the higher-productivity I get from using AI coding tools, without losing my creativity or skill in the craft of building things with software. 

Hopefully, even the most advanced self-driving car will still always ask you where you want to go, and then help you get there.
