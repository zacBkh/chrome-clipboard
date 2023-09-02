interface setChromeStorageTypes {
  (selectedFieldType: string, infoData: string, customProperty?: string): void
}

export const setChromeStorage: setChromeStorageTypes = (
  selectedFieldType,
  infoData,
  customProperty
) => {
  try {
    chrome?.storage?.sync.set(
      customProperty
        ? { [customProperty]: infoData }
        : { [selectedFieldType]: infoData },
      () => {
        console.log('Chrome Clipboard successfully stored your data ✅')
      }
    )
  } catch (error) {
    console.error('Error while setting data:', error)
  }
}

interface interactWithChromeStorageTypes {
  (selectedFieldType: string): any
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
  await chrome?.storage?.sync.remove([fieldToDelete])
}
