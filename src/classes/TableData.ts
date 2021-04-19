export class TableData {
  public unit: string;
  public companyCode: string;
  public companyName: string;
  public project: string;
  public employees: Array<string>;

  constructor(
    unit: string,
    companyCode: string,
    companyName: string,
    project: string,
    employees: Array<string>
  ) {
    this.unit = unit;
    this.companyCode = companyCode;
    this.companyName = companyName;
    this.project = project;
    this.employees = employees;
  }
}
