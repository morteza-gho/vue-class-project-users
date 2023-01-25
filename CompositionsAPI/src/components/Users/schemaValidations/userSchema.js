import * as yup from 'yup';

export const userSchema = yup.object({
   username: yup.string().required('username is required'),
   name: yup.string().required('name is required'),
   family: yup.string().required('family is required'),
   email: yup.string().required('email is required').email('enter a valid email'),
   phone: yup.string().required('phone is required').min(11, 'at least 11 digit').max(11, 'max 11 digit'),
   website: yup.string().required('website is required').matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'enter a valid url'
   ),
   address: yup.string().required('address is required')
})
