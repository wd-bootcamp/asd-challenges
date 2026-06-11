import { expect, it } from "vitest";
import { calculateLateFee } from "./library";

it("caps the maximum late fee at 10", () => {
  const fee = calculateLateFee(7);
  expect(fee).toBe(10);
});
