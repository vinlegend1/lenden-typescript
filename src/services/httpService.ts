import axios from 'axios';
import { toast } from 'react-toastify';

interface ResponseError {
	response: {
		status: number;
	};
}

axios.interceptors.response.use(undefined, (error: ResponseError) => {
	const expectedError =
		error.response &&
		error.response.status >= 400 &&
		error.response.status < 500;

	if (!expectedError) {
		console.log('error is', error);
		toast.error('An unexpected error occurred!', {
			containerId: 'errorToastContainer',
			autoClose: 10000,
			className: 'toasty',
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	}

	return Promise.reject(error);
});

function setToken(jwt: string) {
	axios.defaults.headers.common['authorization'] = jwt;
}

export default axios;

export { setToken };
