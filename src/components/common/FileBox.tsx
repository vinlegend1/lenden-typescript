import * as React from 'react';
import GenericIcons from '../../icons/generic';
import { Modal } from 'react-bootstrap';
import ClipLoader from 'react-spinners/ClipLoader';
import imageCompression from 'browser-image-compression';

export interface FileBoxProps {
	file: File;
	handleFileChange: (e: React.ChangeEvent) => void;
	deleteFile: () => void;
}

const FileBox: React.FC<FileBoxProps> = props => {
	let fileInput: HTMLInputElement;
	const [modal, showModal] = React.useState(false);
	const [imageSrc, setImageSrc] = React.useState('');

	if (props.file) {
		const reader = new FileReader();
		let compressedFile: any;
		(async () => {
			compressedFile = await imageCompression(props.file, {
				maxSizeMB: 0.1,
				maxWidthOrHeight: 1920,
				useWebWorker: true,
			});

			reader.readAsDataURL(compressedFile);
			reader.onloadend = () => {
				setImageSrc(reader.result as string);
			};
		})();
	}
	return (
		<div className='fileBox'>
			<input
				type='file'
				onChange={(event: React.ChangeEvent) => {
					props.handleFileChange(event);
				}}
				accept='image/jpeg, image/png'
				ref={input => (fileInput = input!)}
			/>
			<div
				className={`file ${imageSrc ? 'active' : ''}`}
				style={{
					backgroundImage: `url(${imageSrc ? imageSrc : ''})`,
				}}
				onClick={() => {
					if (!props.file) fileInput.click();
					else showModal(true);
				}}>
				{!props.file && <GenericIcons name='camera' />}
				{props.file && !imageSrc && (
					<ClipLoader size={25} color={'#1a2639'} loading={true} />
				)}
			</div>
			{props.file && (
				<div
					className='cross'
					onClick={() => {
						fileInput.value = '';
						setImageSrc('');
						props.deleteFile();
					}}>
					<GenericIcons name='cross' />
				</div>
			)}
			{props.file && (
				<Modal
					className='previewImage'
					size='lg'
					centered
					show={modal}
					keyboard={false}
					animation={true}
					scrollable={true}
					onHide={() => showModal(false)}>
					<Modal.Body>
						<div className='cross' onClick={() => showModal(false)}>
							<GenericIcons name='cross-black' />
						</div>
						<div className='imageContainer'>
							<img src={imageSrc} alt='' />
							<p>{props.file.name}</p>
						</div>
						<div className='buttonContainer'>
							<div
								className='lightButton'
								onClick={() => {
									showModal(false);
									fileInput.value = '';
									setImageSrc('');
									props.deleteFile();
								}}>
								Delete
							</div>
							<div
								className='darkButton'
								onClick={() => {
									showModal(false);
									fileInput.value = '';
									setImageSrc('');
									props.deleteFile();
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
