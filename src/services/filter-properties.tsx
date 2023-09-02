import { StoredDataTypes } from '../constants'

const filterArray = (
  allStoredData: StoredDataTypes[],
  searchedQuery: string
) => {
  if (!searchedQuery.trim()) {
    return allStoredData
  } else {
    const filteredProperties = allStoredData.filter((prop) =>
      prop.property
        .trim()
        .toLowerCase()
        .includes(searchedQuery.trim().toLowerCase())
    )
    return filteredProperties
  }
}

export default filterArray
