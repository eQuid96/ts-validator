export type Prettify<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K];
} & {};

export type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;

export type Expect<T extends true> = Equal<T, true>;

export type ExpectFalse<T extends false> = Equal<T, false>;

export type LengthOptions = {
  value: number;
  operand: ">" | "<" | ">=" | "<=" | "=";
  message?: string;
};
