import { FC } from 'react'

interface propsType {
  onAddInfoHandler: () => void
}

const AddInfoBtn: FC<propsType> = ({ onAddInfoHandler }) => {
  return (
    <button
      onClick={onAddInfoHandler}
      className="bg-[#7f5af0] font-semibold px-3 py-2 rounded-lg"
    >
      Add credential
    </button>
  )
}

export default AddInfoBtn
