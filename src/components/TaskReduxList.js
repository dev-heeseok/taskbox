/** src/components/TaskReduxList.js */
import React from "react";
import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskState } from "../lib/store";

const Loading = () => {
  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  return (
    <div className="list-items" data-testid="loading" key={"loading"}>
      {LoadingRow}
      {LoadingRow}
      {LoadingRow}
      {LoadingRow}
      {LoadingRow}
      {LoadingRow}
    </div>
  );
};

const Empty = () => {
  return (
    <div className="list-items" key={"empty"} data-testid="empty">
      <div className="wrapper-message">
        <span className="icon-check" />
        <div className="title-message">You have no tasks</div>
        <div className="subtitle-message">sit back and relax</div>
      </div>
    </div>
  );
};

const TaskReduxList = () => {
  const dispatch = useDispatch();
  const pinTask = (value) => {
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_PINNED", }));
  }
  const archiveTask = (value) => {
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_ARCHIVED", }));
  }

  const tasks = useSelector((state) => {
    const tasksInOrder = [
      ...state.taskbox.tasks.filter((t) => t.state === "TASK_PINNED"),
      ...state.taskbox.tasks.filter((t) => t.state !== "TASK_PINNED"),
    ];
    return tasksInOrder;
  });

  const { status } = useSelector((state) => state.taskbox);
  if (status === "loading") {
    return Loading();
  }

  if (tasks.length === 0) {
    return Empty();
  }

  return (
    <div className="list-items" data-testid="success" key={"success"}>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onPinTask={(task) => pinTask(task)}
          onArchiveTask={(task) => archiveTask(task)}
        />
      ))}
    </div>
  );
};

export default TaskReduxList;