import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducer';
import apiMiddleware from './middlewares/apiMiddleware';
import postLogin from './middlewares/postLogin';
import logout from './middlewares/logout';

const store = configureStore({
	reducer,
	middleware: [...getDefaultMiddleware(), apiMiddleware, postLogin, logout],
});

export default store;
