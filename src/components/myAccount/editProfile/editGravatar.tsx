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
				{availGravatars.map((g, index) => (
					<div className='gravatar' key={index}>
						<img
							src={`/icons/gravatar/user${g}.svg`}
							alt=''
							onClick={() => handleGravatarChange(g)}
						/>
						<div
							id='activeBox'
							className={gravatar === g ? 'active' : ''}></div>
					</div>
				))}
			</div>
		</div>
	);
};

export default EditGravatar;
