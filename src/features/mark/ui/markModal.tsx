import { SaveOutlined } from '@ant-design/icons'
import { Form, InputNumber, Modal, Button } from 'antd'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { GetMarksResp, MarkRequirement } from '~entities/mark'
import { useCreateMarkMutation, useEditMarkMutation } from '../api'

export interface MarkModalProps {
  isOpen: boolean
  close: () => void
  sisId: string
  semesterIsClosed: boolean
  requirements: MarkRequirement[]
  marks: GetMarksResp
  wait: boolean
}

export const MarkModal = (props: MarkModalProps) => {
  const { isOpen, close, sisId, requirements, marks, semesterIsClosed, wait } = props
  const [createMark, createMarkResult] = useCreateMarkMutation()
  const [editMark, editMarkResult] = useEditMarkMutation()
  const isLoading = createMarkResult.isLoading || editMarkResult.isLoading

  const [form] = Form.useForm()
  const watch = Form.useWatch([], form)

  const wrappedClose = () => {
    if (!isLoading) {
      close()
    }
  }

  const saveHandler = async (value: number, reqId: string) => {
    try {
      const mark = marks.find((v) => v.markRequirement.id === reqId)
      if (mark) {
        await editMark({ value, id: mark.id })
      } else {
        await createMark({
          body: { markRequirementId: reqId, value },
          studentInSemesterId: sisId,
        }).unwrap()
      }
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
  }, [isOpen, requirements])

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
                    disabled={isLoading || wait || semesterIsClosed}
                  />
                </Form.Item>
                <Button
                  className='mt-2 mx-2 btn-success'
                  onClick={() => saveHandler(form.getFieldValue(req.id), req.id)}
                  icon={<SaveOutlined />}
                  disabled={
                    watch?.[req.id] == undefined || isLoading || wait || semesterIsClosed
                  }
                ></Button>
              </div>
            ))}
      </Form>
    </Modal>
  )
}
