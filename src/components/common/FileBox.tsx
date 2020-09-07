import * as React from 'react';
import GenericIcons from '../../icons/generic';
import src from '*.bmp';
import { url } from 'inspector';

export interface FileBoxProps {
	file: File;
	handleFileChange: (e: React.ChangeEvent) => void;
}

const FileBox: React.FC<FileBoxProps> = props => {
	let fileInput: HTMLInputElement;

	return (
		<div className='fileBox'>
			<input
				type='file'
				onChange={props.handleFileChange}
				ref={input => (fileInput = input!)}
			/>
			<div
				className={`file ${props.file ? 'active' : ''}`}
				style={{
					backgroundImage: `url(${
						props.file ? URL.createObjectURL(props.file) : ''
					})`,
				}}
				onClick={() => {
					if (!props.file) fileInput.click();
				}}>
				{!props.file && <GenericIcons name='camera' />}
			</div>
			<div className='cross'>
				<GenericIcons name='cross' />
			</div>
		</div>
	);
};

export default FileBox;
