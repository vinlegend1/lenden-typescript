import React from 'react';
import { useHistory } from 'react-router-dom';
import GenericIcons from '../../icons/generic';

export interface SubNavProps {
	title: string;
}

const SubNav: React.FC<SubNavProps> = props => {
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

export default SubNav;
