//const nome = localStorage.getItem("nome");

//alert(nome);

//localStorage.setItem("nome", "Frederico");

//alert(localStorage.getItem("nome"));

//localStorage.removeItem("nome");

function login(){
    const valor_usuario = document.getElementById("usuario").value;
    const valor_senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem");

    if (valor_usuario === "" || valor_senha === "") {
        mensagem.textContent = "Preencha usuário e senha.";
        mensagem.style.color = "orange";
        return;
    }

    const usuarioSalvo = localStorage.getItem("usuario");
    const senhaSalva = localStorage.getItem("senha");

    if (valor_usuario === usuarioSalvo && valor_senha === senhaSalva) {
        mensagem.textContent = "Login realizado com sucesso! Redirecionando...";
        mensagem.style.color = "green";

        setTimeout(function() {
            window.location.href = "home.html";
        }, 1500);
    } else {
        mensagem.textContent = "Usuário ou senha incorretos.";
        mensagem.style.color = "red";
    }
}

function cadastro(){
    const Criar_nome = document.getElementById("nome").value;
    const Criar_usuario = document.getElementById("usuario").value;
    const Criar_senha = document.getElementById("senha").value;
    const Criar_Palavra_Chave = document.getElementById("passe").value;
    const mensagem = document.getElementById("mensagem");

    if (!Criar_nome || !Criar_usuario || !Criar_senha) {
        mensagem.textContent = "Todos os campos são obrigatórios.";
        mensagem.style.color = "orange";
        return;
    }

    localStorage.setItem("nome", Criar_nome);
    localStorage.setItem("usuario", Criar_usuario);
    localStorage.setItem("senha", Criar_senha);
    if(Criar_Palavra_Chave){
        localStorage.setItem("palavra_chave", Criar_Palavra_Chave);
    }
    mensagem.textContent = "Dados criados com sucesso!";
    mensagem.style.color = "green";

    setTimeout(function() {
        window.location.href = "index.html";
    }, 1500);
}

function recuperar_senha(){
    const Nomeinformado = document.getElementById("nome").value;
    const Palavrainformada = document.getElementById("passe").value;
    const mensagem = document.getElementById("mensagem");

    if(!Nomeinformado || !Palavrainformada){
        mensagem.textContent = "Preencha os campos para recuperar sua senha!";
        mensagem.style.color = "orange";
        return;
    }
    const nomeSalvo = localStorage.getItem("nome");
    const palavraSalva = localStorage.getItem("palavra_chave");
    const senhaSalva = localStorage.getItem("senha");

    if(Nomeinformado === nomeSalvo && Palavrainformada === palavraSalva){
        mensagem.textContent = "Sucesso! Sua senha é: " + senhaSalva;
        mensagem.style.color = "green";
    } else {
        mensagem.textContent = "Informações Inválidas";
        mensagem.style.color = "red";
    }
    
    document.getElementById("nome").value = "";
    document.getElementById("passe").value = "";
}