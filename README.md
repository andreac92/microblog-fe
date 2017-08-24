# README

Microblogging app that deploys to Netlify. This is the repository for the React frontend.

## Stack
* Rails backend API
* React frontend

## Description
This app allows you to sign in as a user and create microblogging posts. You can edit or delete each post you've created.

Then, you can choose from 3 different layouts for your blog. Once you're satisfied you can click "Deploy" to deploy your blog as a static site to Netlify. If you make any changes, you can always redeploy.

## Rails
The Rails API consists of the following endpoints:
* GET /posts --> Retrieve all posts
* POST /posts --> Create a new post
* PUT /posts/:id --> Modify a post
* DELETE /posts/:id --> Delete a post

* POST /deploys --> Deploy to Netlify

Blogs are deployed to Netlify by generating an index.html page from your posts and chosen layout, and zipping the file up with a stylesheet to be sent to Netlify.

## React
The React frontend communicates with the Rails backend through the API. Tokens are used for user authentication.

## Test user
Test user in seeds.rb -- user@lol.com / netlify123

## Running the app locally
By default the frontend makes request to the localhost on port 3001. To run the app locally, run:

npm start

You can change the hostname of the backend at src/constants/const.js by modifying the api_host variable.

## TO DO
* Add ability to create a new user (as of now you can only log in with existing users)
* Restrict parameters with permitted_params
* Add errors returned from backend to the UI
