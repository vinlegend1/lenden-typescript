import * as React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import GenericIcons from '../../../icons/generic';
import { scroller as scroll } from 'react-scroll';

export interface ProductAccordionProps {
	cards: Array<{
		header: string;
		body: JSX.Element;
	}>;
}

const ProductAccordion: React.FC<ProductAccordionProps> = props => {
	const [accordionIndex, setAccordionIndex] = React.useState('');
	const { cards } = props;
	return (
		<Accordion
			onSelect={(eventKey, event: any) => {
				scroll.scrollTo(event.currentTarget.id, {
					duration: 600,
					delay: 0,
					smooth: true,
				});
				setAccordionIndex(eventKey!);
			}}
			activeKey={accordionIndex}
			className='productAccordion'>
			{cards.map((acc, i) => (
				<Card key={i}>
					<Card.Header>
						<Accordion.Toggle
							as={'div'}
							eventKey={i.toString()}
							id={acc.header.split(' ').join('')}>
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
	);
};

export default ProductAccordion;
