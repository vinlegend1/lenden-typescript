import * as React from 'react';
import ShareSocial from '../components/common/productPage/shareSocial';
import ProductCarousel from '../components/common/productPage/productCarousel';
import ProductAccordion from '../components/common/productPage/productAccordion';
import { Breadcrumb } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import GenericIcons from '../icons/generic';

export interface ProductPageProps {}

export interface ProductPageState {}

abstract class ProductPage<
	T extends ProductPageProps,
	U extends ProductPageState
> extends React.Component<T, U> {
	renderProductCarousel = (configObject: {
		images: string[];
		shareUrl: string;
		shareTitle?: string;
	}) => (
		<div className='carouselContainer'>
			<ShareSocial
				url={configObject.shareUrl}
				title={configObject.shareTitle}
			/>

			<ProductCarousel images={configObject.images} />
		</div>
	);

	renderProductAccordion = (
		cards: Array<{
			header: string;
			data: {
				givenOptions: string;
				totalOptions: string[];
			};
			type: 'damagedWorking' | 'yesNo';
		}>
	) => {
		let accordionProps: Array<{
			header: string;
			body: JSX.Element;
		}> = [];

		cards.forEach(card => {
			if (card.type === 'yesNo') {
				const body = (
					<React.Fragment>
						{card.data.totalOptions.map((option, i) => (
							<div key={i}>
								{`${option} : ${
									card.data.givenOptions.includes(option) ? 'YES' : 'NO'
								}`}
							</div>
						))}
					</React.Fragment>
				);

				accordionProps.push({ body, header: card.header });
			}
		});

		return <ProductAccordion cards={accordionProps} />;
	};

	renderBreadCrumb = (
		links: Array<{
			title: string;
			url?: string;
		}>
	) => {
		return (
			<Breadcrumb>
				{links.map((link, i) => {
					if (link.url)
						return (
							<LinkContainer to={link.url} key={i}>
								<Breadcrumb.Item>{link.title}</Breadcrumb.Item>
							</LinkContainer>
						);
					else return <Breadcrumb.Item key={i}>{link.title}</Breadcrumb.Item>;
				})}
			</Breadcrumb>
		);
	};

	renderAboutProduct = (config: {
		name: string;
		rating: number;
		ldc: number;
	}) => (
		<div className='aboutProduct'>
			<div className='productName'>{config.name}</div>

			<div
				className={`productRating ${ProductPage.getProductCondition(
					config.rating
				)}`}>
				{config.rating}
				<GenericIcons name='star' />
			</div>

			<div className='productLdc'>
				<div className='ldc'>{config.ldc}</div>
				<GenericIcons name='wallet' />
			</div>
		</div>
	);

	renderProductDetails = ({
		description,
		details,
		title = 'Details',
	}: {
		description: string;
		title?: string;
		details: Array<{
			name: string;
			value: string;
		}>;
	}) => (
		<div className='productDetails'>
			<div className='title'>{title}</div>
			{details.map((detail, i) => (
				<div className='detail' key={i}>
					<div className='name'>{detail.name}</div>
					<div className='value'>{detail.value}</div>
				</div>
			))}

			<div className='description'>{description}</div>
		</div>
	);

	renderProductAction = (disabled: boolean) => (
		<div className='pageActions'>
			<div className='wishlist'>Add to Wishlist</div>
			<div className='barter'>Barter Now</div>
		</div>
	);

	static getProductCondition = (rating: number) => {
		if (rating > 4) return 'good';
		else if (rating > 3) return 'average';
		else if (rating >= 0) return 'bad';
	};
}

export default ProductPage;
