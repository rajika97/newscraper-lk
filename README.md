# Newscraper

![Newscraper Logo](/frontend/src/assets/Newscraper%20Logo.svg)

Get all the news you need, without having to visit multiple websites

Check out the site: https://newscraper.rajika.pro

## Introduction

Newscraper is a web application that scrapes data from real news websites and displays it to users. With Newscraper, you can stay updated with the latest news without having to visit multiple websites. The application provides a user-friendly interface and allows you to easily browse and read news articles from various sources.

## Techstack

- Cheerio: A Node.js library used for web scraping.
- Node.js: Used for the backend development.
- React.js: Used for building the user interface.
- Tailwind CSS: Used for styling the frontend.

## Installation

To run Newscraper locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/rajika97/newscraper-lk.git

   ```

2. Navigate to the project directory:

   ```bash
   cd newscraper-lk

   ```

3. Navigate to the backend directory and install dependencies, and then run the development server:

   ```bash
   cd backend
   npm install
   npm run dev

   ```

4. Your Newscraper backend should now be running at http://localhost:3000

5. Navigate to the frontend directory and install dependencies, and then run the development server:

   ```bash
   cd ..
   cd frontend
   npm install

   ```

6. Add .env in the frontend directory and add the followings

   ```bash
   VITE_APP_DEV_URL=http://localhost:3000
   VITE_APP_PROD_URL=https://newscraper-lk.vercel.app
   VITE_APP_ENV=development

   ```

7. Run the project

   ```bash

   npm run dev

   ```

8. Your Newscraper frontend should now be running at http://localhost:5173
