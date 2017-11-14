# Exercise Tracker REST API

The fourth API project for the Back End Development Certification on [FreeCodeCamp](https://freecodecamp.com). It uses Nodejs, Expressjs, and MongoDB to allow users to track their fitness progress by creating a log. 

## Demo
[Click here](https://track-exercise.glitch.me/) to see the demo hosted on Glitch.

## Project Description

Objective: Build a full stack JavaScript app that is functionally similar to [this](https://fuschia-custard.glitch.me/) and deploy it to Glitch.

User stories:

1. I can create a user by posting form data username to /api/exercise/new-user and returned will be an object with username and id.
2. I can get an array of all users by getting api/exercise/users with the same info as when creating a user.
3. I can add an exercise to any user by posting form data userId(_id), description, duration, and optionally date to /api/exercise/add. If no date supplied it will use current date. App will return the user object with the exercise fields added.
4. I can retrieve a full exercise log of any user by getting /api/exercise/log with a parameter of userId(_id). App will return the user object with added array log and count (total exercise count).
5. I can retrieve part of the log of any user by also passing along optional parameters of from & to or limit. (Date format yyyy-mm-dd, limit = int)

### Example Usage:

[https://track-exercise.glitch.me/api/exercise/log?userId=1](https://track-exercise.glitch.me/api/exercise/log?userId=1)

### Example output:

	{"id":1,"username":"olong johnson","count":4,"log":[{"description":"jog","duration":"20","date":"Tue Nov 14 2017"},{"description":"walk","duration":"28","date":"Mon Oct 30 2017"},{"description":"sprint","duration":"12","date":"Sun Oct 29 2017"},{"description":"plank","duration":"10","date":"Wed Oct 24 1990"}]}