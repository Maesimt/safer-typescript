import { success, failure } from "../../lib/result";
import type { Result } from "../../lib/result";
import { assertUnreachable } from "../../lib/unreachable";
import { receiptService, tableService } from "./mocks";

// ----------------------------------------
// Propagation of Result
// ----------------------------------------
const divide = (a: number, b: number): Result<string, number> => {
  if (b === 0) {
    return failure("Can't divide by zero");
  }
  return success(a / b);
};

// Presentation notes: Add the Result in the signature here.
// We see that the handling is then forced onto the caller.
const calculateAverageBill = (
  receiptTotal: number,
  numberOfPerson: number
): number => {
  const result = divide(receiptTotal, numberOfPerson);

  return result;
};

const Parent = (referenceNumber: number, table: number): number => {
  const total = receiptService.findTotal(referenceNumber);
  const nbPersons = tableService.findHowManyCustomersAtTable(4);

  return calculateAverageBill(total, nbPersons);
};
