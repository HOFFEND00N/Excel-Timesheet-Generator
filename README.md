# Excel timesheet generator

## Prerequisites

- node
- npm
- git

## Setup

- clone repository `git clone https://stashosl.firmglobal.com/scm/~ivan.petrov/excel-timesheet-generator.git`
- run `npm install`

## Workflow

- `npm run start`
- follow program instructions
- generated excel file can be found in the root of the project

## Config

Actually, it is possible to change everything in config file.
Here are the types of values in config file and some description:

```json
{
  "unit": number,
  "companyCode": string,
  "product": string,
  "project": string,
  "employees": [
    {
      "name": string,
      "jiraUsername": string
    },
    ...
  ],
  "teamLead": {
    "name": string,
    "jiraUsername": string
  },
  "date": {
    "year": number,
    "month": number (from 0 to 11)
  },
  "fileNameTemplate": "${year}-${month}-${companyUnit}_RPT-YAR.xlsx",
  "employeeJiraTaskQuery": "https://jiraosl.firmglobal.com/rest/api/2/search?jql=status in (\"In Progress\", \"In Code Review\", \"IN QA\", \"QA Verified\", \"Investigation\", \"Code Completed\") AND assignee in (${jiraUserName}) and updated >= \"${taskUpdated}\" or status CHANGED BY ${jiraUserName} after startOfMonth()&fields=key, ${EPIC_KEY}"
}
```
All fields are mandatory and configurable, except of date field, it is optional. 
If specified, it will be used during report generation, instead of the current date, which is set by default.

If you want to edit fileNameTemplate placeholders(e.g. ${year}), you should 
change other config parameters accordingly. For example if you want to explicitly
specify "unit" you should change unit field in config, not in fileNameTemplate.

In employeeJiraTaskQuery you can place your own query to jira, 
but it must be a valid JQL syntax. For more info about JQL - https://www.atlassian.com/software/jira/guides/expand-jira/jql

## Important information

In case of wrong provided credentials multiple times, your account will be
locked out, because there is a strict policy for failed attempts via 
applications/api.

Visit this page, to understand how to unlock your account
https://confluence.firmglobal.com/display/ISK/FAQ%3A+Using+self+service+PasswordReset+tool+to+unlock+account.
