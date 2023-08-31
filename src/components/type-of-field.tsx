import { ChangeEvent, FC } from 'react'

import { FIELD_TYPES } from '../constants'
const { EMAIL, FIRST_NAME, LAST_NAME, COUNTRY, SELECT_DEFAULT, CUSTOM } =
  FIELD_TYPES

interface propsType {
  onAddField: (newlySelectedField: string) => void
  field: string
}

const TypeOfField: FC<propsType> = ({ onAddField, field }) => {
  const handleSelectChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    const newInfo = evt.target.value as FIELD_TYPES | 'custom'
    onAddField(newInfo)
  }
  return (
    <div className="flex items-center gap-x-4">
      <p>What kind of info do you want to add?</p>

      <select
        value={field}
        className="bg-gray-500"
        onChange={handleSelectChange}
      >
        {field === SELECT_DEFAULT && (
          <option value={SELECT_DEFAULT}>Select...</option>
        )}
        <option value={EMAIL}>Email</option>
        <option value={FIRST_NAME}>First Name</option>
        <option value={LAST_NAME}>Last Name</option>
        <option value={COUNTRY}>Country</option>
        <option value={CUSTOM}>Custom</option>
      </select>
    </div>
  )
}

export default TypeOfField
