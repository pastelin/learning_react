// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnviroments } from '../helpers/getEnviroments';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
	VITE_APIKEY,
	VITE_AUTHDOMAIN,
	VITE_PROJECTID,
	VITE_STORAGEBUCKET,
	VITE_MESSAGINGSENDERID,
	VITE_APPID,
} = getEnviroments();

// Your web app's Firebase configuration
// Dev
// const firebaseConfig = {
// 	apiKey: 'AIzaSyC3_jBaRcdbYoug1qlOFZ_ZCMGEZsyPPa0',
// 	authDomain: 'react-cursos-19bc4.firebaseapp.com',
// 	projectId: 'react-cursos-19bc4',
// 	storageBucket: 'react-cursos-19bc4.appspot.com',
// 	messagingSenderId: '350978314493',
// 	appId: '1:350978314493:web:975fe079c1f210de762e94',
// };

// Test
// const firebaseConfig = {
// 	apiKey: 'AIzaSyCphyFMrPXS8KmNMbgUdF8TGT2QexNdM9Y',
// 	authDomain: 'testing-b1bf4.firebaseapp.com',
// 	projectId: 'testing-b1bf4',
// 	storageBucket: 'testing-b1bf4.appspot.com',
// 	messagingSenderId: '36652929575',
// 	appId: '1:36652929575:web:8632a180a6ea025a3c7402',
// };

const firebaseConfig = {
	apiKey: VITE_APIKEY,
	authDomain: VITE_AUTHDOMAIN,
	projectId: VITE_PROJECTID,
	storageBucket: VITE_STORAGEBUCKET,
	messagingSenderId: VITE_MESSAGINGSENDERID,
	appId: VITE_APPID,
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
