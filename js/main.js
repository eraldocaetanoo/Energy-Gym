
// Função que chama o menu lateral (sidebar)
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

// Função do menu lateral (sidebar) (para ao clicar fora ele recolher)
function closeOnClickOutside(event) {
    const sidebar = document.getElementById('sidebar');

    // Verifica se o clique foi fora da sidebar
    if (!sidebar.contains(event.target) && event.target.id !== 'toggle-button') {
        sidebar.classList.remove('open'); // Fecha a sidebar
        document.removeEventListener('click', closeOnClickOutside); // Remove o evento
    }
}

// Função para exibir o alerta temporário
function showTemporaryAlertDanger(message, duration) {
    // Verifica se um alerta já está sendo exibido
    if (document.getElementById('temporaryAlert')) return;

    // Cria o elemento de alerta
    const alertDiv = document.createElement('div');
    alertDiv.id = 'temporaryAlert';
    alertDiv.className = 'alert alert-danger position-fixed text-center';
    alertDiv.style.zIndex = '1050'; // Garante que esteja visível
    alertDiv.style.top = '50%'; // Centraliza verticalmente
    alertDiv.style.left = '50%'; // Centraliza horizontalmente
    alertDiv.style.transform = 'translate(-50%, -50%)'; // Ajusta para o centro
    alertDiv.style.width = 'fit-content'; // Ajusta a largura ao conteúdo
    alertDiv.style.padding = '20px'; // Ajusta o espaçamento interno
    alertDiv.textContent = message;

    // Adiciona o alerta ao body
    document.body.appendChild(alertDiv);

    // Remove o alerta após o tempo especificado
    setTimeout(() => {
        alertDiv.remove();
    }, duration);
}

// Função para exibir o alerta temporário
function showTemporaryAlertSuccess(message, duration) {
    // Verifica se um alerta já está sendo exibido
    if (document.getElementById('temporaryAlert')) return;

    // Cria o elemento de alerta
    const alertDiv = document.createElement('div');
    alertDiv.id = 'temporaryAlert';
    alertDiv.className = 'alert alert-success position-fixed text-center';
    alertDiv.style.zIndex = '1050'; // Garante que esteja visível
    alertDiv.style.top = '50%'; // Centraliza verticalmente
    alertDiv.style.left = '50%'; // Centraliza horizontalmente
    alertDiv.style.transform = 'translate(-50%, -50%)'; // Ajusta para o centro
    alertDiv.style.width = 'fit-content'; // Ajusta a largura ao conteúdo
    alertDiv.style.padding = '20px'; // Ajusta o espaçamento interno
    alertDiv.textContent = message;

    // Adiciona o alerta ao body
    document.body.appendChild(alertDiv);

    // Remove o alerta após o tempo especificado
    setTimeout(() => {
        alertDiv.remove();
    }, duration);
}



// Função para gerar senha
function getPassword() {
    
    // Grupos de caracteres
    var numbers = "0123456789";
    var lowercase = "abcdefghijklmnopqrstuvwxyz";
    var uppercase = "ABCDEFGHIJLMNOPQRSTUVWXYZ";
    var specialChars = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";
    var allChars = numbers + lowercase + uppercase + specialChars;

    var passwordLength = 8; // Tamanho desejado para a senha
    var password = "";

    // Garantir pelo menos um caractere de cada grupo
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    // Preencher o restante da senha com caracteres aleatórios
    for (var i = password.length; i < passwordLength; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Embaralhar a senha para evitar previsibilidade
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    // Atribuir ao campo de texto
    document.getElementById('senhaUsuario').value = password;
}

// Mostrar o botão ao rolar a página
window.onscroll = function() {
    const btnTopo = document.getElementById('btnTopo');
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        btnTopo.style.display = "block";
    } else {
        btnTopo.style.display = "none";
    }
};

// Função para voltar ao topo
function voltarAoTopo() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Rola suavemente
    });
}


// Função para mostrar/esconder a senha
function showHide() {
    const senhaInput = document.getElementById('senha');
    const icon = document.getElementById('icon');

    if (senhaInput.type === 'password') {
        senhaInput.setAttribute('type','text');
        icon.classList.add('hide')
    } else {
        senhaInput.setAttribute('type','password');
        icon.classList.remove('hide')
    }
}

function verificarLoginAdm() {
    // Valores esperados (podem ser substituídos por validações em banco de dados)
    const usuarioCorreto = "admin";
    const senhaCorreta = "12345";

    // Obtendo os valores inseridos no formulário
    const username = document.getElementById("email").value;
    const password = document.getElementById("senha").value;

    // Verificação de login
    if (username === usuarioCorreto && password === senhaCorreta) {
        showTemporaryAlertSuccess('Login bem-sucedido!', 3000);
        //alert("Login bem-sucedido!");
        // Redireciona para outra página
        window.location.href = '../view/adm.html';
    } else {
        showTemporaryAlertDanger('Usuário ou senha incorretos!', 3000);
        //alert("Usuário ou senha incorretos!");
    }
}


// Copiar senha
function myFunction() {
    var copyText = document.getElementById("senhaUsuario");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    showTemporaryAlertSuccess('Senha salva na área de transferência: ' + copyText.value, 3000);
    //alert("Senha salva na área de transferência: " + copyText.value);
}
