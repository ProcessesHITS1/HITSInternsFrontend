import { Button, Flex, Form, Input, InputNumber, Modal } from 'antd'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useCreatePositionMutation, useEditPositionMutation } from '~features/position'
import { Position } from '~entities/position'

export interface PositionModalProps {
  open: boolean
  close: () => void
  position: Position | null
}

export const PositionModal = (props: PositionModalProps) => {
  const { position, open, close } = props

  const [createPosition, createPositionResult] = useCreatePositionMutation()
  const [editPosition, editPositionResult] = useEditPositionMutation()
  const isResultLoading = createPositionResult.isLoading || editPositionResult.isLoading

  const [form] = Form.useForm()

  const wrappedClose = () => {
    if (!isResultLoading) {
      close()
    }
  }

  useEffect(() => {
    if (open) {
      form.resetFields()
      if (position) {
        form.setFieldsValue(position)
      }
    }
  }, [open, position])

  const onFinish = async (rawData: any) => {
    try {
      if (position) {
        await editPosition(rawData).unwrap()
      } else {
        await createPosition(rawData).unwrap()
      }
      close()
    } catch {
      toast.error('Произошла ошибка')
    }
  }

  return (
    <Modal
      forceRender
      title={position ? 'Редактирование позиции' : 'Новая позиция'}
      open={open}
      onCancel={wrappedClose}
      maskClosable={false}
      footer={null}
      style={{ top: 20 }}
    >
      <Form
        onFinish={onFinish}
        layout='vertical'
        validateTrigger='onChange'
        form={form}
        autoComplete='off'
      >
        <Form.Item
          rules={[{ required: true, whitespace: true, message: 'Введите наименование' }]}
          label='Наименование'
          name='title'
        >
          <Input placeholder='Введите наименование' />
        </Form.Item>
        <Form.Item label='Количество позиций' name='nPositions'>
          <InputNumber
            placeholder='Количество позиций'
            className='w-full'
            min='0'
            max='10000'
          />
        </Form.Item>
        <Form.Item label='Описание позиции' name='description'>
          <Input.TextArea placeholder='Опишите позицию' />
        </Form.Item>
        <Form.Item>
          <Flex>
            <Button type='primary' htmlType='submit' className='ms-auto'>
              Сохранить
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  )
}
