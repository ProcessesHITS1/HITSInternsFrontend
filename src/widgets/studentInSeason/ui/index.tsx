import { Button, Checkbox, Flex } from 'antd'
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
}

export const StudentInSeasonSection = (props: StudentInSeasonSectionProps) => {
  const { studentsInSeason, students, year } = props
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
    (student) => panelState[student.employmentStatus]
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
        <Button
          className='mb-2'
          size='small'
          onClick={() => setAddStudentModalOpen(true)}
          disabled={!availableStudents.length}
        >
          Добавить студента
        </Button>
        <Flex className='mb-2'>
          {checkbox.map((item) => (
            <Checkbox
              checked={panelState[item]}
              onClick={() => setPanelState({ ...panelState, [item]: !panelState[item] })}
            >
              {getStatusName(item)}
            </Checkbox>
          ))}
        </Flex>
        <StudentInSeasonList
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
