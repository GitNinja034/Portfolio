# Portfolio Website with Backend Service

This is a complete portfolio website with a backend service to handle contact form submissions.

## Features
- Responsive design with animations
- Photo section for your profile
- Projects showcase
- Contact form with backend integration
- Messages saved to a JSON file

## Setup Instructions

1. Install Node.js if you haven't already: https://nodejs.org/

2. Install the required dependencies:
   ```
   npm install
   ```

3. Start the backend server:
   ```
   npm start
   ```
   or for development with auto-restart:
   ```
   npm run dev
   ```

4. Open index.html in your browser to view the portfolio

## Backend API

The backend service runs on port 3000 and provides the following endpoint:

- POST /api/contact - Submit contact form data
  * Expects JSON with name, email, and message fields
  * Returns success message when data is saved

Contact submissions are saved to contacts.json in the project root.

## Customization

Refer to customization_guide.txt for instructions on how to personalize your portfolio with your own details and images.
