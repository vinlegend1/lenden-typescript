import React, { useState } from 'react';

export interface ToggleButtonProps {}

const ToggleButton: React.FC<ToggleButtonProps> = () => {
	const [activeItem, setActiveItem] = useState<'single' | 'multiple'>(
		'multiple'
	);

	return (
		<div id='toggleButton'>
			<div
				onClick={() => {
					if (activeItem === 'multiple') setActiveItem('single');
				}}
				className={`toggleItem ${activeItem === 'single' ? 'active' : ''}`}>
				Single
			</div>
			<div
				onClick={() => {
					if (activeItem === 'single') setActiveItem('multiple');
				}}
				className={`toggleItem ${activeItem === 'multiple' ? 'active' : ''}`}>
				Multiple
			</div>
		</div>
	);
};

export default ToggleButton;
