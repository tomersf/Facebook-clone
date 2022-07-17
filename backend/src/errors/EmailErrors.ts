export class InvalidEmailError extends Error {
  constructor(public status: number = 400) {
    super("Invalid email address!");
  }
}

export class EmailExistsError extends Error {
  constructor(public status: number = 400) {
    super("The email address already exists!");
  }
}
