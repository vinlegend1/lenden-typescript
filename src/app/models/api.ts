export interface Location {
	state?: object;
}

export interface RequestObject {
	method: 'get' | 'post' | 'put' | 'delete';
	url: string;
	data?: object;
	onSuccess?: string;
	onError?: string;
	onStart?: string;
	location?: Location;
}

export interface ResponseObject {
	data: any;
	headers: any;
	location?: Location;
	userId?: string;
}
