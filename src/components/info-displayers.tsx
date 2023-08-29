import { FC, useState, ChangeEvent } from 'react'
import { FIELD_TYPES, INPUT_TYPES } from '../constants'

import { BiCopy } from 'react-icons/bi'
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineCheck,
  AiOutlineClose,
} from 'react-icons/ai'

import { handleCopyClick } from './services/utils'
import { deleteChromeStorage } from './services/chrome-storage'

interface InfoDisplayerProps {
  onEditionRequest: (data: FIELD_TYPES) => void
  fieldType: FIELD_TYPES
  data: string
  value: string
  onTypeInfo: (data: string) => void
  onConfirmInfoEdit: () => Promise<void>
}

const InfoDisplayer: FC<InfoDisplayerProps> = ({
  fieldType,
  data,
  value,

  onEditionRequest,
  onTypeInfo,
  onConfirmInfoEdit,
}) => {
  const style = 'p-2 bg-transparent hover:bg-[#a2a3a35c] rounded'

  const [isUnderEdition, setIsUnderEdition] = useState(false)

  const handleEditionRequest = () => {
    setIsUnderEdition((prev) => !prev)
    onEditionRequest(fieldType)
  }
  const hanldeConfirmEdition = () => {
    onConfirmInfoEdit()
    setIsUnderEdition(false)
  }

  return (
    <div className="flex gap-x-4 items-center w-full justify-between mx-auto">
      {/* <p>{fieldType}</p> */}

      {isUnderEdition ? (
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onTypeInfo(e.target.value)
          }
          value={value}
          className="text-white bg-[#16161A] rounded py-1 px-2"
          type={INPUT_TYPES[fieldType]}
          required
        ></input>
      ) : (
        <p>{data}</p>
      )}
      <div className="text-white flex items-center">
        <button
          onClick={isUnderEdition ? hanldeConfirmEdition : handleEditionRequest}
          className={style}
        >
          {isUnderEdition ? (
            <AiOutlineCheck title="Confirm the edition" />
          ) : (
            <AiOutlineEdit title="Edit this entry" />
          )}
        </button>
        <button
          onClick={() =>
            isUnderEdition
              ? setIsUnderEdition(false)
              : deleteChromeStorage(fieldType)
          }
          className={style}
        >
          {isUnderEdition ? (
            <AiOutlineClose title="Stop editing" />
          ) : (
            <AiOutlineDelete title="Delete this entry" />
          )}
        </button>

        <button
          onClick={() => handleCopyClick(data)}
          className={`${style} ${isUnderEdition ? 'invisible' : ''}`}
        >
          <BiCopy title="Copy this entry" />
        </button>
      </div>
    </div>
  )
}

export default InfoDisplayer
