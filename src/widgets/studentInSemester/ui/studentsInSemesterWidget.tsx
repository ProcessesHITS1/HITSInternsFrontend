import { SearchOutlined } from '@ant-design/icons'
import { Input, Flex, Checkbox } from 'antd'
import { useState } from 'react'
import { DiaryModal } from '~features/diary'
import { useLazyGetDiaryByIdQuery } from '~entities/diary'
import {
  StudentInSemesterList,
  StudentInSemesterNormal,
} from '~entities/studentInSemester'
import { getName } from '~entities/user'

export interface StudentsInSemesterWidgetProps {
  input: string | undefined
  setInput: (input: string) => void
  diaryModalState: { open: boolean; diaryId: string | null | undefined }
  setDiaryModalState: (arg: { open: boolean; diaryId: string | null | undefined }) => void
  data: StudentInSemesterNormal[]
  isClosed: boolean
}

export const StudentsInSemesterWidget = (props: StudentsInSemesterWidgetProps) => {
  const { input, setInput, diaryModalState, setDiaryModalState, data, isClosed } = props
  const [panelState, setPanelState] = useState({
    hasDiary: true,
    noDiary: true,
  })
  const [getDiary, getDiaryResult] = useLazyGetDiaryByIdQuery()
  const filtered = data.filter(
    ({ student, diaryId }) =>
      (!input || getName(student).toLowerCase().includes(input)) &&
      ((panelState.hasDiary && diaryId) || (panelState.noDiary && !diaryId))
  )
  return (
    <>
      <DiaryModal
        diary={getDiaryResult.currentData}
        isOpen={diaryModalState.open}
        diaryId={diaryModalState.diaryId}
        close={() => setDiaryModalState({ ...diaryModalState, open: false })}
        semesterClosed={isClosed}
      />
      <div className='w-full flex flex-col items-center'>
        <Input
          className='mt-1 mb-2 w-[90%] sm:w-[80%] md:w-[40%] lg:w-[25%]'
          allowClear
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Поиск по ФИО'
          size='small'
          prefix={<SearchOutlined />}
        />

        <Flex className='mb-2'>
          <Checkbox
            checked={panelState.hasDiary}
            onClick={() =>
              setPanelState({ ...panelState, hasDiary: !panelState.hasDiary })
            }
          >
            Есть дневник
          </Checkbox>
          <Checkbox
            checked={panelState.noDiary}
            onClick={() => setPanelState({ ...panelState, noDiary: !panelState.noDiary })}
          >
            Нет дневника
          </Checkbox>
        </Flex>
        <StudentInSemesterList
          diaryLoading={getDiaryResult.isFetching}
          studentsInSemester={filtered || []}
          openStudentModal={async (diaryId) => {
            if (diaryId) {
              await getDiary({ diaryId })
            }
            setDiaryModalState({ open: true, diaryId: diaryId })
          }}
        />
      </div>
    </>
  )
}
