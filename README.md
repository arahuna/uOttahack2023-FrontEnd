# uOttahack2023-FrontEnd

This is the front-end for chec:xpire, a tool that finds recipes for your expiring food!

# Usage Guide

Using the chec:xpire is very simple:

1. Clone the repo
2. Run `npm install` to install your dependencies
3. Run `npm run dev`

The app will subscribe to the event-broker and await signals of expiring food. when it receives a message, it will use cohereAI to generate a recipe using the expiring ingredients.
