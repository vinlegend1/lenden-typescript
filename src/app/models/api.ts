export interface RequestObject {
	method: 'get' | 'post' | 'put' | 'delete';
	url: string;
	data?: object;
	onSuccess?: string;
	onError?: string;
	onStart?: string;
	location?: { state: object };
}

export interface ResponseObject {
	data: any;
	headers: any;
	location?: { state: object };
	userId?: string;
}
