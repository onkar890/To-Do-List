class TodoApp {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.currentFilter = 'all';
        this.initElements();
        this.bindEvents();
        this.initSortable();
        this.renderTasks();
    }

    initElements() {
        this.taskInput = document.getElementById('taskInput');
        this.dueDateInput = document.getElementById('dueDateInput');
        this.priorityInput = document.getElementById('priorityInput');
        this.addTaskBtn = document.getElementById('addTaskBtn');
        this.taskList = document.getElementById('taskList');
        this.allFilter = document.getElementById('allFilter');
        this.activeFilter = document.getElementById('activeFilter');
        this.completedFilter = document.getElementById('completedFilter');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        this.allCount = document.getElementById('allCount');
        this.activeCount = document.getElementById('activeCount');
        this.completedCount = document.getElementById('completedCount');
    }

    bindEvents() {
        this.addTaskBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
        this.allFilter.addEventListener('click', () => this.setFilter('all'));
        this.activeFilter.addEventListener('click', () => this.setFilter('active'));
        this.completedFilter.addEventListener('click', () => this.setFilter('completed'));
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
    }

    initSortable() {
        Sortable.create(this.taskList, {
            animation: 150,
            ghostClass: 'sortable-ghost',
            onEnd: (evt) => {
                const oldIndex = evt.oldIndex;
                const newIndex = evt.newIndex;
                const filteredTasks = this.getFilteredTasks();
                const movedTask = filteredTasks[oldIndex];
                const fullIndex = this.tasks.findIndex(task => task.id === movedTask.id);
                const fullNewIndex = this.tasks.findIndex(task => task.id === filteredTasks[newIndex]?.id);
                if (fullIndex !== -1 && fullNewIndex !== -1) {
                    this.tasks.splice(fullIndex, 1);
                    this.tasks.splice(fullNewIndex, 0, movedTask);
                } else if (fullIndex !== -1 && newIndex === filteredTasks.length) {
                    this.tasks.splice(fullIndex, 1);
                    this.tasks.push(movedTask);
                }
                this.saveTasks();
                this.renderTasks();
            }
        });
    }

    addTask() {
        const taskText = this.taskInput.value.trim();
        const dueDate = this.dueDateInput.value;
        const priority = this.priorityInput.value;
        if (!taskText) return;

        const task = {
            id: Date.now(),
            text: taskText,
            dueDate: dueDate,
            priority: priority || 'None',
            completed: false
        };

        this.tasks.push(task);
        this.saveTasks();
        this.taskInput.value = '';
        this.dueDateInput.value = '';
        this.priorityInput.value = '';
        this.renderTasks();
    }

    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        const newText = prompt('Edit task:', task.text);
        const newPriority = prompt('Edit priority (Low, Medium, High, None):', task.priority);
        if (newText !== null && newText.trim()) {
            this.tasks = this.tasks.map(task =>
                task.id === id ? { ...task, text: newText.trim(), priority: newPriority || 'None' } : task
            );
            this.saveTasks();
            this.renderTasks();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }

    toggleTask(id) {
        this.tasks = this.tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        this.saveTasks();
        this.renderTasks();
    }

    clearCompleted() {
        this.tasks = this.tasks.filter(task => !task.completed);
        this.saveTasks();
        this.renderTasks();
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.renderTasks();
        [this.allFilter, this.activeFilter, this.completedFilter].forEach(btn =>
            btn.classList.remove('bg-blue-500', 'text-white')
        );
        document.getElementById(`${filter}Filter`).classList.add('bg-blue-500', 'text-white');
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    getFilteredTasks() {
        return this.tasks.filter(task => {
            if (this.currentFilter === 'active') return !task.completed;
            if (this.currentFilter === 'completed') return task.completed;
            return true;
        });
    }

    getPriorityClasses(priority) {
        switch (priority) {
            case 'Low': return 'bg-green-200 text-green-800';
            case 'Medium': return 'bg-yellow-200 text-yellow-800';
            case 'High': return 'bg-red-200 text-red-800';
            default: return 'bg-gray-200 text-gray-800';
        }
    }

    renderTasks() {
        const filteredTasks = this.getFilteredTasks();
        this.taskList.innerHTML = '';
        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-enter flex items-center gap-2 p-2 bg-gray-50 rounded';
            li.setAttribute('data-id', task.id);
            setTimeout(() => li.className = 'task-enter-active flex items-center gap-2 p-2 bg-gray-50 rounded', 10);

            li.innerHTML = `
                        <input type="checkbox" ${task.completed ? 'checked' : ''} class="w-5 h-5">
                        <span class="${task.completed ? 'line-through text-gray-500' : ''} flex-1">${task.text}</span>
                        <span class="text-sm text-gray-500">${task.dueDate || ''}</span>
                        <span class="text-sm px-2 py-1 rounded ${this.getPriorityClasses(task.priority)}">${task.priority || 'None'}</span>
                        <button class="edit-btn text-blue-500 hover:text-blue-700">Edit</button>
                        <button class="delete-btn text-red-500 hover:text-red-700">Delete</button>
                    `;

            li.querySelector('input').addEventListener('change', () => this.toggleTask(task.id));
            li.querySelector('.edit-btn').addEventListener('click', () => this.editTask(task.id));
            li.querySelector('.delete-btn').addEventListener('click', () => {
                li.className = 'task-exit';
                setTimeout(() => {
                    li.className = 'task-exit-active';
                    setTimeout(() => this.deleteTask(task.id), 300);
                }, 10);
            });

            this.taskList.appendChild(li);
        });

        this.updateCounters();
    }

    updateCounters() {
        this.allCount.textContent = this.tasks.length;
        this.activeCount.textContent = this.tasks.filter(t => !t.completed).length;
        this.completedCount.textContent = this.tasks.filter(t => t.completed).length;
    }
}

const app = new TodoApp();
