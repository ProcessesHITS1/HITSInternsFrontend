import { Button } from 'antd'
import { useState } from 'react'
import {
  StudentInSeasonModal,
  StudentInSeasonRemoveModal,
} from '~features/studentInSeason'
import { StudentInSeason, StudentInSeasonList } from '~entities/studentInSeason'
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
  const availableStudents = students.filter(
    (student) => !studentsInSeason.some((sIs) => sIs.id === student.id)
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
        <StudentInSeasonList
          studentsInSeason={studentsInSeason}
          openEditModal={() => {}}
          openRemoveModal={(studentId) =>
            setRemoveStudentModalState({ studentId, open: true })
          }
        />
      </div>
    </>
  )
}
