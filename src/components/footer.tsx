import { FC } from 'react'

import { AiOutlineGithub, AiOutlineTwitter } from 'react-icons/ai'

import AddInfoBtn from './add-info-button'
import TypeOfField from './type-of-field'
import InputNewInfo from './input-new-field'

interface FooterProps {
  step: number
  inputData: string
  handleAddInfoRequest: () => void
  selectedFieldType: string
  onAddField: (newlyselectedFieldType: string) => void
  onTypePropertyName: (data: string) => void
  customProperty: string
  onTypeNewInfo: (data: string) => void
  onConfirmNewInfo: (
    event: React.MouseEvent<HTMLButtonElement>,
    abort?: boolean
  ) => Promise<void>

  onAbortAdd: () => void

  arrayOfProperties: string[] | undefined

  isDuplicatedCustomProperty: boolean
}

const Footer: FC<FooterProps> = ({
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

  arrayOfProperties,

  isDuplicatedCustomProperty,
}) => {
  return (
    <footer
      className={`flex ${
        step === 0 ? 'justify-between' : 'justify-center'
      }  items-center p-3 bg-dark-secondary w-full`}
    >
      <div className="flex flex-col items-center gap-y-3 self-start">
        {step > 0 ? (
          <TypeOfField
            field={selectedFieldType}
            onAddField={onAddField}
            arrayOfProperties={arrayOfProperties}
          />
        ) : (
          ''
        )}

        {step > 1 ? (
          <InputNewInfo
            value={inputData}
            onTypeInfo={onTypeNewInfo}
            onTypePropertyName={onTypePropertyName}
            customProperty={customProperty}
            infoType={selectedFieldType}
            step={step}
            isDuplicatedCustomProperty={isDuplicatedCustomProperty}
          />
        ) : (
          ''
        )}

        <div className="flex items-center gap-x-4">
          {step > 1 ? (
            <button
              onClick={onConfirmNewInfo}
              className="bg-purple-primary font-semibold px-3 py-2 rounded-lg"
            >
              Save
            </button>
          ) : (
            ''
          )}

          <AddInfoBtn
            step={step}
            onAddInfoHandler={handleAddInfoRequest}
            onAbortAdd={onAbortAdd}
          />
        </div>
      </div>

      {step === 0 ? (
        <div className="flex items-center gap-x-4 text-2xl">
          <a
            className="hover:text-purple-primary"
            href={'https://github.com/zacBkh'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineGithub />
          </a>

          <a
            className="hover:text-purple-primary"
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
