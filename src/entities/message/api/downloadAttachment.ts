import { parse as parseContentDisposition } from 'content-disposition-attachment'
import FileSaver from 'file-saver'
import { API_CHATS_URL, JWT_LS_KEYNAME } from '~shared/config'
import { DownloadAttachmentByIdResp, DownloadAttachmentByIdReq } from './types'

export const downloadAttachment = async ({
  fileId,
  chatId,
}: DownloadAttachmentByIdReq): Promise<DownloadAttachmentByIdResp> => {
  const resp = await fetch(`${API_CHATS_URL}/Chats/${chatId}/attachments/${fileId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem(JWT_LS_KEYNAME)}` },
  })
  const header = resp.headers.get('content-disposition')
  const blob = await resp.blob()

  let fileName = fileId

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
