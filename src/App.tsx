import logo from './logo.svg'
import './App.css'

import { useState } from 'react'

import AddInfoBtn from './components/add-info-button'
import TypeOfField from './components/type-of-field'
import InputNewInfo from './components/input-new-field'

import { FIELD_TYPES } from './constants'
const { EMAIL } = FIELD_TYPES

const App = () => {
  // 0 = nothing
  // 1 = clicked add credentials select is here
  // 2 = confirmed the type of input, now field is here
  // 3 = confirmed and saved info
  const [step, setStep] = useState(0)

  const [selectedFieldType, setselectedFieldType] = useState<FIELD_TYPES>(EMAIL)
  const [infoData, setInfoData] = useState('')

  // on button click
  const handleAddInfoRequest = () => {
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
  const handleConfirmedNewInfo = () => {
    console.log('selectedFieldType', selectedFieldType)
    console.log('infoData', infoData)
    setStep(3)
  }
  return (
    <div className="App">
      <header className="App-header flex flex-col gap-y-4 items-center">
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
              className="bg-[#0e6173] rounded px-3 py-[10px]"
            >
              Enregistrer
            </button>
          </>
        ) : (
          ''
        )}

        {/* <img src={logo} className="App-logo" alt="logo" />
        <p className="underline">
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  )
}

export default App
