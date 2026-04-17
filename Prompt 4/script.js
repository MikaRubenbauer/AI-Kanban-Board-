document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const addCardBtn = document.getElementById('add-card-btn');
    const modal = document.getElementById('modal');
    const cancelBtn = document.getElementById('cancel-btn');
    const cardForm = document.getElementById('card-form');
    const columns = document.querySelectorAll('.column');
    const cardContainers = document.querySelectorAll('.card-container');

    let draggedCard = null;

    // --- Core Functions ---

    // Update the counter at the top of each column
    const updateCounts = () => {
        columns.forEach(col => {
            const count = col.querySelectorAll('.card').length;
            col.querySelector('.card-count').textContent = count;
        });
    };

    // Modal Control
    const openModal = () => {
        modal.classList.add('active');
        document.getElementById('title').focus();
    };

    const closeModal = () => {
        modal.classList.remove('active');
        cardForm.reset();
    };

    // Card Builder
    const createCardElement = (title, desc, type, points) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('draggable', 'true');
        card.setAttribute('data-type', type);

        // Map internal values to display names
        const typeLabels = { story: 'User Story', task: 'Task', bug: 'Bug' };

        card.innerHTML = `
            <div class="card-header">
                <div class="card-title">${title}</div>
                <button class="delete-btn" aria-label="Delete card">&times;</button>
            </div>
            ${desc ? `<div class="card-desc">${desc}</div>` : ''}
            <div class="card-footer">
                <span class="card-type">${typeLabels[type]}</span>
                <span class="card-points">${points}h</span>
            </div>
        `;

        // Event Listeners for the specific card
        card.addEventListener('dragstart', () => {
            draggedCard = card;
            // setTimeout ensures the visual drag ghost is created before hiding the original
            setTimeout(() => card.classList.add('dragging'), 0);
        });

        card.addEventListener('dragend', () => {
            draggedCard = null;
            card.classList.remove('dragging');
            updateCounts();
        });

        card.querySelector('.delete-btn').addEventListener('click', () => {
            card.remove();
            updateCounts();
        });

        return card;
    };

    // --- Event Listeners ---

    // Buttons
    addCardBtn.addEventListener('click', openModal);
    cancelBtn.addEventListener('click', closeModal);

    // Close modal when clicking on the dark overlay background
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Form Submission
    cardForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value.trim();
        const desc = document.getElementById('description').value.trim();
        const type = document.getElementById('type').value;
        const points = document.getElementById('points').value;

        if (!title) return;

        const newCard = createCardElement(title, desc, type, points);

        // Append new card to the "To Do" column by default
        document.querySelector('[data-status="todo"] .card-container').appendChild(newCard);

        updateCounts();
        closeModal();
    });

    // Drag and Drop implementation for Containers
    cardContainers.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault(); // Required to allow drop
            container.classList.add('drag-over');

            // Determine where to place the card based on mouse Y position
            const afterElement = getDragAfterElement(container, e.clientY);

            if (draggedCard) {
                if (afterElement == null) {
                    container.appendChild(draggedCard);
                } else {
                    container.insertBefore(draggedCard, afterElement);
                }
            }
        });

        container.addEventListener('dragleave', () => {
            container.classList.remove('drag-over');
        });

        container.addEventListener('drop', () => {
            container.classList.remove('drag-over');
        });
    });

    // Helper: Find the card directly below the mouse cursor
    const getDragAfterElement = (container, y) => {
        const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            // If offset is negative, cursor is above the center of the child
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    };

    // --- Initialization (Demo Data) ---
    const initDemoData = () => {
        const todo = document.querySelector('[data-status="todo"] .card-container');
        const inProgress = document.querySelector('[data-status="in-progress"] .card-container');
        const done = document.querySelector('[data-status="done"] .card-container');

        todo.appendChild(createCardElement('Implement Auth API', 'Use JWT for secure token transmission.', 'task', 4));
        inProgress.appendChild(createCardElement('Fix Sidebar Overflow', 'When on mobile, the menu clips into the footer.', 'bug', 1.5));
        done.appendChild(createCardElement('User Profile Page', 'Allow users to edit their bio and avatar.', 'story', 8));

        updateCounts();
    };

    initDemoData();
});