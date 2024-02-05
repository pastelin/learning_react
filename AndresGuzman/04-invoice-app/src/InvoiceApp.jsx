import { useEffect, useState } from 'react';
import { calculateTotal, getInvoice } from './services/getInvoice';
import { ClientView } from './components/ClientView';
import { CompanyView } from './components/CompanyView';
import { InvoiceView } from './components/InvoiceView';
import { ListItemView } from './components/ListItemView';
import { TotalView } from './components/TotalView';
import { FormItemsView } from './components/FormItemsView';

const invoiceInitial = {
	id: 0,
	name: '',
	client: {
		name: '',
		lastName: '',
		address: {
			country: '',
			city: '',
			street: '',
			number: 0,
		},
	},
	company: {
		name: '',
		fiscalNumber: 0,
	},
	items: [],
};

export const InvoiceApp = () => {
	const [activeForm, setActiveForm] = useState(false);

	const [counter, setCounter] = useState(4);

	const [total, setTotal] = useState(0);

	const [invoice, setInvoice] = useState(invoiceInitial);

	const [items, setItems] = useState([]);

	const { id, name, client, company } = invoice;

	useEffect(() => {
		const data = getInvoice();
		setInvoice(data);
		setItems(data.items);
	}, []);

	useEffect(() => {
		setTotal(calculateTotal(items));
	}, [items]);

	// Definicion de funcion que se llamara desde el componente FormItemsView para insertar nuevo Item
	const handlerAddItems = ({ product, price, quantity }) => {
		setItems([
			...items,
			{
				id: counter,
				product: product.trim(),
				price: +price.trim(),
				quantity: parseInt(quantity.trim(), 10),
			},
		]);

		// Incrementa id del producto cada que este se guarda
		setCounter(counter + 1);
	};

	const handlerDeleteItem = (id) => {
		setItems(items.filter((item) => item.id !== id));
	};

	const onActiveForm = () => {
		setActiveForm(!activeForm);
	};

	return (
		<>
			<div className="container shadow mt-3 p-2">
				<h1 className="title">Ejemplo Factura</h1>
				<InvoiceView id={id} name={name} />

				<div className="flex-responsive">
					<div className="flex-responsive-item">
						<ClientView title={'Datos del cliente'} client={client} />
					</div>

					<div className="flex-responsive-item">
						<CompanyView title={'Datos de la empresa'} company={company} />
					</div>
				</div>

				<ListItemView
					title={'Productos de la factura'}
					items={items}
					handlerDeleteItem={handlerDeleteItem}
				/>
				<TotalView total={total} />

				<button className="btn btn-togle-form" onClick={onActiveForm}>
					{!activeForm ? 'Agregar Item' : 'Cerrar Form'}
				</button>
				{!activeForm || <FormItemsView handler={handlerAddItems} />}
			</div>
		</>
	);
};
