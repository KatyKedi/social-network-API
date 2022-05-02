# Social Network API

## Description

This application serves as an API in which users can be created and then post thoughts or reactions to other user's thoughts. 

## Overview

* Users
  * User Schema
    * username
    * email
    * thoughts
    * friends
  * Routes
    * GET: get all users
    * GET: get user by id
    * POST: create a user
    * PUT: update a user
    * DELETE: delete a user
    * POST: add a friend using a the friend's user id
    * DELETE: delete a friend by friend id
* Thoughts
  * Reaction Schema
    * reactionId
    * reactionBody
    * username
    * createdAt
  * Thought Schema
    * thoughtText
    * username
    * createdAt
  * Routes
    * GET: get all thoughts
    * GET: get thought by id
    * POST: create a thought
    * PUT: update a thought
    * DELETE: delete a thought
    * POST: add a reaction using a thought id
    * DELETE: delete a reaction by reaction id

## Walkthrough

[**Link to demonstration video**](https://github.com/KatyKedi/social-network-API/blob/main/assets/social-network-API.webm "Walkthrough video")