document.addEventListener('DOMContentLoaded', function () {

    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // ---------------------------
    // 1. LOAD TASKS FROM STORAGE
    // ---------------------------
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        storedTasks.forEach(taskText => {
            addTask(taskText, false); // false → do NOT save again
        });
    }

    // ---------------------------
    // 2. ADD TASK FUNCTION
    // ---------------------------
    function addTask(taskText, save = true) {

        // If triggered by button or Enter key (no parameter passed)
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        if (taskText === "") {
            alert("Enter a task");
            return;
        }

        // Create the <li>
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Remove functionality with storage update
        removeButton.onclick = function () {
            li.remove();

            // Update local storage array
            let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks = tasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        };

        // Attach remove button to li
        li.appendChild(removeButton);

        // Add <li> to the <ul>
        taskList.appendChild(li);

        // Save to Local Storage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear input
        taskInput.value = "";
    }

    // ---------------------------
    // 3. INITIALIZATION
    // ---------------------------
    loadTasks(); // Load saved tasks first

    // Click “Add Task” button
    addButton.addEventListener('click', addTask);

    // Press Enter key to add task
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});