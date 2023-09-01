import { StoredDataTypes } from '../constants'

const filterArray = (
  allStoredData: StoredDataTypes[],
  searchedQuery: string
) => {
  if (!searchedQuery) {
    console.log('1', 1)
    return allStoredData
  } else {
    const filteredProperties = allStoredData.filter((prop) =>
      prop.property
        .trim()
        .toLowerCase()
        .includes(searchedQuery.trim().toLowerCase())
    )
    console.log('2', 2)
    return filteredProperties
  }
}

export default filterArray
