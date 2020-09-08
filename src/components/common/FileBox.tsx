import * as React from 'react';
import GenericIcons from '../../icons/generic';
import src from '*.bmp';
import { url } from 'inspector';
import { Modal } from 'react-bootstrap';

export interface FileBoxProps {
	file: File;
	handleFileChange: (e: React.ChangeEvent) => void;
}

const FileBox: React.FC<FileBoxProps> = props => {
	let fileInput: HTMLInputElement;
	const [modal, showModal] = React.useState(false);

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
					else showModal(true);
				}}>
				{!props.file && <GenericIcons name='camera' />}
			</div>
			{props.file && (
				<div className='cross'>
					<GenericIcons name='cross' />
				</div>
			)}
			{props.file && (
				<Modal
					style={{ borderRadius: '20px' }}
					className='notificationMessage'
					size='lg'
					centered
					show={modal}
					keyboard={false}
					onHide={() => showModal(false)}>
					<Modal.Body>
						<img
							src={URL.createObjectURL(props.file)}
							style={{ width: '100%' }}
							alt=''
						/>
						<p>{props.file.name}</p>
						<div style={{ display: 'flex' }}>
							<div>Delete</div>
							<div
								onClick={() => {
									showModal(false);
									fileInput.click();
								}}>
								Change
							</div>
						</div>
					</Modal.Body>
				</Modal>
			)}
		</div>
	);
};

export default FileBox;
