import { Button, List } from 'antd'
import { MarkReqModal } from '~features/mark'
import { MarkRequirement } from '~entities/mark'

export interface MarkListProps {
  isClosed: boolean
  requirements: MarkRequirement[]
  semesterId: string
  reqModalOpen: boolean
  setReqModal: (open: boolean) => void
}

export const MarkReqWidget = (props: MarkListProps) => {
  const { isClosed, requirements, setReqModal, reqModalOpen, semesterId } = props
  return (
    <>
      <MarkReqModal
        semesterId={semesterId}
        isOpen={reqModalOpen}
        close={() => setReqModal(false)}
      />

      <div className='w-100 flex flex-col items-center'>
        <Button
          type='primary'
          className='mb-2'
          disabled={isClosed}
          onClick={() => setReqModal(true)}
        >
          Добавить
        </Button>
        <List
          bordered
          locale={{ emptyText: 'Нет требований' }}
          className='w-[90%] sm:w-[75%] md:w-[60%] lg:w-[55%] bg-white'
          dataSource={requirements}
          renderItem={(req) => <List.Item>{req.description}</List.Item>}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </>
  )
}
