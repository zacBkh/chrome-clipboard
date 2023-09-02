import { FC } from 'react'

interface DataUserFeedbackProps {
  searchQuery: string
  onResetSearchQuery: () => void
  onAddInfoRequest: () => void
}

const DataUserFeedback: FC<DataUserFeedbackProps> = ({
  searchQuery,
  onResetSearchQuery,
  onAddInfoRequest,
}) => {
  const isStorageEmpty = !searchQuery.trim()

  return (
    <div className="text-center">
      <p className="lineBreak px-5">
        {isStorageEmpty
          ? "Seems you don't have data yet...😭"
          : `No matches for "${searchQuery}" 🤔`}
      </p>
      <p
        onClick={() =>
          isStorageEmpty ? onAddInfoRequest() : onResetSearchQuery()
        }
        className="text-purple-primary hover:underline cursor-pointer font-semibold"
      >
        {isStorageEmpty ? 'Try adding some.' : 'Clear filters.'}
      </p>
    </div>
  )
}

export default DataUserFeedback
