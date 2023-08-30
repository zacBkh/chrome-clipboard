import { FC, useState, ChangeEvent, useRef, useEffect } from 'react'
import { FIELD_TYPES, INPUT_TYPES } from '../constants'

import { BiCopy } from 'react-icons/bi'
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineCheck,
  AiOutlineClose,
} from 'react-icons/ai'

import { handleCopyClick } from '../services/utils'
import { deleteChromeStorage } from '../services/chrome-storage'

interface InfoDisplayerProps {
  fieldType: FIELD_TYPES
  data: string
  value: string
  id: string
  isUnderEdition: boolean
  isAnotherFieldUnderEdition: boolean

  onEditionRequest: (fieldType: FIELD_TYPES, data: string, id: string) => void
  onTypeInfo: (data: string) => void
  onConfirmInfoEdit: (
    event: React.MouseEvent<HTMLButtonElement>,
    abort?: boolean
  ) => Promise<void>
}

const InfoDisplayer: FC<InfoDisplayerProps> = ({
  fieldType,
  data,
  value,
  id,
  isUnderEdition,
  isAnotherFieldUnderEdition,

  onEditionRequest,
  onTypeInfo,
  onConfirmInfoEdit,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const style = 'p-2 bg-transparent hover:bg-[#a2a3a35c] rounded'

  const handleEditionRequest = () => {
    onEditionRequest(fieldType, data, id)
  }

  const hanldeConfirmEdition = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onConfirmInfoEdit(event)
  }

  useEffect(() => {
    if (inputRef.current && isUnderEdition) {
      inputRef.current.focus()
    }
  }, [isUnderEdition])

  return (
    <div className="flex gap-x-4 items-center w-full justify-between mx-auto px-2 min-h-[40px]">
      {/* <p>{fieldType}</p> */}

      {isUnderEdition ? (
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onTypeInfo(e.target.value)
          }
          value={value}
          className="text-white bg-[#16161A] rounded py-1 px-2"
          type={INPUT_TYPES[fieldType]}
          ref={inputRef}
          required
        ></input>
      ) : (
        <p>{data}</p>
      )}

      {isAnotherFieldUnderEdition ? (
        ''
      ) : (
        <div className="text-white flex items-center">
          <button
            onClick={
              isUnderEdition ? hanldeConfirmEdition : handleEditionRequest
            }
            className={style}
          >
            {isUnderEdition ? (
              <AiOutlineCheck title="Confirm the edition" />
            ) : (
              <AiOutlineEdit title="Edit this entry" />
            )}
          </button>
          <button
            onClick={(event) =>
              isUnderEdition
                ? onConfirmInfoEdit(event, true)
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
      )}
    </div>
  )
}

export default InfoDisplayer
