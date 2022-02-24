# Excel timesheet generator

## Prerequisites

- node
- npm
- git

## Setup

- clone repository `git clone https://stashosl.firmglobal.com/scm/~ivan.petrov/excel-timesheet-generator.git`
- run `npm install`

## Workflow
Application can create single report. If several teams specified inside teams array in config there will 
be grouped by team employees in table separated by empty line and common pivot table for all employees in config. 

- setup config file with needed info
- `npm run start`
- follow program instructions
- generated excel file can be found in the root of the project

## Attention

You can configure environmental variables to store there login and password,
and don't enter them every time. Environmental variables key should be specified in config in credentials object.
Password should be encoded in base64 format. 

In case of wrong provided credentials multiple times, your account will be
locked out, because there is a strict policy for failed attempts via
applications/api.

Visit this page, to understand how to unlock your account
https://confluence.firmglobal.com/display/ISK/FAQ%3A+Using+self+service+PasswordReset+tool+to+unlock+account.

## Config

When project has been cloned, you have to rename template-config.json file to config.json, 
and provide necessary data. Or you can create config.json manually (should be in the root of project).

Actually, it is possible to change everything in config file.
Here are the types of values in config file and some description:

```json
{
  "pathToNonWorkingHoursFile": string,
  "credentials": {
    "login": string,
    "password": string
    "env": {
      "loginKey": string,
      "passwordKey": string
    }
  },
  "workingHoursPerMonth": number,
  "date": {
    "year": number,
    "month": number (from 1 to 12)
  },
  "fileNameTemplate": "${year}-${month}-YAR.xlsx",
  "jiraTaskQuery": "https://jiraosl.firmglobal.com/rest/api/2/search?jql=status in (\"In Progress\", \"In Code Review\", \"IN QA\", \"QA Verified\", \"Investigation\", \"Code Completed\") AND assignee in (${jiraUserName}) and updated >= \"${taskUpdated}\" or status CHANGED BY ${jiraUserName} after startOfMonth()&fields=key, ${EPIC_KEY}"
  "teams": [
    {
      "unit": number,
      "companyCode": string,
      "product": string,
      "project": string,
      "teamLead": {
        "firstName": string,
        "lastName": string,
        "jiraUsername": string,
        "workingHoursPerMonth": number,
        "jiraTaskQuery": string
      },
      "employees": [
        {
          "firstName": string,
          "lastName": string,
          "jiraUsername": string,
          "workingHoursPerMonth": number,
          "jiraTaskQuery": string
        },
        ...
      ]
    },
    ...
  ]
}
```

Here are the list of optional fields, every other is mandatory.

- date. If specified, it will be used during report generation, instead of the current date, which is set by default.
- credentials (If not specified, app will ask you to enter them in CLI)
- credentials.env (Important to consider: password stored in environmental variable should be encoded with base64 format)
- pathToNonWorkingHoursFile (should be absolute. If not specified, app will ask you to enter it in CLI)
- workingHoursPerMonth inside employee object
- jiraTaskQuery inside employee object

If you want to edit fileNameTemplate placeholders(e.g. ${year}), you should
change other config parameters accordingly. For example if you want to explicitly
specify "month" you should change unit field in config, not in fileNameTemplate.

In employeeJiraTaskQuery you can place your own query to jira,
but it must be a valid JQL syntax. For more info about JQL - https://www.atlassian.com/software/jira/guides/expand-jira/jql

Value specified deeper in config will override values specified on upper levels.
For example: workingHoursPerMonth field value, specified inside employee object will be used instead of global one.