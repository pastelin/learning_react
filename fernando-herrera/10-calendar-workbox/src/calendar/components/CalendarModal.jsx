import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { useCalendarStore, useUiStore } from '../../hooks';

registerLocale('es', es);

const customStyle = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

Modal.setAppElement('#root');

export const CalendarModal = () => {
	const { isDateModalOpen, closeDateModal } = useUiStore();

	const [formSubmitted, setformSubmitted] = useState(false);

	const { activeEvent, starSavingEvent } = useCalendarStore();

	const [formValues, setFormValues] = useState({
		title: '',
		notes: '',
		start: new Date(),
		end: addHours(new Date(), 2),
	});

	const titleClass = useMemo(() => {
		if (!formSubmitted) return '';

		return formValues.title.length > 0 ? '' : 'is-invalid';
	}, [formValues.title, formSubmitted]);

	// Se ejecuta cada que el estado de activeEvent sea modificado
	// El estado de activeEvent se actualiza cada que se le de click a un evento
	useEffect(() => {
		if (activeEvent !== null) {
			setFormValues({ ...activeEvent });
		}
	}, [activeEvent]);

	const onInputChange = ({ target }) => {
		setFormValues({
			...formValues,
			[target.name]: target.value,
		});
	};

	const onDateChanged = (event, changing) => {
		setFormValues({
			...formValues,
			[changing]: event,
		});
	};

	const onCloseModal = () => {
		closeDateModal();
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		setformSubmitted(true);

		const difference = differenceInSeconds(formValues.end, formValues.start);

		if (isNaN(difference) || difference <= 0) {
			Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
			return;
		}

		if (formValues.title.length <= 0) return;

		console.log(formValues);

        await starSavingEvent(formValues);
        closeDateModal();
        setformSubmitted(false);
	};

	return (
		<Modal
			isOpen={isDateModalOpen}
			onRequestClose={onCloseModal}
			style={customStyle}
			className="modal"
			overlayClassName="modal-fondo"
			closeTimeoutMS={200}
		>
			<h1> Nuevo evento </h1>
			<hr />
			<form className="container" onSubmit={onSubmit}>
				<div className="form-group mb-2">
					<label>Fecha y hora inicio</label>
					<DatePicker
						onChange={(event) => onDateChanged(event, 'start')}
						selected={formValues.start}
						className="form-control"
						dateFormat="Pp"
						showTimeSelect
						locale="es"
						timeCaption="Hora"
					/>
				</div>

				<div className="form-group mb-2">
					<label>Fecha y hora fin</label>
					<DatePicker
						minDate={formValues.start}
						onChange={(event) => onDateChanged(event, 'end')}
						selected={formValues.end}
						className="form-control"
						dateFormat="Pp"
						locale="es"
						timeCaption="Hora"
					/>
				</div>

				<hr />
				<div className="form-group mb-2">
					<label>Titulo y notas</label>
					<input
						type="text"
						className={`form-control ${titleClass}`}
						placeholder="Título del evento"
						name="title"
						autoComplete="off"
						value={formValues.title}
						onChange={onInputChange}
					/>
					<small id="emailHelp" className="form-text text-muted">
						Una descripción corta
					</small>
				</div>

				<div className="form-group mb-2">
					<textarea
						type="text"
						className="form-control"
						placeholder="Notas"
						rows="5"
						name="notes"
						value={formValues.notes}
						onChange={onInputChange}
					></textarea>
					<small id="emailHelp" className="form-text text-muted">
						Información adicional
					</small>
				</div>

				<button type="submit" className="btn btn-outline-primary btn-block">
					<i className="far fa-save"></i>
					<span> Guardar</span>
				</button>
			</form>
		</Modal>
	);
};
