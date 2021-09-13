export function makeReportFileName({
  companyUnit,
  fileNameTemplate,
  currentDate,
}: {
  currentDate: Date;
  companyUnit: number;
  fileNameTemplate: string;
}) {
  const month = (currentDate.getMonth() + 1).toString();

  return fileNameTemplate
    .replace("${year}", currentDate.getFullYear().toString())
    .replace("${month}", month.padStart(2, "0"))
    .replace("${companyUnit}", companyUnit.toString());
}
