import * as React from 'react';
import Navbar from '../../navbar';
import { Breadcrumb, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import GenericIcons from '../../../icons/generic';
import { LinkContainer } from 'react-router-bootstrap';

export interface SingleMobileProductPageProps {}

const SingleMobileProductPage: React.FC<SingleMobileProductPageProps> = () => {
	const images = [
		'https://placekitten.com/1080/1500',
		'https://placekitten.com/1080/800',
		'https://placekitten.com/1920/1080',
	];
	const [activeIndex, setActiveIndex] = React.useState(0);

	return (
		<div className='singleProductPage'>
			<Navbar />
			<Breadcrumb>
				<LinkContainer to='/'>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
				</LinkContainer>
				<LinkContainer to='/products/mobiles'>
					<Breadcrumb.Item>Mobiles</Breadcrumb.Item>
				</LinkContainer>
				<Breadcrumb.Item active>Iphone 11</Breadcrumb.Item>
			</Breadcrumb>
			<div className='carouselContainer'>
				<div className='shareButton'>
					<div>
						<GenericIcons name='share' />
					</div>
				</div>

				<Carousel
					activeIndex={activeIndex}
					controls={false}
					indicators={false}
					className='productCarousel'
					interval={null}
					onSelect={eventKey => setActiveIndex(eventKey)}>
					{images.map((image, i) => (
						<Carousel.Item key={i}>
							<img className='d-block' src={image} alt='First slide' />
						</Carousel.Item>
					))}
					{/* <Carousel.Item>
						<img
							className='d-block'
							src='https://placekitten.com/1080/1500'
							alt='First slide'
						/>
					</Carousel.Item>
					<Carousel.Item>
						<img
							className='d-block'
							src='https://placekitten.com/800/400'
							alt='Third slide'
						/>
					</Carousel.Item>
					<Carousel.Item>
						<img
							className='d-block'
							src='https://placekitten.com/800/400'
							alt='Third slide'
						/>
					</Carousel.Item> */}
				</Carousel>

				<div className='carousel-indicator'>
					{images.map((_image, i) => (
						<div
							key={i}
							className={`dots ${i === activeIndex ? 'active' : ''}`}></div>
					))}
					{/* <div className='dots'></div>
					<div className='dots'></div>
					<div className='dots active'></div>
					<div className='dots'></div>
					<div className='dots'></div> */}
				</div>
			</div>
		</div>
	);
};

export default SingleMobileProductPage;
