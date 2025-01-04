import { ValidateLength, Validator } from "./validator.js";
import { ValidationError } from "./errors.js";
import type { LengthOptions } from "./types-utils.js";

export class NumberValidator extends Validator<number> {
  private shouldBePositive?: boolean;
  private lenghtOptions: LengthOptions[] = [];

  public parse(value: unknown): number {
    if (typeof value !== "number") {
      ValidationError.NumberExpected(value);
    }
    if (this.shouldBePositive && value < 0) {
      throw ValidationError.NumberPositive(value);
    }

    for (const lenghtOpt of this.lenghtOptions) {
      const error = ValidateLength(value, lenghtOpt);
      if (error) {
        throw error;
      }
    }
    return value;
  }

  public gt(value: number, message?: string): NumberValidator {
    this.lenghtOptions.push({
      value,
      operand: ">",
      message,
    });
    return this;
  }

  public gte(value: number, message?: string): NumberValidator {
    this.lenghtOptions.push({
      value,
      operand: ">=",
      message,
    });
    return this;
  }

  public ls(value: number, message?: string): NumberValidator {
    this.lenghtOptions.push({
      value,
      operand: "<",
      message,
    });
    return this;
  }

  public lse(value: number, message?: string): NumberValidator {
    this.lenghtOptions.push({
      value,
      operand: "<=",
      message,
    });
    return this;
  }

  public positive(): NumberValidator {
    this.shouldBePositive = true;
    return this;
  }
}
