import { TurnedInNot } from '@mui/icons-material';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useMemo } from 'react';
import { setActiveNote } from '../../store/journal';
import { useDispatch } from 'react-redux';

export const SideBarItem = ({ body, title, id, date, imageUrls = [] }) => {
	// A hook to access the redux dispatch function
	const dispatch = useDispatch();

	// useMemo will only recompute the memoized value when one of the deps has changed.
	const newTitle = useMemo(() => {
		return title.length > 17 ? title.substring(0, 17) + '...' : title;
	}, [title]);

	// No requiere llamar a un Thunk debido a que la llamada es sincrona porque ya se tiene la nota
    const onClickNote = () => {
		dispatch(setActiveNote({ body, title, id, date, imageUrls }));
	};

	return (
		<ListItem disablePadding>
			<ListItemButton onClick={onClickNote}>
				<ListItemIcon>
					<TurnedInNot />
				</ListItemIcon>
				<Grid container>
					<ListItemText primary={newTitle} />
					<ListItemText secondary={body} />
				</Grid>
			</ListItemButton>
		</ListItem>
	);
};
