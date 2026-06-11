// broken
// export function calculateLateFee(daysOverdue: number): number {
//   return daysOverdue * 2;
// }

// works
// export function calculateLateFee(daysOverdue: number): number {
//   const fee = daysOverdue * 2;
//   if (fee > 10) {
//     return 10;
//   }
//   return fee;
// }

// works and clean!
export function calculateLateFee(daysOverdue: number): number {
  return Math.min(daysOverdue * 2, 10);
}
