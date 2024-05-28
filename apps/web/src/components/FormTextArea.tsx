'use client';

import { FormikHandlers } from 'formik';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface FormInputProps {
  name: string;
  label: string;
  placeholder: string;
  handleChange: FormikHandlers['handleChange'];
  handleBlur: FormikHandlers['handleBlur'];
  value: string;
  isError: boolean;
  error: string | undefined;
}

const FormTextArea: React.FC<FormInputProps> = ({
  name,
  label,
  placeholder,
  handleChange,
  handleBlur,
  value,
  isError,
  error,
}) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={name} className={isError ? 'text-red-500' : 'text-black'}>
        {label}
      </Label>
      <Textarea
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        onBlur={handleBlur}
        style={{ resize: 'none' }}
        rows={4}
      />
      {isError ? <div className="text-xs text-red-500">{error}</div> : null}
    </div>
  );
};

export default FormTextArea;
