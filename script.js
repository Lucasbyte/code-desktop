const iconContainer = document.getElementById('icon-container');
const createIconButton = document.getElementById('create-icon-button');
const deleteIconButton = document.getElementById('delete-icon-button');
const toggleThemeButton = document.getElementById('toggle-theme-button');
const deleteIconArea = document.getElementById('delete-icon-area');
const iconPositions = [];

// Função para gerar uma cor aleatória em formato hexadecimal
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Função para criar um ícone e suas informações
function createIcon() {
    if (iconPositions.length < 40) {
        const icon = document.createElement('button');
        icon.className = 'icon';
        icon.style.backgroundColor = getRandomColor();
        icon.draggable = true;

        const iconInfo = {
            element: icon,
            position: { x: 0, y: 0 },
        };

        iconPositions.push(iconInfo);

        icon.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', iconInfo.element.id);
        });

        iconContainer.appendChild(icon);

        // Atualize o layout de ícones na área de trabalho
        arrangeIcons();

        // Log das posições atualizadas no console
        console.log(iconPositions);
    } else {
        alert('Limite de 40 ícones atingido.');
    }
}

// Função para deletar o ícone selecionado
function deleteIcon(iconId) {
    const iconIndex = iconPositions.findIndex((iconInfo) => iconInfo.element.id === iconId);

    if (iconIndex !== -1) {
        const iconInfo = iconPositions[iconIndex];
        iconContainer.removeChild(iconInfo.element);
        iconPositions.splice(iconIndex, 1);

        // Atualize o layout de ícones na área de trabalho
        arrangeIcons();

        // Log das posições atualizadas no console
        console.log(iconPositions);
    }
}

// Função para organizar os ícones na área de trabalho
function arrangeIcons() {
    iconPositions.forEach((iconInfo, index) => {
        const row = Math.floor(index / 8);
        const col = index % 8;

        iconInfo.element.style.gridRow = `${row + 1} / span 1`;
        iconInfo.element.style.gridColumn = `${col + 1} / span 1`;
        iconInfo.element.id = `icon-${index}`;
    });
}

createIconButton.addEventListener('click', () => {
    createIcon();
});

deleteIconButton.addEventListener('click', () => {
    // Implemente a lógica para selecionar o ícone que deseja deletar (pode ser por índice, interação do usuário, etc.)
    // Neste exemplo, estamos deletando o último ícone da lista
    if (iconPositions.length > 0) {
        const lastIcon = iconPositions[iconPositions.length - 1];
        deleteIcon(lastIcon.element.id);
    }
});

iconContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
});

iconContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    const targetIcon = e.target.closest('.icon');

    if (targetIcon === null) {
        return;
    }

    const sourceIconId = e.dataTransfer.getData('text/plain');
    const sourceIndex = parseInt(sourceIconId.split('-')[1], 10);
    const targetIndex = iconPositions.findIndex((iconInfo) => iconInfo.element.id === targetIcon.id);

    if (sourceIndex !== targetIndex) {
        const sourceIconInfo = iconPositions[sourceIndex];

        iconPositions.splice(sourceIndex, 1);
        iconPositions.splice(targetIndex, 0, sourceIconInfo);

        // Atualize o layout de ícones na área de trabalho
        arrangeIcons();

        // Log das posições atualizadas no console
        console.log(iconPositions);
    }
});

function deleteIconWithConfirmation(iconId) {
    const iconIndex = iconPositions.findIndex((iconInfo) => iconInfo.element.id === iconId);

    if (iconIndex !== -1) {
        const confirmDelete = confirm('Tem certeza de que deseja deletar este ícone?');

        if (confirmDelete) {
            const iconInfo = iconPositions[iconIndex];
            iconContainer.removeChild(iconInfo.element);
            iconPositions.splice(iconIndex, 1);

            // Atualize o layout de ícones na área de trabalho
            arrangeIcons();

            // Log das posições atualizadas no console
            console.log(iconPositions);
        }
    }
}



deleteIconArea.addEventListener('dragover', (e) => {
    e.preventDefault();
});

deleteIconArea.addEventListener('drop', (e) => {
    e.preventDefault();
    const targetIconId = e.dataTransfer.getData('text/plain');
    deleteIconWithConfirmation(targetIconId);
});

toggleThemeButton.addEventListener('click', () => {
    // Alterne entre os modos claro e escuro da página
    document.body.classList.toggle('dark-mode');
});