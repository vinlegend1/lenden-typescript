import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateDeviceType } from '../app/entities/common';

export default function useResizeEventListener(
	customFunction?: () => () => void,
	dependency?: []
) {
	const dispatch = useDispatch();
	dispatch(updateDeviceType());

	useEffect(() => {
		window.addEventListener('resize', () => dispatch(updateDeviceType()));

		let returnFunction: (() => void) | null;
		if (customFunction) returnFunction = customFunction();

		return () => {
			window.removeEventListener('resize', () => dispatch(updateDeviceType()));

			if (returnFunction) returnFunction();
		};
	}, [dependency]);
}

//TODO YET TO BE TESTED FOR PRODUCT PAGE
