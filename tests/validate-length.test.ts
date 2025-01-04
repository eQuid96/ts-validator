import { expect, test } from "vitest";
import { ValidateLength } from "../src/validator";

test("ValidateLength", () => {
  expect(ValidateLength(5, { value: 5, operand: ">" })).toBeInstanceOf(Error);
  expect(ValidateLength(5, { value: 5, operand: ">=" })).toBeUndefined();

  expect(ValidateLength(0, { value: 5, operand: "=" })).toBeInstanceOf(Error);
  expect(ValidateLength(5, { value: 5, operand: "=" })).toBeUndefined();

  expect(ValidateLength(200, { value: 1, operand: "<" })).toBeInstanceOf(Error);
  expect(ValidateLength(0, { value: 10, operand: "<" })).toBeUndefined();

  expect(ValidateLength([1, 2], { value: 1, operand: ">" })).toBeUndefined();
  expect(ValidateLength([], { value: 5, operand: ">" })).toBeInstanceOf(Error);
});
