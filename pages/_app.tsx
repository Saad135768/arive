import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../redux/app/store'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Arive Task</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <style>
          {` 
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
              Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          * {
            box-sizing: border-box;
          }

          :root{
            --main-color: #362F4B;
          }

          .active {
            border: 3px solid var(--main-color) !important;
          }

          input:focus {
            outline: 0 !important;
          }
          `}
        </style>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
