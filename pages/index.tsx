import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

// Import Components
import { Spin } from 'antd'

// Import Actions & Methods
import { useAppSelector, useAppDispatch } from '../redux/store'
import { validateUser } from '../redux/actions/authAction'

const Home: React.FC = () => {
  // States
  const router = useRouter()
  const dispatch = useAppDispatch()

  // Get Data from Redux Store
  const isAuthenticated = useAppSelector(state => state?.auth?.isAuthenticated ?? false)
  const isAuthenticating = useAppSelector(state => state?.auth?.isAuthenticating ?? true)

  // On Load Validate User by Token
  useEffect(() => {
    const token = localStorage.getItem('summit_dashboard_token')
    dispatch(validateUser(token))
  }, [dispatch])

  // On Load Redirect User
  useEffect(() => {
    if (isAuthenticated && !isAuthenticating) {
      router.push('/dashboard')
    } else if (!isAuthenticated && !isAuthenticating) {
      router.push('/login')
    }
  }, [isAuthenticated, isAuthenticating, router])

  return (
    <div style={ spinContainerStyles }>
      <Spin size='large' />
    </div>
  )
}

// Styles
const spinContainerStyles = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'row' as const,
  justifyContent: 'center',
  alignItems: 'center',
}

export default Home
