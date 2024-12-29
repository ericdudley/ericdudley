---
slug: find-the-sub
title: 'Find the Sub'
authors: me
tags: [side-project]
---

# Find The Sub

### **Ever worked on a Reddit post and wondered where it belongs?**

### **Or maybe you’re searching for a specific subreddit but can’t quite find it?**

**Find the Sub** might be the tool you didn’t know you needed. It’s simple, effective, and helps you navigate the maze of Reddit subreddits.

---

## What is Find the Sub?

Find the Sub is a lightweight tool that takes your potential Reddit post title—something like:

> Why did I get laid off right before the holidays?

—and returns:

- A list of similar posts
- A list of subreddits where such topics are discussed

From there, you can click on any of the links to posts or subreddits and decide whether you want to join the conversation.

---

## How Does It Work?

I used this project as an opportunity to learn about **large language model (LLM) embeddings** and **vector databases**. In practice, it follows three main steps:

1. **Dataset Preparation**: Collect and store Reddit post titles, subreddits, and their corresponding vector embeddings.
2. **Embedding Generation**: Whenever a user enters a title, generate its embedding on the fly using the same model.
3. **Similarity Search**: Compare the user’s embedding to the stored dataset and display the most similar posts and subreddits.

---

## Dataset Generation

The dataset looks roughly like this:

| post_id | title                                                 | subreddit | embedding            |
| ------- | ----------------------------------------------------- | --------- | -------------------- |
| abc987  | Why did I get laid off right before the holidays?     | r/jobs    | [0.1, 0.2, ..., 0.9] |
| hjk34l  | How do I get my cat to stop scratching the furniture? | r/cats    | [0.2, 0.3, ..., 0.8] |
| ...     | ...                                                   | ...       | ...                  |

Each record represents a single Reddit post, its metadata, and its embedding.

### Reddit Post Gathering

1. Use Reddit’s developer API to fetch a list of the top “hot” subreddits (limited to the top 2000).
2. For each subreddit, retrieve a combination of top “all” and “hot” posts (limited to 150 and 50 posts, respectively).
3. Save the relevant data (post ID, title, subreddit) to a file named `[subreddit].pickle`. This format makes loading the data simpler in the next step.

### Embedding Calculation

1. Load each `[subreddit].pickle` file into a DataFrame.
2. Split the post titles into batches, then generate embeddings using the OpenAI embedding endpoint.
3. Merge the new embeddings with the original post data.
4. Save the updated data (now including vectors) back to the same `[subreddit].pickle` file.

---

## Approach #1: Simple Similarity Search

At first, I used a self-managed similarity search based on cosine distance:

1. Compute the embedding for the user’s query using the same OpenAI endpoint.
2. Load all `[subreddit].pickle` files, calculate the cosine distance between the query embedding and each post’s embedding, and sort by distance.
3. The top of the sorted list represents the most semantically similar posts.
4. Group by subreddit, compute the mean similarity score, then pick the top 5 subreddits based on these scores.

**Pros**

- Straightforward algorithm.
- Covers the entire dataset.

**Cons**

- High memory usage, since the entire dataset is loaded for each query.
- Slower search times, which scales poorly for large datasets.

This approach worked great locally but wasn’t very scalable when I deployed it. Sure, you could pay for more compute and memory, but I wanted to try a purpose-built vector database.

---

## Approach #2: Hosted Vector Database

A vector database is optimized for storing and querying large collections of vector embeddings alongside metadata. This fits my use case perfectly, so I turned to **Zilliz**, a hosted deployment of the open-source vector database Milvus. Its free tier allows up to around one million vectors, which is more than enough for my side project.

### Data Ingest

Uploading the data to Zilliz was straightforward thanks to its batch ingest REST endpoint:

1. Load the posts and embeddings from each `[subreddit].pickle` file.
2. Batch them into chunks that meet Zilliz’s schema requirements.
3. Send them off in bulk using the REST endpoint.

Once in Zilliz, the data is instantly available for simple visualization and querying in the web UI.

### Querying

To query, I call Zilliz’s HTTP endpoint with parameters like:

- The number of top-K results
- The embedding of the query
- Metadata fields to include in the response

### Results

Initially, the results quality was a bit off. I was only fetching the top 1000 most similar posts. That sounds like plenty, but when grouping by subreddit, it can skew the average similarity score. In the simple approach (#1), all lower-similarity posts in a given subreddit would bring down that subreddit’s average score. With approach #2, low-similarity posts never make it into the top-K, so the average might be misleadingly high.

To address this, I experimented with different aggregation strategies—penalizing subreddits for having too few similar posts, or factoring in the rank of each post rather than just its similarity score.

---

## Putting It All Together

I built a basic Django app that has:

- A single HTTP endpoint for querying
- A simple front-end template that uses XHR calls to fetch and display results

### Query Endpoint

The query endpoint:

1. Computes the input embedding
2. Queries Zilliz for the most similar posts
3. Aggregates the results by subreddit and ranks them using a blend of average similarity, maximum similarity, count, and rank to refine the results

---

## Keeping the Dataset Fresh

To keep the dataset relevant over time, I can run the data-ingestion pipeline regularly. It can skip posts that already have embeddings, making incremental updates easy. Ensuring subreddits are relatively balanced in the dataset helps avoid biases toward more popular subreddits.

---

Find the Sub may not be a groundbreaking revolution, but it’s been fun to build. It’s a handy side project that let me dig into embeddings, vector databases, and the intricacies of data querying at scale.
