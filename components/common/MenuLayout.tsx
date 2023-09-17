// Import Components
import { Layout, Drawer } from 'antd'
// import LeftNav from './LeftNav/LeftNav'
// import TopNav from './TopNav/TopNav'

// Import Actions & Methods
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { setIsLeftNavOpen } from '../../redux/reducers/navReducer'

// Constants
const { Header, Sider, Content } = Layout

const MenuLayout = ({ children }: any) => {
  // Get Value From Redux
  const isLeftNavOpen = useAppSelector(state => state?.nav?.isLeftNavOpen ?? false)
  const leftNavWidth = useAppSelector(state => state?.nav?.leftNavWidth ?? 240)

  // States
  const dispatch = useAppDispatch()

  return (
    <div style={ containerStyles as React.CSSProperties }>
      <Layout hasSider={ true } style={{ height: '100vh' }}>
        <Drawer
          placement='left'
          onClose={ () => dispatch(setIsLeftNavOpen(!isLeftNavOpen)) }
          closable={ false }
          open={ isLeftNavOpen }
        >
          <Sider
            className='left-nav-container'
            theme='light'
            trigger={ null }
            collapsed={ !isLeftNavOpen }
            breakpoint='lg'
            collapsedWidth='0'
            collapsible={ true }
            width={ leftNavWidth }
          >
            {/* <LeftNav /> */}
          </Sider>
        </Drawer>
        <Layout>
          <Header style={ headerStyles }>
            {/* <TopNav /> */}
          </Header>
          <Content style={ contentStyles }>
            {children}
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

// JSS Styles
const containerStyles = {
  width: '100%',
  height: '100%',
  overflow: 'auto',
}

const headerStyles = {
  boxSizing: 'border-box' as const,
  padding: 0,
  background: '#ffffff',
  height: '52px',
  display: 'flex',
  flexDirection: 'row' as const,
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #f0f2f5'
}

const contentStyles = {
  width: '100%',
  height: `calc(100%-52px)`,
  background: '#ffffff',
  display: 'flex',
  flexDirection: 'column' as const,
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  rowGap: '1rem',
  overflow: 'auto'
}

export default MenuLayout
