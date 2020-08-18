import * as React from 'react';

export interface CategoriesProps {}

const Categories: React.FC<CategoriesProps> = () => {
	const categoryList = [
		{ name: 'Books', src: 'book' },
		{ name: 'Mobiles', src: 'mobile' },
		{ name: 'Gaming CD', src: 'cd' },
		{ name: 'Accessories', src: 'accessories' },
		{ name: 'Consoles', src: 'consoles' },
	];

	return (
		<React.Fragment>
			<div
				style={{
					display: 'flex',
					flexWrap: 'nowrap',
					whiteSpace: 'nowrap',
					maxWidth: '450px',
					alignItems: 'center',
					overflow: 'auto',
					margin: '0 auto',
					// borderBottom: '2px solid #D2D2D2',
				}}>
				{categoryList.map(category => (
					<div style={{ padding: '1rem 0 ' }}>
						<div
							style={{
								display: 'flex',
								width: '70px',
								height: '70px',
								padding: '0 1rem',
								backgroundColor: '#EAF5FF',
								margin: '10px',
								borderRadius: '50%',
								alignItems: 'center',
							}}>
							<img
								src={`/icons/categories/${category.src}.svg`}
								style={{
									width: 'inherit',
									padding: '0.2rem',
									maxHeight: '45px',
								}}
								alt=''
							/>
						</div>
						<div
							style={{
								textAlign: 'center',
								fontSize: '11px',
								fontFamily: 'Cera Pro',
								fontWeight: 500,
							}}>
							{category.name.toUpperCase()}
						</div>
					</div>
				))}
			</div>
			<hr style={{ margin: '0', borderTop: '1px solid #D2D2D2' }} />
		</React.Fragment>
	);
};

export default Categories;
