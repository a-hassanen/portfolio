# Modern React Portfolio

This is a highly-configurable, single-page portfolio website built with React. It includes a unique "Editor Mode" with an AI assistant to make content updates seamless.

## Features

- **Modern Tech Stack**: Built with React, Vite, and powered by the Gemini API.
- **Easy to Update**: Edit a single `portfolioData.json` file to change all content.
- **Visual Editor**: Use the in-browser editor (at `/edit`) to visually update your content.
- 🔴 **AI Assistant**: A conversational AI helps you add new items to your portfolio. *(Under Development)*
- **GitHub Actions Deployment**: Automatically deploys to GitHub Pages on every push to `main`.
- **Fully Responsive**: Looks great on all devices.

---

## Running Locally for Testing

To test your changes locally before pushing them, you need to use the built-in development server. This ensures that everything works as expected in a real web environment.

1.  **Prerequisites**: Make sure you have [Node.js](https://nodejs.org/) (which includes npm) installed on your computer.

2.  **Install Dependencies**: Open your terminal in the project's root directory and run this command once to install all the necessary packages:
    ```bash
    npm install
    ```

3.  **Start the Development Server**: After the installation is complete, run this command to start the server:
    ```bash
    npm run dev
    ```

4.  **View Your Portfolio**: The server will start and give you a local address, usually `http://localhost:5173`. Open this URL in your web browser to see your portfolio and test your changes live.

---

## How to Update Your Portfolio

1.  **Edit the `portfolioData.json` file:**
    - Open `portfolioData.json`.
    - Modify the text, add new items to the arrays (e.g., add a new object to the `experience` array), or remove items.
    - Save the file. The local development server will automatically reload with your changes.
2.  **Use the Editor Mode:**
    - Run the project locally (see instructions above).
    - Navigate to `/edit` in your browser (e.g., `http://localhost:5173/edit`).
    - Use the forms or the AI assistant to make your changes.
    - Click the "Generate Configuration" button.
    - Copy the generated JSON and paste it over the entire content of your `portfolioData.json` file.

---

## Deployment

This project is configured for automatic deployment to GitHub Pages.

1.  **Check `vite.config.js`**: The `base` property in `vite.config.js` is set to `/portfolio/`. If your GitHub repository has a different name, you must update this value to match.

2.  **Enable GitHub Pages**: In your GitHub repository settings, go to the "Pages" section.

3.  **Set Deployment Source**: Under "Build and deployment", change the "Source" to "GitHub Actions".

The deployment workflow is located at `.github/workflows/deploy.yml`. Every time you `git push` to your `main` branch, the GitHub Action will run to automatically build and deploy your site.