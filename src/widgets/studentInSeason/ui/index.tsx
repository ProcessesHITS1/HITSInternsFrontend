import { SearchOutlined } from '@ant-design/icons'

import { Button, Checkbox, Flex, Input, Space } from 'antd'
import { useState } from 'react'
import {
  StudentInSeasonModal,
  StudentInSeasonRemoveModal,
} from '~features/studentInSeason'
import {
  EmploymentStatus,
  StudentInSeason,
  StudentInSeasonList,
  getStatusName,
} from '~entities/studentInSeason'
import { UserInfo } from '~entities/user'

export interface StudentInSeasonSectionProps {
  studentsInSeason: StudentInSeason[]
  students: UserInfo[]
  year: number
  isClosed: boolean
}

export const StudentInSeasonSection = (props: StudentInSeasonSectionProps) => {
  const { studentsInSeason, students, year, isClosed } = props
  const [input, setInput] = useState(undefined as string | undefined)
  const [addStudentModalOpen, setAddStudentModalOpen] = useState(false)
  const [removeStudentModalState, setRemoveStudentModalState] = useState({
    open: false,
    studentId: null as string | null,
  })
  const [panelState, setPanelState] = useState({
    [EmploymentStatus.Pending]: true,
    [EmploymentStatus.Employed]: true,
    [EmploymentStatus.Unemployed]: true,
  })

  const availableStudents = students.filter(
    (student) => !studentsInSeason.some((sIs) => sIs.id === student.id)
  )

  const checkbox = [
    EmploymentStatus.Pending,
    EmploymentStatus.Unemployed,
    EmploymentStatus.Employed,
  ]

  const showStudentsInSeason = studentsInSeason.filter(
    (student) =>
      panelState[student.employmentStatus] &&
      (!input || student.name.toLowerCase().includes(input.toLowerCase()))
  )

  return (
    <>
      <StudentInSeasonModal
        students={availableStudents}
        year={year}
        open={addStudentModalOpen}
        close={() => setAddStudentModalOpen(false)}
      />
      <StudentInSeasonRemoveModal
        studentId={removeStudentModalState.studentId}
        open={removeStudentModalState.open}
        close={() =>
          setRemoveStudentModalState({ ...removeStudentModalState, open: false })
        }
        year={year}
      />
      <div className='flex flex-col items-center'>
        <Space.Compact className='mb-2 w-1/2 md:w-1/4'>
          <Input
            disabled={!studentsInSeason.length}
            size='small'
            placeholder='Поиск по ФИО'
            prefix={<SearchOutlined />}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            allowClear={true}
          />
          <Button
            size='small'
            onClick={() => setAddStudentModalOpen(true)}
            disabled={isClosed || !availableStudents.length}
          >
            Добавить
          </Button>
        </Space.Compact>

        <Flex className='mb-2'>
          {studentsInSeason.length > 0 &&
            checkbox.map((item, i) => (
              <Checkbox
                key={i}
                checked={panelState[item]}
                onClick={() =>
                  setPanelState({ ...panelState, [item]: !panelState[item] })
                }
              >
                {getStatusName(item)}
              </Checkbox>
            ))}
        </Flex>
        <StudentInSeasonList
          isClosed={isClosed}
          studentsInSeason={showStudentsInSeason}
          openEditModal={() => {}}
          openRemoveModal={(studentId) =>
            setRemoveStudentModalState({ studentId, open: true })
          }
        />
      </div>
    </>
  )
}
