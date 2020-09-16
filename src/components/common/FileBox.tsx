import * as React from 'react';
import GenericIcons from '../../icons/generic';
import { Modal } from 'react-bootstrap';
import ClipLoader from 'react-spinners/ClipLoader';

export interface FileBoxProps {
	file: {
		name: string;
		fileData: Blob;
	};
	handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	deleteFile: () => void;
	label?: string;
}

const FileBox: React.FC<FileBoxProps> = props => {
	const [modal, showModal] = React.useState(false);
	const [imageSrc, setImageSrc] = React.useState('');
	const [imageLoading, setImageLoading] = React.useState(false);

	React.useEffect(() => {
		if (props.file) {
			const reader = new FileReader();
			reader.readAsDataURL(props.file.fileData);
			reader.onloadend = () => {
				setImageSrc(reader.result as string);
			};
		} else setImageSrc('');
	}, [props.file]);

	let fileInput: HTMLInputElement;

	return (
		<div className='fileBox'>
			<input
				type='file'
				onChange={async event => {
					setImageLoading(true);
					await props.handleFileChange(event);
					setImageLoading(false);
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
				{!props.file && !imageSrc && !imageLoading && (
					<GenericIcons name='camera' />
				)}
				{!imageSrc && imageLoading && (
					<ClipLoader size={35} color={'#1a2639'} loading={true} />
				)}
			</div>
			{props.label && <p className='fileBoxLabel'>{props.label}</p>}
			{imageSrc && (
				<div
					className='cross'
					onClick={() => {
						fileInput.value = '';
						props.deleteFile();
					}}>
					<GenericIcons name='cross' />
				</div>
			)}
			{props.file && imageSrc && (
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
									props.deleteFile();
								}}>
								Delete
							</div>
							<div
								className='darkButton'
								onClick={() => {
									showModal(false);
									fileInput.value = '';
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
