import firebase from 'firebase/compat/app';
import 'firebase/compat/analytics'


const firebaseConfig = {
    apiKey: "AIzaSyBFRH_C16BgkqUQQ2o2dyNxmCqF4fWRLks",
    authDomain: "pomodoro-timer-app-53984.firebaseapp.com",
    projectId: "pomodoro-timer-app-53984",
    storageBucket: "pomodoro-timer-app-53984.appspot.com",
    messagingSenderId: "854603473445",
    appId: "1:854603473445:web:85b325da38bd2af94b15cc",
    measurementId: "G-8H78F77MJS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics()


