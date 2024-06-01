import { parse as parseContentDisposition } from 'content-disposition-attachment'
import FileSaver from 'file-saver'
import { thirdCourseApi } from '~shared/api'
import { API_THIRD_COURSE_URL } from '~shared/config'
import {
  DownloadDiaryByIdResp,
  DownloadDiaryByIdReq,
  GetDiaryByIdResp,
  GetDiaryByIdReq,
} from './types'

const endpoints = thirdCourseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDiaryById: builder.query<GetDiaryByIdResp, GetDiaryByIdReq>({
      query: ({ diaryId }) => ({
        url: `/diaries/${diaryId}`,
      }),
      providesTags: ['diary'],
    }),
  }),
})

export const downloadDiary = async ({
  documentId,
}: DownloadDiaryByIdReq): Promise<DownloadDiaryByIdResp> => {
  const resp = await fetch(`${API_THIRD_COURSE_URL}/files/download/${documentId}`)
  const header = resp.headers.get('content-disposition')
  const blob = await resp.blob()
  let fileName = 'Дневник практики.docx'

  if (header) {
    try {
      const parseResult = parseContentDisposition(header)
      if (parseResult.attachment && parseResult.filename) {
        fileName = parseResult.filename
      }
    } catch {
      //
    }
  }

  FileSaver.saveAs(blob, fileName)
}

export const { useGetDiaryByIdQuery, useLazyGetDiaryByIdQuery } = endpoints
