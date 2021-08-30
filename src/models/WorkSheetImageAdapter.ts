import { IWorksheetImage } from "./IWorksheetImage";

export class WorkSheetImageAdapter {
  type: string;
  path: string;
  position: IPosition;

  constructor(worksheetImage: IWorksheetImage) {
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

interface IPosition {
  type: string;
  from: IFrom;
}

interface IFrom {
  col: number;
  row: number;
}
