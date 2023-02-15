// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: "event-management-c404e.appspot.com",
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, process.env.BUCKET_URL);
// export default storage;
module.exports = { storage };
