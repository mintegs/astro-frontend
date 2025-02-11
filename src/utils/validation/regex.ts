export const isUsername = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{2,30}$/;
export const isPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,20}$/;
