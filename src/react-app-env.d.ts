/* eslint-disable spaced-comment */
/// <reference types="react-scripts" />
declare module 'redux-burger-menu' {
	export function action(...args: any[]): any;

	export function decorator(ComposedComponent: any, menuId: any): any;

	export function reducer(...args: any[]): any;
}
