import { FC, ChangeEvent } from 'react'

import { FIELD_TYPES, INPUT_TYPES } from '../constants'

interface InputNewInfoProps {
  value: string
  onTypeInfo: (data: string) => void
  infoType: FIELD_TYPES
}

const InputNewInfo: FC<InputNewInfoProps> = ({
  infoType,
  value,
  onTypeInfo,
}) => {
  console.log('infoType', infoType)
  return (
    <div className="flex items-center gap-x-4">
      <label htmlFor="name">Type your info</label>

      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onTypeInfo(e.target.value)
        }
        value={value}
        className="text-white bg-[#16161A] rounded py-1 px-2"
        type={INPUT_TYPES[infoType]}
        id="name"
        required
      />
    </div>
  )
}

export default InputNewInfo
