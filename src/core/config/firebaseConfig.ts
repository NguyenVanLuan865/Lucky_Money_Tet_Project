import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBTo0h9eihvRD5EbMLefcuA_8MDnUrIz6U",
    authDomain: "luckymoneyproject-e58d8.firebaseapp.com",
    projectId: "luckymoneyproject-e58d8",
    storageBucket: "luckymoneyproject-e58d8.appspot.com",
    messagingSenderId: "1022722726981",
    appId: "1:1022722726981:android:6e9962a891c9e37a4c172c",
    databaseURL: "https://luckymoneyproject-e58d8-default-rtdb.firebaseio.com",
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;