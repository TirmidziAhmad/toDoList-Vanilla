document.getElementById("addTaskButton").addEventListener("click", function () {
  const taskTitle = document.getElementById("taskTitleInput").value.trim();
  const assignee = document.getElementById("assignInput").value.trim();
  const role = document.getElementById("roleInput").value.trim();
  const priority = document.getElementById("prioritySelect").value;

  const currentDate = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = days[currentDate.getDay()];
  const formattedDate = `${dayName}, ${currentDate.toLocaleDateString()}`;

  if (taskTitle !== "") {
    const taskTable = document.querySelector("#taskTable tbody");

    const row = document.createElement("tr");
    row.classList.add(`${priority.toLowerCase()}-priority`);

    row.innerHTML = `
            <td>${taskTitle}</td>
            <td>${assignee}</td>
            <td>${role}</td>
            <td>${priority}</td>
            <td>${formattedDate}</td>
            <td><input type="checkbox" class="taskCheckbox"></td>
            <td><button class="deleteTaskButton">Delete</button></td>
        `;

    taskTable.appendChild(row);

    const checkbox = row.querySelector(".taskCheckbox");
    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        moveToCompleted(row);
      }
    });

    const deleteButton = row.querySelector(".deleteTaskButton");
    deleteButton.addEventListener("click", function () {
      taskTable.removeChild(row);
    });

    // Bersihkan input setelah menambahkan tugas
    document.getElementById("taskTitleInput").value = "";
    document.getElementById("assignInput").value = "";
    document.getElementById("roleInput").value = "";
    document.getElementById("prioritySelect").value = "Low";
  }
});

function moveToCompleted(row) {
  const completedTaskTable = document.querySelector("#completedTaskTable tbody");

  row.removeChild(row.children[5]);
  completedTaskTable.appendChild(row);

  const deleteButton = row.querySelector(".deleteTaskButton");
  deleteButton.addEventListener("click", function () {
    completedTaskTable.removeChild(row);
  });
}
