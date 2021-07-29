export function makeXlsxFile(workBook, reportName: string) {
  return new Promise((resolve) => {
    workBook.write(reportName, resolve);
  });
}
