//this is script file

// Define variables
const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const allTasksButton = document.getElementById('all-tasks');
const activeTasksButton = document.getElementById('active-tasks');
const completedTasksButton = document.getElementById('completed-tasks');
const clearCompletedButton = document.getElementById('clear-completed');
const completeAllButton = document.getElementById('complete-all');
const countSpan = document.getElementById('count');
let tasks = [];

// this block defines all the necessary variables 

// Define functions
function addTask() {
	if (newTaskInput.value.trim() !== '') {
		const task = {
			id: Date.now(),
			title: newTaskInput.value.trim(),
			completed: false
		};
		tasks.push(task);
		renderTaskList();
		newTaskInput.value = '';
		countTasks();
	}
}

//functions for filter and delete button and counting

function renderTaskList(filter) {
	taskList.innerHTML = '';
	let filteredTasks = tasks;
	if (filter === 'active') {
		filteredTasks = tasks.filter(task => !task.completed);
	} else if (filter === 'completed') {
		filteredTasks = tasks.filter(task => task.completed);
	}
	filteredTasks.forEach(task => {
		const taskItem = document.createElement('li');
		taskItem.classList.add('task-item');
		taskItem.innerHTML = `
			<input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''}>
			<label for="${task.id}">${task.title}</label>
			<button class="delete-task">Delete</button>
		`;
		taskList.appendChild(taskItem);
		const taskCheckbox = taskItem.querySelector('input[type="checkbox"]');
		taskCheckbox.addEventListener('change', () => {
			task.completed = taskCheckbox.checked;
			renderTaskList(filter);
			countTasks();
		});
		const deleteTaskButton = taskItem.querySelector('.delete-task');
		deleteTaskButton.addEventListener('click', () => {
			tasks = tasks.filter(t => t.id !== task.id);
			renderTaskList(filter);
			countTasks();
		});
	});
}

//task function
function countTasks() {
	const remainingTasks = tasks.filter(task => !task.completed).length;
	countSpan.textContent = `${remainingTasks} ${remainingTasks === 1 ? 'task' : 'tasks'} left`;
}
//remove completed task function
function clearCompletedTasks() {
	tasks = tasks.filter(task => !task.completed);
	renderTaskList();
	countTasks();
}
// complete all task function
function completeAllTasks() {
	const allCompleted = tasks.every(task => task.completed);
	tasks.forEach(task => {
		task.completed = !allCompleted;
	});
	renderTaskList();
	countTasks();
}
// above code defines all the necessary functions that code will use such as add,count complete etc.



// Bind events
addTaskButton.addEventListener('click', addTask);
newTaskInput.addEventListener('keydown', event => {
	if (event.key === 'Enter') {
		addTask();
	}
});
allTasksButton.addEventListener('click', () => renderTaskList());
activeTasksButton.addEventListener('click', () => renderTaskList('active'));
completedTasksButton.addEventListener('click', () => renderTaskList('completed'));
clearCompletedButton.addEventListener('click', clearCompletedTasks);
completeAllButton.addEventListener('click', completeAllTasks);
// this block binds event listeners to various HTML elements like 'click ' event listner


// Initial render
renderTaskList();
countTasks();

// this code calls render tasklist and count task to display when the web page loads 
// this code is written by Naitik Ramteke
// this code is of To-Do List
// lets run the code