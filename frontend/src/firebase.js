// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// ✅ Use your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyBe0AuufVp6JD_rAoeUsKBUAw5N01orRBk",
  authDomain: "jobnotify-5e87a.firebaseapp.com",
  projectId: "jobnotify-5e87a",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "182327096693",
  appId: "1:182327096693:web:969d30d079f73c732fcf3c",
  measurementId: "G-8H1X4TR7TG",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Setup Firebase Auth
const auth = getAuth(app);

// 👉 Connect to Auth emulator in dev only
if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
  console.log("✅ Connected to Firebase Auth emulator.");
}

// Setup Analytics only if supported (to avoid breaking in SSR or older browsers)
let analytics = null;
isSupported().then((yes) => {
  if (yes) {
    analytics = getAnalytics(app);
    console.log("📊 Firebase Analytics initialized.");
  } else {
    console.warn("⚠️ Analytics not supported on this device.");
  }
});

export { app, auth, analytics };
