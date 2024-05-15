import {Direction} from "../../Types/RegisterPatternType.ts";

export interface LoginApiType {
  phoneNumber?: string,
  email?: string,
  password: string,
  registerPattern: Direction
}