import React, { useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

// Import Components
import { Button, Row } from 'antd'

// Import Icons
import { LogoutOutlined } from '@ant-design/icons'

// Import Images
import Logo from '../public/images/logo.png'
import avatarIcon from '../public/images/avatar.svg'

// Import Action, Method & Reducers
import { useAppSelector, useAppDispatch } from '../redux/store'
import { logout } from '../redux/actions/authAction'

const TopNav: React.FC = () => {
  // States
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<any>({})

  // Get Data From Redux
  const isLeftNavOpen = useAppSelector(state => state?.nav?.isLeftNavOpen ?? true)

  // Get Data From Local Storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserInfo(JSON.parse(localStorage.getItem('summit_dashboard_user') as any))
    }
  }, [])

  // Tab Callback for Disable Tab Button
  const tabCallback = useCallback((e: any) => {
    if (e.key === 'Tab') {
      e.preventDefault()
    }
  }, [])

  // On Handle Event Listener
  useEffect(() => {
    window.addEventListener('keydown', tabCallback)
    return () => window.removeEventListener('keydown', tabCallback)
  }, [tabCallback])

  // On Logout
  const _onLogout = (): void => {
    // Navigate To Login Page
    router.push('/login')

    // Dispatch `logout` Action
    dispatch(logout())
  }
  return (
    <Row className='top-nav' style={ navbarStyles }>
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '65px',
          width: `${ isLeftNavOpen ? '260px' : '100px' }`,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: `${ isLeftNavOpen ? 'space-between' : 'center' }`,
            alignItems: 'center',
            paddingLeft: `${ isLeftNavOpen ? '20px' : '0' }`,
            paddingRight: '20px',
            height: '65px',
            width: '100%',
          }}
        >
          <Image width={ 100 } height={ 50 } style={{ marginLeft: '60px' }} src={ Logo } alt='summit-logo' />
        </div>
      </span>
      <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#0E7FC4' }}>Dashboard</span>
      <span
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: '65px',
          gap: '42px',
        }}
      >
        {/* Profile */}
        <span
          style={{
            marginRight: '30px',
            width: '100%',
            height: '65px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          
          <p className='outside-email' style={{ margin: '0 10px', cursor: 'pointer' }} onClick={ () => setIsProfileOpen(!isProfileOpen) }>{userInfo?.name} </p>
          {isProfileOpen ? (
            <div
              style={{
                position: 'absolute',
                top: '70px',
                right: '30px',
                backgroundColor: '#fff',

                borderRadius: '10px',
                padding: '17px',
                height: 'auto',
                minHeight: '100%'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <p className='inner-email' style={{ margin: '0', padding: '0', lineHeight: '40px', marginTop: '-10px' }}>{userInfo?.name} </p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button icon={ <LogoutOutlined /> } type='primary' danger onClick={ _onLogout }>Logout</Button>
                </div>
              </div>
            </div>
          ) : (<></>)}
          <Image className='avatar' alt='avatar' style={{ cursor: 'pointer' }} src={ avatarIcon } onClick={ () => setIsProfileOpen(!isProfileOpen) } />
        </span>
      </span>
    </Row>
  )
}

// Styles
const navbarStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#BCDEDF',
  position: 'fixed' as const,
  width: '100%',
  minHeight: '65px',
  top: 0,
  left: 0,
  zIndex: 100
}

export default TopNav
