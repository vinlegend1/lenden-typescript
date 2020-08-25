import React from 'react';

export interface EditGravatarProps {
	gravatar: string;
	handleGravatarChange: (g: string) => void;
}

const EditGravatar: React.FC<EditGravatarProps> = props => {
	const availGravatars = ['1', '2', '3', '4', '5'];
	const { gravatar, handleGravatarChange } = props;

	return (
		<div className='editGravatar'>
			<div className='imageContainer'>
				<img src={`/icons/gravatar/user${gravatar}.svg`} alt='' />
			</div>

			<div className='gravatarOptions'>
				{availGravatars.map((gravatar, index) => (
					<img
						key={index}
						src={`/icons/gravatar/user${gravatar}.svg`}
						alt=''
						onClick={() => handleGravatarChange(gravatar)}
					/>
				))}
			</div>
		</div>
	);
};

export default EditGravatar;
