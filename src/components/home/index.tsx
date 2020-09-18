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
import SingleProducts from './singleProducts';
import MultipleProducts from './multipleProducts';

export interface HomeProps extends RouteComponentProps {}

const Home: React.FC<HomeProps> = props => {
	const isMobile = useSelector(
		(state: RootState) => state.entities.common.isMobile
	);

	useResizeEventListener();
	const [activeItem, setActiveItem] = React.useState<'single' | 'multiple'>(
		'single'
	);

	return (
		<React.Fragment>
			<Navbar />
			<InfoBanner />
			{isMobile && <Categories />}
			<MainBanner />
			<ToggleButton
				activeItem={activeItem}
				handleActiveItemChange={item => setActiveItem(item)}
			/>

			{/* Temporary button */}
			<div
				className='darkButton'
				style={{
					position: 'fixed',
					maxWidth: '200px',
					height: '40px',
					fontSize: '13px',
					padding: '1.3rem',
					bottom: '.5rem',
					zIndex: 2,
					right: '.5rem',
					margin: 0,
					color: '#1A2639',
					fontWeight: 500,
					backgroundColor: 'rgb(255, 188, 54)',
				}}
				onClick={() => props.history.push('/post-product')}>
				POST PRODUCT
			</div>

			{activeItem === 'single' && <SingleProducts />}
			{activeItem === 'multiple' && <MultipleProducts />}
		</React.Fragment>
	);
};

export default Home;
