import './MyLabel.css';

// Interfaz que definira todas las propiedades modificables en la historia
export interface Props {
	/**
	 * Text to display
	 */
	label: string;
	/**
	 * Label size
	 */
	size?: 'normal' | 'h1' | 'h2' | 'h3';
	/**
	 * Capitalize all letters
	 */
	allCaps?: boolean;
	/**
	 * Label color
	 */
	color?: 'text-primary' | 'text-secondary' | 'text-tertiary';
	/**
	 * Font Color
	 */
	fontColor?: string;
}

// Componente que se renderiza para la historia, recibe los parametros definidos en la interfaz
export const MyLabel = ({ label, size = 'normal', allCaps = false, color, fontColor }: Props) => {
	return (
		<span className={`${size} ${color}`} style={{ color: fontColor }}>
			{allCaps ? label.toUpperCase() : label}
		</span>
	);
};
