import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
const firebaseConfig = {
  apiKey: "AIzaSyCLMBzK32gfnPUpxgrKdUsDwomyhORoqs4",
  authDomain: "teachershub-123.firebaseapp.com",
  projectId: "teachershub-123",
  storageBucket: "teachershub-123.appspot.com",
  messagingSenderId: "326619544858",
  appId: "1:326619544858:web:a8b69656f5b449337940a3",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
export const SignInWithGoogle = async (BACKEND_URL, callback) => {
  signInWithPopup(auth, provider)
    .then(async (results) => {
      // console.log(results);
      const data = {
        displayName: results?.user?.displayName,
        email: results?.user?.email,
        provider: results?.providerId,
        photo: results?.user?.photoURL,
        phoneNumber: results?.user?.phoneNumber,
      };
      await axios
        .post(`${BACKEND_URL}/auth/login/google`, data)
        // .post(
        //   `https://teachershub-backend.netlify.app//auth/login/google`,
        //   data
        // )
        .then((result) => {
          callback(result.data);
        })
        .catch((error) => {
          console.log(error);
          console.log("error in making the request to backend");
          callback(error);
        });
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
