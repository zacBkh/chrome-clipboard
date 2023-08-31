import { useState, useEffect } from 'react'

import { v4 as uuid } from 'uuid'

import InfoDisplayer from './components/info-displayers'
import Footer from './components/footer'

import {
  setChromeStorage,
  getChromeStorageAll,
} from './services/chrome-storage'

import { FIELD_TYPES, StoredDataTypes } from './constants'
const { SELECT_DEFAULT, CUSTOM } = FIELD_TYPES

const App = () => {
  // 0 = nothing
  // 1 = clicked add credentials select is here
  // 2 = confirmed the type of input, now field is here
  const [step, setStep] = useState(0)

  const [selectedFieldType, setselectedFieldType] =
    useState<string>(SELECT_DEFAULT)

  const [customProperty, setCustomProperty] = useState('')

  const [infoData, setInfoData] = useState('')

  const [allStoredData, setAllStoredData] = useState<StoredDataTypes[]>()

  console.log('allStoredData', allStoredData)

  const resetUnderEdition = () => {
    const updatedData = allStoredData?.map((item) => ({
      ...item,
      isUnderEdition: false,
    }))
    setAllStoredData(updatedData)
  }

  // on "add values" button click
  const handleAddInfoRequest = () => {
    setselectedFieldType(SELECT_DEFAULT) //reset select
    resetUnderEdition() // if user was editing something, reset
    setStep(1)
  }

  // on field type click
  const handleAddField = (newlyselectedFieldType: string) => {
    console.log('newlyselectedFieldType', newlyselectedFieldType)

    setselectedFieldType(newlyselectedFieldType)

    if (newlyselectedFieldType === CUSTOM) {
      // if field type = custom
      setStep(2.5)
    } else {
      setStep(2)
    }
  }

  // type in field
  const handleTypeNewInfo = (data: string) => {
    setInfoData(data)
  }
  // type in field for new property in case custom selected
  const onTypePropertyName = (customProperty: string) => {
    console.log('customProperty', customProperty)
    setCustomProperty(customProperty)
    // check if duplicate ??
  }

  // confirmed new info (click save) OR ABORT
  const handleConfirmedNewInfo = async (
    event: React.MouseEvent<HTMLButtonElement>,
    abort?: boolean
  ) => {
    console.log('selectedFieldType', selectedFieldType)
    console.log('customProperty', customProperty)
    console.log('infoData', infoData)
    console.log('abort', abort)
    setStep(0)

    if (!abort) {
      // if user did not abort (clicked on cross)
      customProperty
        ? setChromeStorage(
            selectedFieldType,
            infoData,
            customProperty.toLowerCase()
          )
        : setChromeStorage(selectedFieldType, infoData)
    } else {
      // if user click on cross, put all under edition back to false
      resetUnderEdition()
    }

    //  reset
    setInfoData('')
    setCustomProperty('')
  }

  // Fetch all saved info on render
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getChromeStorageAll()
        console.log('allData', allData)

        const allDataArray = Object.entries(allData).map(([key, val]) => ({
          property: key,
          isCustom:
            key.includes(CUSTOM) ||
            !Object.values(FIELD_TYPES).includes(key as FIELD_TYPES),
          value: val as string,
          id: uuid(),
          isUnderEdition: false,
        }))

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
        setStep(0)
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
    field: string,
    currData: string,
    id: string
  ) => {
    console.log('field', field)
    console.log('currData', currData)
    console.log('id', id)

    setStep(0)

    // Replacing underEdition state
    const editedData = allStoredData?.map((item) =>
      item.id === id ? { ...item, isUnderEdition: true } : item
    )
    setAllStoredData(editedData)

    setInfoData(currData)
    setselectedFieldType(field)
  }

  return (
    <div className="popUpContainer bg-[#16161a] flex flex-col justify-between items-center text-white text-base">
      <div className="flex flex-col items-start p-4 w-full">
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

      <Footer
        allStoredData={allStoredData}
        step={step}
        inputData={infoData}
        handleAddInfoRequest={handleAddInfoRequest}
        selectedFieldType={selectedFieldType}
        onAddField={handleAddField}
        onTypeNewInfo={handleTypeNewInfo}
        onTypePropertyName={(evt) =>
          step === 2.5 ? onTypePropertyName(evt) : ''
        }
        customProperty={step === 2.5 ? customProperty : ''}
        onConfirmNewInfo={handleConfirmedNewInfo}
        onAbortAdd={() => setStep(0)}
      />
    </div>
  )
}

export default App
