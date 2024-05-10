export interface getCodeType {
  phoneNumber?: string
  email?: string
}

export interface APIResponse<T> {
  data: T;
  code: number;
  msg: string;
}