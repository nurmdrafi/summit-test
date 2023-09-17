import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import store from '../redux/store'
import dynamic from 'next/dynamic'

// Import Components
const MenuLayout = dynamic(() => import('../components/common/MenuLayout'), {
  ssr: false,
})

// Import Styles
import 'antd/dist/reset.css'
import '../styles/globals.css'
import Meta from '../components/common/Meta'


const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  return (
    <Provider store={store}>
      <Meta title='Summit Dashboard' />
      <div style={containerStyles}>
        {(router?.asPath === '/login' || router?.asPath === '/register' || router?.asPath === '/') ?
          (
            <Component {...pageProps} />
          )
          : (
            <MenuLayout>
              <Component {...pageProps} />
            </MenuLayout>
          )
        }
      </div>
    </Provider>
  )
}

// JSS Styles
const containerStyles = {
  boxSizing: 'border-box' as 'border-box',
  width: '100%',
  height: 'auto',
  overflow: 'auto'
}

export default App
