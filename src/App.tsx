import { useState, useEffect } from 'react'

import { v4 as uuid } from 'uuid'

import InfoDisplayer from './components/info-displayers'
import Footer from './components/footer'

import {
  setChromeStorage,
  getChromeStorageAll,
} from './services/chrome-storage'

import NoDataSVG from '../src/assets/no-data.svg'

import { FIELD_TYPES, StoredDataTypes } from './constants'

import SearchBar from './components/search-bar'

import filterArray from './services/filter-properties'

import DataUserFeedback from './components/data-user-feeback'

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

  const [allStoredData, setAllStoredData] = useState<StoredDataTypes[]>([])

  const [isDuplicatedCustomProperty, setIsDuplicatedCustomProperty] =
    useState(false)

  const [searchQuery, setSearchQuery] = useState('')

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
    if (step !== 0) {
      return
    }

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

  // type in field value
  const handleTypeNewInfo = (newData: string) => {
    if (newData.trim() === '') {
      return
    }
    setInfoData(newData)
  }
  // type in field for new property in case custom selected
  const onTypePropertyName = (customProperty: string) => {
    console.log('customProperty', customProperty)
    console.log('arrayOfProperties', arrayOfProperties)
    if (arrayOfProperties?.includes(customProperty.toLowerCase())) {
      setIsDuplicatedCustomProperty(true)
    }

    if (isDuplicatedCustomProperty) {
      setIsDuplicatedCustomProperty(false)
    }

    setCustomProperty(customProperty)
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

    // const isPropertyEmpty =
    //   selectedFieldType.trim() === '' || customProperty.trim() === '' // if no property or if property is default custom without typing
    // console.log('isPropertyEmpty', isPropertyEmpty)

    const isValueEmpty = infoData.trim() === ''
    if (isValueEmpty) {
      setInfoData('')
      setCustomProperty('')
      return
      // PUT HERE NICE INTERFACE RED
    }
    console.log('isValueEmpty', isValueEmpty)

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
          isCustom: !Object.values(FIELD_TYPES).includes(key as FIELD_TYPES),
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

  const arrayOfProperties = allStoredData?.map((item) => item.property)

  const resetStates = () => {
    setStep(0)
    setInfoData('')
    setCustomProperty('')
    setselectedFieldType('')
  }

  const typeSearchHandler = (searchedQuery: string) => {
    console.log('searchedQuery', searchedQuery)
    setSearchQuery(searchedQuery)
  }

  const filteredStoredData = filterArray(allStoredData, searchQuery)

  return (
    <div className="popUpContainer bg-dark-primary flex flex-col justify-between items-center text-white text-base gap-y-4">
      {allStoredData.length ? (
        <SearchBar
          onTypeSearchBar={typeSearchHandler}
          searchQuery={searchQuery}
          onDeleteSearchQuery={() => setSearchQuery('')}
        />
      ) : (
        ''
      )}

      {!filteredStoredData.length ? (
        <div className="m-auto flex flex-col items-center gap-y-2 select-none w-full">
          <img
            className="w-[70%]"
            src={NoDataSVG}
            alt="Icon showing there is no data"
          />

          <DataUserFeedback
            searchQuery={searchQuery}
            onResetSearchQuery={() => setSearchQuery('')}
            onAddInfoRequest={handleAddInfoRequest}
          />
        </div>
      ) : (
        <div className="flex flex-col items-start p-4 w-full">
          {filteredStoredData.map((item) => (
            <InfoDisplayer
              fieldType={item.property}
              data={item.value} //<p>
              value={infoData} // <input>
              id={item.id}
              isUnderEdition={item.isUnderEdition}
              isAnotherFieldUnderEdition={filteredStoredData.some(
                (elem) => elem.isUnderEdition && elem.id !== item.id
              )}
              onEditionRequest={handleEditionRequest}
              onTypeInfoEdit={handleTypeNewInfo}
              onConfirmInfoEdit={handleConfirmedNewInfo}
              key={item.id}
            />
          ))}
        </div>
      )}
      <Footer
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
        onAbortAdd={resetStates}
        arrayOfProperties={arrayOfProperties}
        isDuplicatedCustomProperty={isDuplicatedCustomProperty}
      />
    </div>
  )
}

export default App
