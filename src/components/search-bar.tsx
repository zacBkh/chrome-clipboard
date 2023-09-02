import { FC, useRef } from 'react'

import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'

interface SearchBarProps {
  searchQuery: string
  onTypeSearchBar: (searchQuery: string) => void
  onDeleteSearchQuery: () => void
}

const SearchBar: FC<SearchBarProps> = ({
  searchQuery,
  onTypeSearchBar,
  onDeleteSearchQuery,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const typeSearchHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onTypeSearchBar(evt.target.value)
  }

  return (
    <div className="relative flex justify-center items-center w-[90%] mt-4">
      <div className="z-50 absolute left-[2%]">
        <AiOutlineSearch className="mr-2 text-purple-primary w-[18px]" />
      </div>

      <input
        onChange={typeSearchHandler}
        value={searchQuery}
        ref={inputRef}
        placeholder="Search for a property name: address, birth date..."
        className="relative text-white bg-dark-secondary py-2 pl-10 pr-8 outline-none focus:outline-purple-primary outline-offset-1 rounded-lg !w-full"
      />

      {searchQuery.trim().length ? (
        <div
          onClick={() => {
            onDeleteSearchQuery()
            inputRef.current?.focus()
          }}
          className="absolute right-2 cursor-pointer"
        >
          <AiOutlineClose className="text-purple-primary w-[18px]" />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default SearchBar
