import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components/ImageGallery';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { useEffect, useMemo, useRef } from 'react';
import { setActiveNote, startDeletingNote, startSaveNote, startUpLoadingFiles } from '../../store/journal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {
	const dispatch = useDispatch();

	// A hook to access the redux store's state.
	const { active: note, messageSaved, isSaving } = useSelector((state) => state.journal);

	// Custom hook para administrar el estado del formulario
	const { body, title, date, onInputChange, formState } = useForm(note);

	// useMemo will only recompute the memoized value when one of the deps has changed.
	const dateString = useMemo(() => {
		const newDate = new Date(date);
		return newDate.toUTCString();
	}, [date]);

	useEffect(() => {
		// Se ejecuta la funcion directamente de Slice debido a que es sincrona
		dispatch(setActiveNote(formState));
	}, [formState]);

	useEffect(() => {
		console.log(messageSaved);
		if (messageSaved.length > 0) {
			// console.log('Hi');

			Swal.fire('Nota actualizada', messageSaved, 'success');
		}
	}, [messageSaved]);

	const onSaveNote = () => {
		// Se ejecuta la funcion por medio de thunk por tener llamadas asincronas a la base
		dispatch(startSaveNote());
	};

	const fileInputRef = useRef();

	const onFileInputChange = ({ target }) => {
		// target.files : obtiene arreglo de las imagenes elegidas
		if (target.files === 0) return;

		dispatch(startUpLoadingFiles(target.files));
    };
    
    const onDelete = () => {
        dispatch(startDeletingNote());
    }

	return (
		<Grid
			container
			direction="row"
			justifyContent="space-between"
			alignItems="center"
			sx={{ mb: 1 }}
			className="animate__animated animate__fadeIn animate__faster"
		>
			<Grid item>
				<Typography fontSize={39} fontWeight="light">
					{dateString}
				</Typography>
			</Grid>
			<Grid item>
				<input
					type="file"
					multiple
					ref={fileInputRef}
					onChange={onFileInputChange}
					style={{ display: 'none' }}
				/>

				<IconButton
					color="primary"
					disabled={isSaving}
					onClick={() => fileInputRef.current.click()}
				>
					<UploadOutlined />
				</IconButton>
				<Button
					disabled={isSaving}
					onClick={onSaveNote}
					color="primary"
					sx={{ padding: 2 }}
				>
					<SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
				</Button>
			</Grid>
			<Grid container>
				<TextField
					type="text"
					variant="filled"
					fullWidth
					placeholder="Ingrese un título"
					label="Título"
					sx={{ border: 'none', mb: 1 }}
					name="title"
					value={title}
					onChange={onInputChange}
				/>

				<TextField
					type="text"
					variant="filled"
					fullWidth
					multiline
					placeholder="¿Qué sucedió en el día de hoy?"
					minRows={5}
					name="body"
					value={body}
					onChange={onInputChange}
				/>
			</Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={onDelete}
                    sx={{ mt: 2 }}
                    color="error"
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>
            
			<ImageGallery images={note.imageUrls} />
		</Grid>
	);
};
