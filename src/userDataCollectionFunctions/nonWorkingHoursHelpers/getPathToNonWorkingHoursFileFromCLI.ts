import inquirer from "inquirer";
import inquirer_autocomplete_prompt from "inquirer-autocomplete-prompt";
import { searchFilesAndDirectories } from "../pathAutocompleteHelpers";

export async function getPathToNonWorkingHoursFileFromCLI(): Promise<string> {
  inquirer.registerPrompt("autocomplete", inquirer_autocomplete_prompt);
  console.log("Enter path to a excel file with non-working hours please ");
  const { pathToNonWorkingHoursFile } = await inquirer.prompt([
    {
      type: "autocomplete",
      name: "pathToNonWorkingHoursFile",
      message: "path: ",
      source: searchFilesAndDirectories,
      suggestOnly: true,
    },
  ]);
  return pathToNonWorkingHoursFile;
}
