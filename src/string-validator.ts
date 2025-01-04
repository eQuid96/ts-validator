import { ValidateLength, Validator } from "./validator.js";
import { ValidationError } from "./errors.js";
import type { LengthOptions } from "./types-utils.js";

export class StringValidator extends Validator<string> {
  private lenghtOptions: LengthOptions[] = [];

  public parse(value: unknown): string {
    if (typeof value !== "string") {
      ValidationError.StringExpected(value);
    }

    for (const lenghtOpt of this.lenghtOptions) {
      const error = ValidateLength(value, lenghtOpt);
      if (error) {
        throw error;
      }
    }
    return value;
  }

  public gt(value: number, message?: string): StringValidator {
    this.lenghtOptions.push({
      value,
      operand: ">",
      message,
    });
    return this;
  }

  public gte(value: number, message?: string): StringValidator {
    this.lenghtOptions.push({
      value,
      operand: ">=",
      message,
    });
    return this;
  }

  public ls(value: number, message?: string): StringValidator {
    this.lenghtOptions.push({
      value,
      operand: "<",
      message,
    });
    return this;
  }

  public lse(value: number, message?: string): StringValidator {
    this.lenghtOptions.push({
      value,
      operand: "<=",
      message,
    });
    return this;
  }

  public notEmpty(): StringValidator {
    return this.gt(0, "String is empty");
  }
}
