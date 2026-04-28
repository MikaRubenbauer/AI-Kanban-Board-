document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add-btn');
    const board = document.querySelector('.board');

    // --- Card Creation Logic ---
    addBtn.addEventListener('click', () => {
        const titleInput = document.getElementById('card-title');
        const descInput = document.getElementById('card-desc');
        const pointsInput = document.getElementById('card-points');
        const typeInput = document.getElementById('card-type');

        if (!titleInput.value.trim()) {
            alert('Please enter a title');
            return;
        }

        createCard(
            titleInput.value,
            descInput.value,
            pointsInput.value || 0,
            typeInput.value,
            'todo'
        );

        // Clear inputs
        titleInput.value = '';
        descInput.value = '';
        pointsInput.value = '';
    });

    const createCard = (title, desc, points, type, columnId) => {
        const card = document.createElement('div');
        const cardId = 'card-' + Date.now();
        
        card.classList.add('card', type);
        card.setAttribute('draggable', 'true');
        card.setAttribute('id', cardId);

        card.innerHTML = `
            <button class="delete-btn">&times;</button>
            <h3>${title}</h3>
            <p>${desc}</p>
            <span class="points">${points} pts</span>
        `;

        // Delete functionality
        card.querySelector('.delete-btn').addEventListener('click', () => {
            card.remove();
        });

        // Drag start listener
        card.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', card.id);
            setTimeout(() => card.style.display = 'none', 0); // Hide original while dragging
        });

        card.addEventListener('dragend', () => {
            card.style.display = 'block';
        });

        // Append to the specific column container
        document.querySelector(`#${columnId} .card-container`).appendChild(card);
    };
});

// --- Drag & Drop Functions (Global Scope for HTML attributes) ---

function allowDrop(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    if (e.target.classList.contains('column')) {
        e.target.classList.add('drag-over');
    }
}

function dragLeave(e) {
    if (e.target.classList.contains('column')) {
        e.target.classList.remove('drag-over');
    }
}

function drop(e) {
    e.preventDefault();
    const column = e.target.closest('.column');
    if (!column) return;

    column.classList.remove('drag-over');
    const cardId = e.dataTransfer.getData('text/plain');
    const card = document.getElementById(cardId);
    
    if (card) {
        column.querySelector('.card-container').appendChild(card);
    }
}