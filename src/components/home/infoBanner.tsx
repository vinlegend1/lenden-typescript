import * as React from 'react';

export interface InfoBannerProps {}

const InfoBanner: React.FC<InfoBannerProps> = () => {
	return (
		<div onClick={() => console.log('heh')} id='infoBanner'>
			COVID - 19 Safety Instructions
		</div>
	);
};

export default InfoBanner;
