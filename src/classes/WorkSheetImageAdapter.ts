import { WorksheetImage } from "./WorksheetImage";

export class WorkSheetImageAdapter {
  type: string;
  path: string;
  position: Position;

  constructor(worksheetImage: WorksheetImage) {
    this.type = "picture";
    this.path = worksheetImage.path;
    this.position = {
      type: "oneCellAnchor",
      from: {
        row: worksheetImage.row,
        col: worksheetImage.column,
      },
    };
  }
}

interface Position {
  type: string;
  from: From;
}

interface From {
  col: number;
  row: number;
}
