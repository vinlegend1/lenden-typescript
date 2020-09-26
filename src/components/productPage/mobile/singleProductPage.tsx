import * as React from 'react';
import Navbar from '../../navbar';
import { Accordion, Breadcrumb, Card, Carousel } from 'react-bootstrap';
import GenericIcons from '../../../icons/generic';
import { LinkContainer } from 'react-router-bootstrap';
import { scroller as scroll } from 'react-scroll';
import mobileFormData from '../../../data/forms/mobileFormData';
import { RouteComponentProps } from 'react-router-dom';
import ShareSocial from '../../common/shareSocial';

export interface SingleMobileProductPageProps extends RouteComponentProps {}

const SingleMobileProductPage: React.FC<SingleMobileProductPageProps> = props => {
	const images = [
		'https://placekitten.com/1080/1500',
		'https://placekitten.com/1080/800',
		'https://placekitten.com/1920/1080',
	];
	const [activeIndex, setActiveIndex] = React.useState(0);
	let problems = 'Faulty Touch, Scratches and cracks, Visible white lines';
	let bodyDamage = 'Scratches, Dents, Broken back Panel';

	const { screenIssues, phoneDamaged, functionalIssues } = mobileFormData;

	const accordionCards = [
		{
			id: 'phoneBodyCondition',
			header: 'Phone Body Condition',
			body: (
				<React.Fragment>
					{phoneDamaged.options.map(issue => (
						<div>
							{issue} : {bodyDamage.includes(issue) ? 'YES' : 'NO'}
						</div>
					))}
				</React.Fragment>
			),
		},
		{
			header: 'Mobile Screen Condition',
			body: (
				<React.Fragment>
					{screenIssues.options.map(issue => (
						<div>
							{issue} : {problems.includes(issue) ? 'YES' : 'NO'}
						</div>
					))}
				</React.Fragment>
			),
			id: 'mobileScreenCondition',
		},
		{
			header: 'Functional / Physical issues',
			body: (
				<React.Fragment>
					{functionalIssues.options.map(issue => (
						<div>{issue}</div>
					))}
				</React.Fragment>
			),
			id: 'functionalIssues',
		},
	];

	const [accordionIndex, setAccordionIndex] = React.useState('');

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
				<ShareSocial
					url={window.location.href}
					title='Iphone 11 - 32 GB , Black Colour, Dual Camera with OG Bill'
				/>

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
			</div>

			<div className='pageActions'>
				<div className='wishlist'>Add to Wishlist</div>
				<div className='barter'>Barter Now</div>
			</div>

			<div className='aboutProduct'>
				<div className='productName'>
					Iphone 11 - 32 GB , Black Colour, Dual Camera with OG Bill
				</div>
				<div className='productRating bad'>
					5.6
					<GenericIcons name='star' />
				</div>

				<div className='productLdc'>
					<div className='ldc'>542</div>
					<GenericIcons name='wallet' />
				</div>
			</div>

			<div className='productDetails'>
				<div className='title'>Details</div>
				<div className='brand'>
					<div className='name'>Brand</div>
					<div className='value'>Apple</div>
				</div>
				<div className='model'>
					<div className='name'>Model</div>
					<div className='value'>Iphone 11</div>
				</div>
				<div className='model'>
					<div className='name'>Screen Condition</div>
					<div className='value'>Working</div>
				</div>
				<div className='model'>
					<div className='name'>Mobile Age</div>
					<div className='value'>Below 3 Months</div>
				</div>
				<div className='description'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
					consectetur fugiat beatae aliquam illo perspiciatis ad ab animi qui?
				</div>
			</div>

			<Accordion
				onSelect={(eventKey, event: any) => {
					scroll.scrollTo(event.currentTarget.id, {
						duration: 600,
						delay: 0,
						smooth: true,
					});
					setAccordionIndex(eventKey!);
				}}
				activeKey={accordionIndex}>
				{accordionCards.map((acc, i) => (
					<Card key={i}>
						<Card.Header>
							<Accordion.Toggle as={'div'} eventKey={i.toString()} id={acc.id}>
								{acc.header}
								<GenericIcons
									name={parseInt(accordionIndex) === i ? 'minus' : 'plus'}
								/>
							</Accordion.Toggle>
						</Card.Header>
						<Accordion.Collapse eventKey={i.toString()}>
							<Card.Body>{acc.body}</Card.Body>
						</Accordion.Collapse>
					</Card>
				))}
			</Accordion>
		</div>
	);
};

export default SingleMobileProductPage;
