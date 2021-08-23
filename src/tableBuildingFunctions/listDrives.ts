import { getDiskInfo } from "node-disk-info";
import path from "path";

export async function listDrives() {
  const drives = await getDiskInfo();
  return drives.map((drive) => `${drive.mounted}${path.sep}`);
}
