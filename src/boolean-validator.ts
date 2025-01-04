import { Validator } from "./validator.js";
import { ValidationError } from "./errors.js";

export class BooleanValidator extends Validator<boolean> {
  public parse(value: unknown): boolean {
    if (typeof value !== "boolean") {
      ValidationError.BoolExpected(value);
    }
    return value;
  }
}
