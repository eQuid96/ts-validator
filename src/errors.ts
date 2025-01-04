export class ValidationError {
  public static StringExpected(value: unknown): never {
    throw new Error(`Failed to parse value: ${value}. Expected a string, but received: ${typeof value}`);
  }

  public static NumberExpected(value: unknown): never {
    throw new Error(`Failed to parse value: ${value}. Expected a number, but received: ${typeof value}`);
  }

  public static ObjectExpected(value: unknown): never {
    throw new Error(
      `Failed to parse object. Expected an object, but received: ${value === null ? "null" : typeof value}`
    );
  }

  public static NumberPositive(value: number): never {
    throw new Error(`Failed to parse value: ${value}. Expected a positive number.`);
  }
  public static EnumExpected(value: unknown, validValues: Readonly<string[]>): never {
    throw new Error(`Failed to parse Enum value: ${value}. Valid values are: ${validValues.join(", ")}.`);
  }

  public static BoolExpected(value: unknown): never {
    throw new Error(`Failed to parse value: ${value}. Expected a boolean, but received: ${typeof value}`);
  }

  public static ObjectProperty(propName: string, errorMessage: string): never {
    throw new Error(`Failed to parse object property '${propName}'. ${errorMessage}`);
  }

  public static NotEmptyObject(value: unknown): never {
    throw new Error(`Failed to parse. Expected a non-empty object.`);
  }

  public static ArrayExpected(value: unknown): never {
    throw new Error(`Failed to parse value: ${value}. Expected an array, but received: ${typeof value}`);
  }
}
