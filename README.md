# ☁️ Cloud Collaboration Text Editor Prototype

This project is a simple, real-time, cloud-based text editor prototype built using vanilla HTML, CSS, and JavaScript, leveraging **Google Firebase** for user authentication and real-time database synchronization.

It demonstrates a core concept of collaborative editing: authenticated users can log in and instantly see and edit the same document content in real-time across different browsers or devices.

---

## ✨ Features

* **User Authentication:** Secure user registration and login using Firebase Email/Password authentication.
* **Real-time Collaboration:** Document content is synchronized instantly across all logged-in users via the Firebase Realtime Database.
* **Simple Interface:** Clean separation between the login screen and the editor interface.
* **Robust Login:** Attempts to **register** a new user first; if the email is already in use, it automatically attempts to **log in**.

---

## 🛠️ Technology Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript | The user interface and client-side logic. |
| **Authentication** | Firebase Authentication SDK v8 | Handles secure user sign-up, login, and session management. |
| **Database** | Firebase Realtime Database SDK v8 | Stores the single document string (`"document"`) and synchronizes changes instantly. |

---

## 🚀 Getting Started

### Prerequisites

You need a working Firebase project setup to run this application.

1.  **Create a Firebase Project:** Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2.  **Enable Services:**
    * Navigate to **Authentication** and enable the **Email/Password** sign-in method.
    * Navigate to **Realtime Database** and create a database instance.
3.  **Get Configuration:** In your Project Settings, get the web app configuration object (the `firebaseConfig` block).

### Local Installation

1.  **Clone the Repository:**
    ```bash
    git clone [your-repo-link]
    cd cloud-collab
    ```

2.  **Update Configuration:**
    Open the `script.js` file and replace the placeholder `firebaseConfig` object with the credentials from your own Firebase project.

    ```javascript
    // script.js
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      databaseURL: "YOUR_DATABASE_URL",
      // ... rest of your project IDs
    };
    ```

3.  **Run:**
    Simply open the `index.html` file in your web browser.

---

## 🔑 Key Code Highlights

### 1. Robust Login/Register Logic

The `loginBtn` listener efficiently handles both new users and existing users with a single click:

```javascript
// Tries to create user, if it fails with 'auth/email-already-in-use', it signs them in.
auth.createUserWithEmailAndPassword(email, password)
  .catch(err => {
    if (err.code === "auth/email-already-in-use") {
      auth.signInWithEmailAndPassword(email, password);
    }
    // ...
  });

# Acknowledgements

Special thanks to [Ayush S](https://github.com/ayush007-lio) for guidance and support.

