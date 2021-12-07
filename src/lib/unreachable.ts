export function assertUnreachable(a: never): never {
  throw new Error(
    "This code should not be reachable. You don't cover all your cases"
  );
}
