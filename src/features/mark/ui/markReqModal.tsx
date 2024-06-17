import { Button, Flex, Form, Input, Modal } from 'antd'
import { toast } from 'react-toastify'
import { useCreateRequirementMutation } from '../api'

export interface MarkReqModalProps {
  isOpen: boolean
  close: () => void
  semesterId: string
}

export const MarkReqModal = (props: MarkReqModalProps) => {
  const { isOpen, close, semesterId } = props
  const [createReq, createReqResult] = useCreateRequirementMutation()
  const [form] = Form.useForm()

  const wrappedClose = () => {
    if (!createReqResult.isLoading) {
      close()
    }
  }

  const onFinish = async (data: any) => {
    try {
      await createReq({ ...data, semesterId }).unwrap()
      close()
      toast.success('Успешно')
      form.resetFields()
    } catch {
      toast.error('Произошла ошибка')
    }
  }

  return (
    <Modal
      forceRender
      title={'Создание требования'}
      open={isOpen}
      onCancel={wrappedClose}
      maskClosable={false}
      footer={null}
      style={{ top: 20 }}
    >
      <Form onFinish={onFinish} layout='vertical' validateTrigger='onChange' form={form}>
        <Form.Item
          name='description'
          rules={[
            {
              required: true,
              whitespace: true,
              message: 'Введите описание',
            },
          ]}
          label={`Требование`}
        >
          <Input.TextArea placeholder='Введите описание' />
        </Form.Item>

        <Form.Item>
          <Flex>
            <Button
              type='primary'
              htmlType='submit'
              className='ms-auto'
              disabled={createReqResult.isLoading}
            >
              Создать
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  )
}
