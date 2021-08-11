export function makeXlsxFile(workBook, reportName: string) {
  return new Promise<void>((resolve, reject) => {
    workBook.write(reportName, (error) => {
      if (error) reject(error);
      resolve();
    });
  });
}
