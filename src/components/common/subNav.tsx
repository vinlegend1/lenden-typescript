import React from 'react';
import { useHistory } from 'react-router-dom';

export interface EditProfileNavProps {
	title: string;
}

const EditProfileNav: React.FC<EditProfileNavProps> = props => {
	const history = useHistory();
	return (
		<div id='subNav'>
			<div className='imgContainer' onClick={() => history.goBack()}>
				<img className='icon' src='/icons/back2.svg' alt='' />
			</div>
			<h1>{props.title}</h1>
		</div>
	);
};

export default EditProfileNav;
