import { Button, Col, Flex, Form, Input, Modal, Row, Select } from 'antd'
import { toast } from 'react-toastify'
import { Group } from '~entities/group'
import { Role, Sex } from '~entities/user'
import { useCreateUserMutation } from '../api'

export interface RegisterUserModal {
  open: boolean
  setOpen: (open: boolean) => void
  groups: Group[]
  isAdmin: boolean
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
      props.setOpen(false)
      setTimeout(form.resetFields, 300)
      toast.success('Успешно')
    } catch {
      toast.error('Произошла ошибка')
    }
  }

  const hasGroups = props.groups?.length > 0

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
        autoComplete='off'
        onFinish={handleRegisterClick}
        layout='vertical'
        validateTrigger='onBlur'
        form={form}
        initialValues={{
          role: hasGroups
            ? Role.ROLE_STUDENT
            : props.isAdmin
              ? Role.ROLE_SCHOOL_REPRESENTATIVE
              : null,
          sex: Sex.MALE,
          groupId: hasGroups ? props.groups?.[0]?.id : null,
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
                  message: 'Введите контакты',
                  required: true,
                },
              ]}
              label='Контакты'
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
            <Form.Item
              name='role'
              label='Роль'
              rules={[{ required: true, message: 'Укажите роль' }]}
            >
              <Select
                placeholder='Укажите роль'
                options={[
                  {
                    value: Role.ROLE_STUDENT,
                    label: 'Студент',
                    disabled: !hasGroups,
                  },
                ].concat(
                  props.isAdmin
                    ? [
                        {
                          value: Role.ROLE_SCHOOL_REPRESENTATIVE,
                          label: 'Школа',
                          disabled: false,
                        },
                      ]
                    : []
                )}
              />
            </Form.Item>
          </Col>
          {role === Role.ROLE_STUDENT && (
            <Col xs={24}>
              <Form.Item
                name='groupId'
                label='Группа'
                rules={[
                  {
                    required: true,
                    message: 'Укажите группу',
                  },
                ]}
              >
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
