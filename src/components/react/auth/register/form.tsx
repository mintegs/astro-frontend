/** @jsxImportSource react */
import { Form, Formik } from 'formik'
import { API_ENDPOINTS } from '../../../../config'
import { connectAPI } from '../../../../utils/api/connectApi'
import { convertMessage } from '../../../../utils/messages'
import { registerSchema } from '../../../../utils/validation/schemas/authSchema'
import Button from '../../common/button'
import Input from '../../common/input'
import { useDialog } from '../../common/useDialog'

export default function RegisterForm() {
  const { showDialog } = useDialog()

  return (
    <Formik
      initialValues={{
        email: '',
        username: '',
        password: '',
      }}
      validationSchema={registerSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true)

        const [error] = await connectAPI(API_ENDPOINTS.AUTH.REGISTER, {
          method: 'POST',
          body: { ...values },
        })

        if (error) {
          showDialog({
            title: 'خطا در ثبت‌نام',
            description: convertMessage(error.message),
            variant: 'error',
          })
        } else {
          showDialog({
            title: 'ثبت‌نام با موفقیت',
            description: 'حساب کاربری شما با موفقیت ایجاد شد.',
            variant: 'success',
          })
          resetForm()
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
              label='ایمیل'
              withLabel
              isLtr
            />
          </div>

          <div>
            <Input
              classNames='form-input'
              name='username'
              label='نام کاربری'
              withLabel
              isLtr
            />
          </div>

          <div>
            <Input
              classNames='form-input'
              name='password'
              type='password'
              label='رمزعبور'
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
              ثبت نام
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
