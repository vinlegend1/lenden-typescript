const modelOptions = {
	Apple: [
		'iPhone 11 Pro Max 512GB',
		'iPhone 11 Pro Max 256GB',
		'iPhone 11 Pro Max 64GB',
		'iPhone 11 Pro 512GB',
		'iPhone 11 Pro 256GB',
		'iPhone 11 Pro 64GB',
		'iPhone 11 256GB',
		'iPhone 11 128GB',
		'iPhone 11 64GB',
		'iPhone XR 256GB',
		'iPhone XR 128GB',
		'iPhone XR 64GB',
		'iPhone XS 512GB',
		'iPhone XS 256GB',
		'iPhone XS 64GB',
		'iPhone X 256GB',
		'iPhone X 64GB',
		'iPhone 8 256GB',
		'iPhone 8 64GB',
		'iPhone 8 Plus 256GB',
		'iPhone 8 Plus 64GB',
		'iPhone 7 256GB',
		'iPhone 7 128GB',
		'iPhone 7 32GB',
		'iPhone 7 Plus 256GB',
		'iPhone 7 Plus 128GB',
		'iPhone 7 Plus 32GB',
		'iPhone SE 128GB',
		'iPhone SE 64GB',
		'iPhone SE 32GB',
		'iPhone SE 16GB',
		'iPhone 6s 64GB',
		'iPhone 6s 32GB',
		'iPhone 6s 16GB',
		'iPhone 6s Plus 128GB',
		'iPhone 6s Plus 64GB',
		'iPhone 6s Plus 32GB',
		'iPhone 6s Plus 16GB',
		'iPhone 6 128GB',
		'iPhone 6 64GB',
		'iPhone 6 32GB',
		'iPhone 6 16GB',
		'iPhone 6 Plus 128GB',
		'iPhone 6 Plus 64GB',
		'iPhone 6 Plus 16GB',
		'iPhone 5s 64GB',
		'iPhone 5s 32GB',
		'iPhone 5s 16GB',
		'iPhone 5c 32GB',
		'iPhone 5c 16GB',
	],
	Asus: [
		'Asus Zenfone 6Z 6GB/64GB',
		'Asus Zenfone 6Z 6/128GB',
		'Asus Zenfone 6Z 8/256GB',
		'Asus Zenfone 5Z 6GB/64GB',
		'Asus Zenfone 5Z 6/128GB',
		'Asus Zenfone 5Z 8/256GB',
		'Asus Zenfone 4 Selfie ZB553KL 3GB/32GB',
		'Asus Zenfone 4 Selfie ZD553KL 4GB/64GB',
		'Asus Zenfone 4 Selfie Pro 4GB/64GB',
		'Asus Zenfone 3	3GB/32GB',
		'Asus Zenfone 3 ZE552KL	3GB/32GB',
		'Asus Zenfone 3 ZE552KL	4GB/64GB',
		'Asus Zenfone 3 Laser 4GB/32GB',
		'Asus Zenfone 3 Max 2GB/32GB',
		'Asus Zenfone 3 Max ZC520TL	2GB/16GB',
		'Asus Zenfone 3 Max ZC520TL	3GB/32GB',
		'Asus Zenfone 3S Max 3GB/32GB',
		'Asus Zenfone 2 ZE551ML	16GB',
		'Asus Zenfone 2 ZE551ML	32GB',
		'Asus Zenfone 2 ZE551ML	64GB',
		'Asus Zenfone 2 ZE551ML	128GB',
		'Asus ZenFone 2 ZE550ML	2GB/16GB',
		'Asus Zenfone 2 Laser ZE550KL 2GB/16GB',
		'Asus Zenfone 2 Laser ZE550KL 3GB/16GB',
		'Asus Zenfone 2 Laser 2GB/8GB',
		'Asus Zenfone 2 Deluxe ZE551ML 4/128GB',
		'Asus Zenfone 2 Laser ZE601KL 3GB/32GB',
		'Asus Zenfone Go ZB551KL 2GB/32GB',
		'Asus Zenfone Selfie 2GB/16GB',
		'Asus Zenfone Selfie 3GB/16GB',
		'Asus Zenfone Selfie 3GB/32GB',
		'Asus Zenfone Zoom 2GB/16GB',
		'Asus ZenFone Zoom ZX550 4/128GB',
		'Asus ZenFone Lite L1 2GB/16GB',
		'Asus Zenfone Max M2 ZB632KL 3GB/32GB',
		'Asus Zenfone Max M2 ZB632KL 4GB/64GB',
		'Asus Zenfone Max 16GB',
		'Asus Zenfone Max 32GB',
		'Asus Zenfone Max Pro M1 3GB/32GB',
		'Asus Zenfone Max Pro M1 4GB/64GB',
		'Asus Zenfone Max Pro M1 6GB/64GB',
		'Asus Zenfone Max Pro M2 3GB/32GB',
		'Asus Zenfone Max Pro M2 4GB/64GB',
		'Asus Zenfone Max Pro M2 6GB/64GB',
		'Asus Zenfone Max M2 ZB632KL 3GB/32GB',
		'Asus Zenfone Max M2 ZB632KL 4GB/64GB',
		'Asus ROG Phone II ZS660KL 8/128GB',
		'Asus ROG Phone II ZS660KL 12/512GB',
		'Asus ROG Phone ZS600KL 8/128GB',
	],
	Blackberry: ['KEY2 6GB/64GB', 'KEY2 LE 4GB/64GB', 'KeyOne 4GB/64GB'],
	CoolPad: [
		'Note 8 4GB/64GB',
		'Note 5 4GB/32GB',
		'Note 3 3GB/16GB',
		'Note 3s 3GB/32GB',
		'Note 3 Plus 3GB/16GB',
		'Note 3 Lite 3GB/16GB',
		'Cool 5 4GB/64GB',
		'Cool 3 Plus 2GB/16GB',
		'Cool 3 Plus 3GB/32GB',
		'Cool 3 2GB/16GB',
		'Cool Play 6 6GB/64GB',
		'Cool 1 Dual 4GB/32GB',
	],
	Gionee: [
		'Cool 3 2GB/16GB',
		'Cool Play 6 6GB/64GB',
		'Cool 1 Dual 4GB/32GB',
		'M7 Power 4GB/64GB',
		'Marathon M5 2GB/16GB',
		'Marathon M5 3GB/32GB',
		'Marathon M5 Plus 3GB/64GB',
		'M5 Lite 3GB/32GB',
		'M4 2GB/16GB',
		'F9 3GB/32GB',
		'F9 Plus 3GB/32GB',
		'F205 2GB/16GB',
		'F205 Pro 2GB/16GB',
		'F103 2GB/16GB',
		'F103 3GB/16GB',
		'F103 Pro 3GB/16GB',
		'P7 2GB/16GB',
		'Elife S Plus 16GB',
		'Elife S Plus 32GB',
		'Elife E8 3GB/64GB',
		'Elife S7 2GB/16GB',
		'A1 4GB/64GB',
		'A1 Lite 3GB/32GB',
		'A1 Plus 4GB/64GB',
	],
	Google: [
		'Pixel 3 64GB',
		'Pixel 3 128GB',
		'Pixel 3XL 64GB',
		'Pixel 3XL 128GB',
		'Pixel 3A 4GB/64GB',
		'Pixel 3A XL 4GB/64GB',
		'Pixel 2 64GB',
		'Pixel 2 128GB',
		'Pixel 2 XL 64GB',
		'Pixel 2 XL 128GB',
		'Pixel 32GB',
		'Pixel 128GB',
		'Pixel XL 32GB',
		'Pixel XL 128GB',
		'Nexus 6P 32GB',
		'Nexus 6P 64GB',
		'Nexus 6P 128GB',
		'Nexus 6 32GB',
		'Nexus 6 64GB',
		'Nexus 5X 16GB',
		'Nexus 5X 32GB',
	],
	Honor: [
		'Honor 20 6/128GB',
		'Honor 20i 4/128GB',
		'Honor View 20 6/128GB',
		'Honor View 20 8/128GB',
		'Honor View 20 8/256GB',
		'Honor 10 6/128GB',
		'View 10 6/128GB',
		'Honor 10 Lite 3GB/32GB',
		'Honor 10 Lite 4GB/64GB',
		'Honor 10 Lite 6GB/64GB',
		'Honor 10 Lite 6GB/128GB',
		'Honor 9N 3GB/32GB',
		'Honor 9N 4GB/64GB',
		'Honor 9N 4GB/128GB',
		'Honor 9 Lite 3GB/32GB',
		'Honor 9 Lite 4GB/64GB',
		'Honor 9i 4GB/64GB',
		'Honor 9X 4/128GB',
		'Honor 9X 6/128GB',
		'Honor 8 4GB/32GB',
		'Honor 8 Pro 4GB/64GB',
		'Honor 8 Pro 6GB/128GB',
		'Honor 8 Lite 4GB/64GB',
		'Honor 8 Smart 2GB/16GB',
		'Honor 8X 4GB/64GB',
		'Honor 8X 6GB/64GB',
		'Honor 8X 6GB/128GB',
		'Honor 8C 32GB',
		'Honor 8C 64GB',
		'Honor 7 16GB',
		'Honor 7 32GB',
		'Honor 7 64GB',
		'Honor 7S 2GB/16GB',
		'Honor 7A 3GB/32GB',
		'Honor 7C 3GB/32GB',
		'Honor 7C 4GB/64GB',
		'Honor 7X 32GB',
		'Honor 7X 64GB',
		'Honor 6X 3GB/32GB',
		'Honor 6X 4GB/64GB',
		'Honor 5X 2GB/16GB',
		'Honor 5C 2GB/16GB',
		'Honor 4C 2GB/8GB',
		'Holly 4 Plus 3GB/32GB',
		'Holly 2 Plus 2GB/16GB',
		'Honor Play 4GB/64GB',
		'Honor Play 6GB/64GB',
	],
	HTC: [
		'Desire 630 Dual Sim 2GB/16GB',
		'Desire 628 3GB/32GB',
		'Desire 830 3GB/32GB',
		'Desire 825 2GB/16GB',
		'Desire 828 DS 2GB/32GB',
		'Desire 826X GSM+CDMA 2GB/16GB',
		'820G Plus 1GB/16GB',
		'Desire 820s DS 2GB/16GB',
		'Desire 820 DS 2GB/16GB',
		'Desire 728 Ultra 3GB/32GB',
		'Desire 728 Dual Sim 2GB/16GB',
		'Desire 728 Dual Sim 3GB/32GB',
		'Desire 10 Pro 4GB/64GB',
		'Desire 10 Lifestyle 3GB/32GB',
		'Desire 12 3GB/32GB',
		'Desire 12 Plus 3GB/32GB',
		'A9 2GB/16GB',
		'A9 3GB/32GB',
		'E9+ 3GB/32GB',
		'E9 DS 2GB/16GB',
		'M9 Prime Camera Edition 2GB/16GB',
		'M9 Plus Prime Camera Edition 2Gb/16GB',
		'M9 3GB/32GB',
		'M9 Plus 3GB/32GB',
		'ME 3GB/32GB',
		'M8s 2GB/16GB',
		'M8 Eye 2GB/16GB',
		'X10 3GB/32GB',
		'X9 3GB/32GB',
		'U11 Plus 4GB/64GB',
		'U11 Plus 6/128GB',
		'U11 4GB/64GB',
		'U11 6/128GB',
		'U Play 3GB/32GB',
		'U Play 4GB/64GB',
		'U Ultra 4GB/64GB',
		'Wildfire X 3GB/32GB',
		'Wildfire X 4/128GB',
	],
	Huawei: [
		'Mate 30 Pro 8/256GB',
		'Mate 20 Pro 6/128GB',
		'Mate 20 4/128GB',
		'Mate 10 4GB/64GB',
		'P30 Pro 8/256GB',
		'P30 Lite 4/128GB',
		'P30 Lite 6/128GB',
		'P20 Pro 6/128GB',
		'P20 Lite 4GB/64GB',
		'P9 3GB/32GB',
		'P9 4GB/64GB',
		'P9 Plus 4GB/64GB',
		'P8 Lite 2GB/16GB',
		'Y9 Prime 2019 4/128GB',
		'Y9 (2019) 3GB/64GB',
		'Y9 (2019) 4GB/64GB',
		'Y7 Prime 3GB/32GB',
		'Y6 Prime 2GB/16GB',
		'Y611 Compact 2GB/16GB',
		'Nova 3 6/128GB',
		'Nova 3i 4/128GB',
	],
	Infinix: [
		'S5 4GB/64GB',
		'S4 3GB/32GB',
		'S4 4GB/64GB',
		'Smart 3 Plus 2GB/32GB',
		'Smart 2 2GB/16GB',
		'Smart 2 3GB/32GB',
		'Zero 5 6GB/64GB',
		'Zero 5 Pro 6/128GB',
		'Hot 8 4GB/64GB',
		'Hot 7 4GB/64GB',
		'Hot 7 Pro 6Gb/64GB',
		'Hot 6 Pro 3GB/32GB',
		'Hot S3 3GB/32GB',
		'Hot S3 4GB/64GB',
		'Hot S3X 3GB/32GB',
		'Note 5 3GB/32GB',
		'Note 5 4GB/64GB',
		'Note 5 Stylus 4GB/64GB',
		'Note 4 3GB/32GB',
	],
	Intex: [
		'Aqua Supreme Plus 2GB/16GB',
		'Aqua Super 3GB/16GB',
		'Cloud S9 2GB/16GB',
		'Cloud Crystal 2.5D 3GB/16GB',
		'Cloud Flash 2GB/16GB',
		'Cloud Swift 3GB/16GB',
		'Elyt E7 3GB/32GB',
		'Elyt E6 3GB/32GB',
	],
	IQQQ: ['IQOO 3 128GB', 'IQOO 3 256GB'],
	iVoomi: ['i2 3GB/32GB', 'Me3s 3GB/32GB'],
	Karbonn: [
		'Platinum P9 Pro 3Gb/32GB',
		'Platinum P9 (2019) 2GB/16GB',
		'Titanium Frames S7 3GB/32GB',
		'Titanium Jumbo 2 2GB/16GB',
		'Frames S9 2GB/16GB',
		'Aura Note 2 2GB/16GB',
	],
	Lava: [
		'LAVA Z61 1GB/16GB',
		'LAVA Z61 2GB/16GB',
		'LAVA Z91 2GB/16GB',
		'LAVA Z 70 2GB/16GB',
		'LAVA Z80 3GB/16GB',
		'LAVA Z60 1GB/16GB',
		'LAVA Z93 3GB/32GB',
		'LAVA Z92 2GB/32GB',
		'LAVA Z92 3GB/32GB',
	],
	LeEco: [
		'Le Max 64GB',
		'Le Max 128GB',
		'Le Max 2 32GB',
		'Le Max 2 64GB',
		'Le 2 32GB',
		'Le 2 64GB',
		'Le 2 Pro 32Gb',
		'Le 2 Pro 64GB',
		'Le 1s 3GB/32GB',
		'Le 1s Eco 3GB/32GB',
	],
	Lenovo: [
		'A6 Note 3GB/32GB',
		'A5 2GB/16GB',
		'A5 3GB/32GB',
		'A6000 Plus 2GB/16GB',
		'A6010 2GB/16GB',
		'A7000 Turbo 2GB/16GB',
		'A7700 2GB/16GB',
		'A6600 Plus 2GB/16GB',
		'A6600 1GB/16GB',
		'K10 Plus 4GB/64GB',
		'K10 Note 4GB/64GB',
		'K10 Note 6GB/128GB',
		'K9 3GB/32GB',
		'K9 Note 4GB/64GB',
		'K8 3GB/32GB',
		'K8 Plus 3GB/32GB',
		'K8 Plus 4GB/32GB',
		'K8 Note 3GB/32GB',
		'K8 Note 4GB/64GB',
		'K6 Note 3GB/32Gb',
		'K6 Note 4GB/32GB',
		'K6 Power 3GB/32GB',
		'K6 Power 4GB/32GB',
		'K3 Note 2GB/16GB',
		'P2 3GB/32GB',
		'P2 4GB/32GB',
		'Vibe K5 2GB/16GB',
		'Vibe K5 Plus 2GB/16Gb',
		'Vibe K5 Plus 3GB/16GB',
		'Vibe K5 Note 3Gb/32GB',
		'Vibe K5 Note 4GB/32GB',
		'Vibe K5 Note 4GB/64GB',
		'K4 Note 3GB/16GB',
		'P1 Turbo 3GB/32GB',
		'X3 3GB/32Gb',
		'S1 3GB/32GB',
		'P1 2GB/32GB',
		'P1M 2GB/16GB',
		'Vibe Shot 3GB/32GB',
		'S60 2GB/8GB',
		'S90 1GB/16GB',
		'Z6 Pro 8/128GB',
		'Z2 Plus 3GB/32GB',
		'Z2 Plus 4GB/64GB',
		'Zuk Z1 3GB/64GB',
		'Phab 2 Plus 3GB/32GB',
		'Phab 2 Pro 3GB/32GB',
		'Phab 1GB/16GB',
		'Phab 3GB/32GB',
	],
	LG: [
		'G8s ThinQ 6/128GB',
		'G7 Plus ThinQ 6/128GB',
		'G7 ThinQ 4GB/64GB',
		'G6 4GB/64GB',
		'G5 4GB/32GB',
		'G4 Stylus 2GB/16GB',
		'G4 DS 3GB/32GB',
		'G3 D855 3GB/32GB',
		'K10 2GB/16GB',
		'K10 2017 2GB/16GB',
		'K9 4G 2GB/16GB',
		'K8 8GB',
		'K8 16GB',
		'K7 4G 1.5/8',
		'K7i 2GB/16GB',
		'Q7 3GB/32GB',
		'Q6 3GB/32GB',
		'Q6 Plus 4GB/64GB',
		'Q Stylus 3GB/32GB',
		'Q Stylus Plus 4GB/64GB',
		'X Power 2GB/16GB',
		'X Screen 2GB/16GB',
		'Stylus 2 2GB/16GB',
		'Stylus 2 Plus 2GB/16GB',
		'Stylus 3 3GB/16GB',
		'V40 ThinQ 6/128GB',
		'V30 Plus 4/128GB',
		'V20 32GB',
		'V20 64GB',
		'W30 3GB/32GB',
		'W10 3GB/32GB',
	],
	Meizu: [
		'C9 2GB/16GB',
		'C9 Pro 3GB/32GB',
		'M6T 3GB/32GB',
		'M5 3GB/32GB',
		'M3 Note 2GB/16Gb',
		'M3 Note 3GB/32GB',
	],
	Mi: [
		'Redmi 8 4GB/64GB',
		'Redmi 8A 2GB/32GB',
		'Redmi 8A 3GB/32GB',
		'Redmi 7 2GB/16GB',
		'Redmi 7 2GB/32GB',
		'Redmi 7 3GB/32GB',
		'Redmi 7 3GB/64GB',
		'Redmi 7A 2GB/16GB',
		'Redmi 7A 2GB/32GB',
		'Redmi 7A 3GB/32GB',
		'Redmi 6 32GB',
		'Redmi 6 64GB',
		'Redmi 6 Pro 3GB/32GB',
		'Redmi 6 Pro 4GB/64GB',
		'Redmi 6A 16GB',
		'Redmi 6A 32GB',
		'Redmi 5 2GB/16GB',
		'Redmi 5 3GB/32GB',
		'Redmi 5 4GB/64GB',
		'Redmi 5A 2GB/16GB',
		'Redmi 5A 3GB/32GB',
		'Redmi 4 2GB/16GB',
		'Redmi 4 3GB/32GB',
		'Redmi 4 4GB/64GB',
		'Redmi 4A 2GB/16GB',
		'Redmi 4A 3GB/32GB',
		'Redmi 3 3GB/32GB',
		'Redmi 3s 2GB/16GB',
		'Redmi 3s 3GB/32GB',
		'Redmi 3s Prime 3GB/32GB',
		'Redmi 3s Plus 2GB/32GB',
		'Redmi GO 8GB',
		'Redmi GO 16GB',
		'Mi 5 32GB',
		'Mi 5 64GB',
		'Mi 4i 16GB',
		'Mi 4i 32GB',
		'Mi A3 4GB/64GB',
		'Mi A3 6/128GB',
		'Mi A2 4GB/64GB',
		'Mi A2 6GB/128GB',
		'Mi A1 4GB/64GB',
		'Mi Mix 2 6/128GB',
		'Mi Max 3GB/32GB',
		'Mi Max 3GB/64GB',
		'Mi Max 4/128GB',
		'Mi Max 2 32GB',
		'Mi Max 2 64GB',
		'Mi Max 2 128GB',
		'Poco X2 6GB/64GB',
		'Poco X2 6/128GB',
		'Poco X2 8/256GB',
		'Poco F1 6GB/64GB',
		'Poco F1 6/128GB',
		'Poco F1 8/256GB',
		'Y1 3GB/32GB',
		'Y1 4GB/64GB',
		'Y1 Lite 2GB/16GB',
		'Y2 3GB/32GB',
		'Y2 4GB/64GB',
		'Y3 3GB/32GB',
		'Y3 4GB/64GB',
		'K20 64GB',
		'K20 128GB',
		'K20 Pro 6/128GB',
		'K20 Pro 8/256GB',
		'Note 3 2GB/16GB',
		'Note 3 3GB/32GB',
		'Note 2 2GB/16GB',
		'Note Prime 2GB/16GB',
		'Black Shark 2 6/128GB',
		'Black Shark 2 12/256GB',
	],
	Micromax: [
		'Bharat 5 1GB/16GB',
		'Bharat 5 pro 3GB/32GB',
		'Canvas Nitro 4G E455 2GB/16GB',
		'Unite 4 Pro 2GB/16GB',
		'Unite 4 Plus 2GB/16GB',
		'Canvas 5 E481 16GB',
		'Canvas 5 E481 32GB',
		'Canvas Silver 5 Q450 2GB/16GB',
		'Canvas 5 lite Q463 3GB/16GB',
		'Canvas 5 lite Q462 2GB/16GB',
		'Canvas 6 3GB/32GB',
		'Canvas 6 Pro E484 4GB/16GB',
		'Canvas Fire 5 Q386 1GB/16GB',
		'Canvas Hue 2 2GB/16GB',
		'Bharat 5 Infinity Edition 1GB/16GB',
		'Infinity N12 3GB/32GB',
		'Infinty N11 2GB/32GB',
		'Infinty 3GB/32GB',
		'infinty Pro 4GB/64GB',
		'Infinty Lite 2GB/16GB',
		'Canvas Mega 2 Q426 1GB/8GB',
		'Mega 4G Q417 3GB/16GB',
		'Canvas Selfie 2 Q4311 3GB/32GB',
		'Canvas Xpress 4G Q413 2GB/16GB',
		'Canvas 1 2GB/16GB',
		'Canvas 2 Q4310 3GB/16GB',
		'Dual 5 4/128GB',
		'Canvas Pulse 4G 3GB/16GB',
		'Canvas Knight 2 E471 2GB/16GB',
		'Spark 4G Prime 2GB/16GB',
		'iOne 2GB/16GB',
		'Canvas Evok E483 3GB/16GB',
		'Canvas 2 Plus 3GB/32GB',
	],
	Motorola: [
		'E6s 4GB/64GB',
		'E5 2GB/16GB',
		'E5 Plus  3GB/32GB',
		'E4 2GB/16GB',
		'E4 Plus 3GB/32GB',
		'E3 Power 2GB/16GB',
		'G8 Plus 4GB/64GB',
		'G7 4GB/64GB',
		'G7 Power 4GB/64GB',
		'G6 3GB/32GB',
		'G6 4GB/64GB',
		'G6 Plus 6GB/64GB',
		'G6 Play 3GB/32GB',
		'G5 3GB/16GB',
		'G5 Plus 3GB/16GB',
		'G5 Plus 4GB/32GB',
		'G5s 3GB/32GB',
		'G5s 4GB/32GB',
		'G5s Plus 4GB/64GB',
		'G4 2GB/16GB',
		'G4 2GB/32GB',
		'G4 3GB/32GB',
		'G4 Plus 2GB/16GB',
		'G4 Plus 3GB/32GB',
		'G4 Play 2GB/16GB',
		'One Vision 4/128GB',
		'One Action 4/128GB',
		'One Macro 4GB/64GB',
		'Moto One 4GB/64GB',
		'One Power 4GB/64GB',
		'X4 3GB/32Gb',
		'X4 4GB/32GB',
		'X4 4GB/64GB',
		'X Force (2016) 32GB',
		'X Force (2016) 64GB',
		'X Play  16GB',
		'X Play 32GB',
		'Moto X 2nd Gen 2GB/16GB',
		'Moto X 2nd Gen 2GB/32GB',
		'Z2 Force 6GB/64GB',
		'Z2 Play DS 4GB/64GB',
		'Z Mod 4GB/64GB',
		'Z Play 3GB/32GB',
		'Moto Z 32GB',
		'Moto Z 64GB',
		'Turbo XT1225 3GB/64GB',
		'Moto M 3GB/32Gb',
		'Moto M 4GB/64GB',
		'Moto C 1GB/8GB',
		'Moto C 1GB/16GB',
		'Moto C Plus 2GB/16GB',
	],
	Nokia: [
		'1 1GB/8GB',
		'2 1GB/8GB',
		'3 2GB/16GB',
		'5 2GB/16GB',
		'6 3GB/32GB',
		'7 6GB/64GB',
		'8 4GB/64GB',
		'9 Pureview 6/128GB',
		'8.1 4GB/64GB',
		'8.1 6/128GB',
		'8 Sirroco 6/128GB',
		'7.1 4GB/64GB',
		'7.2 4GB/64GB',
		'7.2 6GB/64GB',
		'7 Plus 4GB/64GB',
		'7 Plus 4GB/64GB',
		'6.1 3GB/32GB',
		'6.1 4GB/64GB',
		'6.1 Plus 4GB/64GB',
		'6.1 Plus 6GB/64GB',
		'6.2 4GB/64GB',
		'6.2 3GB/16GB',
		'5.1 3GB/32GB',
		'5.1 Plus 3GB/32GB',
		'5.1 4GB/64GB',
		'5.1 6GB/64GB',
		'4.2 3GB/32GB',
		'3.1 2GB/16GB',
		'3.1 3GB/32GB',
		'3.1 Plus 3GB/32GB',
		'3.2 2GB/16GB',
		'3.2 3GB/32GB',
		'2.1 1GB/8GB',
		'2.2 2GB/16GB',
		'2.2 3GB/32GB',
		'2.3 2GB/32GB',
	],
	Nubia: [
		'Red Magic 3 8/128GB',
		'Red Magic 3 12/256GB',
		'Red Magic 3s 8/128GB',
		'Red Magic 3s 12/256GB',
	],
	OnePlus: [
		'1 16GB',
		'2 3GB/16GB',
		'3 6GB/64GB',
		'5 6GB/64GB',
		'6 6GB/64GB',
		'7 6/128GB',
		'7T 128GB',
		'7T 256GB',
		'7T Pro 8/256GB',
		'7T Pro 8/256GB',
		'7 Pro 6/128GB',
		'7 Pro 8/256GB',
		'7 Pro 12/256GB',
		'6T 6/128GB',
		'6T 8/128GB',
		'6T 8/256GB',
		'6T McLaren 10/256GB',
		'6T McLaren 8/128GB',
		'6T McLaren 8/256GB',
		'5T 6GB/64GB',
		'5T 8/128GB',
		'5T 8/128GB',
		'3T 64GB',
		'3T 128GB',
		'3T 4GB/64GB',
		'3T 64GB',
		'X 3GB/16GB',
	],
	Oppo: [
		'OPPO F9 PRO 64GB',
		'OPPO F9 6GB/ 128GB',
		'OPPO F9 6GB/64GB',
		'OPPO FIND X 8GB/256GB',
		'OPPO F7 4GB/64GB',
		'OPPO F7 6GB/128GB',
		'OPPO F5Y 3GB/32GB',
		'OPPO F5 4GB/32GB',
		'OPPO F5 6GB/64GB',
		'OPPO F3 4GB/64GB',
		'OPPO F3 PLUS 4GB/64GB',
		'OPPO F3 PLUS 6GB/64GB',
		'OPPO F1S 3GB/32GB',
		'OPPO F1S 4GB/4GB',
		'OPPO F1 + 4GB/64GB',
		'OPPO F1 3GB/16GB',
		'OPPO F11 PRO 6GB/64GB',
		'OPPO F11 PRO 128GB',
		'OPPO F11 4GB/128GB',
		'OPPO F11 6GB/128GB',
		'OPPO F15 8GB/128GB',
		'OPPO F11 PRO AVENGER 6GB/128GB',
		'OPPO M5 2gb/16gb',
		'OPPO NEO 7 1GB/16GB',
		'OPPO R11 4GB/64GB',
		'OPPO R11 + 6GB/64GB',
		'OPPO R7L 2GB/16GB',
		'OPPOR7+ 3GB/32GB',
		'OPPOR17P 8GB/128GB',
		'OPPOR17 8GB/128GB',
		'OPPOR15P 6GB/128GB',
		'OPPO K1 4GB/64GB',
		'OPPO K3 6GB/64GB',
		'OPPO K3 8GB/128GB',
		'OPPORENO2 8GB/256GB',
		'OPPO RENO 3 8GB/128GB',
		'OPPO RENO 8GB/128GB',
		'OPPO RENO 10X ZOOM 6GB/128GB',
		'OPPO RENO 10X ZOOM 8GB/256GB',
		'OPPOR2Z 8GB/256GB',
		'OPPOR2F 8GB/128GB',
		'OPPO A7 4GB/64GB',
		'OPPO A7 3GB/64GB',
		'OPPO A3S 2GB/16GB',
		'OPPO A3S 3GB/32GB',
		'OPPO A3S 4GB/64GB',
		'OPPO A5 4GB/32GB',
		'OPPO A5 4GB/64GB',
		'OPPO A 83 2GB/16GB',
		'OPPO A 83 3GB/32GB',
		'OPPO A 83 4GB64GB',
		'OPPO A71 3GB/16GB',
		'OPPO A33 2GB/16GB',
		'OPPO A77 4GB/64GB',
		'OPPO A57 3GB/32GB',
		'OPPO A37 2GB/16GB',
		'OPPO A37F 2GB/16GB',
		'OPPO A5S 2GB/16GB',
		'OPPO A5S 3GB/32GB',
		'OPPO A5S 4GB/64GB',
		'OPPO A1K 2GB/32GB',
		'A5 2020 3GB/64GB',
		'A5 2020 4GB/64GB',
		'OPPO A9 2020 8GB/128GB',
		'OPPO A9 2020  4GB/128GB',
	],
	Panasonic: [
		'Eluga Ray 16GB',
		'Eluga Ray 32GB',
		'Eluga I7 2GB/16GB',
		'Eluga Ray 700 3GB/32GB',
		'A3 Pro 3GB/32GB',
		'Mark 2 3GB/32GB',
		'Tapp 2GB/16GB',
		'Arc 2 3GB/32GB',
		'Note 3GB/32GB',
		'I3 2GB/16GB',
		'A2 3GB/16GB',
		'Mark 2GB/16GB',
		'Icon 2GB/16GB',
		'Switch 2GB/32GB',
		'Eluga Z 2GB/16GB',
		'X1 4GB/64GB',
		'X1 Pro 6/128GB',
		'Z1 Pro 4GB/64GB',
		'Ray 600 3GB/32GB',
		'A4 3GB/32GB',
		'I2 Activ 1GB/16GB',
		'I2 Activ 2GB/16GB',
		'A3 3GB/16GB',
		'Prim 3GB/16GB',
		'Ray 610 3GB/32GB',
		'Ray 810 4GB/64GB',
		'Pulse X 3GB/16GB',
		'I5 2GB/16GB',
		'I3 Mega 3GB/16GB',
		'Ray Max 32GB',
		'Ray Max 64GB',
		'Ray X 3GB/32GB',
		'Turbo 3GB/32GB',
		'Z1 3GB/32GB',
		'Ray 800 4GB/64GB',
		'P101 2GB/16GB',
		'P100 1GB/8GB',
		'P100 2GB/16GB',
		'P95 1GB/16GB',
		'P91 1GB/16GB',
		'P88 2GB/16GB',
		'P85  2GB/16GB',
		'P85 NXT 2GB/16GB',
	],
	Realme: [
		'Realme 6 4GB/64GB',
		'Realme 6 6/128GB',
		'Realme 6 8/128GB',
		'Realme 6 Pro 4GB/64GB',
		'Realme 6 Pro 6/128GB',
		'Realme 6 Pro 8/128GB',
		'Realme 5 3GB/32GB',
		'Realme 5 4GB/64GB',
		'Realme 5 4/128GB',
		'Realme 5Pro 4GB/64GB',
		'Realme 5Pro 6GB/64GB',
		'Realme 5Pro 8/128GB',
		'Realme 5s 64GB',
		'Realme 5s 128GB',
		'Realme 5i 64GB',
		'Realme 5i 128GB',
		'Realme 3 3GB/32GB',
		'Realme 3 4GB/32GB',
		'Realme 3 4GB/64GB',
		'Realme 3 Pro 4GB/64GB',
		'Realme 3 Pro 6GB/64GB',
		'Realme 3 Pro 6GB/128GB',
		'Realme 3i 3GB/32GB',
		'Realme 3i 4GB/64GB',
		'Realme 2 3GB/32GB',
		'Realme 2 4GB/64GB',
		'Realme 2 Pro 4GB/64GB',
		'Realme 2 Pro 6GB/64GB',
		'Realme 2 Pro 8/128GB',
		'Realme 1 3GB/32GB',
		'Realme 1 4GB/64GB',
		'Realme 1 6GB/128GB',
		'C3 3GB/32GB',
		'C3 4GB/64GB',
		'C2 2GB/16GB',
		'C2 2GB/32GB',
		'C2 3GB/32GB',
		'C1 2GB/16GB',
		'C1 2019 2GB/32GB',
		'C1 2019 3GB/32GB',
		'U1 3GB/32GB',
		'U1 3GB/64GB',
		'U1 4GB/64GB',
		'X 4/12GB8',
		'X 8/128GB',
		'XT 4GB/64GB',
		'XT 6GB/64GB',
		'XT 8GB/128GB',
		'X2 4GB/64GB',
		'X2 6/128GB',
		'X2 8/128GB',
		'X2 Pro 6GB/64GB',
		'X2 Pro 8/128GB',
		'X2 Pro 12/256GB',
		'X50 Pro 6/128GB',
		'X50 Pro 8/128GB',
		'X50 Pro 12/256GB',
	],
	Samsung: [
		'A9 2018 6GB/128GB',
		'A9 2018 8GB/128GB',
		'A7 2018 4GB/64GB',
		'A7 2018 6GB/128GB',
		'A8 Star 4GB/64GB',
		'A6 3GB/32GB',
		'A6 4GB/32GB',
		'A6 4GB/64GB',
		'A8 Plus 4GB/64GB',
		'A5 (2105) 3GB/32GB',
		'A7(2017) 3GB/32GB',
		'A9 Pro 4GB/32GB',
		'A10 2GB/32GB',
		'A30 4GB/64GB',
		'A20 3GB/32GB',
		'A80 8GB/128GB',
		'A10s 2GB/32GB',
		'A10s 3GB/32GB',
		'A30s 64GB',
		'A30s 128GB',
		'A20s 3GB/32GB',
		'A20s 4GB/64GB',
		'A70s 6GB/128GB',
		'A70s 8GB/128GB',
		'A51 6GB/128GB',
		'A71 8GB/128GB',
		'A6 Plus 3GB/32GB',
		'A6 Plus 4GB/32GB',
		'A6 Plus 4GB/64GB',
		'A50 4GB/64GB',
		'A50 6GB/64GB',
		'A70 6GB/128GB',
		'A50s 4GB/128GB',
		'A50s 6GB/128GB',
		'J8 4GB/64GB',
		'J7 1.5/16GB',
		'J7 Duo 4GB/32GB',
		'J7 NXT 2GB/16GB',
		'J7 NXT 3GB/32GB',
		'J7 Pro 32GB',
		'J7 Pro 64GB',
		'J7 Max 4GB/32GB',
		'J7 Prime 16GB',
		'J7 Prime_39 32GB',
		'J7 2016 2GB/16GB',
		'J7 Prime 2 3GB/32GB',
		'J6 3GB/32GB',
		'J6 4GB/64GB',
		'J6 Plus 4GB/64GB',
		'J5 2017 2GB/16GB',
		'J5 2016 2GB/16GB',
		'J5 1.5/8GB',
		'J5 1.5/16GB',
		'J5 Prime 2GB/16GB',
		'J5 Prime 3GB/32GB',
		'J4 2GB/16GB',
		'J4 3GB/32GB',
		'J4 Plus 2GB/32GB',
		'J3 2017 2GB/16GB',
		'J3 Pro 2GB/16GB',
		'J2 2016 1.5/8GB',
		'J2 Core 1GB/8GB',
		'J2 2017 1GB/8GB',
		'J2 Pro 2GB/16GB',
		'J2 Ace 1.5/8GB',
		'J2 Prime 1.5/8GB',
		'J2 2018 2GB/16GB',
		'Note 10 8/256GB',
		'Note 10 Lite 6/128GB',
		'Note 10 Lite 8/128GB',
		'Note 10 Plus 256GB',
		'Note 10 Plus 512GB',
		'Note 9 6/128GB',
		'Note 9 8/512GB',
		'Note 8 64GB',
		'Note 8 128GB',
		'Note 8 256GB',
		'Note 8 64GB',
		'Note 5 32GB',
		'Note 5 64GB',
		'Note 5 DS 32GB',
		'Note 5 DS 64GB',
		'Note 4 3GB/32GB',
		'Note 4 Edge 3GB/32GB',
		'Fan Edition 4GB/64GB',
		'On8 (2018) 4GB/64GB',
		'On6 4GB/64GB',
		'On7 Prime 3GB/32GB',
		'On7 Prime4GB/64GB',
		'On Max 4GB/32GB',
		'On8 3GB/16GB',
		'On Nxt 16GB',
		'On Nxt 32GB',
		'On Nxt 64GB',
		'On7 Pro 2GB/16GB',
		'On5 Pro 2GB/16GB',
		'On5 1.5/8GB',
		'On7 1.5/8GB',
		'S20 8/128GB',
		'S20 Plus 8/128GB',
		'S20 Ultra 12/512GB',
		'S10 8/128GB',
		'S10 8/512GB',
		'S10 Plus 8/128GB',
		'S10 Plus 8/512GB',
		'S10 Plus 12/1TB',
		'S10 Lite 128GB',
		'S10 Lite 512GB',
		'S10e 6/128GB',
		'S9 64GB',
		'S9 128GB',
		'S9 256GB',
		'S9 Plus 64GB',
		'S9 Plus 128GB',
		'S9 Plus 256GB',
		'S8 4GB/64GB',
		'S8 Plus 4GB/64GB',
		'S8 Plus 6GB/128GB',
		'S7 32GB',
		'S7 64GB',
		'S7 Edge 32GB',
		'S7 Edge 64GB',
		'S7 Edge 128GB',
		'S6 32GB',
		'S6 64GB',
		'S6 128GB',
		'S6 Edge 32GB',
		'S6 Edge 64GB',
		'S6 Edge 128GB',
		'S6 Edge Plus 32GB',
		'S6 Edge Plus 64GB',
		'C9 Pro 6GB/64GB',
		'C7 Pro 4GB/64GB',
		'C5 Pro 4GB/64GB',
		'C5 32GB',
		'C5 32GB 64GB',
		'M40 6/128GB',
		'M31 64GB',
		'M31 128GB',
		'M30 3GB/32GB',
		'M30 4GB/64GB',
		'M30 6GB/128GB',
		'M30s 4GB/64GB',
		'M30s 6GB/128GB',
		'M20 3GB/32GB',
		'M20 4GB/64GB',
		'M10 2gb/16GB',
		'M10 3GB/32GB',
		'M10s 3GB/32GB',
		'Fold 12/512GB',
		'Z Flip 8/256GB',
	],
	Sony: [
		'XZ Dual 6GB/64GB',
		'XA1 Plus 3GB/32GB',
		'XZ1 4GB/64GB',
		'XA1 Ultra Dual  4GB/64GB',
		'Xperia XA1 3GB/32GB',
		'XZs 4GB/64GB',
		'XZ 32GB',
		'XZ 64GB',
		'XA Ultra 3GB/16GB',
		'XA Dual 2GB/16GB',
		'XA 2GB/16GB',
		'XZ Premium 4GB/64GB',
		'X 32GB',
		'X 64GB',
		'X Dual Sim 3GB/64GB',
		'C5 Ultra Dual 2GB/16GB',
		'M5 Dual 3GB/16GB',
		'Z5 Dual 3GB/32GB',
		'Z5 Dual Premium 3GB/32GB',
		'Z3+ 3GB/32GB',
		'L1 2GB/16GB',
		'L2 3GB/32GB',
		'R1 Dual 2GB/16GB',
		'R1 Plus 3GB/32GB',
	],
	Techno: [
		'i Click 4GB/64GB',
		'12 Air 3GB/32GB',
		'12 Air 4GB/64GB',
		'15 Pro 6/128GB',
		'i Sky 2GB/16GB',
		'i ACE 2x 3GB/32GB',
		'i Ace 2 2GB/32GB',
		'i Ace  2GB/16GB',
		'I Click 2 4GB/64GB',
		'i4 2GB/32GB',
		'i4 4GB/32GB',
		'i4 4GB/64GB',
		'I Air 2+ 2GB/32GB',
		'I Sky 3 2GB/32GB',
		'i Sky 2 2GB/16GB',
		'i2 3GB/32GB',
		'i 2x 4GB/64GB',
		'i Air  2GB/16GB',
		'Spark Go Plus 2GB/32GB',
		'Spark Go 2GB/16GB',
		'Spark Power 4GB/64GB',
		'Spark 4 3GB/32GB',
		'Spark 4 4GB/64GB',
		'Spark 4 Air 3GB/32GB',
		'Phantom 9 6/128GB',
		'i7 4GB/32GB',
		'i5 2GB/16GB',
		'i5 Pro 3GB/32GB',
		'i3 Pro 3GB/16GB',
	],
	Vivo: [
		'Vivo Y83P 4GB/64GB',
		'VIVO V11P 6GB/64GB',
		'VIVO V11 6GB/64GB',
		'VIVO Y83P 4GB/64GB',
		'VIVO V9Y 4GB/32GB',
		'VIVO V9 4GB/64GB',
		'VIVO  V7 4GB/32GB',
		'VIVO V7+ 4GB/64GB',
		'VIVO V 5+ 4GB/32GB',
		'VIVO V 5+ 4GB/64GB',
		'VIVO V5 4GB/32GB',
		'VIVO V3 16GB/3GB',
		'VIVO V3 32GB/3GB',
		'VIVO V3 M 4GB/32GB',
		'Vivo v1 M 2GB/16GB',
		'Vivo v1 2GB/16GB',
		'VIVO V17 8GB/128GB',
		'VIVO V17 P 8GB/128GB',
		'VIVO V15 6GB/64GB',
		'VIVO V15 6GB/128GB',
		'VIVO V15P 6gb/128gb',
		'VIVO V15P 8gb/128gb',
		'VIVO NEX 8GB/128GB',
		'VIVO Z10 4GB/32GB',
		'Z 1 PRO 4GB/64GB',
		'Z 1 PRO 6GB/64GB',
		'Z 1 PRO 6GB/128GB',
		'Z 1 PRO 8GB/128GB',
		'Z1 X 4GB/128GB',
		'Z1 X 6GB/64GB',
		'Z1 X 6GB/128GB',
		'Z1 X 8GB/128GB',
		'VIVO S1 4GB/128GB',
		'VIVO S1 6GB/64GB',
		'VIVO S1 6GB/128GB',
		'VIVO S1P 8/128GB',
		'VIVO U10 3GB/32GB',
		'VIVO U10 3GB/64GB',
		'VIVO U10 4GB/64GB',
		'VIVO U 20 4GB/64GB',
		'VIVO U 20 6GB/64GB',
		'Vivo X21 6GB/128GB',
		'vivo x9 64GB',
		'vivo x9 128GB',
		'VIVO X9S 4GB/64GB',
		'Vivo X9s Plus 4GB/64GB',
		'Vivo X6S 4GB/64GB',
		'Vivo X6S+ 4GB/64GB',
		'Vivo X5 Pro 2GB/16GB',
		'Vivo X6 + 4GB/64GB',
		'Vivo X6 4GB/32GB',
		'Vivo Xplay5 Lite 6GB/128GB',
		'Vivo Xplay5 4GB/128GB',
		'Vivo Y83 Pro 4GB/64GB',
		'Vivo Y71i 2GB/16GB',
		'Vivo Y81 32GB',
		'Vivo Y81 4GB/32GB',
		'Vivo Y83 4GB/32GB',
		'VIVO Y71 3GB/16GB',
		'VIVO Y71 3GB/32GB',
		'VIVO Y71 4GB/32GB',
		'VIVO Y69 3gb/32GB',
		'VIVO Y66 3GB/32GB',
		'VIVO Y55L 2GB/16GB',
		'VIVO Y31L 1GB/16GB',
		'VIVO Y21L 1GB/16GB',
		'VIVO Y21 1GB/16GB',
		'VIVO Y27L 1GB/16GB',
		'VIVO Y95 4GB/64GB',
		'VIVO Y 93 3GB/64GB',
		'VIVO Y 93 4GB/32GB',
		'VIVO Y81i 2GB/16GB',
		'VIVO Y 91 2GB/32GB',
		'VIVO Y 91 3GB/32GB',
		'VIVO Y91i 2GB/16GB',
		'VIVO Y91i 2GB/32GB',
		'VIVO Y17 4GB/128GB',
		'VIVO Y51L 2GB/16GB',
		'VIVO Y53 2GB/16GB',
		'VIVO Y55S 3GB/16GB',
		'VIVO Y53I 2GB/16GB',
		'VIVO Y19 2019 4GB/64GB',
	],
	Xolo: [
		'Era 5x 3GB/32GB',
		'Era 4x 1GB/16GB',
		'Era 4x 2GB/16GB',
		'Era 2X 2GB/16B',
		'Era 2X 3GB/16GB',
		'Black 1X 3GB/32GB',
		'Black 2GB/16GB',
		'ZX 4GB/64GB',
		'ZX 6/128GB',
	],
	Yu: [
		'Yunique 2 2GB/16GB',
		'Yureka Black 4GB/32GB',
		'Yureka S 3GB/16GB',
		'Yunique Plus 2GB/8GB',
		'Yunicorn 4GB/32GB',
		'Yureka Note 3GB/16GB',
		'Yutopia 4GB/32GB',
		'Yureka Plus 2GB/16GB',
		'Yureka 2GB/16GB',
		'Yureka 2 4GB/64GB',
		'Yunique 2 Plus 2GB/16GB',
		'Yunique 2 Plus 3GB/16GB',
		'Ace 2GB/16GB',
		'Ace 3GB/32GB',
	],
	ZTE: ['V8 Mini 3GB/32GB', 'V7 Max 3GB/32GB', 'V7 Lite 2GB/16GB'],
};

