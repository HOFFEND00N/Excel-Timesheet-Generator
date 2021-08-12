import inquirer from "inquirer";
import xlsx from "xlsx";
import { OUTPUT_FORMAT_ARRAY_OF_ARRAYS } from "../constants/constant";
import inquirer_autocomplete_prompt from "inquirer-autocomplete-prompt";
import fs from "fs";
import { spawn } from "child_process";
import fuzzy from "fuzzy";

export async function getNonWorkingHoursFile(): Promise<string[][]> {
  inquirer.registerPrompt("autocomplete", inquirer_autocomplete_prompt);
  console.log("Enter path to a excel file with non-working hours please ");
  const { nonWorkingHoursFilePath } = await inquirer.prompt([
    {
      type: "autocomplete",
      name: "nonWorkingHoursFilePath",
      message: "path: ",
      source: searchFilesAndDirectories,
      suggestOnly: true,
    },
  ]);
  const nonWorkingHoursFile = xlsx.readFile(nonWorkingHoursFilePath, {
    cellText: false,
    cellDates: true,
  });

  const nonWorkingHoursFileSheetName = nonWorkingHoursFile.SheetNames[0];
  const workSheet = nonWorkingHoursFile.Sheets[nonWorkingHoursFileSheetName];

  const nonWorkingHoursRows: string[][] = xlsx.utils.sheet_to_json(workSheet, {
    defval: "",
    header: OUTPUT_FORMAT_ARRAY_OF_ARRAYS,
    raw: false,
    blankrows: false,
    dateNF: 'dd"."mm"."yyyy',
  });

  return nonWorkingHoursRows.map(removeEmptyCellAtTheBeginning);
}

function removeEmptyCellAtTheBeginning(row: string[]) {
  return row.splice(row.findIndex((value) => value !== ""));
}

function searchFilesAndDirectories(previousAnswers, input) {
  input = input || "";
  return new Promise((resolve) => {
    let files;
    try {
      if (input == "") files = listDrives();
      else {
        files = findSuitableFilesAndDirectories(input);
      }
    } catch (error) {
      if (error.code == "ENOENT") files = [];
    }
    resolve(files);
  });
}

function listDrives() {
  const list = spawn("cmd");

  return new Promise<string[]>((resolve, reject) => {
    list.stdout.on("data", function (data) {
      const output = String(data);
      const out = output
        .split("\r\n")
        .map((e) => e.trim())
        .filter((e) => e != "");
      if (out[0] === "Name") {
        resolve(out.slice(1).map((str) => str.concat("/")));
      }
    });

    list.stderr.on("data", function (data) {
      console.log("stderr: " + data);
    });

    list.on("exit", function (code) {
      if (code !== 0) {
        reject(code);
      }
    });

    list.stdin.write("wmic logicaldisk get name\n");
    list.stdin.end();
  });
}

function findSuitableFilesAndDirectories(searchPath: string) {
  const alreadyDefinedPath = searchPath.slice(
    0,
    searchPath.lastIndexOf("/") + 1
  );
  const filesAndDirectories = fs
    .readdirSync(alreadyDefinedPath)
    .map((element) => alreadyDefinedPath.concat(element));
  const results = fuzzy.filter(searchPath, filesAndDirectories);
  const suitableFilesAndFolders = results.map((fileOrFolder) => {
    const path = fileOrFolder.string;
    if (fs.existsSync(path) && fs.lstatSync(path).isDirectory())
      return path.concat("/");
    return path;
  });
  return suitableFilesAndFolders;
}
