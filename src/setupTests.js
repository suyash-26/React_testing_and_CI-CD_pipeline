import "@testing-library/jest-dom";
import { server } from "./mocks/server";

// start server before tests
beforeAll(() => server.listen());

// reset handlers after each test
afterEach(() => server.resetHandlers());

// close after all tests
afterAll(() => server.close());