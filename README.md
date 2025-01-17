# TS Validator

TS Validator is a TypeScript library designed to provide robust validation for your data structures. This project aims to offer a comprehensive validation solution without any external dependencies. By keeping the library dependency-free, we ensure that it remains lightweight and easy to integrate into any TypeScript project.

## Features

- **TypeScript Support**: Fully written in TypeScript.
- **Dependency Free**: No external dependencies required.
- **Easy to Use**: Simple and intuitive API.

## Installation

Since this project is still in development, installation instructions will be provided once the first stable version is released.

## Usage

Here's a quick example of how to use TS Validator:

### Create and parse a schema

```typescript
import { v } from "ts-validator";

// Define a schema
const userSchema = v.object({
  name: v.string(),
  age: v.number().optional(),
  email: v.string().optional(),
  isActive: v.boolean(),
});

// Parse and validate data
try {
  const userData = userSchema.parse({
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com",
    isActive: true,
  });
  console.log("Valid data:", userData);
} catch (error) {
  console.error("Validation error:", error.message);
}
```

### Infer a type from a schema

```typescript
import { v, Infer } from "ts-validator";

//1. Define a schema

const TestSchema = v.object({
  name: v.string(),
  value: v.number(),
  flag: v.boolean(),
  nested: v.object({
    nestedName: v.string(),
    nestedValue: v.number(),
    op: v.string().optional(),
  }),
});

//2. Infer the type from the schema
type TestSchemaType = Infer<typeof TestSchema>;

//3. The result of the infered type is the following:

type TestSchemaType = {
  name: string;
  value: number;
  flag: boolean;
  nested: {
    nestedName: string;
    nestedValue: number;
    op?: string | undefined;
  };
};
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

## Status

This project is currently in development.

## Package Manager and Node.js Version

We use Yarn as our package manager and recommend using Node.js version 20.10.x.

```

```
