import * as React from 'react';
import InfoBanner from './infoBanner';

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
	return <InfoBanner />;
};

export default Home;
