import React from 'react';

export interface ToggleButtonProps {
	activeItem: 'single' | 'multiple';
	handleActiveItemChange: (item: 'single' | 'multiple') => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = props => {
	const { activeItem, handleActiveItemChange } = props;
	return (
		<div id='toggleButton'>
			<div
				id='single'
				onClick={() => {
					if (activeItem === 'multiple') handleActiveItemChange('single');
				}}
				className={`${activeItem === 'single' ? 'active' : ''}`}>
				Single
			</div>
			<div
				id='multiple'
				onClick={() => {
					if (activeItem === 'single') handleActiveItemChange('multiple');
				}}
				className={`${activeItem === 'multiple' ? 'active' : ''}`}>
				Multiple
			</div>
		</div>
	);
};

export default ToggleButton;
