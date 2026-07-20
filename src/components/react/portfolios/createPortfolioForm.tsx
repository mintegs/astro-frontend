/** @jsxImportSource react */
import { Form, Formik } from "formik";
import Input from "../common/input";
import Button from "../common/button";

export default function CreatePortfolioForm() {
  return (
    <Formik
      initialValues={{
        title: "",
      }}
      onSubmit={async () => {}}
    >
      {({ dirty, isValid, isSubmitting, values }) => (
        <Form className="w-full">
          <div className="w-full flex gap-x-6">
            <Input name="title" placeholder="عنوان" />
            <Button
              disabled={!(dirty && isValid)}
              loading={isSubmitting}
              block={false}
              color="btn-primary"
              type="button"
            >
              ثبت
            </Button>
          </div>
          <div className="w-full my-2">
            <p className="text-sm" style={{ color: 'var(--gh-fg-muted)' }}>
              کاراکتر ({values.title.length}/25)
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
}
