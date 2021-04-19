export class From {
  col: number;
  row: number;

  constructor(col: number, row: number) {
    this.row = row;
    this.col = col;
  }
}

export class Position {
  type: string;
  from: From;

  constructor(type: string, from: From) {
    this.type = type;
    this.from = new From(from.col, from.row);
  }
}

export class WorksheetImage {
  type: string;
  path: string;
  position: Position;

  constructor(type: string, path: string, position: Position) {
    this.type = type;
    this.path = path;
    this.position = new Position(position.type, position.from);
  }
}
