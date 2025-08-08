// Ambil elemen
const taskInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const filterInput = document.getElementById("filter-input");
const filterButton = document.getElementById("filter-button");
const clearButton = document.getElementById("clear-button");
const todoList = document.getElementById("todo-table-body");

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

// Fungsi menambah task
function addTask() {
    if (!validateInput()) return;

    const task = taskInput.value.trim();
    const date = dateInput.value;

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${task}</td>
        <td>${date}</td>
        <td class="status">Pending</td>
        <td>
            <button class="done-btn">Done</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;

    // Hapus pesan "No task found" jika ada
    if (todoList.children.length === 1 && todoList.children[0].querySelector("td[colspan]")) {
        todoList.innerHTML = "";
    }

    todoList.appendChild(row);

    // Reset input
    taskInput.value = "";
    dateInput.value = "";

    // Event tombol Done
    row.querySelector(".done-btn").addEventListener("click", () => {
        const statusCell = row.querySelector(".status");
        statusCell.textContent = "Completed";
        statusCell.style.color = "green";
    });

    // Event tombol Delete
    row.querySelector(".delete-btn").addEventListener("click", () => {
        row.remove();
        if (todoList.children.length === 0) {
            showNoTaskMessage();
        }
    });
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
