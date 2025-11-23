# TS Validator

TS Validator is a powerful TypeScript library for data validation, designed to be lightweight and dependency-free. It provides a simple and intuitive API for defining validation schemas and parsing data, ensuring your data structures are correct and type-safe.

With a focus on ease of use and strong typing, TS Validator allows you to infer TypeScript types directly from your validation schemas, bridging the gap between runtime validation and static type checking.

## Table of Contents

- [TS Validator](#ts-validator)
  - [Table of Contents](#table-of-contents)
  - [Key Features](#key-features)
  - [Getting Started](#getting-started)
  - [Validators](#validators)
    - [string](#string)
    - [number](#number)
    - [boolean](#boolean)
    - [object](#object)
    - [array](#array)
    - [enum](#enum)
    - [optional](#optional)
  - [Inferring Types](#inferring-types)
  - [License](#license)

## Key Features

- **Lightweight & Dependency-Free**: No external dependencies, ensuring a small footprint and easy integration.
- **Type-Safe**: Automatically infer TypeScript types from your schemas.
- **Extensible**: Easily create custom validators to suit your needs.
- **Comprehensive Validators**: A rich set of built-in validators for common data types.
- **Clear Error Messages**: Detailed and easy-to-understand error messages.

## Getting Started

Here's a quick example of how to use TS Validator to define a schema and parse data:

```typescript
import { v } from "ts-validator";

const userSchema = v.object({
  name: v.string().notEmpty(),
  age: v.number().positive(),
  email: v.string().optional(),
  isActive: v.boolean(),
});

try {
  const userData = userSchema.parse({
    name: "John Doe",
    age: 30,
    isActive: true,
  });
  console.log("Valid data:", userData);
} catch (error) {
  console.error("Validation error:", error.message);
}
```

## Validators

### string

Validates that a value is a string.

```typescript
v.string();
```

**Modifiers**

- `.notEmpty()`: Ensures the string is not empty.
- `.gt(number)`: Ensures the string length is greater than a given number.
- `.gte(number)`: Ensures the string length is greater than or equal to a given number.
- `.ls(number)`: Ensures the string length is less than a given number.
- `.lse(number)`: Ensures the string length is less than or equal to a given number.

### number

Validates that a value is a number.

```typescript
v.number();
```

**Modifiers**

- `.positive()`: Ensures the number is positive.
- `.gt(number)`: Ensures the number is greater than a given value.
- `.gte(number)`: Ensures the number is greater than or equal to a given value.
- `.ls(number)`: Ensures the number is less than a given value.
- `.lse(number)`: Ensures the number is less than or equal to a given value.

### boolean

Validates that a value is a boolean.

```typescript
v.boolean();
```

### object

Validates that a value is an object with a specific shape.

```typescript
v.object({
  key: v.string(),
  anotherKey: v.number(),
});
```

### array

Validates that a value is an array of a specific type.

```typescript
v.array(v.string());
```

### enum

Validates that a value is one of a set of predefined string values.

```typescript
v.enum(["admin", "user", "guest"]);
```

### optional

Marks a validator as optional. If the value is `null` or `undefined`, it will be considered valid.

```typescript
v.string().optional();
```

## Inferring Types

You can infer a TypeScript type from a schema using the `Infer` utility type. This is useful for ensuring type safety in your application.

```typescript
import { v, Infer } from "ts-validator";

//1. Define a schema
const userSchema = v.object({
  name: v.string(),
  age: v.number().optional(),
  posts: v.array(
    v.object({
      title: v.string(),
      content: v.string(),
    })
  ),
});

//2. Infer the type from the schema
type User = Infer<typeof userSchema>;

//3. The result of the infered type is the following:
type User = {
  name: string;
  age?: number | undefined;
  posts: {
    title: string;
    content: string;
  }[];
};
```

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.
