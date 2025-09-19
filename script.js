document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('form-cadastro');
    if (form) {
        form.addEventListener('submit', function (event) {
            if (!validarSenha()) {
                event.preventDefault(); // Só bloqueia se houver erro
            }
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