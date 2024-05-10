import { Button, Col, Flex, Form, Input, Modal, Row, Select } from 'antd'
import { toast } from 'react-toastify'
import { Group } from '~entities/group'
import { Role, Sex } from '~entities/user'
import { useCreateUserMutation } from '../api'

export interface RegisterUserModal {
  open: boolean
  setOpen: (open: boolean) => void
  groups: Group[]
}

export const RegisterUserModal = (props: RegisterUserModal) => {
  const [registerUser, registerResult] = useCreateUserMutation()
  const [form] = Form.useForm()
  const role = Form.useWatch('role', form) as Role
  const handleRegisterClick = async (data: any) => {
    try {
      await registerUser({
        ...data,
        role: undefined,
        isAdmin: false,
        isSchoolRepresentative: data.role === Role.ROLE_SCHOOL_REPRESENTATIVE,
        isStudent: data.role === Role.ROLE_STUDENT,
      }).unwrap()
      form.resetFields()
      props.setOpen(false)
      toast.success('Успешно')
    } catch {
      toast.error('Произошла ошибка')
    }
  }

  return (
    <Modal
      forceRender
      title='Новый пользователь'
      open={props.open}
      onCancel={() => props.setOpen(false)}
      maskClosable={false}
      footer={null}
      style={{ top: 20 }}
    >
      <Form
        onFinish={handleRegisterClick}
        layout='vertical'
        validateTrigger='onBlur'
        form={form}
        initialValues={{
          role: Role.ROLE_STUDENT,
          sex: Sex.MALE,
          groupId: props.groups?.[0]?.id,
        }}
      >
        <Row gutter={12}>
          <Col xs={24} md={12}>
            <Form.Item
              name='lastName'
              rules={[
                {
                  required: true,
                  message: 'Введите фамилию',
                },
              ]}
              label='Фамилия'
            >
              <Input placeholder='Введите фамилию' />
            </Form.Item>
            <Form.Item
              name='firstName'
              rules={[
                {
                  required: true,
                  message: 'Введите имя',
                },
              ]}
              label='Имя'
            >
              <Input placeholder='Введите имя' />
            </Form.Item>
            <Form.Item
              name='patronymic'
              rules={[
                {
                  required: true,
                  message: 'Введите отчество',
                },
              ]}
              label='Отчество'
            >
              <Input placeholder='Введите отчество' />
            </Form.Item>
            <Form.Item name='sex' label='Пол'>
              <Select
                options={[
                  {
                    value: Sex.MALE,
                    label: 'Мужской',
                  },
                  {
                    value: Sex.FEMALE,
                    label: 'Женский',
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
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
              <Input placeholder='Введите почту' />
            </Form.Item>
            <Form.Item
              name='phone'
              rules={[
                {
                  message: 'Введите телефон',
                  pattern: /^\d{11}$/,
                },
              ]}
              label='Телефон'
            >
              <Input placeholder='Введите телефон' />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Введите пароль',
                },
                {
                  min: 6,
                  message: 'Минимум 6 символов',
                },
                {
                  max: 64,
                  message: 'Максимум 64 символа',
                },
              ]}
              label='Пароль'
            >
              <Input type='password' placeholder='Введите пароль' />
            </Form.Item>
            <Form.Item name='role' label='Роль'>
              <Select
                options={[
                  {
                    value: Role.ROLE_STUDENT,
                    label: 'Студент',
                  },
                  {
                    value: Role.ROLE_SCHOOL_REPRESENTATIVE,
                    label: 'Школа',
                  },
                ]}
              />
            </Form.Item>
          </Col>
          {role === Role.ROLE_STUDENT && (
            <Col xs={24}>
              <Form.Item name='groupId' label='Группа'>
                <Select
                  options={props.groups.map((group) => ({
                    value: group.id,
                    label: group.number,
                  }))}
                />
              </Form.Item>
            </Col>
          )}
        </Row>
        <Form.Item>
          <Flex>
            <Button
              type='primary'
              htmlType='submit'
              className='ms-auto'
              disabled={registerResult.isLoading}
            >
              Создать
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  )
}
