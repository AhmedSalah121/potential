# Store Backend API

A TypeScript/Node.js API for an e-commerce store using:
- Domain-Driven Design (DDD) architecture
- Object-Oriented Programming (OOP) principles
- Test-Driven Development (TDD) with Jest
- PostgreSQL with Prisma ORM

## Project Structure

The project follows a DDD architecture with the following layers:

- **Domain Layer**: Contains business logic and entities
  - `entities`: Core business objects (Product, Category, etc.)
  - `repositories`: Interfaces for data access

- **Application Layer**: Contains use cases and orchestrates domain logic
  - `usecases`: Application-specific business rules
  - `dtos`: Data transfer objects for API responses

- **Infrastructure Layer**: Contains technical implementations
  - `database`: Database connection and configuration
  - `repositories`: Implementations of repository interfaces

- **Interfaces Layer**: Contains API endpoints and controllers
  - `controllers`: Request handling logic
  - `routes`: API route definitions
  - `middlewares`: Request/response middleware

## Data Access Pattern

This API implements a flexible fetch/save pattern:

- **Fetch with Options**: Retrieve data with customizable options
  - Filter by various properties (category, active status, etc.)
  - Pagination support with limit and offset
  - Easily extendable for additional filters

- **Save with Upsert**: Unified method to create or update entities
  - Automatically determines whether to insert or update
  - Simplifies data persistence logic

## API Endpoints

WIP

## Testing

Tests are written using Jest and follow TDD principles:

- Unit tests: Test individual components in isolation
- Integration tests: Test interactions between components

Run tests with:
```
npm test
```

## Development

Start the development server:
```
npm run dev
```

## Database

The application uses PostgreSQL with Prisma ORM. Run migrations:
```
npm run db-push
```

Seed the database:
```
npm run seed
```
