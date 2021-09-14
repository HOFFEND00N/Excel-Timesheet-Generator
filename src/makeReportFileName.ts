export function makeReportFileName({
  unit,
  fileNameTemplate,
  currentDate,
}: {
  currentDate: Date;
  unit: number;
  fileNameTemplate: string;
}) {
  const month = (currentDate.getMonth() + 1).toString();

  return fileNameTemplate
    .replace("${year}", currentDate.getFullYear().toString())
    .replace("${month}", month.padStart(2, "0"))
    .replace("${unit}", unit.toString());
}
