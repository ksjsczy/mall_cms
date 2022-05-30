import myRequest from '@/service'
import { IDataType } from '@/service/types'

export function getPageListData(url: string, queryInfo: any) {
  return myRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

export function deletePageData(url: string) {
  return myRequest.delete<IDataType>({
    url
  })
}

export function createPageData(url: string, newData: any) {
  return myRequest.post<IDataType>({
    url,
    data: newData
  })
}

export function updatePageData(url: string, newData: any) {
  return myRequest.patch<IDataType>({
    url,
    data: newData
  })
}
