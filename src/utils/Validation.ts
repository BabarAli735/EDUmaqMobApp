export function isNullOrEmpty(value?: string): boolean {
  return value ? value.trim().length === 0 : true;
}

export function isValidMobile(value?: string): boolean {
  return isNullOrEmpty(value) ? false : value ? value?.length === 10 : false;
}

export function isValidEmail(value?: string): boolean {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return isNullOrEmpty(value) ? false : regex.test(value!) === true;
}

export function isValidOTP(value?: string): boolean {
  return isNullOrEmpty(value) ? false : value?.length === 6;
}
