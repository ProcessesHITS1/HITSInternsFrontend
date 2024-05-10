import { Button, Flex, Form, Input, Modal } from 'antd'
import { toast } from 'react-toastify'
import { useAddGroupMutation } from '../api'

export interface RegisterUserModal {
  open: boolean
  setOpen: (open: boolean) => void
}

export const AddGroupModal = (props: RegisterUserModal) => {
  const [addGroup, addGroupResult] = useAddGroupMutation()
  const [form] = Form.useForm()
  const handleRegisterClick = async (data: any) => {
    try {
      await addGroup(data).unwrap()
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
      title='Новая группа'
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
      >
        <Form.Item
          name='number'
          rules={[
            {
              pattern: /^[1-9]\d{5,5}/,
              message: 'Введите номер группы (от 6 симв.)',
            },
          ]}
          label='Номер'
        >
          <Input placeholder='Введите номер группы' />
        </Form.Item>

        <Form.Item>
          <Flex>
            <Button
              type='primary'
              htmlType='submit'
              className='ms-auto'
              disabled={addGroupResult.isLoading}
            >
              Создать
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  )
}
