import React, { useState } from 'react';
import { RootState } from '../../../app/models';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export interface EditGravatarProps {}

const EditGravatar: React.SFC<EditGravatarProps> = () => {
	const user = useSelector((state: RootState) => state.auth.user);

	const [gravatar, setGravatar] = useState('user3');

	const availGravatars = ['user1', 'user2', 'user3', 'user4', 'user5'];

	return (
		<div className='editGravatar'>
			<div className='imageContainer'>
				<img src={`/icons/gravatar/${gravatar}.svg`} alt='' />
			</div>

			<div className='gravatarOptions'>
				{availGravatars.map(gravatar => (
					<img
						src={`/icons/gravatar/${gravatar}.svg`}
						alt=''
						onClick={() => setGravatar(gravatar)}
					/>
				))}
			</div>
		</div>
	);
};

export default EditGravatar;
