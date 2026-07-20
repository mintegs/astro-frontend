/** @jsxImportSource react */
import { Form, Formik } from 'formik'
import { API_ENDPOINTS } from '../../../../config'
import { connectAPI } from '../../../../utils/api/connectApi'
import { convertMessage } from '../../../../utils/messages'
import { loginSchema } from '../../../../utils/validation/schemas/authSchema'
import Button from '../../common/button'
import Input from '../../common/input'
import { useDialog } from '../../common/useDialog'

export default function LoginForm() {
  const { showDialog } = useDialog()

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true)

        const [error] = await connectAPI(API_ENDPOINTS.AUTH.LOGIN, {
          method: 'POST',
          body: { ...values },
        })

        if (error) {
          showDialog({
            title: 'خطا در ورود',
            description: convertMessage(error.message),
            variant: 'error',
          })
        } else {
          window.location.href = '/'
        }

        setSubmitting(false)
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
              disabled={!(dirty && isValid) || isSubmitting}
              loading={isSubmitting}
            >
              ورود
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
