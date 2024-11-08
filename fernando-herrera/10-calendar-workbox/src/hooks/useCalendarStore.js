import { useDispatch, useSelector } from 'react-redux';
import {
	onAddNewEvent,
	onDeleteEvent,
	onLoadEvents,
	onSetActiveEvent,
	onUpdateEvent,
} from '../store';
import calendarApi from '../api/calendarApi';
import { convertEventsToDateEvents } from '../helpers/convertEventsToDateEvents';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
	const dispatch = useDispatch();
	const { events, activeEvent } = useSelector((state) => state.calendar);
	const { user } = useSelector((state) => state.auth);

	const setActiveEvent = (calendarEvent) => {
		dispatch(onSetActiveEvent(calendarEvent));
	};

	const starSavingEvent = async (calendarEvent) => {
		try { 
			if (calendarEvent.id) {
				await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
				dispatch(onUpdateEvent({ ...calendarEvent, user }));
				return;
			}

			// Crear Evento
			const { data } = await calendarApi.post('/events', calendarEvent);
			dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
		} catch (error) {
			console.log(error);
			Swal.fire('Error al guardar', error.response.data.msg, 'error');
		}
	};

	const startDeletingEvent = async () => {
		try {
			await calendarApi.delete(`/events/${activeEvent.id}`);
			dispatch(onDeleteEvent());
		} catch (error) {
			console.log(error);
			Swal.fire('Error al eliminar', error.response.data.msg, 'error');
		}
	};

	const startLoadingEvents = async () => {
		console.log('startLoadingEvents');
		try {
			const { data } = await calendarApi.get('/events');
			const events = convertEventsToDateEvents(data.eventos);
			dispatch(onLoadEvents(events));
		} catch (error) {
			console.log('Error cargando eventos');
			console.log(error);
		}
	};

	return {
		//* Propidades
		events,
		activeEvent,
		hasEventSelected: !!activeEvent,

		//* Metodos
		setActiveEvent,
		starSavingEvent,
		startDeletingEvent,
		startLoadingEvents,
	};
};
