import { FIELD_TYPES } from '../constants'
interface setChromeStorageTypes {
  (
    selectedFieldType: FIELD_TYPES,
    infoData: string,
    customProperty?: string
  ): void
}

export const setChromeStorage: setChromeStorageTypes = (
  selectedFieldType,
  infoData,
  customProperty
) => {
  try {
    chrome?.storage?.sync.set(
      customProperty
        ? { [`${selectedFieldType}-${customProperty}`]: infoData }
        : { [selectedFieldType]: infoData },
      () => {
        console.log('Data stored')
      }
    )
  } catch (error) {
    console.error('Error while setting data:', error)
  }
}

interface interactWithChromeStorageTypes {
  (selectedFieldType: FIELD_TYPES): any
}

export const getChromeStorage: interactWithChromeStorageTypes = (
  selectedFieldType
) => {
  return new Promise((resolve, reject) => {
    chrome?.storage?.sync.get([selectedFieldType], (result) => {
      resolve(result)
    })
  })
}

export const getChromeStorageAll = (): any => {
  return new Promise((resolve, reject) => {
    chrome?.storage?.sync.get(null, (data) => {
      resolve(data)
    })
  })
}

export const deleteChromeStorage: interactWithChromeStorageTypes = async (
  fieldToDelete
) => {
  console.log('fieldToDelete', fieldToDelete)
  await chrome?.storage?.sync.remove([fieldToDelete])
}
