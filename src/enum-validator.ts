import { Validator, type Infer } from "./validator.js";
import { ValidationError } from "./errors.js";

export class EnumValidator<T extends Readonly<string[]>> extends Validator<T[number]> {
  constructor(private readonly values: T) {
    super();
  }

  public parse(value: unknown): Infer<this> {
    if (typeof value !== "string") {
      ValidationError.EnumExpected(value, this.values);
    }
    if (!this.values.includes(value)) {
      throw ValidationError.EnumExpected(value, this.values);
    }
    return value as Infer<this>;
  }
}
