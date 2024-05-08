import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { Card, Form, Input, Button, Typography, Flex } from 'antd'
import { toast } from 'react-toastify'
import { useSignInMutation } from '~features/user'
import { setAuthToken, useAppDispatch } from '~shared/lib/store'

export const LoginPage = () => {
  const [signIn, signInResult] = useSignInMutation()
  const dispatch = useAppDispatch()
  const handleLogin = async (data: any) => {
    try {
      const result = await signIn(data).unwrap()
      dispatch(setAuthToken({ jwt: result.accessToken }))
    } catch {
      toast.error('Произошла ошибка', {
        toastId: 'loginErr',
      })
    }
  }
  return (
    <Card bordered className='w-5/6 md:w-2/3 lg:w-1/2 m-auto my-5'>
      <Typography.Title level={3}>Вход</Typography.Title>
      <Form
        className='login-form'
        onFinish={handleLogin}
        layout='vertical'
        validateTrigger='onBlur'
      >
        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Введите email',
            },
          ]}
          label='Почта'
        >
          <Input
            prefix={<MailOutlined />}
            placeholder='Введите почту'
            autoComplete='off'
            autoFocus
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Введите пароль',
            },
          ]}
          label='Пароль'
        >
          <Input prefix={<LockOutlined />} type='password' placeholder='Введите пароль' />
        </Form.Item>
        <Form.Item>
          <Flex>
            <Button
              type='primary'
              htmlType='submit'
              className='ms-auto'
              disabled={signInResult.isLoading}
            >
              Войти
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Card>
  )
}
