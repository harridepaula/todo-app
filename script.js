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

/*--- ADD TASK ---*/
function addTask() {
  const taskText = taskInput.value;
  if (taskText.trim() !== "") {
    const task = document.createElement("li");
    task.className = "task";
    task.draggable = true; // Make the task element draggable
    task.innerHTML = `
      <span class="task-text">${taskText}</span>
      <button class="task-remove">x</button>
    `;
    taskList.appendChild(task);
    taskInput.value = "";

    /*--- REMOVE TASK ---*/
    const removeButton = task.querySelector(".task-remove");
    removeButton.addEventListener("click", () => {
      task.remove();
    });

    // Add event listeners for drag and drop functionality
    task.addEventListener("dragstart", handleDragStart);
    task.addEventListener("dragover", handleDragOver);
    task.addEventListener("dragenter", handleDragEnter);
    task.addEventListener("dragleave", handleDragLeave);
    task.addEventListener("drop", handleDrop);
    task.addEventListener("dragend", handleDragEnd);
  }
}


/*--- DRAG AND DROP ---*/
let dragTask = null;

function handleDragStart(event) {
dragTask = this;
event.dataTransfer.effectAllowed = "move";
event.dataTransfer.setData("text/html", this.innerHTML);
this.classList.add("dragging");
}

function handleDragOver(event) {
event.preventDefault();
event.dataTransfer.dropEffect = "move";
}

function handleDragEnter(event) {
this.classList.add("over");
}

function handleDragLeave(event) {
this.classList.remove("over");
}

function handleDrop(event) {
event.preventDefault();
if (dragTask !== this) {
  // Remove the dragged task from its original position
  dragTask.parentNode.removeChild(dragTask);
  // Get the drop index of the current task
  const dropIndex = Array.from(taskList.children).indexOf(this);
  // Insert the dragged task at the new drop position
  taskList.insertBefore(dragTask, this);
  }
this.classList.remove("over"); // Remove the 'over' class from the drop target
}

function handleDragEnd(event) {
this.classList.remove("dragging");
const dropTargets = document.querySelectorAll(".task.over");
dropTargets.forEach(dropTarget => dropTarget.classList.remove("over"));
}