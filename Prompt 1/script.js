// 1. Allow a drop by preventing the default browser behavior
function allowDrop(ev) {
    ev.preventDefault();
}

// 2. Capture the ID of the card being dragged
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

// 3. Handle the logic when the card is released
function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);

    // Find the closest task-list container to ensure it lands in the column
    let target = ev.target;
    while (target && !target.classList.contains('task-list')) {
        target = target.parentElement;
        // Safety break if we drop outside a column
        if (target.classList.contains('kanban-board')) return;
    }

    if (target) {
        target.appendChild(draggedElement);
    }
}