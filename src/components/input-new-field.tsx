import { FC, ChangeEvent, useEffect, useRef } from 'react'

import { AiOutlineInfoCircle } from 'react-icons/ai'

interface InputNewInfoProps {
  value: string
  onTypeInfo: (data: string) => void
  onTypePropertyName: (data: string) => void
  customProperty: string
  infoType: string
  step: number
  isDuplicatedCustomProperty: boolean
}

const InputNewInfo: FC<InputNewInfoProps> = ({
  infoType,
  value,

  onTypePropertyName,
  customProperty,
  onTypeInfo,

  step,

  isDuplicatedCustomProperty,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef?.current?.focus()
  }, [infoType])

  // if custom
  return (
    <div className="flex gap-x-3 items-start">
      {step === 2.5 ? (
        <div className="flex flex-col gap-y-2">
          <input
            placeholder="Property: E-mail, first name, country..."
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onTypePropertyName(e.target.value)
            }
            value={customProperty}
            className={`text-white bg-[#16161A] rounded py-1 px-2 ${
              isDuplicatedCustomProperty
                ? 'outline outline-1 outline-rose-500'
                : ''
            }`}
            type={'text'}
            ref={step === 2.5 ? inputRef : null}
          />
          {isDuplicatedCustomProperty ? (
            <div className="flex items-center gap-x-1 text-rose-500 ">
              <span className="text-xs">This property already exists</span>
              <AiOutlineInfoCircle className="mt-[3px]" />
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
      {step === 2.5 ? ':' : ''}
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onTypeInfo(e.target.value)
        }
        placeholder="Value: max@gmail.com, Max, United States..."
        value={value}
        className="text-white bg-[#16161A] rounded py-1 px-2"
        type="text"
        ref={step === 2.5 ? null : inputRef}
      />
    </div>
  )
}

export default InputNewInfo
