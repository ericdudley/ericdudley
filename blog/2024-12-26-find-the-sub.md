---
slug: find-the-sub
title: "Find the Sub"
authors: me
tags: [side-project]
---

# Find The Sub

#### **Do you have a Reddit post that you've been working on but not sure where to post it?**

#### **Perhaps you're looking for a subreddit but not sure if it exists or how to find it?**

### Find the Sub is the tool you've been waiting for, maybe, probably not really, but it kind of does that.

# What is Find the Sub?

Find the sub is a simple tool that takes in a potential reddit post title:

> Why did I get laid off right before the holidays?

and returns a list of a similar posts, and a list of similar subreddits. You can then click on the links to the posts/subreddits and do what you will.

# How does it work?

This is where it gets interesting, at least for me. I used this project to learn more about LLM embeddings and vector databases. 

## Embeddings

At a high level, this is the general three steps in providing similarity search over a dataset using embeddings.

The first step is to have a dataset of embeddings (vectors paired with their related titles/subreddits metadata). 


The second step is to have the ability to generate an embedding for a given search query on the fly. 

The third step is to take your search query embedding, and compare it to your dataset of embeddings, to find the most similar, and then show this result to the user.

## Dataset Generation

The dataset has a structure like the following:
```
post_id: string
title: string
subreddit: string
vector: float[]
```

Each record represents a single Reddit post and its embedding.

### Reddit post gathering

I utilized Reddit's developer API to gather the posts in two steps.

1. Fetch the top "hot" subreddits (Limited to top 2000)
2. For each subreddit, fetch a combination of top "all" and "hot" posts (Limited to 150 and 50 respectively).
3. Save the post id, title, and subreddit name to a file with name `[subreddit].pickle` (pickle because it simplifies the loading process later in the pipeline)

### Embedding calculation

1. For each `[subreddit].pickle` file, load the posts into a dataframee.
2. Chunk the post titles, and submit the chunks to the OpenAI embedding generation endpoint, which returns a separate embedding for each title.
3. Merge the embedding vectors with their matching post titles.
4. Once all posts have embeddings calculated, save the dataframe back to the `[subreddit].pickle` file.

## Approach #1 Simple similarity search 

My initial approach was to implement my own similarity search algorithm, utilizing cosine distance, with the following algorithm.

1. Receive user's input post title, and compute an embedding using the same OpenAI endpoint.
2. Load all of the `[subreddit].pickle` files into memory, and compute a new column in the dataframe containing the cosine distance between the input embedding and the dataset post's embedding.
3. Sort by this distance, resulting in the head of the list representing the most semantically similar posts, and the tail being the least similar.
4. Group by subreddit, and calculate the mean of all similarity scores.
5. Sort subreddits by this mean, and return the top 5 subreddits.

### Pros

- Simple algorithm
- Covers the entire dataset.

### Cons

- High memory usage, have to load the entire dataset into memory.
- Slow search, each search requires calculating a distance for the entire dataset. This won't scale well for large datasets.

### Why I didn't use it?

Ultimately this approach gave me great results locally, but showed it's lack of ability to scale and high memory requirements when I tried to deploy the application to the cloud. While you can always just pay for the increased memory/compute, I figured I should try and leverage some existing tech that has been built for this use case, vector databases.

## Approach #2 Hosted Vector Database

A vector database is optimized for storing and querying massive datasets of vectors + metadata. This perfectly matches my scenario, so I looked for a hosted vector database.

I landed on `Zelliz`, which is a hosted deployment of the open source vector database `Milvus`. Its free tier supports roughly ~1 million vectors and ample limits for querying, which would work perfectly for the scope of this side project.

### Data Ingest

Data ingest was actually super simple, utilizing a batch ingest REST endpoint that support batching 100s of entries in a single query. The approach:


1. For each `[subreddit].pickle` file, load the posts + embeddings.
2. Chunk the posts, transform them to match the Zelliz schema, and publish the data.

The data becomes immediately available for basic visualization and querying using the Zelliz web UI. 

### Querying

The querying is similar, utilizing an HTTP endpoint, with parameters for the number of Top-K results, the input embeding, and the metadata fields you want included with each entry in the response.

### Results

Initially the quality of the results for this approach was significantly less. I believe this is because I am limited to the top-1000 similar posts, which sounds like a lot of posts, but leads to a problem when aggregating by subreddit.

In approach #1, even if a single post in a mostly unrelated subreddit has a high similarity score, the mean will be brought down by all of the other low similarity scores from that subreddit.

In approach #2, all of the other low similarity posts won't be in the top-K results, and so that subreddits aggregated mean will be higher than it really should be.

This can be mitigated by utilizing different / multiple aggregation metrics, for example, by punishing subreddits for having a low count or a high rank, in addition to the value of the similarity score itself.

# Putting it all together

I created a basic Django app, with a single HTTP endpoint for querying, and a single template that queries the query endpoint using XHR's, dynamically showing the results on the single page.

## Query endpoint

The query endpoint first calculates the input embedding, queries for similar posts using the Zelliz query endpoint, and then aggregates the results by subreddit and ranks them by a weighted combination of various metrics mean, max, count, and rank.

## Keeping the dataset fresh

In order to keep the dataset fresh, I would need to run the data ingest pipeline semi-frequently. It has built in some optimizations, for skipping posts that we already have an embedding for.

It's also rather important that subreddits are mostly equally represented in the dataset, to ensure that the ranking metrics aren't biased by more popular subreddits, or just subreddits that have more posts in the dataset. 
