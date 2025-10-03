# Testing Suite

This directory contains the test suite for the Live Stream Analytics Dashboard.

## Test Structure

- `lib/` - Database and utility function tests
- `api/` - API endpoint tests
- `components/` - React component tests
- `hooks/` - Custom React hooks tests

## Running Tests

\`\`\`bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- __tests__/api/streams.test.ts
\`\`\`

## Test Coverage

The test suite covers:

- Database operations (CRUD operations, queries)
- API endpoints (streams, analytics, realtime metrics)
- React components (rendering, user interactions)
- Custom hooks (data fetching, polling)

## Writing Tests

### API Tests

API tests use fetch to test endpoints. Make sure the development server is running:

\`\`\`bash
npm run dev
\`\`\`

### Component Tests

Component tests use React Testing Library:

\`\`\`typescript
import { render, screen } from "@testing-library/react"
import { MyComponent } from "@/components/my-component"

it("should render correctly", () => {
  render(<MyComponent />)
  expect(screen.getByText("Hello")).toBeInTheDocument()
})
\`\`\`

### Hook Tests

Hook tests use `renderHook` from React Testing Library:

\`\`\`typescript
import { renderHook } from "@testing-library/react"
import { useMyHook } from "@/hooks/use-my-hook"

it("should return data", () => {
  const { result } = renderHook(() => useMyHook())
  expect(result.current.data).toBeDefined()
})
