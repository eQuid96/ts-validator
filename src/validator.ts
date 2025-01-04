import { ValidationError } from "./errors.js";
import type { LengthOptions, Prettify } from "./types-utils.js";

//Infer object validator by merging all fields and adding ? to the key if the field is optional
export type InferObject<T extends Record<string, Validator>> = Prettify<
  {
    // this side create a type only field that are required removing OptionalValidator
    [K in keyof T as T[K] extends OptionalValidator<infer U> ? never : K]: Infer<T[K]>;
  } & {
    // this side instead create a type only for the field that are optional adding ? to the key
    [K in keyof T as T[K] extends OptionalValidator<infer U> ? K : never]?: Infer<T[K]>;
  }
>;

export type Infer<T extends Validator<any>> = T["_output"];

export abstract class Validator<Output = any> {
  readonly _output!: Output;

  abstract parse(value: unknown): Infer<this>;

  public optional(): OptionalValidator<this> {
    return new OptionalValidator(this);
  }

  public array(): ArrayValidator<this> {
    return new ArrayValidator(this);
  }
}

export class ArrayValidator<T extends Validator> extends Validator<Array<T["_output"]>> {
  constructor(private readonly validator: T) {
    super();
  }

  public parse(value: unknown): Array<Infer<this>> {
    if (!Array.isArray(value)) {
      ValidationError.ArrayExpected(value);
    }
    for (const val of value) {
      this.validator.parse(val);
    }
    return value as Array<Infer<T>>;
  }
}

export class OptionalValidator<T extends Validator> extends Validator<T["_output"] | undefined> {
  constructor(private readonly validator: T) {
    super();
  }

  public parse(value: unknown): Infer<T> | undefined {
    if (value === undefined || value === null) {
      return undefined;
    }
    return this.validator.parse(value);
  }
}

export function ValidateLength<T>(value: string | number | ReadonlyArray<T>, options: LengthOptions) {
  let len = 0;
  if (typeof value === "number") {
    len = value;
  } else {
    len = value.length;
  }

  switch (options.operand) {
    case ">":
      if (len <= options.value) {
        return new Error(`Length must be greater than ${options.value}`);
      }
      break;
    case "<":
      if (len >= options.value) {
        return new Error(`Length must be less than ${options.value}`);
      }
      break;
    case ">=":
      if (len < options.value) {
        return new Error(`Length must be greater than or equal to ${options.value}`);
      }
      break;
    case "<=":
      if (len > options.value) {
        return new Error(`Length must be less than or equal to ${options.value}`);
      }
      break;
    case "=":
      if (len !== options.value) {
        return new Error(`Length must be equal to ${options.value}`);
      }
      break;
    default:
      throw new Error("Invalid operand");
  }
}
