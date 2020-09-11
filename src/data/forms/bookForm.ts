export default {
	title: {
		name: 'What is the title of your book?',
	},
	description: {
		name: 'Describe your book in few words',
	},
	mrp: {
		name:
			'What is the MRP as printed on/in the book? (refer back side/inside the book)',
	},
	bindingType: {
		name: 'What is your book’s binding type?',
		options: ['Paperback', 'Hardbound'],
	},
	inkStains: {
		name: 'Are there any ink stain inside and outside the book?',
		options: [
			'No stains',
			'Personal marks',
			'Marks of Ink/Pencil/Highlighter/Whitener, etc.',
		],
	},
	bookFoxed: {
		name: 'Is your book foxed such that it has visible spots and browning?',
		options: ['No spots/browning', 'Visible spots and browning'],
	},
	bindingCondition: {
		name: 'What is the condition of the binding of your book?',
		options: ['Undamaged', 'Light wrinkles', 'Heavy Breaks'],
	},
	coverCondition: {
		name: 'What is the condition of the front and back side of your book? ',
		options: [
			'Not damaged at all',
			'Slight wear and tear due to normal usage',
			'Visible tear/cracks and/or bent and worn out edges',
		],
	},
	bookRepaired: {
		name:
			'Has your book ever been repaired earlier? If yes, mention the number of times it has been repaired.',
	},
};
