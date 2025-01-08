/** @jsxImportSource react */
import { Form, Formik } from "formik";
import Input from "../common/input";
import Button from "../common/button";

export default function CreateAssetForm() {
  return (
    <Formik
      initialValues={{
        title: "",
        price:0,
        amount: 0,
        dateBuy: new Date().toISOString(),
        dateSell: new Date().toISOString(),
        sellTarget: 20
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {}}
    >
      {({ dirty, isValid, isSubmitting, values }) => (
        <Form className="w-full">
            <div className="w-full mb-3">
                <Input name="title" label="عنوان" withLabel />
            </div>
            <div className="w-full mb-3">
                <Input name="amount" label="مقدار" withLabel />
            </div>
            <div className="w-full mb-3">
                <Input name="price" label="قیمت (USD)" withLabel />
            </div>
            <div className="w-full mb-3">
                <Input name="dateBuy" label="تاریخ خرید" withLabel />
            </div>
            <div className="w-full mb-3">
                <Input name="dateSell" label="تاریخ فروش" withLabel />
            </div>
            <div className="w-full mb-3">
                <Input name="sellTarget" label="هدف قیمتی فروش (USD)" withLabel />
            </div>
            
            <Button
              disabled={!(dirty && isValid)}
              loading={isSubmitting}
              color="bg-[#556ee6]"
              type="button"
            >
              ثبت
            </Button>
        </Form>
      )}
    </Formik>
  );
}
