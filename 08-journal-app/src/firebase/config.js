// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyC3_jBaRcdbYoug1qlOFZ_ZCMGEZsyPPa0',
	authDomain: 'react-cursos-19bc4.firebaseapp.com',
	projectId: 'react-cursos-19bc4',
	storageBucket: 'react-cursos-19bc4.appspot.com',
	messagingSenderId: '350978314493',
	appId: '1:350978314493:web:975fe079c1f210de762e94',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);