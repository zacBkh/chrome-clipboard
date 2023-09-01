export enum FIELD_TYPES {
  SELECT_DEFAULT = 'Select',
  EMAIL = 'email',
  FIRST_NAME = 'first name',
  LAST_NAME = 'last name',
  COUNTRY = 'country',
  CUSTOM = 'custom',
}

export const PLACEHOLDER_LOOKUP = {
  // [FIELD_TYPES.SELECT_DEFAULT]: 'xx',
  [FIELD_TYPES.EMAIL]: 'alex@gmail.com',
  [FIELD_TYPES.FIRST_NAME]: 'Alex',
  [FIELD_TYPES.LAST_NAME]: 'Taylor',
  [FIELD_TYPES.COUNTRY]: 'United States',
  [FIELD_TYPES.CUSTOM]: '123-45-6789',
}

export interface StoredDataTypes {
  property: string | FIELD_TYPES
  value: string
  id: string
  isUnderEdition: boolean
}

export const OPTIONS_SELECT = [
  { storageName: 'custom', displayName: 'Custom' },
  { storageName: 'email', displayName: 'E-Mail' },
  { storageName: 'first name', displayName: 'First name' },
  { storageName: 'last name', displayName: 'Surname' },
  { storageName: 'country', displayName: 'Country' },
]
