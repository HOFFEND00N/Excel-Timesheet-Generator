import { makeTeamLeadJiraTasks } from "../../index";
import { UserTasks } from "../../types";

test("pass zero team tasks expect to return zero teamLead tasks", () => {
  const expectedTeamLeadTasks: UserTasks = { tasks: [], userName: "AlexU" };

  const actualTeamLeadTasks = makeTeamLeadJiraTasks([], "AlexU");

  expect(actualTeamLeadTasks).toEqual(expectedTeamLeadTasks);
});

test("pass tasks for one employee, these tasks are separate from any epics, expect to return zero teamLead tasks", () => {
  const expectedTeamLeadTasks: UserTasks = { tasks: [], userName: "AlexU" };

  const actualTeamLeadTasks = makeTeamLeadJiraTasks(
    [
      {
        tasks: [
          { taskKey: "task 1", epicKey: undefined },
          { taskKey: "task 3", epicKey: undefined },
        ],
        userName: "MatrosovaM",
      },
    ],
    "AlexU"
  );

  expect(actualTeamLeadTasks).toEqual(expectedTeamLeadTasks);
});

test("pass tasks for one employee, one task have connection to epic ,expect to return one teamLead task", () => {
  const expectedTeamLeadTasks: UserTasks = {
    tasks: [{ taskKey: "epic task 1", epicKey: undefined }],
    userName: "AlexU",
  };

  const actualTeamLeadTasks = makeTeamLeadJiraTasks(
    [
      {
        tasks: [
          { taskKey: "task 1", epicKey: "epic task 1" },
          { taskKey: "task 3", epicKey: undefined },
        ],
        userName: "MatrosovaM",
      },
    ],
    "AlexU"
  );

  expect(actualTeamLeadTasks).toEqual(expectedTeamLeadTasks);
});

test("pass tasks for one employee, two tasks have connections to different epics ,expect to return two teamLead tasks", () => {
  const expectedTeamLeadTasks: UserTasks = {
    tasks: [
      { taskKey: "epic task 1", epicKey: undefined },
      { taskKey: "epic task 2", epicKey: undefined },
    ],
    userName: "AlexU",
  };

  const actualTeamLeadTasks = makeTeamLeadJiraTasks(
    [
      {
        tasks: [
          { taskKey: "task 1", epicKey: "epic task 1" },
          { taskKey: "task 3", epicKey: "epic task 2" },
        ],
        userName: "MatrosovaM",
      },
    ],
    "AlexU"
  );

  expect(actualTeamLeadTasks).toEqual(expectedTeamLeadTasks);
});

test("pass tasks for two employees, two tasks from first employee have connections to different epics, the second employee task don't have connection to any epic  ,expect to return two teamLead tasks", () => {
  const expectedTeamLeadTasks: UserTasks = {
    tasks: [
      { taskKey: "epic task 1", epicKey: undefined },
      { taskKey: "epic task 2", epicKey: undefined },
    ],
    userName: "AlexU",
  };

  const actualTeamLeadTasks = makeTeamLeadJiraTasks(
    [
      {
        tasks: [
          { taskKey: "task 1", epicKey: "epic task 1" },
          { taskKey: "task 3", epicKey: "epic task 2" },
        ],
        userName: "MatrosovaM",
      },
      {
        tasks: [{ taskKey: "task 2", epicKey: undefined }],
        userName: "MolotkovaM",
      },
    ],
    "AlexU"
  );

  expect(actualTeamLeadTasks).toEqual(expectedTeamLeadTasks);
});

test("pass tasks for two employees, two tasks from first employee have connections to different epics, the second employee first task have connection to the same epic as fist employee, his second task have no connection to epics. expect to return two teamLead tasks", () => {
  const expectedTeamLeadTasks: UserTasks = {
    tasks: [
      { taskKey: "epic task 1", epicKey: undefined },
      { taskKey: "epic task 2", epicKey: undefined },
    ],
    userName: "AlexU",
  };

  const actualTeamLeadTasks = makeTeamLeadJiraTasks(
    [
      {
        tasks: [
          { taskKey: "task 1", epicKey: "epic task 1" },
          { taskKey: "task 3", epicKey: "epic task 2" },
        ],
        userName: "MatrosovaM",
      },
      {
        tasks: [
          { taskKey: "task 2", epicKey: undefined },
          {
            taskKey: "task 4",
            epicKey: "epic task 1",
          },
        ],
        userName: "MolotkovaM",
      },
    ],
    "AlexU"
  );

  expect(actualTeamLeadTasks).toEqual(expectedTeamLeadTasks);
});

test("pass tasks for two employees, two tasks from first employee have connections to different epics, the second employee first task have connection to the same epic as fist employee, his second task have no connection to epics, third task have connection to new epic. expect to return three teamLead tasks", () => {
  const expectedTeamLeadTasks: UserTasks = {
    tasks: [
      { taskKey: "epic task 1", epicKey: undefined },
      { taskKey: "epic task 2", epicKey: undefined },
      { taskKey: "epic task 3", epicKey: undefined },
    ],
    userName: "AlexU",
  };

  const actualTeamLeadTasks = makeTeamLeadJiraTasks(
    [
      {
        tasks: [
          { taskKey: "task 1", epicKey: "epic task 1" },
          { taskKey: "task 3", epicKey: "epic task 2" },
        ],
        userName: "MatrosovaM",
      },
      {
        tasks: [
          { taskKey: "task 2", epicKey: undefined },
          {
            taskKey: "task 4",
            epicKey: "epic task 1",
          },
          {
            taskKey: "task 5",
            epicKey: "epic task 3",
          },
        ],
        userName: "MolotkovaM",
      },
    ],
    "AlexU"
  );

  expect(actualTeamLeadTasks).toEqual(expectedTeamLeadTasks);
});
