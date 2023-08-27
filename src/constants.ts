export enum FIELD_TYPES {
  EMAIL = 'email',
  FIRST_NAME = 'first name',
  LAST_NAME = 'last name',
  COUNTRY = 'country',
}

export const INPUT_TYPES = {
  [FIELD_TYPES.EMAIL]: 'email',
  [FIELD_TYPES.FIRST_NAME]: 'text',
  [FIELD_TYPES.LAST_NAME]: 'text',
  [FIELD_TYPES.COUNTRY]: 'text',
}
