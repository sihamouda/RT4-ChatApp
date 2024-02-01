export const fields = [
  {
    type: 'text',
    label: 'FIRSTNAME',
    name: 'first_name',
    description: 'FIRSTNAME must contain more then 5 caracteres',
  },
  {
    type: 'text',
    label: 'LASTNAME',
    name: 'last_name',
    description: 'LASTNAME must contain more then 5 caracteres',
  },
  {
    type: 'text',
    label: 'USERNAME',
    name: 'username',
    description: 'USERNAME must contain more then 5 caracteres',
  },
  {
    type: 'text',
    label: 'EMAIL',
    name: 'email',
    description: 'Email Invalide',
  },
  {
    type: 'number',
    label: 'NUMBER PHONE',
    name: 'phonenumber',
    description: 'Phone number must be composed by 5 numbers',
  },
  {
    type: 'password',
    label: 'PASSWORD',
    name: 'password',
    description: 'The password must have at least 5 characters',
  },
  {
    type: 'password',
    label: 'CONFIRM PASSWORD',
    name: 'confirm_password',
    description: 'Your password need to be the same',
  },
];
