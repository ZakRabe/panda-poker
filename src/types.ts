import { CONST_COMMON_OPTIONS, CONST_EMPTY_OPTION, CONST_FIB_OPTIONS } from './const'

type Model = {
  id: string;
};

export type UserDto = {
  name: string;
  img?: string;
};
export type User = UserDto & Model;

export type RoundChoice =
  | typeof CONST_EMPTY_OPTION
  | typeof CONST_COMMON_OPTIONS[number]
  | typeof CONST_FIB_OPTIONS[number];

export type GameDto = {
  name: string;
  revealed: boolean;
  players: Record<string, RoundChoice>;
};
export type Game = GameDto & Model;
