import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import App from './App'
import reducers from './reducers/index'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { StyledEngineProvider } from '@mui/material'

import { ApolloProvider } from '@apollo/client'
import { client } from './apolloClient'
import './index.css'

const store = createStore(reducers, compose(applyMiddleware(thunk)))
const theme = createTheme({})

ReactDOM.render(
  <ApolloProvider client={client}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  </ApolloProvider>,
  document.getElementById('root'),
)
