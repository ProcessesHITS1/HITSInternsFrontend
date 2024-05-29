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
  console.log(resp.headers.get('Content-Disposition'))
  FileSaver.saveAs(await resp.blob(), resp.headers.get('filename') || 'Дневник практики')
}

export const { useGetDiaryByIdQuery } = endpoints
