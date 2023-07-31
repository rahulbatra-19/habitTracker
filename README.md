# habitTracker
A habit tracker app made form nodejs and express

Habit Tracker App
This is a simple habit tracker app that allows users to track their daily habits and view their progress over time.

Folder Structure

habitTracker/
  ├── controllers/
  |   ├── habit_controller.js
  |   └── user_controller.js
  |   └── home_controller.js
  ├── models/
  |   ├── user.js
  |   └── habit.js
  ├── config/
  |   ├── mongoose.js
  |   └── passport-local-strategy.js
  ├── assets/
  |   ├── css/
  |       ├── home.css
  |       ├── header.css
  |       ├── layout.css
  |       ├── sign-in.css
  |       ├── sign-up.css
  |       └── weeks.css
  ├── views/
  |   ├── _header.ejs
  |   ├── layout.ejs
  |   ├── home.ejs
  |   ├── sign_in.ejs
  |   ├── sign_up.ejs
  |   └── weeks_page.ejs
  ├── routes/
  |   ├── habit.js
  |   ├── index.js
  |   └── users.js
  ├── index.js
  ├── package.json
  ├── package-lock.json
  ├── .gitignore
  └── Readme.md





  
How to Start the Project

Navigate to the project folder: cd habit-tracker-app
Install dependencies: npm install
Create a .env file by renaming .env.example and set your environment variables.
Start the server: npm start
Comments
Comments have been added throughout the code to explain the purpose of functions, variables, and sections of the code. This helps to improve code readability and makes it easier for other developers to understand the codebase.

