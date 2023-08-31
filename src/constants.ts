export enum FIELD_TYPES {
  SELECT_DEFAULT = 'Select',
  EMAIL = 'email',
  FIRST_NAME = 'first name',
  LAST_NAME = 'last name',
  COUNTRY = 'country',
  CUSTOM = 'custom',
}

export const INPUT_TYPES = {
  [FIELD_TYPES.SELECT_DEFAULT]: 'xx',
  [FIELD_TYPES.EMAIL]: 'email',
  [FIELD_TYPES.FIRST_NAME]: 'text',
  [FIELD_TYPES.LAST_NAME]: 'text',
  [FIELD_TYPES.COUNTRY]: 'text',
  [FIELD_TYPES.CUSTOM]: 'text',
}

export interface StoredDataTypes {
  property: string | FIELD_TYPES
  value: string
  id: string
  isUnderEdition: boolean
}
