import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import App from './App'
import reducers from './reducers/index'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { StyledEngineProvider } from '@mui/material'

import './index.css'
export const store = createStore(reducers, compose(applyMiddleware(thunk)))
export const theme = createTheme({})
ReactDOM.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </Provider>,
  document.getElementById('root') || document.createElement('div'),
)
