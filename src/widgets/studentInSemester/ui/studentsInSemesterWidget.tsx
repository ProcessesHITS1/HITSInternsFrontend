import { SearchOutlined } from '@ant-design/icons'
import { Input, Flex, Checkbox, Space, Button } from 'antd'
import { useState } from 'react'
import { DiaryModal } from '~features/diary'
import { MarkModal } from '~features/mark'
import { StudentInSemesterModal } from '~features/studentInSemester'
import { Company } from '~entities/company'
import { useLazyGetDiaryByIdQuery } from '~entities/diary'
import { MarkRequirement, useLazyGetMarksQuery } from '~entities/mark'
import {
  StudentInSemesterList,
  StudentInSemesterNormal,
} from '~entities/studentInSemester'
import { UserInfo, getName } from '~entities/user'

type DiaryModalState = { open: boolean; diaryId: string | null | undefined }
type MarkModalState = { open: boolean; sisId: string }

export interface StudentsInSemesterWidgetProps {
  input: string | undefined
  setInput: (input: string) => void
  data: StudentInSemesterNormal[]
  students: UserInfo[]
  companies: Company[]
  requirements: MarkRequirement[]
  isClosed: boolean
  semesterId: string

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
    students,
    companies,
    isClosed,
    requirements,
    markModalState,
    setMarkModalState,
    semesterId,
  } = props
  const [panelState, setPanelState] = useState({
    hasDiary: true,
    noDiary: true,
  })
  const [getDiary, getDiaryResult] = useLazyGetDiaryByIdQuery()
  const [getMarks, getMarksResult] = useLazyGetMarksQuery()
  const [addStudentModalOpen, setAddStudentModalOpen] = useState(false)

  const filtered = data.filter(
    ({ student, diaryId }) =>
      (!input || getName(student).toLowerCase().includes(input)) &&
      ((panelState.hasDiary && diaryId) || (panelState.noDiary && !diaryId))
  )

  const availableStudents = students.filter(
    (student) => !data.some((sIs) => sIs.studentId === student.id)
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
        wait={getMarksResult.isFetching}
        semesterIsClosed={isClosed}
        requirements={requirements}
        marks={getMarksResult.currentData || []}
        isOpen={markModalState.open}
        close={() => setMarkModalState({ ...markModalState, open: false })}
        sisId={markModalState.sisId}
      />
      <StudentInSemesterModal
        open={addStudentModalOpen}
        close={() => setAddStudentModalOpen(false)}
        companies={companies}
        students={availableStudents}
        semesterId={semesterId}
      />
      <div className='w-full flex flex-col items-center'>
        <Space.Compact className='mb-2 w-1/2 md:w-1/4'>
          <Input
            allowClear
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Поиск по ФИО'
            size='small'
            prefix={<SearchOutlined />}
          />
          <Button
            size='small'
            onClick={() => setAddStudentModalOpen(true)}
            disabled={isClosed || !availableStudents.length || !companies.length}
          >
            Добавить
          </Button>
        </Space.Compact>

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
