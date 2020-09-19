import React from 'react';

export interface SingleMultipleToggleProps {
	activeItem: 'single' | 'multiple';
	handleActiveItemChange: (item: 'single' | 'multiple') => void;
}

const SingleMultipleToggle: React.FC<SingleMultipleToggleProps> = props => {
	const { activeItem, handleActiveItemChange } = props;
	return (
		<div id='singleMultipleToggle'>
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

export default SingleMultipleToggle;
