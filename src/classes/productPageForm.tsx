import * as React from 'react';
import ShareSocial from '../components/common/productPage/shareSocial';
import CommonForm, { CommonFormProps, CommonFormState } from './commonForm';
import ProductCarousel from '../components/common/productPage/productCarousel';

export interface ProductPageFormProps extends CommonFormProps {}

export interface ProductPageFormState extends CommonFormState {}

abstract class ProductPageForm<
	T extends ProductPageFormProps,
	U extends ProductPageFormState
> extends CommonForm<T, U> {
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

	renderProductAccordion = () => {};
}

export default ProductPageForm;
