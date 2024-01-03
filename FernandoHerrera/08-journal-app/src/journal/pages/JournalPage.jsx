import { IconButton, Typography } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NothingSelectedView } from '../views/NothingSelectedView';
import { NoteView } from '../views/NoteView';
import { AddOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { savingNewNote, startNewNote } from '../../store/journal';

export const JournalPage = () => {
	// A hook to access the redux dispatch function.
	const dispatch = useDispatch();

	// A hook to access the redux store's state.
	const { isSaving, active } = useSelector((state) => state.journal);

	const onCLickNewNote = () => {
		dispatch(startNewNote());
	};

	return (
		<JournalLayout>
			{/* <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, officia!</Typography> */}

			{!!active ? <NoteView /> : <NothingSelectedView />}

			<IconButton
				onClick={onCLickNewNote}
				disabled={isSaving}
				size="large"
				sx={{
					color: 'white',
					backgroundColor: 'error.main',
					':hover': { backgroundColor: 'error.main', opacity: 0.9 },
					position: 'fixed',
					right: 50,
					bottom: 50,
				}}
			>
				<AddOutlined sx={{ fontSize: 30 }} />
			</IconButton>
		</JournalLayout>
	);
};
