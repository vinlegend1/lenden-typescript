import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

export interface PageLoaderProps {}

const PageLoader: React.FC<PageLoaderProps> = () => {
	return (
		<div className='pageLoader'>
			{/* <BarLoader
				css='display:block;margin:2vh auto'
				width={200}
				height={4}
				color={'#1a2639'}
				loading={true}
			/> */}
			<ClipLoader size={35} color={'#1a2639'} loading={true} />
		</div>
	);
};

export default PageLoader;
