import { success, failure } from "../../lib/result";
import type { Result } from "../../lib/result";
import { assertUnreachable } from "../../lib/unreachable";
import { receiptService, tableService } from "./mocks";

// ----------------------------------
// Simplify
// -----------------------------------

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

  return divide(receiptTotal, numberOfPerson).mapError(
    () => AverageBillError.DivisionError
  );
};

const Parent = (referenceNumber: number, table: number): number | string => {
  const total = receiptService.findTotal(referenceNumber);
  const nbPersons = tableService.findHowManyCustomersAtTable(4);

  const result = calculateAverageBill(total, nbPersons);

  return result.withDefault("An error occured when we tried to split the bill");
};

console.log(Parent(123, 0));
