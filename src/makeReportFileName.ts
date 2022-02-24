export function makeReportFileName({ fileNameTemplate, currentDate }: { currentDate: Date; fileNameTemplate: string }) {
  const month = (currentDate.getMonth() + 1).toString();

  return fileNameTemplate
    .replace("${year}", currentDate.getFullYear().toString())
    .replace("${month}", month.padStart(2, "0"));
}
