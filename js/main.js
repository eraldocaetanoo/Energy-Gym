function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const isOpen = sidebar.classList.contains('open');

    if (isOpen) {
        // Fecha a sidebar
        sidebar.classList.remove('open');
        document.removeEventListener('click', closeOnClickOutside); // Remove o evento de clique
    } else {
        // Abre a sidebar
        sidebar.classList.add('open');
        setTimeout(() => {
            // Adiciona o evento para fechar ao clicar fora
            document.addEventListener('click', closeOnClickOutside);
        }, 0); // Timeout para evitar conflito com o clique atual
    }
}

function closeOnClickOutside(event) {
    const sidebar = document.getElementById('sidebar');

    // Verifica se o clique foi fora da sidebar
    if (!sidebar.contains(event.target) && event.target.id !== 'toggle-button') {
        sidebar.classList.remove('open'); // Fecha a sidebar
        document.removeEventListener('click', closeOnClickOutside); // Remove o evento
    }
}
`   `