import { Button, Form, Input, Modal, Select, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCreateDirectChatMutation, useCreateGroupChatMutation } from '~features/chat'
import { getName, useGetAllUsersQuery } from '~entities/user'
import { getChatLink } from '~shared/config'
import { selectUserId, useAppSelector } from '~shared/lib/store'

export interface ChatCreateModal {
  open: boolean
  close: () => void
}

export const ChatCreateModal = (props: ChatCreateModal) => {
  const { open, close } = props
  const navigate = useNavigate()
  const userid = useAppSelector(selectUserId)

  const allUsersQuery = useGetAllUsersQuery({ page: 1, size: 100000 })
  const [createDirect, createDirectResult] = useCreateDirectChatMutation()
  const [createGroup, createGroupResult] = useCreateGroupChatMutation()

  const wrappedClose = () => {
    if (!createDirectResult.isLoading && !createGroupResult.isLoading) {
      close()
    }
  }

  const createHandler = async () => {
    const name = form.getFieldValue('chat_name') as string
    const users = form.getFieldValue('users')
    if (!users.length) {
      return
    }
    try {
      let result = {}
      if (users?.length > 1) {
        result = await createGroup({ name, users }).unwrap()
      } else {
        result = await createDirect({ name, userId: users[0] }).unwrap()
      }
      toast.success('Чат создан')
      close()
      form.resetFields()
      if ('id' in result) {
        navigate(getChatLink(result.id as string))
      }
    } catch {
      toast.error('Произошла ошибка')
    }
  }

  const [form] = Form.useForm()

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  return (
    <Modal
      forceRender
      title='Создать чат'
      open={open}
      onCancel={wrappedClose}
      maskClosable={false}
      footer={null}
    >
      <Form
        autoComplete='off'
        form={form}
        layout='vertical'
        disabled={createDirectResult.isLoading || createGroupResult.isLoading}
        onFinish={createHandler}
      >
        {allUsersQuery.isFetching ? (
          <Spin size='large' className='my-5' />
        ) : (
          <>
            <Form.Item
              label='Название чата'
              rules={[{ required: true, message: 'Укажите название чата' }]}
              name='chat_name'
            >
              <Input placeholder='Название чата' />
            </Form.Item>

            <Form.Item
              required
              rules={[{ required: true, message: 'Укажите участников' }]}
              label='Участники'
              name='users'
            >
              <Select
                onChange={() => {
                  if (form.getFieldValue('users').length === 1) {
                    form.setFieldValue(
                      'chat_name',
                      getName(
                        allUsersQuery.data?.data.find(
                          (v) => v.id === form.getFieldValue('users')[0]
                        )
                      )
                    )
                  }
                }}
                mode='multiple'
                placeholder='Выберите участника(-ов)'
                filterOption={filterOption}
                options={
                  allUsersQuery.data?.data
                    ?.map((user) => ({
                      label: getName(user),
                      value: user.id,
                    }))
                    .filter((u) => u.value !== userid) || []
                }
              />
            </Form.Item>

            <Form.Item>
              <Button htmlType='submit' className='float-right'>
                Создать
              </Button>
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  )
}
