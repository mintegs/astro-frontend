/** @jsxImportSource react */
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { loginSchema } from '../../../../utils/validation/schemas/authSchema';
import { convertMessage } from '../../../../utils/messages';
import { connectAPI } from '../../../../utils/api/connectApi';
import { API_ENDPOINTS } from '../../../../config';
import type { AlertProps } from '../../../../types';
import Input from '../../common/input';
import Button from '../../common/button';
import Alert from '../../common/alert';

export default function LoginForm() {
  const [alert, setAlert] = useState<AlertProps | null>(null);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        const [error] = await connectAPI(API_ENDPOINTS.AUTH.LOGIN, {
          method: 'POST',
          body: { ...values },
        });

        if (error) {
          setAlert({
            message: convertMessage(error.message),
            type: 'danger',
          });
        } else {
          resetForm();
          window.location.href = '/';
        }

        setSubmitting(false);
      }}
    >
      {({ dirty, isValid, isSubmitting }) => (
        <Form className='space-y-4'>
          <div>
            <Input
              classNames='form-input'
              name='email'
              label='ایمیل یا نام کاربری'
              withLabel
              isLtr
            />
          </div>

          <div>
            <Input
              classNames='form-input'
              name='password'
              type='password'
              label='رمز عبور'
              withLabel
              isLtr
            />
          </div>

          <div className='mt-4'>
            <Button
              type='submit'
              disabled={!(dirty && isValid)}
              loading={isSubmitting}
            >
              ورود
            </Button>
          </div>

          <div className='mt-3'>
            {alert && (
              <Alert
                message={alert.message}
                type={alert.type}
                onClose={() => setAlert(null)}
              />
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}
