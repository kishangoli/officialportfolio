---
title: "Part 1: Developing Rust API and Foreign Function Interface (FFI)"
date: "2026-05-21"
excerpt: "Part 1: Rust implementation for our GPU accelerated vector database"
tags: ["Rust", "Bindgen", "FFI"]
published: true
---

# Rust in GPU-accelerated Vector Database

Working on developing a GPU accelerated vector database. Our scope requires working with rust to take care of our API layer (input from client and beyond). There are a few things needed to handle that.

## Goals

A few goals:
- The user should be able to input a vector embedding to our server.
- Our server needs to send this information to our GPU layer in which CUDA can perform:
  - Rust cannot communicate directly with our GPU, we will need to utilize C++.
- Need to develop a Foreign Function Interface (FFI) in which Rust can safely communicate with C++ functions ... more to come.


## API Layer

Axum and Tokio (dependencies/crates) in Rust takes care of the server setup, for reference:

```rust
use axum::{routing::{get, post}, Router};
use tokio::net::TcpListener;
```
For now we have 3 main routers (excluding /health) for the main functionality
1. Insert
2. Search
3. Delete

The implementation of this these routes is where Rust gets interesting. Right now we have a VectorEngine trait. A trait in Rust is not like a class, but more so a set of methods that can be "injected" into a class.
```rust
pub trait VectorEngine {
    fn insert(&mut self, id: String, vector: Vec<f32>);
    fn search(&self, query: Vec<f32>, k: usize) -> Vec<SearchResult>;
    fn delete(&mut self, id: &str);
}

impl VectorEngine for FfiEngineAdapter {}
```

So far not so bad to follow. A few things to point out is that "mut" is not short for mutex in Rust, but rather stating that the object is mutable. As for the FfiEngineAdapter, I will redirect over to the FFI implementation for now.

## Foreign Function Interface (FFI) Implementation

The first main part about implementing FFI is that we need the bindings. These bindings are simply the access for Rust to call whatever we define on the C++ side. We originally took the approach on hard-coding these ourselves, but turns out Reddit has a few Rust enthusiasts that gave other suggestions. So for this, we used bindgen (outside dependency/crate) which takes care of the bindings by looking at the C++ header file, all done in compile-time. 

```rust
use crate::bindings::{
    native_search_results_free,
    native_search_results_id_at,
    native_search_results_len,
    native_search_results_score_at,
    native_vector_engine_delete,
    native_vector_engine_free,
    native_vector_engine_insert,
    native_vector_engine_new,
    native_vector_engine_search,
    NativeSearchResults,
    NativeVectorEngine,
};
```

When we use our FFI, the biggest thing to note is pointers. We are going to pass data using an opaque structure, so when we use our engine on the cpp side, it will return a pointer that rust can work with. Thus, we have the following structs on the rust end.

```rust
pub struct FfiVectorEngine {
    handle: *mut NativeVectorEngine,
}

pub struct FfiSearchResults {
    handle: *mut NativeSearchResults,
}
```

What's similar between the two is that Rust will handle both the engine and the results as pointers to help abstract. We also have destructors that are seperate for both of these that Rust can run as seen below.

```rust
impl Drop for FfiVectorEngine {
    fn drop(&mut self) {
        unsafe {
            native_vector_engine_free(self.handle);
        }
    }
}
```

This is seperate from the rest of our methods in the FfiVectorEngine struct as this is for Rust's built-in cleanup. There are also a few things in Rust when it comes to traits, and one of those are market traits. The one we will be using is "Send", and is built into Rust. If we set this for something, it means that ownership of "it" can move between threads safely. 

```rust
unsafe impl Send for FfiVectorEngine {}
```
This tells Rust that handling FfiVectorEngine can move across threads and be concurrent, which makes sense as multiple queries can happen. With that, this writeup covers most of our progress so far when it comes to the API Layer and developing the FFI for the server to communicate with our C++ engine. The next steps include developing part of the C++ so it works appropriately with our developed CUDA kernels.







<!-- > Markdown is a better fit for writing than hardcoding posts into React components. -->