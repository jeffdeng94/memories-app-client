import { Provider } from 'react-redux'
import Home from './Home'
import {
  render,
  screen,
  cleanup,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { store, theme } from '../../index'
import { ThemeProvider } from '@material-ui/core/styles'
import API from '../../api/axios-instance'

jest.mock('../../api/axios-instance')

beforeEach(cleanup)

describe('Home page', () => {
  it('fetch posts then render posts successfully', async () => {
    const res = {
      data: [
        {
          _id: 'test',
          title: 'fetch post successfully',
          message: 'test',
          name: 'test',
          creator: 'test',
          tags: ['test'],
          selectedFile: 'test',
          likes: ['test'],
          createdAt: new Date(),
        },
      ],
    }
    API.get = jest.fn().mockResolvedValue(res)

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Home />
        </ThemeProvider>
      </Provider>,
    )
    expect(screen.getByText(/Loading/i)).toBeInTheDocument()
    expect(API.get).toHaveBeenCalledTimes(1)
    await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i))
    expect(screen.getByText(/fetch post successfully/i)).toBeInTheDocument()
  })
})
