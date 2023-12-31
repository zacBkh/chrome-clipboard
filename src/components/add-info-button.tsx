import { FC } from 'react'

interface propsType {
  onAddInfoHandler: () => void
  step: number
  onAbortAdd: () => void
}

const AddInfoBtn: FC<propsType> = ({ onAddInfoHandler, onAbortAdd, step }) => {
  return (
    <button
      onClick={() => (step === 0 ? onAddInfoHandler() : onAbortAdd())}
      className={`${
        step >= 2 ? 'bg-purple-secondary' : 'bg-purple-primary'
      } font-semibold px-3 py-2 rounded-lg`}
    >
      {step === 0 ? 'Add values ' : 'Cancel'}
    </button>
  )
}

export default AddInfoBtn
