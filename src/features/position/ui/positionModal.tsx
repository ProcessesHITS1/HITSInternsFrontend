import { Button, Flex, Form, Input, InputNumber, Modal } from 'antd'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useCreatePositionMutation, useEditPositionMutation } from '~features/position'
import { Position } from '~entities/position'

export interface PositionModalProps {
  open: boolean
  close: () => void
  position: Position | null
  seasonYear: number
  companyId: string
}

export const PositionModal = (props: PositionModalProps) => {
  const { position, open, close, seasonYear, companyId } = props

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
        await createPosition({ ...rawData, seasonYear, companyId }).unwrap()
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
        <Form.Item
          label='Количество мест'
          name='nSeats'
          rules={[{ required: true, message: 'Укажите количество мест' }]}
        >
          <InputNumber
            placeholder='Количество мест'
            className='w-full'
            min='1'
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
