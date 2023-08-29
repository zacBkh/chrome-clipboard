import { FC } from 'react'
import { FIELD_TYPES } from '../constants'

import { BiCopy } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'

import { handleCopyClick } from './services/utils'
import { deleteChromeStorage } from './services/chrome-storage'

interface InfoDisplayerProps {
  fieldType: FIELD_TYPES
  data: string
}

const InfoDisplayer: FC<InfoDisplayerProps> = ({ fieldType, data }) => {
  const style = 'p-2 bg-transparent hover:bg-[#a2a3a35c] cursor-pointer rounded'

  return (
    <div className="flex gap-x-4 items-center w-full justify-between mx-auto">
      {/* <p>{fieldType}</p> */}
      <p>{data}</p>
      <div className="text-white flex items-center">
        <div onClick={() => handleCopyClick(data)} className={style}>
          <BiCopy />
        </div>
        <div onClick={() => deleteChromeStorage(fieldType)} className={style}>
          <AiOutlineDelete />
        </div>
      </div>
    </div>
  )
}

export default InfoDisplayer
