import { success, failure } from "../../lib/result";
import type { Result } from "../../lib/result";
import { assertUnreachable } from "../../lib/unreachable";

const receiptService = {
  findTotal: (a: number): number => 143,
};

const tableService = {
  findHowManyCustomersAtTable: (a: number): number => 0,
};

// ----------------------------------------
// Better modelisation of the error
// ----------------------------------------
const divide = (a: number, b: number): Result<string, number> => {
  if (b === 0) {
    return failure("Can't divide by zero");
  }
  return success(a / b);
};

// Presentation notes: Add the Result in the signature here.
// We see that the handling is then forced onto the caller.
export enum AverageBillError {
  BillIsTooHigh = "BillIsTooHigh",
  DivisionError = "DivisionError",
}

const calculateAverageBill = (
  receiptTotal: number,
  numberOfPerson: number
): Result<AverageBillError, number> => {
  if (receiptTotal > 1000) {
    return failure(AverageBillError.BillIsTooHigh);
  }

  const result = divide(receiptTotal, numberOfPerson);

  if (result.isError()) {
    return failure(AverageBillError.DivisionError);
  }

  return success(result.value);
};

const Parent = (referenceNumber: number, table: number): number | string => {
  const total = receiptService.findTotal(referenceNumber);
  const nbPersons = tableService.findHowManyCustomersAtTable(4);

  const result = calculateAverageBill(total, nbPersons);

  if (result.isError()) {
    switch (result.error) {
      case AverageBillError.BillIsTooHigh:
        return "The bill was too high to be shared.";
      case AverageBillError.DivisionError:
        return "A division error has occured."; // 400, Bill is too high.
    }
    // Crash when the if statement is not exhaustive.
    assertUnreachable(result.error);
  }

  return result.value;
};

console.log(Parent(123, 0));
