document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskLists = document.querySelectorAll('.task-list');

    let draggedElement = null;

    // --- Form Submission / Create Task ---
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const titleInput = document.getElementById('title');
        const descInput = document.getElementById('description');
        const typeInput = document.getElementById('type');
        const pointsInput = document.getElementById('points');

        const taskData = {
            id: `task-${Date.now()}`,
            title: titleInput.value.trim(),
            description: descInput.value.trim(),
            type: typeInput.value,
            points: pointsInput.value
        };

        if (!taskData.title || !taskData.description || !taskData.type || !taskData.points) {
            return; // Basic safeguard
        }

        const taskCard = createTaskElement(taskData);

        // Always append new tasks to the ToDo column (first column)
        document.querySelector('[data-status="todo"]').appendChild(taskCard);

        taskForm.reset();
    });

    // --- Create DOM Element for Card ---
    const createTaskElement = (data) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('draggable', 'true');
        card.setAttribute('id', data.id);
        card.setAttribute('data-type', data.type);

        // Header
        const header = document.createElement('div');
        header.classList.add('card-header');

        const badge = document.createElement('span');
        badge.classList.add('badge');
        badge.textContent = data.type === 'story' ? 'User Story' : data.type;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '&times;';
        deleteBtn.addEventListener('click', () => card.remove());

        header.appendChild(badge);
        header.appendChild(deleteBtn);

        // Title
        const title = document.createElement('h3');
        title.classList.add('card-title');
        title.textContent = data.title;

        // Description
        const desc = document.createElement('div');
        desc.classList.add('card-desc');
        desc.textContent = data.description;

        // Footer
        const footer = document.createElement('div');
        footer.classList.add('card-footer');

        const points = document.createElement('span');
        points.textContent = `${data.points}h`;

        footer.appendChild(points);

        // Assemble Card
        card.appendChild(header);
        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(footer);

        // Attach Drag Events to the new card
        attachDragEvents(card);

        return card;
    };

    // --- Drag and Drop Logic ---
    const attachDragEvents = (card) => {
        card.addEventListener('dragstart', (e) => {
            draggedElement = card;
            setTimeout(() => card.classList.add('dragging'), 0);
            e.dataTransfer.effectAllowed = 'move';
            // Required for Firefox
            e.dataTransfer.setData('text/plain', card.id);
        });

        card.addEventListener('dragend', () => {
            draggedElement = null;
            card.classList.remove('dragging');
        });
    };

    taskLists.forEach(list => {
        list.addEventListener('dragover', (e) => {
            e.preventDefault(); // Necessary to allow dropping
            list.classList.add('drag-over');
        });

        list.addEventListener('dragleave', () => {
            list.classList.remove('drag-over');
        });

        list.addEventListener('drop', (e) => {
            e.preventDefault();
            list.classList.remove('drag-over');

            if (draggedElement) {
                // Append dragged card to the drop target column
                list.appendChild(draggedElement);
            }
        });
    });
});