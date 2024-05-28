'use client';
import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useRegister from '@/hooks/api/auth/useRegister';
import { appConfig } from '@/utils/config';
import { useFormik } from 'formik';
import { RegisterValidationSchema } from './validationSchema';

const Register = () => {
  const { register } = useRegister();

  const { baseUrl } = appConfig;

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
    },

    validationSchema: RegisterValidationSchema,

    onSubmit: (values) => {
      register(values);
    },
  });
  return (
    <main className="container mx-auto">
      <div className="flex justify-center">
        <Card className="w-[450px] rounded-lg">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-primary mb-5">
              Welcome to Sosmek
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid w-full items-center gap-4">
                {/* NAME */}
                <FormInput
                  name="fullName"
                  label="Full Name"
                  error={formik.errors.fullName}
                  isError={
                    !!formik.touched.fullName && !!formik.errors.fullName
                  }
                  handleBlur={formik.handleBlur}
                  handleChange={formik.handleChange}
                  placeholder="name"
                  type="text"
                  value={formik.values.fullName}
                />

                {/* EMAIL */}
                <FormInput
                  name="email"
                  label="Email"
                  error={formik.errors.email}
                  isError={!!formik.touched.email && !!formik.errors.email}
                  handleBlur={formik.handleBlur}
                  handleChange={formik.handleChange}
                  placeholder="email"
                  type="email"
                  value={formik.values.email}
                />

                {/* PASSWORD */}
                <FormInput
                  name="password"
                  label="Password"
                  error={formik.errors.password}
                  isError={
                    !!formik.touched.password && !!formik.errors.password
                  }
                  handleBlur={formik.handleBlur}
                  handleChange={formik.handleChange}
                  placeholder="password"
                  type="password"
                  value={formik.values.password}
                />
              </div>
              <Button className="mt-6 w-full" type="submit">
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Register;