export default {
	brand: {
		name: 'Please select the brand of your mobile phone.',
		options: [...Object.keys(modelOptions), 'Others'],
	},
	model: {
		name: 'Please select/type model and storage of your mobile phone.',
		options: modelOptions,
	},
	description: {
		name: 'Describe your mobile phone in few words',
	},
	workingCondition: {
		name: 'Is your phone in a working condition to make/receive phone calls?',
		options: ['No', 'Yes'],
	},
	phoneDamaged: {
		name:
			'Is your phone body damaged or teared in any of the following ways (if any)',
		options: ['Scratches', 'Dents', 'Broken back Panel', 'Phone body bent'],
	},
	screenIssues: {
		name: 'Are there any problems with your mobile screen? (if any)',
		options: [
			'Faulty Touch',
			'Dead pixels',
			'Visible white lines',
			'Scratches and cracks',
		],
	},
	functionalIssues: {
		name:
			'Select the functional/physical issues which are applicable to your device (if any)',
		options: [
			'Faulty front camera',
			'Non-functioning Volume buttons',
			'Non-functioning Power button',
			'Non-functioning Silent button',
			'Non-functioning home button',
			'Finger touch not working',
			'Wifi or Bluetooth not working',
			'Battery not working',
			'Faulty speaker',
			'Damaged charging port',
			'Non-functioning face sensor',
			'Audio receiver not working',
		],
	},

	accessories: {
		name: 'Please select the items that you have from the following (if any)',
		options: [
			'Original Charger',
			'Original Earphones',
			'Box',
			'Bill',
			'Insurance(if any, please mention the number of months left)',
		],
	},
	mobileAge: {
		name: 'What is the age of your mobile phone?',
		options: [
			'Below 3 months',
			'Between 3-6 months',
			'Between 6-11 months',
			'More than 11 months',
		],
	},
};
