document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal-overlay');
    const openModalBtn = document.getElementById('btn-open-modal');
    const closeModalBtn = document.getElementById('btn-close-modal');
    const saveCardBtn = document.getElementById('btn-save-card');

    // --- Modal Management ---
    const toggleModal = (state) => {
        modal.style.display = state ? 'flex' : 'none';
        if (!state) clearInputs();
    };

    const clearInputs = () => {
        document.getElementById('inp-title').value = '';
        document.getElementById('inp-desc').value = '';
        document.getElementById('inp-points').value = '1';
        document.getElementById('inp-type').value = 'task';
    };

    openModalBtn.addEventListener('click', () => toggleModal(true));
    closeModalBtn.addEventListener('click', () => toggleModal(false));

    // --- Card Creation ---
    saveCardBtn.addEventListener('click', () => {
        const title = document.getElementById('inp-title').value.trim();
        const desc = document.getElementById('inp-desc').value.trim();
        const points = document.getElementById('inp-points').value;
        const type = document.getElementById('inp-type').value;

        if (!title) return alert("Title is required");

        createCard(title, desc, points, type, 'todo');
        toggleModal(false);
    });

    const createCard = (title, desc, points, type, colId) => {
        const card = document.createElement('div');
        const cardId = `card-${Date.now()}`;
        
        card.className = `card ${type}`;
        card.id = cardId;
        card.draggable = true;

        card.innerHTML = `
            <button class="btn-delete">&times;</button>
            <h3>${title}</h3>
            <p>${desc}</p>
            <span class="points-tag">${points} hrs</span>
        `;

        // Delete Logic
        card.querySelector('.btn-delete').addEventListener('click', () => card.remove());

        // Drag events
        card.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', cardId);
            setTimeout(() => card.style.opacity = '0.5', 0);
        });

        card.addEventListener('dragend', () => {
            card.style.opacity = '1';
        });

        document.querySelector(`#${colId} .card-list`).appendChild(card);
    };
});

// --- Global Drag & Drop Logic ---
function allowDrop(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    const col = e.target.closest('.column');
    if (col) col.classList.add('drag-over');
}

function dragLeave(e) {
    const col = e.target.closest('.column');
    if (col) col.classList.remove('drag-over');
}

function drop(e) {
    e.preventDefault();
    const col = e.target.closest('.column');
    if (!col) return;

    col.classList.remove('drag-over');
    const cardId = e.dataTransfer.getData('text/plain');
    const card = document.getElementById(cardId);
    
    if (card) {
        col.querySelector('.card-list').appendChild(card);
    }
}