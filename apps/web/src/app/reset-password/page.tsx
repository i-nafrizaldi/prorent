'use client';

import FormInput from '@/components/FormInput';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormik } from 'formik';
import { notFound, useSearchParams } from 'next/navigation';
import React from 'react';
import useResetPassword from '@/hooks/api/auth/useResetPassword';
import { ResetPasswordValidationSchema } from './validationSchema';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const ResetPassword: React.FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    notFound();
  }

  const { resetPassword, isLoading } = useResetPassword();
  const { handleBlur, handleChange, handleSubmit, errors, values, touched } =
    useFormik({
      initialValues: {
        password: '',
        confirmPassword: '',
      },

      validationSchema: ResetPasswordValidationSchema,
      onSubmit: ({ password }) => {
        resetPassword(password, token);
      },
    });

  return (
    <main className="container mx-auto px-4">
      <div className="mt-16 flex justify-center">
        <Card className="w-[350px] ">
          <CardHeader className="space-y-4">
            <CardTitle className="text-center text-2xl ">
              Reset Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <FormInput
                  name="password"
                  label="Password"
                  type="Password"
                  placeholder="Password"
                  error={errors.password}
                  isError={!!touched.password && !!errors.password}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.password}
                />
                <FormInput
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm Password"
                  error={errors.confirmPassword}
                  isError={
                    !!touched.confirmPassword && !!errors.confirmPassword
                  }
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.confirmPassword}
                />
                <Button
                  type="submit"
                  className=" mt-6 w-full text-white"
                  disabled={isLoading}
                >
                  {isLoading ?? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading ? ' Password reset' : 'Submit'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ResetPassword;
