import { LazyExoticComponent, lazy } from 'react';
import { NoLazy } from '../01-lazyload/pages/NoLazy';

// Firma de un functional component
type JSXComponent = () => JSX.Element;

// LazyExoticComponent<JSXComponent> | JSXComponent : Indica que puede usar componentes de tipo Lazy o normales
interface Route {
	to: string;
	path: string;
	Component: LazyExoticComponent<JSXComponent> | JSXComponent;
	name: string;
}
// El contenido dentro de /* ... */ indica el nombre que tomara el chunk con el objetivo de identificarlos de forma rapida
const LazyLayout = lazy(
	() => import(/* webpackChunkName: "LazyLayout" */ '../01-lazyload/layout/LazyLayout')
);

export const routes: Route[] = [
	{
		path: '/lazyload/*',
		to: '/lazyload/',
		Component: LazyLayout,
		name: 'LazyLayout - Dash',
	},
	{
		to: '/no-lazy',
		path: 'no-lazy',
		Component: NoLazy,
		name: 'No Lazy',
	},
];
