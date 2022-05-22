import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Auth from './Auth.jsx'
import { store, theme } from '../../index'
import { ThemeProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

// mock useNavigate
const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate, // Return an empty jest function to test whether it was called or not...I'm not depending on the results so no need to put in a return value
}))

const testCredential = {
  email: 'test@gmail.com',
  password: '123456',
}

describe('Login Page', () => {
  it('login successfully then redirect to home page', async () => {
    const { container } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Auth />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    )
    /*eslint-disable */
    const inputEmailEl = container.querySelector(`input[name='email']`)
    const inputPasswordEl = container.querySelector(`input[name='password']`)
    const buttonSignin = container.querySelector(`button[type='submit']`)

    userEvent.type(inputEmailEl, testCredential.email)
    userEvent.type(inputPasswordEl, testCredential.password)
    userEvent.click(buttonSignin)

    await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalled(), {
      timeout: 4000,
    })
  })
})
