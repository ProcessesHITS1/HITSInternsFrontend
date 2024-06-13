import { SearchOutlined } from '@ant-design/icons'
import { Input, Flex, Checkbox } from 'antd'
import { useState } from 'react'
import { DiaryModal } from '~features/diary'
import { MarkModal } from '~features/mark'
import { useLazyGetDiaryByIdQuery } from '~entities/diary'
import { MarkRequirement, useLazyGetMarksQuery } from '~entities/mark'
import {
  StudentInSemesterList,
  StudentInSemesterNormal,
} from '~entities/studentInSemester'
import { getName } from '~entities/user'

type DiaryModalState = { open: boolean; diaryId: string | null | undefined }
type MarkModalState = { open: boolean; sisId: string }

export interface StudentsInSemesterWidgetProps {
  input: string | undefined
  setInput: (input: string) => void
  data: StudentInSemesterNormal[]
  requirements: MarkRequirement[]
  isClosed: boolean

  diaryModalState: DiaryModalState
  setDiaryModalState: (arg: DiaryModalState) => void

  markModalState: MarkModalState
  setMarkModalState: (arg: MarkModalState) => void
}

export const StudentsInSemesterWidget = (props: StudentsInSemesterWidgetProps) => {
  const {
    input,
    setInput,
    diaryModalState,
    setDiaryModalState,
    data,
    isClosed,
    requirements,
    markModalState,
    setMarkModalState,
  } = props
  const [panelState, setPanelState] = useState({
    hasDiary: true,
    noDiary: true,
  })
  const [getDiary, getDiaryResult] = useLazyGetDiaryByIdQuery()
  const [getMarks, getMarksResult] = useLazyGetMarksQuery()

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
      <MarkModal
        semesterIsClosed={isClosed}
        requirements={requirements}
        marks={getMarksResult.currentData || []}
        isOpen={markModalState.open}
        close={() => setMarkModalState({ ...markModalState, open: false })}
        sisId={markModalState.sisId}
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
          marksLoading={getMarksResult.isFetching}
          diaryLoading={getDiaryResult.isFetching}
          studentsInSemester={filtered || []}
          openStudentModal={async (diaryId) => {
            if (diaryId) {
              await getDiary({ diaryId })
            }
            setDiaryModalState({ open: true, diaryId: diaryId })
          }}
          openMarkModal={async (sisId) => {
            if (sisId) {
              await getMarks({ studentInSemesterId: sisId })
              setMarkModalState({ open: true, sisId })
            }
          }}
        />
      </div>
    </>
  )
}
