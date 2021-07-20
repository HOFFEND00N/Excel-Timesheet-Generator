export function generateReportFileName(currentDate: Date, companyUnit: number) {
  const month = (currentDate.getMonth() + 1).toString();

  return `${currentDate.getFullYear()}-${month.padStart(
    2,
    "0"
  )}-${companyUnit}.xlsx`;
}
