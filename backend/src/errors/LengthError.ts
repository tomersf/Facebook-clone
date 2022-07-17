export default class InvalidLengthError extends Error {
  constructor(
    private min: number,
    private max: number,
    public propertyName: string,
    public status: number = 400
  ) {
    super(
      `The length of ${propertyName} is incorrect! please try between ${min} to ${max} chars`
    );
  }
}
