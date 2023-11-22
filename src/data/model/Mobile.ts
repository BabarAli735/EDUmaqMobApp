export interface SendOTPResponse {
  messageStatus: boolean;
  messageDescription: string;
  otp: string;
}
