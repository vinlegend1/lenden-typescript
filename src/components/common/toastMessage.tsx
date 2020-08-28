import React from 'react';
import GenericIcons from '../../icons/generic';

export interface ToastMessageProps {
	title: string;
}

const ToastMessage: React.FC<ToastMessageProps> = props => {
	return (
		<div style={{ margin: 'auto', width: 'fit-content' }}>
			<GenericIcons name='success' />
			<span
				style={{ fontSize: '13px', fontFamily: 'Cera Pro', color: 'white' }}>
				{props.title}
			</span>
		</div>
	);
};

export default ToastMessage;
