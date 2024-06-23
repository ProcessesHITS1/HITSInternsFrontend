import { Modal, Form, Input, Button, Flex } from 'antd'
import { toast } from 'react-toastify'
import { useCreateReqStatusMutation } from '~features/request'

export interface RequestTemplateModalProps {
  year: number
  open: boolean
  close: () => void
}

export const RequestTemplateModal = (props: RequestTemplateModalProps) => {
  const { open, close, year } = props
  const [createT, createTResult] = useCreateReqStatusMutation()
  const [form] = Form.useForm()

  const wrappedClose = () => {
    if (!createTResult.isLoading) {
      close()
      form.resetFields()
    }
  }

  const onFinish = async (data: any) => {
    try {
      await createT({ year, ...data }).unwrap()
      toast.success('Этап создан')
      wrappedClose()
    } catch {
      toast.error('Произошла ошибка')
    }
  }

  return (
    <Modal
      forceRender
      title={'Новый этап'}
      open={open}
      onCancel={wrappedClose}
      maskClosable={false}
      footer={null}
      style={{ top: 20 }}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name={'statusName'}
          rules={[{ required: true, whitespace: true, message: 'Введите название' }]}
        >
          <Input placeholder='Название этапа' autoComplete='off' />
        </Form.Item>
        <Form.Item>
          <Flex>
            <Button
              type='primary'
              htmlType='submit'
              className='ms-auto'
              disabled={createTResult.isLoading}
            >
              Готово
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  )
}
