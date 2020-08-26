import React from 'react';

export interface ToastMessageProps {}

const ToastMessage: React.FC<ToastMessageProps> = () => {
	return (
		<div style={{ margin: 'auto', width: 'fit-content' }}>
			<img src='/icons/success.svg' alt='' style={{ margin: 'auto 0.4rem' }} />
			<span
				style={{ fontSize: '13px', fontFamily: 'Cera Pro', color: 'white' }}>
				Your profile has been updated successfully !
			</span>
		</div>
	);
};

export default ToastMessage;
