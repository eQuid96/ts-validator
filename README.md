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

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

## Status

This project is currently in development.
