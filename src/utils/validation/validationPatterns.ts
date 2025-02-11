import * as yup from "yup";
import { isPassword, isUsername } from "./regex";

export const validationUsernamePattern = yup
  .string()
  .required("نام کاربری را وارد کنید")
  .matches(isUsername, {
    message:
      "نام کاربری باید بین ۳ تا ۳۰ کاراکتر باشد، با یکی از حروف یا اعداد آغاز شود، نباید شامل دو نقطه متوالی باشد و نباید با نقطه خاتمه یابد.",
  });

export const validationEmailPattern = yup
  .string()
  .required("ایمیل را وارد کنید")
  .email("ایمیل معتبر وارد کنید");

export const validationPasswordPattern = yup
  .string()
  .required("رمز عبور را وارد کنید")
  .matches(isPassword, {
    message:
      "طول: بین 8 تا 20 کاراکتر. باید شامل حداقل یک حرف کوچک (a-z)، یک حرف بزرگ (A-Z) و یک کاراکتر ویژه (مثلاً @$!%*?&) باشد.",
  });

export const validationUsernameOrEmailPattern = yup
  .string()
  .required("ایمیل یا نام کاربری را وارد کنید")
  .test(
    "username-or-email",
    "باید یک ایمیل یا نام کاربری معتبر وارد کنید",
    function (value) {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!value) return false;

      return isEmail.test(value) || isUsername.test(value);
    }
  );
