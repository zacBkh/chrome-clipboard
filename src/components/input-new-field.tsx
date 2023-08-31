import { FC, ChangeEvent, useEffect, useRef } from 'react'

interface InputNewInfoProps {
  value: string
  onTypeInfo: (data: string) => void
  onTypePropertyName: (data: string) => void
  customProperty: string
  infoType: string
  step: number
}

const InputNewInfo: FC<InputNewInfoProps> = ({
  infoType,
  value,

  onTypePropertyName,
  customProperty,
  onTypeInfo,

  step,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef?.current?.focus()
  }, [infoType])

  // if custom
  return (
    <div className="flex gap-x-3 items-center">
      {step === 2.5 ? (
        <input
          placeholder="Property: E-mail, first name, country..."
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onTypePropertyName(e.target.value)
          }
          value={customProperty}
          className="text-white bg-[#16161A] rounded py-1 px-2"
          type={'text'}
          ref={step === 2.5 ? inputRef : null}
        />
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
