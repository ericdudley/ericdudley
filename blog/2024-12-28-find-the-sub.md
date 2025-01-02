---
slug: find-the-sub
title: "Find the Sub"
authors: me
tags: [side-project]
---

# Find The Sub

### **Ever worked on a Reddit post and wondered where it belongs?**

### **Or maybe you’re searching for a specific subreddit but can’t quite find it?**

**Find the Sub** might be the tool you didn’t know you needed.

<!--truncate-->

---

## What is Find the Sub?

Find the Sub is a lightweight tool that takes your potential Reddit post title—something like:

> Why did I get laid off right before the holidays?

—and returns:

- A list of similar posts
- A list of subreddits where a post with that title is most likely to appear.

From there, you can click on any of the links to posts or subreddits and see which ones are the right communities.

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

Each record represents a single Reddit post, its metadata, and its embedding (a vector of floats). There are multiple techniques for computing the "distance" between two embeddings, and the "closer" that two embeddings are, the more semantically similar the inputs are.

For example: "Red shoes" and "Blue shoes" would likely have more similar embeddings, than "Red shoes" and "Green hat".

### Reddit Post Gathering

1. Use Reddit’s developer API to fetch a list of the top “hot” subreddits (limited to the top 2000).
2. For each subreddit, retrieve a combination of top “all” and “hot” posts (limited to 150 and 50 posts, respectively).
3. Save the relevant data (post ID, title, subreddit) to a file named `[subreddit].pickle`. This format makes loading the data simpler in the next step.

### Embedding Calculation

1. Load each `[subreddit].pickle` file into a DataFrame.
2. Split the post titles into batches, then for each batch use the OpenAI SDK to generate embeddings.
  > This is optimized by filtering out posts that we already saved an embedding for. (saves some OpenAI API calls)
3. Merge the new embeddings with the original post DataFrame.
4. Save the updated data (now including embeddings) back to the same `[subreddit].pickle` file.

---

## Approach #1: Local Similarity Search

At first, I used a locally implemented similarity search based on cosine distance:

### Compute post similarity scores

1. Compute the embedding for the user’s query using the same OpenAI SDK.
2. Load posts from all `[subreddit].pickle` files, calculate the cosine distance between the query embedding and each post’s embedding, and create a new similarity score column.
3. The top of the DataFrame (sorted by similarity score) represents the most semantically similar posts to the input post title.

### Identify similar subreddits

Now that we have a list of all dataset posts sorted by similarity score, we can try and identify the most similar subreddits to recommend.

1. Group by subreddit
2. Compute the mean similarity score for all posts in each subreddit
3. Sort by this aggregated similarity score
4. Return the 10 subreddits with the highest mean similarity score

**Pros**

- High accuracy, since we are computing similarity scores for the entire dataset with each query.
- Simple implementation, there is no index, no caching, and no optimizations. Just a simple calculation and aggregation, only a few lines of code.

**Cons**

- High memory usage, since the entire dataset must be loaded for each query. This makes deployment fairly expensive.
- Does not scale well for large datasets, the number of calculations scaling linearly with the dataset size.

This approach produced meaningful results locally but quickly led to issues during deployment:
- Memory limitations
- Slow query times
- Both of these limitations causing issues with my small test dataset, let alone the larger dataset I was hoping to utilize.

As such I dove into the second learning goal of this project, vector databases.

---

## Approach #2: Hosted Vector Database

A vector database is optimized for storing and querying large collections of vector embeddings (alongside their metadata). This fits my use case perfectly, so I turned to **Zilliz**, a hosted deployment of the open-source vector database Milvus. Its free tier allows up to around one million vectors, which is more than enough for my side project.

### Data Ingest

First, I created a cluster + collection using Zilliz's web interface, and created a schema that mirrored my local dataset. Importantly, I had to find the dimension of the embeddings generated by OpenAI in order to set the correct size for that column.

| post_id | title                                                 | subreddit | embedding            |
| ------- | ----------------------------------------------------- | --------- | -------------------- |
| abc987  | Why did I get laid off right before the holidays?     | r/jobs    | [0.1, 0.2, ..., 0.9] |
| hjk34l  | How do I get my cat to stop scratching the furniture? | r/cats    | [0.2, 0.3, ..., 0.8] |
| ...     | ...                                                   | ...       | ...                  |

