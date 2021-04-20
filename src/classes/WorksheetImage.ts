export class WorksheetImage {
  path: string;
  column: number;
  row: number;

  constructor({
    path,
    column,
    row,
  }: {
    path: string;
    column: number;
    row: number;
  }) {
    this.path = path;
    this.column = column;
    this.row = row;
  }
}
