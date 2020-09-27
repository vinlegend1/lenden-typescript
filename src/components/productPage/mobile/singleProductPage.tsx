import * as React from 'react';
import Navbar from '../../navbar';
import ProductPageForm from '../../../classes/productPageForm';
import mobileFormData from '../../../data/forms/mobileFormData';

export interface SingleMobileProductPageProps {}

export interface SingleMobileProductPageState {}

const images = [
	'https://placekitten.com/1080/1500',
	'https://placekitten.com/1080/800',
	'https://placekitten.com/1920/1080',
];
let bodyDamage = 'Scratches, Dents, Broken back Panel';

class SingleMobileProductPage extends ProductPageForm<
	SingleMobileProductPageProps,
	SingleMobileProductPageState
> {
	render() {
		return (
			<div className='singleProductPage'>
				<Navbar />

				{this.renderBreadCrumb([
					{ title: 'Home', url: '/' },
					{
						title: 'Mobiles',
						url: '/products/mobiles',
					},
					{
						title: 'Iphone 11',
					},
				])}

				{this.renderProductCarousel({
					images,
					shareUrl: window.location.href,
					shareTitle:
						'Iphone 11 - 32 GB , Black Colour, Dual Camera with OG Bill',
				})}

				{this.renderProductAction(false)}

				{this.renderAboutProduct({
					name: 'Iphone 11 - 32 GB , Black Colour, Dual Camera with OG Bill',
					ldc: 542,
					rating: 4.6,
				})}
				{this.renderProductDetails({
					description:
						'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse consectetur fugiat beatae aliquam illo perspiciatis ad ab animi qui?',
					details: [
						{
							name: 'Brand',
							value: 'Apple',
						},
						{
							name: 'Model',
							value: 'Iphone 11',
						},
						{
							name: 'Screen Condition',
							value: 'Working',
						},
						{
							name: 'Mobile Age',
							value: 'Below 3 Months',
						},
					],
				})}
				{this.renderProductAccordion([
					{
						type: 'yesNo',
						header: 'Phone Body Condition',
						data: {
							givenOptions: bodyDamage,
							totalOptions: mobileFormData.phoneDamaged.options,
						},
					},
					{
						type: 'yesNo',
						header: 'Phone Body Conditions',
						data: {
							givenOptions: bodyDamage,
							totalOptions: mobileFormData.phoneDamaged.options,
						},
					},
				])}
			</div>
		);
	}
}

export default SingleMobileProductPage;
