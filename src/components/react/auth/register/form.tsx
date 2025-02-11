/** @jsxImportSource react */
import { Form, Formik } from "formik";
import { useState } from "react";
import { registerSchema } from "../../../../utils/validation/schemas/authSchema";
import { connectAPI } from "../../../../utils/api/connectApi";
import { convertMessage } from "../../../../utils/messages";
import type { Alert as AlertType } from "../../../../types";
import Input from "../../common/input";
import Button from "../../common/button";
import Alert from "../../common/alert";

export default function RegisterForm() {
  const [alert, setAlert] = useState<AlertType | null>(null);

  return (
    <Formik
      initialValues={{
        email: "",
        username: "",
        password: "",
      }}
      validationSchema={registerSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        // Using connectAPI function
        const [error] = await connectAPI(
          "http://localhost:8080/v1/auth/register",
          {
            method: "POST",
            body: { ...values },
          }
        );

        if (error) {
          // Handle error message
          setAlert({
            message: convertMessage(error.message),
            type: "danger",
          });
        } else {
          // Handle success message and reset form
          setAlert({
            message: "ثبت نام شما باموفقیت انجام شد",
            type: "success",
          });
          resetForm();
        }

        setSubmitting(false);
      }}
    >
      {({ dirty, isValid, isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <Input
              classNames="form-input"
              name="email"
              label="ایمیل"
              withLabel
              isLtr
            />
          </div>

          <div>
            <Input
              classNames="form-input"
              name="username"
              label="نام کاربری"
              withLabel
              isLtr
            />
          </div>

          <div>
            <Input
              classNames="form-input"
              name="password"
              type="password"
              label="رمزعبور"
              withLabel
              isLtr
            />
          </div>

          <div className="mt-4">
            <Button
              type="submit"
              disabled={!(dirty && isValid)}
              loading={isSubmitting}
            >
              ثبت نام
            </Button>
          </div>

          <div className="mt-3">
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
