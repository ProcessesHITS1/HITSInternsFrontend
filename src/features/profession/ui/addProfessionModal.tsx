import { Button, Flex, Form, Input, Modal } from 'antd'
import { toast } from 'react-toastify'
import { useAddProfessionMutation } from '../api'

export interface AddProfessionModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export const AddProfessionModal = (props: AddProfessionModalProps) => {
  const [addProfession, addProfessionResult] = useAddProfessionMutation()
  const [form] = Form.useForm()
  const handleRegisterClick = async (data: any) => {
    try {
      await addProfession(data).unwrap()
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
      title='Новая профессия'
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
          name='name'
          rules={[
            {
              required: true,
              message: 'Обязательное поле',
              whitespace: true,
            },
          ]}
          label='Наименование'
        >
          <Input placeholder='Введите наименование' />
        </Form.Item>

        <Form.Item>
          <Flex>
            <Button
              type='primary'
              htmlType='submit'
              className='ms-auto'
              disabled={addProfessionResult.isLoading}
            >
              Создать
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  )
}
