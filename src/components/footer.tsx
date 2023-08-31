import { FC } from 'react'

import { AiOutlineGithub, AiOutlineTwitter } from 'react-icons/ai'

import { StoredDataTypes } from '../constants'

import AddInfoBtn from './add-info-button'
import TypeOfField from './type-of-field'
import InputNewInfo from './input-new-field'

import { FIELD_TYPES } from '../constants'

interface FooterProps {
  allStoredData: StoredDataTypes[] | undefined
  step: number
  inputData: string
  handleAddInfoRequest: () => void
  selectedFieldType: FIELD_TYPES
  onAddField: (newlyselectedFieldType: FIELD_TYPES) => void
  onTypePropertyName: (data: string) => void
  customProperty: string
  onTypeNewInfo: (data: string) => void
  onConfirmNewInfo: (
    event: React.MouseEvent<HTMLButtonElement>,
    abort?: boolean
  ) => Promise<void>

  onAbortAdd: () => void
}

const Footer: FC<FooterProps> = ({
  allStoredData,
  step,
  inputData,
  selectedFieldType,

  handleAddInfoRequest,
  onAddField,
  onTypePropertyName,
  customProperty,
  onTypeNewInfo,
  onConfirmNewInfo,
  onAbortAdd,
}) => {
  const isSomeDataUnderEdition = allStoredData?.some(
    (item) => item.isUnderEdition === true
  )

  console.log('isSomeDataUnderEdition', isSomeDataUnderEdition)

  return (
    <footer
      className={`flex ${
        step === 0 ? 'justify-between' : 'justify-center'
      }  items-center p-3 bg-[#242629] w-full`}
    >
      <div className="flex flex-col items-center gap-y-3 self-start">
        <AddInfoBtn
          step={step}
          onAddInfoHandler={handleAddInfoRequest}
          onAbortAdd={onAbortAdd}
        />

        {step > 0 ? (
          <TypeOfField field={selectedFieldType} onAddField={onAddField} />
        ) : (
          ''
        )}

        {step > 1 ? (
          <>
            <InputNewInfo
              value={inputData}
              onTypeInfo={onTypeNewInfo}
              onTypePropertyName={onTypePropertyName}
              customProperty={customProperty}
              infoType={selectedFieldType}
              step={step}
            />
            <button
              onClick={onConfirmNewInfo}
              className="bg-[#7f5af0] font-semibold rounded px-3 py-[10px]"
            >
              Save
            </button>
          </>
        ) : (
          ''
        )}
      </div>

      {step === 0 ? (
        <div className="flex items-center gap-x-4 text-2xl">
          <a
            className="hover:text-[#7f5af0]"
            href={'https://github.com/zacBkh'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineGithub />
          </a>

          <a
            className="hover:text-[#7f5af0]"
            href={'https://twitter.com/zacFullStack'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineTwitter />
          </a>
        </div>
      ) : (
        ''
      )}
    </footer>
  )
}

export default Footer
