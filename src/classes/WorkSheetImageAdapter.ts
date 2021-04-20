import { WorksheetImage } from "./WorksheetImage";

export class WorkSheetImageAdapter {
  type: string;
  path: string;
  position: Position;

  constructor(worksheetImage: WorksheetImage) {
    this.type = "picture";
    this.path = worksheetImage.path;
    this.position = new Position({
      type: "oneCellAnchor",
      from: new From({
        row: worksheetImage.row,
        column: worksheetImage.column,
      }),
    });
  }
}

class Position {
  type: string;
  from: From;

  constructor({ type, from }: { type: string; from: From }) {
    this.type = type;
    this.from = new From({ row: from.row, column: from.col });
  }
}

class From {
  col: number;
  row: number;

  constructor({ row, column }: { column: number; row: number }) {
    this.row = row;
    this.col = column;
  }
}
