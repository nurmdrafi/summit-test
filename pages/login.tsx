import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import Image from 'next/image'

// Import Components
import { Form, Input, Button, Row, Col, Spin } from 'antd'
import Meta from '../components/Meta'

// Import Action, Method & Reducers
import { useAppSelector, useAppDispatch } from '../redux/store'
import { login, validateUser } from '../redux/actions/authAction'

// Import Icoms
import { MailOutlined, LockOutlined } from '@ant-design/icons'

// Import Images
import Logo from '../public/images/logo.png'

const Login: NextPage = () => {
  // States
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()

  // Get Data from Redux Store
  const isAuthenticated = useAppSelector(state => state?.auth?.isAuthenticated ?? false)
  const isAuthenticating = useAppSelector(state => state?.auth?.isAuthenticating ?? true)

  // On Load Validate User by Token
  useEffect(() => {
    const token = localStorage.getItem('summit_dashboard_token')
    dispatch(validateUser(token))
  }, [dispatch])

  // On Load Redirect User if Authenticated
  useEffect(() => {
    if (isAuthenticated && !isAuthenticating) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, isAuthenticating, router])

  // Loading State
  if (isAuthenticated || isAuthenticating) {
    return (
      <div style={ spinContainerStyles as React.CSSProperties }>
        <Spin size='large' />
      </div>
    )
  }

  // On Submit
  const _onSubmit = (values: any) => {
    dispatch(login(values))
  }

  return (
    <>
      <Meta title="Summit" description="Summit Communication Ltd." keywords="" />
      <div style={ layoutStyles }>
        <Row
          justify='center'
          align='middle'
          style={{ height: '100%', width: '100%' }}
        >
          <Col xs={ 24 } sm={ 24 } md={ 12 } lg={ 8 }>
            <div style={ containerStyles as React.CSSProperties }>
              <Form
                form={ form }
                autoComplete='off'
                onFinish={ _onSubmit }
                layout='vertical'
                style={ formStyles as React.CSSProperties }
              >
                {/* Logo */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Image src={ Logo } alt='Summit Logo' width={ 230 } />
                </div>

                {/* Email */}
                <Form.Item
                  name='email'
                  label='Email'
                  hasFeedback={ true }
                  rules={ [
                    {
                      required: true,
                      // message: 'Please enter a valid email address.',
                      message: 'Please input email address'
                    },
                    {
                      // type: 'email',
                      pattern: /^\s*\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+\s*$/,
                      message: 'Please enter a valid email address.',
                    },
                  ] }
                >
                  <Input
                    style={{ borderLeft: '4px solid #0678C1' }}
                    prefix={ <MailOutlined style={{ color: '#0678C1' }} /> }
                  />
                </Form.Item>

                {/* Password */}
                <Form.Item
                  name='password'
                  label='Password'
                  hasFeedback={ true }
                  rules={ [
                    {
                      required: true,
                      message: 'Please input your password.',
                    },
                    {
                      min: 6,
                      message: 'Password must be at least 6 characters.',
                    },
                  ] }
                >
                  <Input.Password
                    style={{ borderLeft: '4px solid #0678C1' }}
                    prefix={ <LockOutlined style={{ color: '#0678C1' }} /> }
                  />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                  <Button
                    htmlType='submit'
                    style={ buttonStyles }
                  // loading={isValidating}
                  >Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

// Styles
const layoutStyles = {
  height: '100vh',
  width: '100vw',
  padding: '1rem',
}

const containerStyles = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
}

const spinContainerStyles = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
}

const formStyles = {
  width: '400px',
  height: '300px',
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
}

const buttonStyles = {
  width: '100%',
  backgroundColor: '#0678C1',
  color: '#fff',
  fontWeight: 'bold'
}

export default Login
