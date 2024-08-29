document.getElementById("addTaskButton").addEventListener("click", addTask);
document.getElementById("deleteAllTasksButton").addEventListener("click", deleteAllTasks);
document.getElementById("deleteAllCompletedTasksButton").addEventListener("click", deleteAllCompletedTasks);

function addTask() {
  const taskTitle = document.getElementById("taskTitleInput").value;
  const assignee = document.getElementById("assignInput").value;
  const role = document.getElementById("roleInput").value;
  const priority = document.getElementById("prioritySelect").value;

  const date = new Date();
  const day = date.toLocaleDateString("en-US", { weekday: "long" });
  const formattedDate = `${day}, ${date.toLocaleDateString()}`;

  if (taskTitle.trim() === "" || assignee.trim() === "" || role.trim() === "") {
    alert("Please fill in all fields");
    return;
  }

  const taskTable = document.getElementById("taskTable").getElementsByTagName("tbody")[0];
  const newRow = taskTable.insertRow();

  newRow.innerHTML = `
        <td>${taskTitle}</td>
        <td>${assignee}</td>
        <td>${role}</td>
        <td>${priority}</td>
        <td>${formattedDate}</td>
        <td><input type="checkbox" class="taskCheckbox"></td>
        <td><button class="deleteTaskButton">Delete</button></td>
    `;

  const deleteButton = newRow.querySelector(".deleteTaskButton");
  deleteButton.addEventListener("click", function () {
    deleteTask(newRow);
  });

  const checkbox = newRow.querySelector(".taskCheckbox");
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      moveToCompleted(newRow);
    }
  });

  document.getElementById("taskTitleInput").value = "";
  document.getElementById("assignInput").value = "";
  document.getElementById("roleInput").value = "";
  document.getElementById("prioritySelect").value = "Low";
}

function deleteTask(row) {
  row.remove();
}

function moveToCompleted(row) {
  const completedTaskTable = document.getElementById("completedTaskTable").getElementsByTagName("tbody")[0];
  const newRow = completedTaskTable.insertRow();

  for (let i = 0; i < row.cells.length - 2; i++) {
    const newCell = newRow.insertCell();
    newCell.innerHTML = row.cells[i].innerHTML;
  }

  const deleteButtonCell = newRow.insertCell();
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.className = "deleteTaskButton";
  deleteButton.addEventListener("click", function () {
    deleteTask(newRow);
  });
  deleteButtonCell.appendChild(deleteButton);

  row.remove();
}

function deleteAllTasks() {
  const taskTableBody = document.getElementById("taskTable").getElementsByTagName("tbody")[0];
  taskTableBody.innerHTML = "";
}

function deleteAllCompletedTasks() {
  const completedTaskTableBody = document.getElementById("completedTaskTable").getElementsByTagName("tbody")[0];
  completedTaskTableBody.innerHTML = "";
}
