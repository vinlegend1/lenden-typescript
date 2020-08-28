import React from 'react';
import { useHistory } from 'react-router-dom';
import GenericIcons from '../../icons/generic';

export interface EditProfileNavProps {
	title: string;
}

const EditProfileNav: React.FC<EditProfileNavProps> = props => {
	const history = useHistory();
	return (
		<div id='subNav'>
			<div className='imgContainer' onClick={() => history.goBack()}>
				<GenericIcons name='back' className='icon' />
			</div>
			<h1>{props.title}</h1>
		</div>
	);
};

export default EditProfileNav;
