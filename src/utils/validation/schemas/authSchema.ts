import * as yup from "yup";
import {
  validationEmailPattern,
  validationPasswordPattern,
  validationUsernameOrEmailPattern,
  validationUsernamePattern,
} from "../validationPatterns";

export const registerSchema = yup.object().shape({
  email: validationEmailPattern,
  username: validationUsernamePattern,
  password: validationPasswordPattern,
});

export const loginSchema = yup.object().shape({
  email: validationUsernameOrEmailPattern,
  password: validationPasswordPattern,
});
