# WriteNest
https://writenest-gold.vercel.app/

WriteNest is a sleek, modern social media feed application built with React, Vite, and Appwrite. It features a real-time feed, user authentication, post creation with image uploads, and an interactive, animated background powered by WebGL.

## Features

-   **User Authentication**: Secure sign-up, login, and logout functionality. Includes a password reset option.
-   **Real-time Feed**: Posts appear, update, and get deleted in real-time for all connected users.
-   **Create Posts**: Users can share their thoughts with text and an optional image upload (up to 5MB).
-   **Like Posts**: Engage with content by liking or unliking posts.
-   **Delete Posts**: Users can delete their own posts. An admin user can delete any post.
-   **Dynamic UI**: A beautiful, responsive interface with glassmorphism effects and a captivating animated light ray background that follows the mouse.

## Core Technologies

-   **Frontend**: React, Vite
-   **Backend**: Appwrite (Authentication, Database, Storage)
-   **Styling**: Tailwind CSS
-   **Routing**: React Router DOM
-   **3D Graphics**: `ogl` for the WebGL background effects

## Appwrite Backend Setup

This project requires an Appwrite backend. Follow these steps to configure it:

1.  **Create an Appwrite Project**:
    -   Set up an Appwrite instance (cloud or self-hosted).
    -   Create a new project in your Appwrite console.

2.  **Create Database and Collection**:
    -   In your Appwrite project, go to **Databases** and create a new database.
    -   Inside the database, create a new collection for posts.
    -   Configure the following attributes for the collection:
        -   `username` (String, Required)
        -   `userId` (String, Required)
        -   `content` (String, Required)
        -   `imageId` (String, not required)
        -   `likes` (String, Array, not required)
    -   Set Collection Permissions:
        -   Add Role: `any` with `Read` access.
        -   Add Role: `users` with `Create` access.
    -   Set Document Permissions: Documents use specific permissions set during creation, allowing authors to update and delete their own posts.

3.  **Create a Storage Bucket**:
    -   Go to **Storage** and create a new bucket for post images.
    -   Set Bucket Permissions:
        -   Add Role: `any` with `Read` access.
        -   Add Role: `users` with `Create`, `Update`, and `Delete` access.

## Local Development Setup

To run this project on your local machine, follow these steps:

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/trisitchanda/react-projcets.git
    ```

2.  **Navigate to the Project Directory**
    ```bash
    cd react-projcets/Social-media
    ```

3.  **Install Dependencies**
    ```bash
    npm install
    ```

4.  **Create Environment File**
    -   Create a file named `.env.local` in the `Social-media` root directory.
    -   Add your Appwrite project credentials to this file. Find the required IDs in your Appwrite console.

    ```env
    VITE_APPWRITE_ENDPOINT="YOUR_APPWRITE_ENDPOINT_URL"
    VITE_APPWRITE_PROJECT_ID="YOUR_APPWRITE_PROJECT_ID"
    VITE_APPWRITE_DB="YOUR_DATABASE_ID"
    VITE_APPWRITE_COLLECTION="YOUR_POSTS_COLLECTION_ID"
    VITE_APPWRITE_BUCKET="YOUR_IMAGE_STORAGE_BUCKET_ID"
    VITE_ADMIN_USER_ID="YOUR_ADMIN_USER_ID" # Optional: User ID of an admin account
    ```

5.  **Start the Development Server**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Available Scripts

-   `npm run dev`: Starts the Vite development server with hot-reloading.
-   `npm run build`: Compiles and bundles the application for production.
-   `npm run lint`: Runs ESLint to check for code quality and style issues.
-   `npm run preview`: Starts a local server to preview the production build.