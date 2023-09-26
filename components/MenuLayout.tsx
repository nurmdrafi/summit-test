// Import Components
import { Layout } from 'antd'
import TopNav from './TopNav'

// Constants
const { Header, Content } = Layout

const MenuLayout = ({ children }: any) => {
  return (
    <div style={ containerStyles }>
      <Layout>
        <Header style={ headerStyles }>
          <TopNav />
        </Header>
        <Content style={ contentStyles }>
          {children}
        </Content>
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
  height: '65px',
  display: 'flex',
  flexDirection: 'row' as const,
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #f0f2f5'
}

const contentStyles = {
  width: '100%',
  height: `calc(100vh-65px)`,
  background: '#ffffff',
  display: 'flex',
  flexDirection: 'column' as const,
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  rowGap: '1rem',
  overflow: 'auto',
}

export default MenuLayout
