const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

addButton.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value;
  if (taskText !== "") {
    const li = document.createElement("li");
    li.innerText = taskText;
    taskList.appendChild(li);
    taskInput.value = "";
  }
}