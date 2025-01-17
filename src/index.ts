import { BooleanValidator } from "./boolean-validator.js";
import { EnumValidator } from "./enum-validator.js";
import { NumberValidator } from "./number-validator.js";
import { ObjectValidator } from "./object-validator.js";
import { StringValidator } from "./string-validator.js";
import { ArrayValidator, type Validator } from "./validator.js";

export type { Infer } from "./validator.js";

export const v = {
  string: () => new StringValidator(),
  number: () => new NumberValidator(),
  boolean: () => new BooleanValidator(),
  array: <T extends Validator>(validator: T) => new ArrayValidator(validator),
  object: <T extends Record<string, Validator>>(fields: T) => new ObjectValidator(fields),
  enum: <TString extends string, T extends Readonly<[TString, ...TString[]]>>(values: T) => new EnumValidator(values),
  //literal string (enums)
};
