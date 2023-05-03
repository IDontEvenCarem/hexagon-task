import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { reducer as formReducer } from 'redux-form'

// This store is quite barebones, as we just dont have any real global state, other than the redux-form library internals
const store = configureStore({
    reducer: {
        form: formReducer,
    },
})

ReactDOM.createRoot(document.getElementById('root')).render(
    // redux-form is quite old, deprecated, and breaks strict mode
    // <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
    // </React.StrictMode>,
)
