import { FC, ChangeEvent, useRef, useEffect, useState } from 'react'

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
  fieldType: string
  data: string
  value: string
  id: string
  isUnderEdition: boolean
  isAnotherFieldUnderEdition: boolean

  onEditionRequest: (fieldType: string, data: string, id: string) => void
  onTypeInfoEdit: (data: string) => void
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
  onTypeInfoEdit,
  onConfirmInfoEdit,
}) => {
  const [copyShouldBeCheckIcon, setCopyShouldBeCheckIcon] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const style = 'p-2 bg-transparent hover:bg-grey-hover rounded w-8 h-8'

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

  const handleUserCopied = () => {
    setCopyShouldBeCheckIcon(true)
    setTimeout(() => setCopyShouldBeCheckIcon(false), 1000)
  }

  return (
    <div className="flex gap-x-4 items-center w-full justify-between mx-auto px-2 min-h-[40px]">
      {/* <p>{fieldType}</p> */}

      {isUnderEdition ? (
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onTypeInfoEdit(e.target.value)
          }
          value={value}
          className="outlineFocusInput text-white bg-dark-secondary rounded py-1 px-2"
          type="text"
          ref={inputRef}
          required
        ></input>
      ) : (
        <p className="break-words">{data}</p>
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
            onClick={() => {
              handleCopyClick(data)
              handleUserCopied()
            }}
            className={`${style} ${isUnderEdition ? 'invisible' : ''} `}
          >
            <BiCopy
              title="Copy this entry"
              className={`${
                copyShouldBeCheckIcon ? 'h-0 opacity-0' : 'h-4 opacity-100'
              } transition-all duration-300`}
            />
            <AiOutlineCheck
              className={`${
                copyShouldBeCheckIcon ? 'h-4 opacity-100' : 'h-0 opacity-0'
              } transition-all duration-300`}
            />
          </button>
        </div>
      )}
    </div>
  )
}

export default InfoDisplayer
