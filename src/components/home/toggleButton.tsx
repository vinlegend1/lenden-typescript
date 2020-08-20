import React, { useState } from 'react';

export interface ToggleButtonProps {}

const ToggleButton: React.FC<ToggleButtonProps> = () => {
	const [activeItem, setActiveItem] = useState<'single' | 'multiple'>('single');

	return (
		<div id='toggleButton'>
			<div
				id='single'
				onClick={() => {
					if (activeItem === 'multiple') setActiveItem('single');
				}}
				className={`${activeItem === 'single' ? 'active' : ''}`}>
				Single
			</div>
			<div
				id='multiple'
				onClick={() => {
					if (activeItem === 'single') setActiveItem('multiple');
				}}
				className={`${activeItem === 'multiple' ? 'active' : ''}`}>
				Multiple
			</div>
		</div>
	);
};

export default ToggleButton;
