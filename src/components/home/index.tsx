import React from 'react';
import { useSelector } from 'react-redux';
import InfoBanner from './infoBanner';
import Categories from './categories';
import MainBanner from './mainBanner';
import ToggleButton from './toggleButton';
import { RootState } from '../../app/models';
import useResizeEventListener from '../../hooks/useResizeEventListener';
import Navbar from '../navbar';
import { RouteComponentProps } from 'react-router-dom';

export interface HomeProps extends RouteComponentProps {}

const Home: React.FC<HomeProps> = props => {
	const isMobile = useSelector(
		(state: RootState) => state.entities.common.isMobile
	);

	useResizeEventListener();

	return (
		<React.Fragment>
			<Navbar />
			<InfoBanner />
			{isMobile && <Categories />}
			<MainBanner />
			<ToggleButton />

			{/* Temporary button */}
			<div
				className='darkButton'
				style={{
					maxWidth: '200px',
					margin: '2rem auto',
					height: '40px',
					fontSize: '12px',
				}}
				onClick={() => props.history.push('/post-product')}>
				Post your Product
			</div>
		</React.Fragment>
	);
};

export default Home;
