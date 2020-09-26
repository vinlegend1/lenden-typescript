import * as React from 'react';
import { Carousel } from 'react-bootstrap';

export interface ProductCarouselProps {
	images: string[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = props => {
	const [activeIndex, setActiveIndex] = React.useState(0);
	const { images } = props;
	return (
		<React.Fragment>
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
			</Carousel>

			<div className='carousel-indicator'>
				{images.map((_image, i) => (
					<div
						key={i}
						className={`dots ${i === activeIndex ? 'active' : ''}`}
						onClick={() => setActiveIndex(i)}></div>
				))}
			</div>
		</React.Fragment>
	);
};

export default ProductCarousel;
