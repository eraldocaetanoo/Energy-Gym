
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

// Função para salvar dados (essa função é chamada quando o boão é clicado)
function salvarValor() {
    const nome = document.getElementById('nomeUsuario').value;
    const email = document.getElementById('emailUsuario').value;
    const nascimento = document.getElementById('nascUsuario').value;
    const senha = document.getElementById('senhaUsuario').value;
    if ((nome || email || nascimento) && senha!='') {
        localStorage.setItem('nome', nome);
        localStorage.setItem('email', email);
        localStorage.setItem('nasci', nascimento);
        localStorage.setItem('senhaUsuario', senha);

        alert('Dados salvos!');
    } else {
        alert('Por favor, preencha todos os campos!');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('formCad').addEventListener('submit', function (event) {
        event.preventDefault();

        console.log('Evento de submit capturado!'); // Teste para verificar o evento.

        // Obtém os dados do formulário
        const nome = document.getElementById('nomeUsuario').value;
        const email = document.getElementById('emailUsuario').value;
        const nascimento = document.getElementById('nascUsuario').value;
        const senha = document.getElementById('senhaUsuario').value;

        if ((nome || email || nascimento) && senha!='') {
            // Verifica se há dados existentes no Local Storage
            let users = JSON.parse(localStorage.getItem('users')) || [];

            let dataFormatada = '';
            if (nascimento) {
                const partesData = nascimento.split('-'); // Divide a data pelo "-"
                dataFormatada = `${partesData[2]}/${partesData[1]}/${partesData[0]}`; // Reorganiza para dd/mm/aaaa
            }
            
            // Adiciona o novo usuário
            users.push({ nome, email, dataFormatada, senha });

            // Salva de volta no Local Storage
            localStorage.setItem('users', JSON.stringify(users));

            // Feedback para o usuário
            //alert('Usuário cadastrado com sucesso!');
            showTemporaryAlertSuccess('Usuário cadastrado com sucesso!', 3000);
            // Limpa o formulário
            document.getElementById('formCad').reset();
        } else {
            showTemporaryAlertDanger('Por favor, preencha todos os campos!', 3000);
            //alert('Por favor, preencha todos os campos!');
        }

        
    });

   
});




document.addEventListener('DOMContentLoaded', function () {
    // Botão para exibir os dados
    document.getElementById('recupbutton').addEventListener('click', function () {
        // Obtém os dados do localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Seleciona a lista no HTML
        const listaUsuarios = document.getElementById('userList');
        console.log('Evento de submit capturado!'); // Teste para verificar o evento.
        // Limpa a lista antes de adicionar os itens
        listaUsuarios.innerHTML = '';
        if (users.length === 0) {
            //alert('Nenhum dado encontrado no localStorage.');
            showTemporaryAlertDanger('Nenhum aluno cadastrado!', 3000);
            return;
        }
        users.reverse();
        // Adiciona cada usuário como um item da lista
        users.forEach(user => {
            const li = document.createElement('li');
            li.className = 'list-group-item list-group-item-action'; // Classe Bootstrap para estilizar


            // Adiciona os dados como elementos separados
            //const numero = document.createElement('div');
            //numero.textContent = `${user.numero}`;
            //li.appendChild(numero);

            const nome = document.createElement('div');
            nome.textContent = `Nome: \u00A0 \u00A0${user.nome}`;
            li.appendChild(nome);

            const email = document.createElement('div');
            email.textContent = `E-mail: \u00A0 \u00A0${user.email}`;
            li.appendChild(email);

            const nascimento = document.createElement('div');
            nascimento.textContent = `Data de nascimento: \u00A0 \u00A0${user.dataFormatada}`;
            li.appendChild(nascimento);

            const senha = document.createElement('div');
            senha.textContent = `Senha: \u00A0 \u00A0${user.senha}`;
            li.appendChild(senha);

    

            // Adiciona o item à lista
            listaUsuarios.appendChild(li);
            // Decrementa o número

        });

        
    });

    
    
    

    document.getElementById('limparStorage').addEventListener('click', function () {
        localStorage.clear(); // Limpa todos os dados do localStorage
        showTemporaryAlertDanger('Todos os cadastros foram excluídos!', 3000);
        //alert('Dados do localStorage foram apagados!');
        document.getElementById('userList').innerHTML = ''; // Limpa a lista exibida
    });
});  

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

// Função para recuperar dados (essa função é chamada quando o boão é clicado)
function recuperarValor() {
    const usuarionome = localStorage.getItem('nome');
    const usuarioemail = localStorage.getItem('email');
    const usuarionasci = localStorage.getItem('nasci');
    const senhaUsuario = localStorage.getItem('senhaUsuario');

    if (usuarioemail || usuarionome || usuarionasci || senhaUsuario) {
        // Formatar a data de nascimento no formato dd/mm/aaaa
        let dataFormatada = '';
        if (usuarionasci) {
            const partesData = usuarionasci.split('-'); // Divide a data pelo "-"
            dataFormatada = `${partesData[2]}/${partesData[1]}/${partesData[0]}`; // Reorganiza para dd/mm/aaaa
        }

        alert(
            'Usuário: ' + usuarionome +
            '\nEmail: ' + usuarioemail +
            '\nData de nascimento: ' + (dataFormatada || 'Não informada') +
            '\nSenha: ' + senhaUsuario
        );
    } else {
        alert('Nenhum valor encontrado!');
    }
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

function verificarLoginCliente() {
    // Valores esperados (podem ser substituídos por validações em banco de dados)
    const usuarioCorreto = localStorage.getItem('email');
    const senhaCorreta = localStorage.getItem('senhaUsuario');

    // Obtendo os valores inseridos no formulário
    const username = document.getElementById("email").value;
    const password = document.getElementById("senha").value;

    // Verificação de login
    if (username === usuarioCorreto && password === senhaCorreta) {
        //alert("Login bem-sucedido!");
        showTemporaryAlertSuccess('Login bem-sucedido!', 3000);
        // Redireciona para outra página
        window.location.href = '../view/iniciousuario.html';
    } else {
        showTemporaryAlertDanger('Usuário ou senha incorretos!', 3000);
        //alert("Usuário ou senha incorretos!");
    }
}

function myFunction() {
    // Get the text field
    var copyText = document.getElementById("senhaUsuario");
  
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
  
    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
  
    // Alert the copied text
    showTemporaryAlertSuccess('Senha salva na área de transferência: ' + copyText.value, 3000);
    //alert("Senha salva na área de transferência: " + copyText.value);
  }