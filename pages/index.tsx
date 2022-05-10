import React from 'react'
import type { NextPage } from 'next'
import Wrapper from '../components/wrapper'
import { Provider } from 'react-redux'
import { store } from './../redux/app/store'

const Home: NextPage = () => (
  <>
    <Provider store={store}>
      <Wrapper />
    </Provider>
  </>
)

export default Home
