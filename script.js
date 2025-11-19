// 🔑 Firebase config — replace with your actual project config
const firebaseConfig = {
  apiKey: "AIzaSyCx7rEX5LviReukmK6Lq8zeMgs5Ynpe7V8",
  authDomain: "cloud-collab-c2956.firebaseapp.com",
  databaseURL: "https://cloud-collab-c2956-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cloud-collab-c2956",
  storageBucket: "cloud-collab-c2956.firebasestorage.app",
  messagingSenderId: "1078071735292",
  appId: "1:1078071735292:web:291eeca02090125c593879"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// Elements
const loginDiv = document.getElementById("loginDiv");
const editorDiv = document.getElementById("editorDiv");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginMsg = document.getElementById("loginMsg");
const editor = document.getElementById("editor");

// Robust login/register
loginBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  // Try to create user first
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      loginMsg.textContent = "User registered and logged in!";
    })
    .catch(err => {
      if (err.code === "auth/email-already-in-use") {
        // If user exists, login instead
        auth.signInWithEmailAndPassword(email, password)
          .then(() => loginMsg.textContent = "Logged in successfully!")
          .catch(e => loginMsg.textContent = e.message);
      } else {
        loginMsg.textContent = err.message;
      }
    });
});

// Logout
logoutBtn.addEventListener("click", () => {
  auth.signOut();
});

// Monitor auth state
auth.onAuthStateChanged(user => {
  if (user) {
    loginDiv.style.display = "none";
    editorDiv.style.display = "block";
  } else {
    loginDiv.style.display = "block";
    editorDiv.style.display = "none";
  }
});

// Realtime Database for the editor
const docRef = db.ref("document");

// Listen for changes
docRef.on("value", snapshot => {
  const text = snapshot.val();
  if (text !== null && text !== editor.value) {
    editor.value = text;
  }
});

// Update database when typing
editor.addEventListener("input", () => {
  const text = editor.value;
  docRef.set(text);
});
