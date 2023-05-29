const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const removeButton = document.getElementById("removeButton");

addButton.addEventListener("click", addTask);
document.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value;
  if (taskText.trim() !== "") {
    const task = document.createElement("li");
    task.className = "task";
    task.innerHTML = `
      <span class="task-text">${taskText}</span>
      <button class="task-remove">x</button>
    `;
    taskList.appendChild(task);
    taskInput.value = "";

    const removeButton = task.querySelector(".task-remove");
    removeButton.addEventListener("click", () => {
      task.remove();
    });
  }
}