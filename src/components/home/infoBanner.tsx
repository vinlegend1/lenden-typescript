import * as React from 'react';

export interface InfoBannerProps {}

const InfoBanner: React.FC<InfoBannerProps> = () => {
	return (
		<div
			style={{
				fontFamily: 'Cera Pro',
				backgroundColor: '#ffbc36',
				textAlign: 'center',
				padding: '10px 0',
				fontSize: '14px',
			}}>
			COVID - 19 Safety Instructions
		</div>
	);
};

export default InfoBanner;
