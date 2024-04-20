document.addEventListener('DOMContentLoaded', function () {
    const taskNameInput = document.getElementById('task-name');
    const dueDateInput = document.getElementById('due-date');
    const prioritySelect = document.getElementById('priority');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    addTaskButton.addEventListener('click', function () {
        const taskName = taskNameInput.value.trim();
        const dueDate = dueDateInput.value;
        const priority = prioritySelect.value;

        if (taskName !== '' && dueDate !== '') {
            const task = {
                name: taskName,
                dueDate: dueDate,
                priority: priority
            };
            addTaskToList(task);
            scheduleReminder(task); // Schedule reminder when task is added
            clearInputs();
        } else {
            alert('Please enter task name and due date.');
        }
    });

    function addTaskToList(task) {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <div class="task-name">${task.name}</div>
            <div class="due-date">Due Date: ${task.dueDate}</div>
            <div class="priority">${task.priority}</div>
            <button class="delete-button">Delete</button>
        `;
        taskList.appendChild(taskItem);
        addDeleteButtonListener(taskItem);
    }

    function addDeleteButtonListener(taskItem) {
        const deleteButton = taskItem.querySelector('.delete-button');
        deleteButton.addEventListener('click', function () {
            taskItem.remove();
        });
    }

    function clearInputs() {
        taskNameInput.value = '';
        dueDateInput.value = '';
        prioritySelect.value = 'important';
    }

    function scheduleReminder(task) {
        const dueDate = new Date(task.dueDate);
        const currentDate = new Date();
        const timeDifference = dueDate.getTime() - currentDate.getTime();
        const oneDayInMilliseconds = 1000 * 60 * 60 * 24; // One day in milliseconds

        if (timeDifference > 0 && timeDifference <= oneDayInMilliseconds) {
            setTimeout(function () {
                alert(`Reminder: Task "${task.name}" is due tomorrow!`);
            }, timeDifference);
        }
    }
});
