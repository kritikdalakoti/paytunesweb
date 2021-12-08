import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
 import App from './App';
 import {Provider} from 'react-redux';
// import reportWebVitals from './reportWebVitals';
import store from './redux/index'
import SnackbarCloseButton from './components/CloseButton';
// import { BrowserRouter } from 'react-router-dom';

import { SnackbarProvider } from 'notistack';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
    <SnackbarProvider
			maxSnack={4}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			action={(key) => <SnackbarCloseButton snackbarKey={key} />}
		>
			<App />
		</SnackbarProvider>
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
///reportWebVitals();
