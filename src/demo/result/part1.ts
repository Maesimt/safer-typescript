import { receiptService, tableService } from "./mocks";

// -----------------------------------------
// Exception are not handled anywhere, oups!
// -----------------------------------------
const divide = (a: number, b: number): number => {
  if (b === 0) {
    throw new Error("Can't divide by zero");
  }
  return a / b;
};

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

console.log(Parent(123, 0));
