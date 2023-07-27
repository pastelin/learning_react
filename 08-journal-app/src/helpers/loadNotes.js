import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';

export const loadNotes = async(uid = '') => {
	if (!uid) throw new Error('El UID del usaurio no existe');

	// Gets a CollectionReference instance that refers to the collection at the specified absolute path.
	const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
	// Executes the query and returns the results as a QuerySnapshot.
    const docs = await getDocs(collectionRef);

    const notes = [];

    docs.forEach(doc => {
        notes.push({id: doc.id, ...doc.data()});
    });

    return notes;
}