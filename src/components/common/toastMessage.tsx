import React from 'react';
import { genericIcons } from '../../icons';
export interface ToastMessageProps {
	title: string;
}

const ToastMessage: React.FC<ToastMessageProps> = props => {
	return (
		<div style={{ margin: 'auto', width: 'fit-content' }}>
			<img
				src={genericIcons.success}
				alt=''
				style={{ margin: 'auto 0.4rem' }}
			/>
			<span
				style={{ fontSize: '13px', fontFamily: 'Cera Pro', color: 'white' }}>
				{props.title}
			</span>
		</div>
	);
};

export default ToastMessage;
