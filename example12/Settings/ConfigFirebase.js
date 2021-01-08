import firebase from 'firebase/app';
import 'firebase/database';

const config={
    apiKey: "AIzaSyCDhgjcgcHplLeRjd49QONJ8WPmQbvnFyI",
    authDomain: "recuperacionexamen3.firebaseapp.com",
    projectId: "recuperacionexamen3",
    storageBucket: "recuperacionexamen3.appspot.com",
    messagingSenderId: "198586707551",
    appId: "1:198586707551:web:869f2bee48829fbaa9b5ea",
    measurementId: "G-8SMDE6PJGB"
}

const fb = !firebase.apps.lenght ? firebase.initializeApp(config):firebase.app()

export default fb;