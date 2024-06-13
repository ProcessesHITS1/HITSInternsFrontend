import { SaveOutlined } from '@ant-design/icons'
import { Form, InputNumber, Modal, Button } from 'antd'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { GetMarksResp, MarkRequirement } from '~entities/mark'
import { useCreateMarkMutation } from '../api'

export interface MarkModalProps {
  isOpen: boolean
  close: () => void
  sisId: string
  semesterIsClosed: boolean
  requirements: MarkRequirement[]
  marks: GetMarksResp
}

export const MarkModal = (props: MarkModalProps) => {
  const { isOpen, close, sisId, requirements, marks, semesterIsClosed } = props
  const [createMark, createMarkResult] = useCreateMarkMutation()
  const [form] = Form.useForm()
  const watch = Form.useWatch([], form)

  const wrappedClose = () => {
    if (!createMarkResult.isLoading) {
      close()
    }
  }

  const saveHandler = async (value: number, markId: string) => {
    try {
      await createMark({
        body: { markRequirementId: markId, value },
        studentInSemesterId: sisId,
      }).unwrap()
      toast.success('Успешно')
    } catch {
      toast.error('Произошла ошибка')
    }
  }

  useEffect(() => {
    if (isOpen) {
      const obj: Record<string, any> = {}
      for (const req of requirements) {
        obj[req.id] = marks.find((m) => m.markRequirement.id === req.id)?.value
      }
      form.setFieldsValue(obj)
    }
  }, [isOpen, requirements, marks])

  const hasReq = requirements.length > 0

  return (
    <Modal
      forceRender
      title={'Оценивание'}
      open={isOpen}
      onCancel={wrappedClose}
      maskClosable={false}
      footer={null}
      style={{ top: 20 }}
    >
      <Form layout='vertical' form={form}>
        {!hasReq
          ? 'Нет требований к оценкам'
          : requirements.map((req) => (
              <div key={req.id} className='flex w-full items-center'>
                <Form.Item name={req.id} label={req.description} className='w-full'>
                  <InputNumber
                    placeholder='Укажите оценку'
                    className='w-full'
                    disabled={createMarkResult.isLoading || semesterIsClosed}
                  />
                </Form.Item>
                <Button
                  className='mt-2 mx-2 btn-success'
                  onClick={() => saveHandler(form.getFieldValue(req.id), req.id)}
                  icon={<SaveOutlined />}
                  disabled={
                    watch?.[req.id] == undefined ||
                    createMarkResult.isLoading ||
                    semesterIsClosed
                  }
                ></Button>
              </div>
            ))}
      </Form>
    </Modal>
  )
}
