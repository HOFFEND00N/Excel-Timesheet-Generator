export function makeReportFileName({
  companyUnit,
  reportFileName,
  currentDate,
}: {
  currentDate: Date;
  companyUnit: number;
  reportFileName: string;
}) {
  const month = (currentDate.getMonth() + 1).toString();

  return reportFileName
    .replace("${year}", currentDate.getFullYear().toString())
    .replace("${month}", month.padStart(2, "0"))
    .replace("${companyUnit}", companyUnit.toString());
}
