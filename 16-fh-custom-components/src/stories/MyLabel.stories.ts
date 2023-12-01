import { Meta, StoryObj } from '@storybook/react';
// type indica que es una interface para que no pase ningún código de JS
import { MyLabel, type Props } from '../components/MyLabel';

const meta: Meta<Props> = {
	title: 'UI/labels/MyLabel', // ubicacion y nombre del componente
	tags: ['autodocs'], // indica que genere automaticamente la documentación
	component: MyLabel, // componente a renderizar
	parameters: {
		layout: 'centered',
	},
	argTypes: {        // propiedad que permite cambiar el control por defecto
		size: { control: 'inline-radio' },
		fontColor: { control: 'color' },
	},
} satisfies Meta<typeof MyLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

// Creación de historias
export const Basic: Story = {
	// Se definen los parametros obligatorios definidos en MyLabel
	args: {
		label: 'Basic label',
	},
};

export const AllCaps: Story = {
	// Se definen los parametros obligatorios definidos en MyLabel
	args: {
		label: 'All Caps label',
		allCaps: true,
	},
};
export const Secondary: Story = {
	// Se definen los parametros obligatorios definidos en MyLabel
	args: {
		label: 'Secondary label',
		color: 'text-secondary',
	},
};
export const CustomColor: Story = {
	// Se definen los parametros obligatorios definidos en MyLabel
	args: {
		label: 'Custom Color label',
		fontColor: '#5517ac',
	},
};
