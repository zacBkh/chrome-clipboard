import { useState, useEffect } from 'react'

import AddInfoBtn from './components/add-info-button'
import TypeOfField from './components/type-of-field'
import InputNewInfo from './components/input-new-field'
import InfoDisplayer from './components/info-displayers'

import {
  setChromeStorage,
  getChromeStorageAll,
} from './components/services/chrome-storage'

import { FIELD_TYPES, StoredDataTypes } from './constants'
const { SELECT_DEFAULT } = FIELD_TYPES

const App = () => {
  // 0 = nothing
  // 1 = clicked add credentials select is here
  // 2 = confirmed the type of input, now field is here
  const [step, setStep] = useState(0)

  const [selectedFieldType, setselectedFieldType] =
    useState<FIELD_TYPES>(SELECT_DEFAULT)
  const [infoData, setInfoData] = useState('')

  const [allStoredData, setAllStoredData] = useState<StoredDataTypes[]>()

  // on button click
  const handleAddInfoRequest = () => {
    setselectedFieldType(SELECT_DEFAULT)
    console.log('asked add info')
    setStep(1)
  }

  // on field type click
  const handleAddField = (newlyselectedFieldType: FIELD_TYPES) => {
    console.log('specified field', newlyselectedFieldType)
    setInfoData('')
    setselectedFieldType(newlyselectedFieldType)
    setStep(2)
  }

  // type in field
  const handleTypeNewInfo = (data: string) => {
    setInfoData(data)
  }

  // confirmed new info
  const handleConfirmedNewInfo = async () => {
    console.log('selectedFieldType', selectedFieldType)
    console.log('infoData', infoData)
    setStep(0)

    // Set data in chrome storage
    setChromeStorage(selectedFieldType, infoData)
  }

  // Fetch all saved info on render
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allDataStored = await getChromeStorageAll()
        console.log('allDataStored', allDataStored)

        const allDataArray = Object.entries(allDataStored).map(
          ([key, value]) => ({
            property: key as FIELD_TYPES,
            value: value as string,
          })
        )

        console.log('allDataArray', allDataArray)
        setAllStoredData(allDataArray)
      } catch (error) {
        console.error('Error while getting data:', error)
      }
    }
    fetchData()

    try {
      // Listen for changes in chrome storage
      const storageChangeListener = (changes: {
        [key: string]: chrome.storage.StorageChange
      }) => {
        fetchData()
      }
      chrome.storage.onChanged.addListener(storageChangeListener)

      // Clean up the listener when component unmounts
      return () => {
        chrome.storage.onChanged.removeListener(storageChangeListener)
      }
    } catch (error) {
      console.log(
        'there has been an error registering to the onChanged event',
        error
      )
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#282c34] flex flex-col justify-between text-white p-4 text-base">
      <div className="flex flex-col gap-y-2 items-start">
        {allStoredData?.map((item) => (
          <InfoDisplayer
            fieldType={item.property}
            data={item.value}
            value={infoData}
            onEditionRequest={(field) => setselectedFieldType(field)}
            onTypeInfo={handleTypeNewInfo}
            onConfirmInfoEdit={handleConfirmedNewInfo}
          />
        ))}
      </div>

      <div className="flex flex-col gap-y-4 items-center p-3">
        <AddInfoBtn onAddInfoHandler={handleAddInfoRequest} />

        {step > 0 ? (
          <TypeOfField field={selectedFieldType} onAddField={handleAddField} />
        ) : (
          ''
        )}

        {step > 1 ? (
          <>
            <InputNewInfo
              value={infoData}
              onTypeInfo={handleTypeNewInfo}
              infoType={selectedFieldType}
            />
            <button
              onClick={handleConfirmedNewInfo}
              className="bg-[#7f5af0] font-semibold rounded px-3 py-[10px]"
            >
              Save
            </button>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default App
