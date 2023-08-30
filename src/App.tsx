import { useState, useEffect } from 'react'

import { v4 as uuid } from 'uuid'

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
    setStep(1)
  }

  // on field type click
  const handleAddField = (newlyselectedFieldType: FIELD_TYPES) => {
    setInfoData('')
    setselectedFieldType(newlyselectedFieldType)
    setStep(2)
  }

  // type in field
  const handleTypeNewInfo = (data: string) => {
    setInfoData(data)
  }

  // confirmed new info OR ABORT
  const handleConfirmedNewInfo = async (
    event: React.MouseEvent<HTMLButtonElement>,
    abort?: boolean
  ) => {
    console.log('selectedFieldType', selectedFieldType)
    console.log('infoData', infoData)
    console.log('abort', abort)
    setStep(0)

    if (!abort) {
      // if user did not abort (clicked on cross)
      setChromeStorage(selectedFieldType, infoData)
    } else {
      // if user click on cross, put all back to false
      const updatedData = allStoredData?.map((item) => ({
        ...item,
        isUnderEdition: false,
      }))
      setAllStoredData(updatedData)
    }
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
            id: uuid(),
            isUnderEdition: false,
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

  const handleEditionRequest = (
    field: FIELD_TYPES,
    currData: string,
    id: string
  ) => {
    console.log('field', field)
    console.log('currData', currData)
    console.log('id', id)

    // Replacing underEdition state
    const editedData = allStoredData?.map((item) =>
      item.id === id ? { ...item, isUnderEdition: true } : item
    )
    setAllStoredData(editedData)

    setInfoData(currData)
    setselectedFieldType(field)
  }

  return (
    <div className="popUpContainer bg-[#282c34] flex flex-col justify-between text-white p-4 text-base">
      <div className="flex flex-col items-start">
        {allStoredData?.map((item) => (
          <InfoDisplayer
            fieldType={item.property}
            data={item.value} //<p>
            value={infoData} // <input>
            id={item.id}
            isUnderEdition={item.isUnderEdition}
            isAnotherFieldUnderEdition={allStoredData.some(
              (elem) => elem.isUnderEdition && elem.id !== item.id
            )}
            onEditionRequest={handleEditionRequest}
            onTypeInfo={handleTypeNewInfo}
            onConfirmInfoEdit={handleConfirmedNewInfo}
            key={item.id}
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
