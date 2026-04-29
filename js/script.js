// Ambil elemen
const taskInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const filterInput = document.getElementById("filter-input");
const filterButton = document.getElementById("filter-button");
const clearButton = document.getElementById("clear-button");
const todoList = document.getElementById("todo-table-body");

// Array untuk menyimpan tasks
let tasks = [];

// Fungsi untuk menyimpan tasks ke localStorage
function saveTasks() {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

// Fungsi untuk memuat tasks dari localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem("todoTasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}

// Fungsi menampilkan pesan No task found
function showNoTaskMessage() {
    todoList.innerHTML = `<tr><td colspan="4" style="text-align:center">No task found</td></tr>`;
}

// Fungsi validasi input
function validateInput() {
    if (taskInput.value.trim() === "") {
        alert("Task tidak boleh kosong!");
        return false;
    }
    if (dateInput.value === "") {
        alert("Tanggal harus diisi!");
        return false;
    }
    return true;
}

// Fungsi render/tampilkan semua tasks
function renderTasks() {
    todoList.innerHTML = "";

    if (tasks.length === 0) {
        showNoTaskMessage();
        return;
    }

    tasks.forEach((task, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.date}</td>
            <td class="status" style="color: ${task.status === 'Completed' ? 'green' : 'black'}">${task.status}</td>
            <td>
                <button class="done-btn" data-index="${index}">Done</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </td>
        `;

        // Event tombol Done
        row.querySelector(".done-btn").addEventListener("click", () => {
            if (tasks[index].status === 'Pending') {
                tasks[index].status = 'Completed';
            } else {
                tasks[index].status = 'Pending';
            }
            saveTasks();
            renderTasks();
        });

        // Event tombol Delete
        row.querySelector(".delete-btn").addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        todoList.appendChild(row);
    });
}

// Fungsi menambah task
function addTask() {
    if (!validateInput()) return;

    const task = taskInput.value.trim();
    const date = dateInput.value;

    // Tambah task ke array
    tasks.push({
        name: task,
        date: date,
        status: 'Pending'
    });

    // Simpan ke localStorage
    saveTasks();

    // Render ulang tasks
    renderTasks();

    // Reset input
    taskInput.value = "";
    dateInput.value = "";
}

// Fungsi filter task
function filterTasks() {
    const filterText = filterInput.value.toLowerCase();
    const rows = todoList.querySelectorAll("tr");
    let matchFound = false;

    rows.forEach(row => {
        const taskText = row.children[0]?.textContent.toLowerCase() || "";
        if (taskText.includes(filterText) || filterText === "") {
            row.style.display = "";
            matchFound = true;
        } else {
            row.style.display = "none";
        }
    });

    // Jika tidak ada match, tampilkan pesan No task found
    if (!matchFound && filterText !== "") {
        todoList.innerHTML = `<tr><td colspan="4" style="text-align:center">No task found</td></tr>`;
    }

    // Jika filter dikosongkan & tidak ada task sama sekali
    if (filterText === "" && todoList.querySelectorAll("tr").length === 0) {
        showNoTaskMessage();
    }
}

// Event Listeners
addButton.addEventListener("click", addTask);
filterButton.addEventListener("click", filterTasks);

// Event listener untuk Clear All button
clearButton.addEventListener("click", () => {
    if (confirm("Apakah Anda yakin ingin menghapus semua task?")) {
        tasks = [];
        saveTasks();
        renderTasks();
        filterInput.value = "";
    }
});

// Muat tasks saat halaman dimuat
window.addEventListener("DOMContentLoaded", loadTasks);

// Fungsi hapus semua task
function clearAllTasks() {
    showNoTaskMessage();
}

// Event listener
addButton.addEventListener("click", addTask);
filterButton.addEventListener("click", filterTasks);
clearButton.addEventListener("click", clearAllTasks);

// Tampilkan pesan awal
showNoTaskMessage();
