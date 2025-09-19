document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('form-cadastro');
    if (form) {
        preencherCamposSalvos();
        form.addEventListener('submit', function (event) {
            var dados = carregarDadosFormulario();
            if (!verificarSenhas(dados.senha, dados.confirmar_senha)) {
                event.preventDefault();
                mostrarMensagem('As senhas não coincidem.', 'erro');
                return;
            }
            if (!validarCampos(dados)) {
                event.preventDefault();
                mostrarMensagem('Por favor, preencha todos os campos obrigatórios.', 'erro');
                return;
            }
            salvarDadosLocalmente(dados);
            mostrarMensagem('Cadastro realizado com sucesso!', 'sucesso');
        });
        form.addEventListener('reset', function () {
            localStorage.removeItem('dadosFormulario');
        });
    }
});





function mostrarMensagem(texto, tipo) {
    var alerta = document.getElementById('alerta-topo');
    alerta.textContent = texto;
    alerta.className = tipo === 'sucesso' ? 'alerta-sucesso' : 'alerta-erro';
    alerta.style.display = 'block';
    setTimeout(function () {
        alerta.style.display = 'none';
    }, 4000);
}

function carregarDadosFormulario() {
    var interesses = [];
    document.querySelectorAll('input[name="interesses"]:checked').forEach(function (el) {
        interesses.push(el.value);
    });
    return {
        nome: document.getElementById('nome').value.trim(),
        email: document.getElementById('email').value.trim(),
        senha: document.getElementById('senha').value,
        confirmar_senha: document.getElementById('confirmar_senha').value,
        data_nascimento: document.getElementById('data_nascimento').value,
        genero: document.querySelector('input[name="genero"]:checked') ? document.querySelector('input[name="genero"]:checked').value : '',
        interesses: interesses,
        pais: document.getElementById('pais').value,
    };
}

function verificarSenhas(senha, confirmar) {
    return senha === confirmar;
}

function validarCampos(dados) {
    return dados.nome && dados.email && dados.senha && dados.confirmar_senha && dados.genero && dados.pais;
}

function salvarDadosLocalmente(dados) {
    localStorage.setItem('dadosFormulario', JSON.stringify(dados));
}

function preencherCamposSalvos() {
    var dados = localStorage.getItem('dadosFormulario');
    if (dados) {
        dados = JSON.parse(dados);
        document.getElementById('nome').value = dados.nome || '';
        document.getElementById('email').value = dados.email || '';
        document.getElementById('senha').value = dados.senha || '';
        document.getElementById('confirmar_senha').value = dados.confirmar_senha || '';
        document.getElementById('data_nascimento').value = dados.data_nascimento || '';
        if (dados.genero) {
            var generoRadio = document.querySelector('input[name="genero"][value="' + dados.genero + '"]');
            if (generoRadio) generoRadio.checked = true;
        }
        if (Array.isArray(dados.interesses)) {
            document.querySelectorAll('input[name="interesses"]').forEach(function (el) {
                el.checked = dados.interesses.includes(el.value);
            });
        }
        document.getElementById('pais').value = dados.pais || '';
    }
}

function validarSenha() {
    var nome = document.getElementById('nome').value.trim();
    var email = document.getElementById('email').value.trim();
    var senha = document.getElementById('senha').value;
    var confirmar = document.getElementById('confirmar_senha').value;
    var genero = document.querySelector('input[name="genero"]:checked');
    var pais = document.getElementById('pais').value;

    if (!nome || !email || !senha || !confirmar || !genero || !pais) {
        mostrarMensagem('Por favor, preencha todos os campos obrigatórios.', 'erro');
        return false;
    }
    if (senha !== confirmar) {
        mostrarMensagem('As senhas não coincidem.', 'erro');
        return false;
    }

    mostrarMensagem('Cadastro realizado com sucesso!', 'sucesso');
    return true;
}