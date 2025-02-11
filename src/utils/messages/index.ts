export function convertMessage(value: string): string {
  return messages[value] || value; // Return the mapped value or the original message if not found
}

const messages: { [key: string]: string } = {
  "email already exist": "ایمیل قبلا ثبت شده است",
  "username already exist": "نام کاربری قبلا ثبت شده است",
  "please verify your entered information and try again":
    "لطفا از درست بودن اطلاعات وارد شده اطمینان حاصل نمایید",
};
