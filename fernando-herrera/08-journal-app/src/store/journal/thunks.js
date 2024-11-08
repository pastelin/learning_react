import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import {
	addNewEmptyNote,
	deleteNoteById,
	savingNewNote,
	setActiveNote,
	setNotes,
	setPhotosToActiveNote,
	setSaving,
	updateNote,
} from './';
import { loadNotes } from '../../helpers/loadNotes';
import { fileUpload } from '../../helpers/fileUpload';

// Despacha acciones asincronas
export const startNewNote = () => {
	return async (dispatch, getState) => {
		// Ejecuta funcion definida en journalSlice para cambiar bandera de isSaving
		dispatch(savingNewNote());

		// Obtiene el uid del estado uid definida en authSlice
		const { uid } = getState().auth;

		// Para grabar en firebase se usa el uid del usuario
		const newNote = {
			title: '',
            body: '',
            // imageUrls: [],
			date: new Date().getTime(),
		};

		// uid : corresponde al identificador del usuario logueado
		// Gets a DocumentReference instance that refers to a document within reference at the specified relative path
		const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

		// Writes to the document referred to by the specified DocumentReference. If the document does not yet exist, it will be created.
		await setDoc(newDoc, newNote);

		newNote.id = newDoc.id;

		//! dispatch
		dispatch(addNewEmptyNote(newNote));
		dispatch(setActiveNote(newNote));
	};
};

export const startLoadingNotes = () => {
	return async (dispatch, getState) => {
		// obtiene el uid del estado en authSlice
		const { uid } = getState().auth;
		if (!uid) throw new Error('El UID del usuario no existe');

		const notes = await loadNotes(uid);
		dispatch(setNotes(notes));
	};
};

export const startSaveNote = () => {
	return async (dispatch, getState) => {
		dispatch(setSaving());

		// obtiene el uid del estado en authSlice
		const { uid } = getState().auth;

		// obtiene la nota del estado en journalSlice
		const { active: note } = getState().journal;

		const noteToFireStore = { ...note };
		// Elimina la propiedad id del objeto noteToFireStore
		delete noteToFireStore.id;

		// Gets a DocumentReference instance that refers to the document at the specified absolute path.
		const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
		// Writes to the document referred to by the specified DocumentReference
		// If you provide merge or mergeFields, the provided data can be merged into an existing document.
		await setDoc(docRef, noteToFireStore, { merge: true });

		// Actualiza la nota del arreglo de notas definidas en JournalSlice
		dispatch(updateNote(note));
	};
};

export const startUpLoadingFiles = (files = []) => {
	return async (dispatch) => {
		dispatch(setSaving());

		// await fileUpload(files[0]);

        // Crea arreglo de promesas
		const fileUploadPromises = [];
		for (const file of files) {
			fileUploadPromises.push(fileUpload(file));
		}

        // Resuelve el arreglo de promesas
		const photosUrls = await Promise.all(fileUploadPromises);

        // Guarda en el estado en la propiedad active >> imageUrls las imagenes seleccionadas
		dispatch(setPhotosToActiveNote(photosUrls));
	};
};

export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));
    }
}
