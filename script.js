let isEditing = false;
let currentEditItem = null;

document.addEventListener("DOMContentLoaded", function () {
    var myNodelist = document.querySelectorAll("#myUL li");
    for (let i = 0; i < myNodelist.length; i++) {
        appendActions(myNodelist[i]);
    }
});

// Append edit and close actions to each list item
function appendActions(li) {
    var actionsDiv = document.createElement("div");
    actionsDiv.classList.add("actions");

    var editSpan = document.createElement("span");
    editSpan.classList.add("edit");
    editSpan.innerHTML = '<i class="fas fa-edit"></i>';
    editSpan.onclick = function () {
        editList(this);
    };

    var closeSpan = document.createElement("span");
    closeSpan.classList.add("close");
    closeSpan.innerHTML = '<i class="fas fa-times"></i>';
    closeSpan.onclick = function () {
        li.style.display = "none";
    };

    actionsDiv.appendChild(editSpan);
    actionsDiv.appendChild(closeSpan);
    li.appendChild(actionsDiv);
}


// Edit a to-do list item
function editList(editButton) {
    var item = editButton.parentElement.parentElement.querySelector('.val');
    var inputDivision = document.getElementById("myInput");
    inputDivision.value = item.textContent;
    isEditing = true;
    currentEditItem = item;

    var addBtn = document.querySelector(".addBtn");
    addBtn.style.display = "none";

    var editBtn = document.querySelector(".editBtn");
    if (!editBtn) {
        editBtn = document.createElement("button");
        editBtn.innerHTML = "Save";
        editBtn.classList.add("editBtn");
        document.querySelector(".input-container").appendChild(editBtn);
    }

    editBtn.onclick = function () {
        saveEdit();
    };
}

// Save edited to-do list item
function saveEdit() {
    if (isEditing && currentEditItem) {
        var inputDivision = document.getElementById("myInput");
        currentEditItem.textContent = inputDivision.value;
        inputDivision.value = "";
        isEditing = false;
        currentEditItem = null;

        var editBtn = document.querySelector(".editBtn");
        if (editBtn) {
            editBtn.remove();
        }

        var addBtn = document.querySelector(".addBtn");
        addBtn.style.display = "inline-block";
    }
}

// Add new to-do list item or save edited item on Enter key press
document.getElementById("myInput").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        if (isEditing) {
            saveEdit();
        } else {
            newElement();
        }
    }
});

// Create a new to-do list item
function newElement() {
    var inputValue = document.getElementById("myInput").value;
    if (inputValue === "") {
        alert("You must write something!");
        return;
    }

    var li = document.createElement("li");
    li.innerHTML = '<div class="val">' + inputValue + '</div>';
    appendActions(li);
    document.getElementById("myUL").appendChild(li);
    document.getElementById("myInput").value = "";
}

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}





