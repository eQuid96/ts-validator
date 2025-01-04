import { expect, test } from "vitest";
import { v, Infer } from "../src/index";
import type { Expect, Equal, ExpectFalse } from "../src/types-utils";

test("BooleanValidator", () => {
  const validator = v.boolean();

  expect(validator.parse(true)).toBe(true);
  expect(() => validator.parse("hello")).toThrow(
    "Failed to parse value: hello. Expected a boolean, but received: string"
  );
  expect(() => validator.parse(undefined)).toThrow(
    "Failed to parse value: undefined. Expected a boolean, but received: undefined"
  );

  const optionalValidator = v.boolean().optional();
  expect(optionalValidator.parse(true)).toBe(true);
  expect(optionalValidator.parse(undefined)).toBeUndefined();
});

test("NumberValidator", () => {
  const validator = v.number();

  expect(validator.parse(42)).toBe(42);
  expect(() => validator.parse("hello")).toThrow(
    "Failed to parse value: hello. Expected a number, but received: string"
  );
  expect(() => validator.parse(undefined)).toThrow(
    "Failed to parse value: undefined. Expected a number, but received: undefined"
  );

  const minMaxValidator = v.number().gt(2).ls(5);
  expect(minMaxValidator.parse(3)).toBe(3);
});

// StringValidator Tests
test("StringValidator", () => {
  const validator = v.string();

  expect(validator.parse("hello")).toBe("hello");
  expect(() => validator.parse(null)).toThrow();
  expect(() => validator.parse({})).toThrow();
  expect(() => validator.parse([])).toThrow();
  expect(() => validator.parse(true)).toThrow();
  expect(() => validator.parse([1, 42])).toThrow();
  expect(() => validator.parse(42)).toThrow("Failed to parse value: 42. Expected a string, but received: number");
  expect(() => validator.parse(undefined)).toThrow(
    "Failed to parse value: undefined. Expected a string, but received: undefined"
  );

  // const minMaxLengthValidator = v.string().min(2).max(5);
  // expect(minMaxLengthValidator.parse("hello")).toBe("hello");
  // expect(() => minMaxLengthValidator.parse("h")).toThrow();
  // expect(() => minMaxLengthValidator.parse("hello world")).toThrow(
  //   "Failed to parse value: hello world. Max length is: 5."
  // );

  // const minWithMsg = v.string().min(2, "Min Custom message");
  // expect(() => minWithMsg.parse("h")).toThrow("Min Custom message");

  // const maxWithMsg = v.string().max(3, "Max Custom message");
  // expect(() => maxWithMsg.parse("hello")).toThrow("Max Custom message");

  // const notEmptyValidator = v.string().notEmpty();
  // expect(notEmptyValidator.parse("hello")).toBe("hello");
  // expect(() => notEmptyValidator.parse("")).toThrow("String is empty");
});

test("OptionalValidator", () => {
  const validator = v.string().optional();

  expect(validator.parse("optional")).toBe("optional");
  expect(validator.parse(undefined)).toBeUndefined();
  expect(() => validator.parse(42)).toThrow("Failed to parse value: 42. Expected a string, but received: number");
});

test("ArrayValidator", () => {
  const validator = v.array(v.string());

  expect(validator.parse(["hello", "world"])).toEqual(["hello", "world"]);
  expect(() => validator.parse(["hello", 42])).toThrow(
    "Failed to parse value: 42. Expected a string, but received: number"
  );
  expect(() => validator.parse("not an array")).toThrow(
    "Failed to parse value: not an array. Expected an array, but received: string"
  );
});

test("ObjectValidator", () => {
  const validator = v.object({ name: v.string(), age: v.number() });

  expect(validator.parse({ name: "John", age: 30 })).toStrictEqual({ name: "John", age: 30 });
  expect(() => validator.parse({ name: "John", age: "thirty" })).toThrow(
    "Failed to parse value: thirty. Expected a number, but received: string"
  );
  expect(() => validator.parse("not an object")).toThrow(
    "Failed to parse object. Expected an object, but received: string"
  );

  const optionalValidator = v.object({ name: v.string(), age: v.number().optional() });
  expect(optionalValidator.parse({ name: "John" })).toStrictEqual({ name: "John" });
});

test("InferType", () => {
  const TestSchema = v.object({
    name: v.string(),
    value: v.number(),
    flag: v.boolean(),
    nested: v.object({
      nestedName: v.string(),
      nestedValue: v.number(),
      a: v.string().optional(),
    }),
  });

  type TestSchemaType = Infer<typeof TestSchema>;

  let a: TestSchemaType = {
    name: "John",
    value: 42,
    flag: true,
    nested: {
      nestedName: "Nested",
      nestedValue: 100,
    },
  };

  type Test = Expect<
    Equal<
      TestSchemaType,
      {
        name: string;
        value: number;
        flag: boolean;
        nested: {
          nestedName: string;
          nestedValue: number;
          a?: string | undefined;
        };
      }
    >
  >;
});

test("EnumValidator", () => {
  const validator = v.enum(["a", "b", "c"]);

  expect(validator.parse("a")).toBe("a");
  expect(validator.parse("b")).toBe("b");
  expect(validator.parse("c")).toBe("c");
  expect(() => validator.parse("d")).toThrow("Failed to parse Enum value: d. Valid values are: a, b, c.");
  expect(() => validator.parse(42)).toThrow("Failed to parse Enum value: 42. Valid values are: a, b, c.");
  expect(() => validator.parse(undefined)).toThrow();
  expect(() => validator.parse({})).toThrow();
  expect(() => validator.parse(null)).toThrow();

  type Schema = Infer<typeof validator>;
  type Test = Expect<Equal<Schema, "a" | "b" | "c">>;
});
