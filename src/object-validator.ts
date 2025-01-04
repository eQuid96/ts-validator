import { Validator, type Infer, type InferObject } from "./validator.js";
import { ValidationError } from "./errors.js";

export class ObjectValidator<T extends Record<string, Validator>> extends Validator<InferObject<T>> {
  constructor(public readonly fields: T) {
    super();
  }
  public parse(obj: unknown): Infer<this> {
    if (obj === null || typeof obj !== "object") {
      ValidationError.ObjectExpected(obj);
    }
    if (Object.keys(obj).length === 0) {
      ValidationError.NotEmptyObject(obj);
    }
    const objUnknown = obj as Record<string, unknown>;
    for (const [key, validator] of Object.entries(this.fields)) {
      const objValue = objUnknown[key];
      try {
        validator.parse(objValue);
      } catch (e: unknown) {
        if (e instanceof Error) {
          ValidationError.ObjectProperty(key, e.message);
        } else {
          throw e;
        }
      }
    }
    return obj as Infer<this>;
  }
}
