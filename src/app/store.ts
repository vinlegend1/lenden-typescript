import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducer';
import apiMiddleware from './middlewares/apiMiddleware';

const store = configureStore({
	reducer,
	middleware: [...getDefaultMiddleware(), apiMiddleware],
});

export default store;

// export type RootState = ReturnType<typeof store.getState>;
