export class DatabaseConnectionError extends Error {
  constructor() {
    super();
    this.message = 'Error Connecting to Database';
    this.name = 'DatabaseConnectionError';
  }
}
