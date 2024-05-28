import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  categoty: Yup.string().required('Category is required'),
  thumbnail: Yup.string().min(1),
  description: Yup.string().required('Description is required'),
  content: Yup.string().required('Content is required'),
});
