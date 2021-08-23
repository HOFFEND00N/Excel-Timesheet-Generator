import path from "path";
import { listDrives } from "../listDrives";
import { getDiskInfo } from "node-disk-info";

jest.mock("node-disk-info");

test("expect to return 2 drives", async () => {
  const expectedDrivesList = [`C:${path.sep}`, `D:${path.sep}`];

  (getDiskInfo as jest.Mock).mockReturnValue([
    { mounted: "C:" },
    { mounted: "D:" },
  ]);
  const actualDrivesList = await listDrives();

  expect(actualDrivesList).toEqual(expectedDrivesList);
});
