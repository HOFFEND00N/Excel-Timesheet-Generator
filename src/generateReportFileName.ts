export function generateReportFileName(currentDate: Date, companyUnit: string) {
  const month = (currentDate.getMonth() + 1).toString();

  return `${currentDate.getFullYear()}-${month.padStart(
    2,
    "0"
  )}-${companyUnit}.xls`;
}
