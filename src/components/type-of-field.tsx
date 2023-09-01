import { ChangeEvent, FC } from 'react'

import { FIELD_TYPES, OPTIONS_SELECT } from '../constants'
const { SELECT_DEFAULT, CUSTOM } = FIELD_TYPES

interface propsType {
  onAddField: (newlySelectedField: string) => void
  field: string
  arrayOfProperties: string[] | undefined
}

const TypeOfField: FC<propsType> = ({
  onAddField,
  field,
  arrayOfProperties,
}) => {
  const handleSelectChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    const newInfo = evt.target.value as FIELD_TYPES | 'custom'
    onAddField(newInfo)
  }

  return (
    <div className="flex items-center gap-x-4">
      <p>What do you want to save?</p>

      <select
        value={field}
        className="bg-[#72757E] rounded px-1"
        onChange={handleSelectChange}
      >
        {field === SELECT_DEFAULT && (
          <option value={SELECT_DEFAULT}>Select...</option>
        )}

        {OPTIONS_SELECT.map((elem) => {
          if (
            !arrayOfProperties?.includes(elem.storageName) ||
            elem.storageName === CUSTOM
          ) {
            return (
              <option key={elem.storageName} value={elem.storageName}>
                {elem.displayName}
              </option>
            )
          } else {
            return
          }
        })}
      </select>
    </div>
  )
}

export default TypeOfField
