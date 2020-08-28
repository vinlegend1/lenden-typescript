// Gravatars

import type0 from './gravatar/user0.svg';
import type1 from './gravatar/user1.svg';
import type2 from './gravatar/user2.svg';
import type3 from './gravatar/user3.svg';
import type4 from './gravatar/user4.svg';

// Generics

import back from './back.svg';
import search from './search.svg';
import bookmark from './bookmark.svg';
import bell from './bell.svg';
import edit from './edit.svg';
import cross from './cross.svg';
import tick from './tick.svg';
import info from './info.svg';
import menu from './menu.svg';
import success from './success.svg';
import up from './up.svg';
import down from './down.svg';

// LenDen Specific

import mainBanner from './main-banner.svg';
import navLogo from './nav-logo.svg';

export const categoryIcons = {
	Mobile,
	Book,
	Cd,
	Console,
	Accessory,
};

export const gravatarIcons = {
	type0,
	type1,
	type2,
	type3,
	type4,
};

export const genericIcons = {
	back,
	search,
	bookmark,
	bell,
	edit,
	cross,
	tick,
	info,
	menu,
	success,
	up,
	down,
};

export const lendenSpecific = {
	navLogo,
	mainBanner,
};

// let imageUrls = ['success', 'back', 'cross'];

// export function preload() {
// 	Object.keys(genericIcons)
// 		.concat(Object.keys(lendenSpecific))
// 		.forEach(imgName => {
// 			let img = new Image();
// 			img.src = `/icons/${imgName}.svg`;
// 		});
// }

// preload();