Uploading the data to Zilliz was straightforward with its batch ingest REST endpoint:

1. Load the posts and embeddings from each `[subreddit].pickle` file.
2. Batch them into chunks, and transform each into Zilliz’s schema.
3. Public each chunk using the provided REST endpoint.

Once uploaded to Zilliz, the data is instantly available for simple visualization and querying in the web UI. I could quickly validate that the correct number of vectors was uploaded, and the association between vector and post metadata was retained.

### Querying

1. Similar to approach #1, I have to first get the embedding for the user input from OpenAI's SDK.

2. I call Zilliz’s HTTP search endpoint with the following parameters:
  - The embedding of the input query
  - The desired number of top-K most similar results (I use the max of 1000)
  - Selected metadata fields to include in the response
3. At this point I have a sorted list of the 1000 most similar posts, with a similar Cosine similarity score. However, the next step of finding the most similar subreddit is different from approach #1.

### Most Similar Subreddits

Initially, I used the same mean similarity score by subreddit aggregation that was used in approach #1. This led to pretty inaccurate results, where seemingly totally unrelated subreddits would show up high in the list.

After some analysis, I realized that this is a result of aggregating only the top 1000 most similar posts (compared to the entire dataset in approach #1). For example, if a subreddit only has a single post in the top 1000, but that one post has a very high similarity score, then the mean similarity score for that subreddit will also be high. Having only one post in the top 1000 though, means that all of the other posts from that subreddit were dissimilar enough to not make it to the top 1000; therefore, it should be considered less similar.

To address this, I experimented with different aggregation strategies—penalizing subreddits for having too few similar posts, or factoring in the rank of each post rather than just its similarity score. After some tuning, and uploading a larger dataset, I was able to get much more meaningful results.

---

## Putting It All Together

After experimenting in a Jupyter notebook, I built a basic Django app that implements approach #2 and provides a user interface.

![screenshot](../static/img/blog/findthesub/findthesub-screenshot.png)

### Query Endpoint

1. Computes the input embedding
2. Queries Zilliz for the most similar posts
3. Aggregates the results by subreddit and ranks them using a blend of average similarity, maximum similarity, count, and rank to refine the results.
4. Returns the top-K most similar subreddits and posts.

### Web page

1. Single web page with a single user input, that is synced with the `?q={input query}` query parameter.
2. Using debounced user input, sends XHR to the query endpoint.
3. Visualizes results in lists for most similar subreddits and posts.
4. Provides basic features for sharing and showing more results for the query.

---

## Potential next steps

### Automated dataset maintenance

To keep the dataset relevant over time, it would be ideal to port the Jupyter notebook cells to a scheduled cloud job, that would fetch the latest hot subreddits, and keep the post embeddings for already stored subreddits fresh.

It would also be important to keep the dataset balanced between subreddits, such that the similarity search wouldn't be biased towards more popular subreddits.

### Subreddit-level embeddings

Rather than using embeddings to search for posts, and then aggregating by post similarity scores, it could be interesting to try producing embeddings for subreddits themselves. This could be achieved by combining metadata like the subreddit name, description, list of post titles into a large input, and then
getting a single embedding. This would prevent getting specific posts in search results, but would greatly reduce the size of the dataset and likely get rid of the dependency on a hosted vector database.

This would need more experimentation to determine how the results with this approach would compare.

### Quantitative evaluation

Currently, the quality of results is determined by my brain, using a small set of queries; however, it would be valuable to have some sort of reproducable way to calculate the performance of a particular approach. This would enable me to experiment with different aggregation strategies, or the subreddit embedding approach and be able to more confidently determine which approach is "best".

This would require curating a dataset of input text, with expected most similar subreddits, and then picking a performance metric.

---

Find the Sub was a fun weekend project that let me dig into embeddings and vector databases. Look out for a (potential) part 2 post after I implement the subreddit-level embedding approach, and an evaluation framework to compare the quality of the results.

GitHub repository: [https://github.com/ericdudley/findthesub](https://github.com/ericdudley/findthesub)

Note: The repository is not setup as a tutorial, but you can look through the Python notebook to figure out what API keys / accounts are needed.
