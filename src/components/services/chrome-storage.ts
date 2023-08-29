import { FIELD_TYPES } from '../../constants'
interface setChromeStorageTypes {
  (selectedFieldType: FIELD_TYPES, infoData: string): void
}

export const setChromeStorage: setChromeStorageTypes = (
  selectedFieldType,
  infoData
) => {
  try {
    chrome.storage.local.set({ [selectedFieldType]: infoData }, () => {
      console.log('Data stored')
    })
  } catch (error) {
    console.error('Error while setting data:', error)
  }
}

interface getChromeStorageTypes {
  (selectedFieldType: FIELD_TYPES): any
}

export const getChromeStorage: getChromeStorageTypes = (selectedFieldType) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([selectedFieldType], (result) => {
      resolve(result)
    })
  })
}

export const getChromeStorageAll = (): any => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(null, (data) => {
      resolve(data)
    })
  })
}

export const deleteChromeStorage: getChromeStorageTypes = async (
  fieldToDelete
) => {
  console.log('fieldToDelete', fieldToDelete)
  await chrome.storage.local.remove([fieldToDelete])
}
