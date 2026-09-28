/* =====================================================
   1) USUÁRIOS E SESSÃO (tudo guardado no localStorage)
   ===================================================== */
function lerUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}
function salvarUsuarios(lista) {
  localStorage.setItem("usuarios", JSON.stringify(lista));
}
// "sessao" guarda quem está logado agora (sem a senha)
function usuarioLogado() {
  return JSON.parse(localStorage.getItem("sessao"));
}
function sair() {
  localStorage.removeItem("sessao");
  abrirSistema();
}

/* =====================================================
   2) TELAS: decide o que aparece
   ===================================================== */
function mostrarTela(qual) {              // "login" ou "loja"
  document.getElementById("tela-login").hidden = (qual !== "login");
  document.getElementById("tela-loja").hidden = (qual !== "loja");
}

// Se tem alguém logado mostra a loja, senão mostra o login
function abrirSistema() {
  const u = usuarioLogado();
  if (u) {
    iniciarLoja(u);
    mostrarTela("loja");
  } else {
    mostrar("entrar");
    mostrarTela("login");
  }
}

// Mostra um formulário do login e esconde os outros
function mostrar(nome) {
  document.querySelectorAll("#tela-login form").forEach(f => f.hidden = true);
  document.querySelectorAll(".msg").forEach(m => m.textContent = "");
  document.getElementById("form-" + nome).hidden = false;
}

// Escreve uma mensagem de erro (vermelha) ou de sucesso (verde)
function aviso(id, texto, sucesso) {
  const p = document.getElementById(id);
  p.textContent = texto;
  p.className = "msg " + (sucesso ? "ok" : "erro");
}

/* =====================================================
   3) LOGIN: cadastrar, entrar e trocar senha
   ===================================================== */
document.getElementById("form-cadastro").addEventListener("submit", function (e) {
  e.preventDefault(); // impede a página de recarregar

  const nome = document.getElementById("cad-nome").value.trim();
  const email = document.getElementById("cad-email").value.trim().toLowerCase();
  const senha = document.getElementById("cad-senha").value;
  const confirmar = document.getElementById("cad-confirmar").value;

  if (senha.length < 6) return aviso("msg-cadastro", "A senha precisa ter pelo menos 6 caracteres.");
  if (senha !== confirmar) return aviso("msg-cadastro", "As senhas não são iguais.");

  const usuarios = lerUsuarios();
  if (usuarios.find(u => u.email === email)) {
    return aviso("msg-cadastro", "Este e-mail já está cadastrado.");
  }

  usuarios.push({ nome: nome, email: email, senha: senha });
  salvarUsuarios(usuarios);

  this.reset();
  mostrar("entrar");
  aviso("msg-entrar", "Conta criada! Agora é só entrar.", true);
});

document.getElementById("form-entrar").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("entrar-email").value.trim().toLowerCase();
  const senha = document.getElementById("entrar-senha").value;

  // procura alguém com esse e-mail E essa senha
  const usuario = lerUsuarios().find(u => u.email === email && u.senha === senha);
  if (!usuario) return aviso("msg-entrar", "E-mail ou senha incorretos.");

  localStorage.setItem("sessao", JSON.stringify({ nome: usuario.nome, email: usuario.email }));
  this.reset();
  abrirSistema();
});

document.getElementById("form-senha").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("troca-email").value.trim().toLowerCase();
  const atual = document.getElementById("troca-atual").value;
  const nova = document.getElementById("troca-nova").value;
  const confirmar = document.getElementById("troca-confirmar").value;

  const usuarios = lerUsuarios();
  const usuario = usuarios.find(u => u.email === email && u.senha === atual);

  if (!usuario) return aviso("msg-senha", "E-mail ou senha atual incorretos.");
  if (nova.length < 6) return aviso("msg-senha", "A nova senha precisa ter pelo menos 6 caracteres.");
  if (nova !== confirmar) return aviso("msg-senha", "As senhas novas não são iguais.");

  usuario.senha = nova;       // "usuario" aponta para o objeto dentro da lista
  salvarUsuarios(usuarios);   // então basta salvar a lista de novo

  this.reset();
  abrirSistema();
  alert("Senha alterada com sucesso!");
});

/* =====================================================
   4) LOJA: produtos e carrinho
   ===================================================== */
// Lista de produtos (cada um é um objeto)
const produtos = [
  { id: 1, nome: "Caderno 200 folhas", preco: 24.9, icone: "📓" },
  { id: 2, nome: "Caneta gel azul", preco: 4.5, icone: "🖊️" },
  { id: 3, nome: "Mochila escolar", preco: 129.9, icone: "🎒" },
  { id: 4, nome: "Kit de lápis de cor", preco: 32.0, icone: "🖍️" },
  { id: 5, nome: "Calculadora científica", preco: 59.9, icone: "🧮" },
  { id: 6, nome: "Régua de 30 cm", preco: 3.9, icone: "📏" }
];

// O carrinho guarda só o id e a quantidade. Cada usuário tem o seu.
let carrinho = [];
let chaveCarrinho = "";

// Roda quando alguém entra: carrega o carrinho dele e desenha a loja
function iniciarLoja(u) {
  chaveCarrinho = "carrinho_" + u.email;
  carrinho = JSON.parse(localStorage.getItem(chaveCarrinho)) || [];
  document.getElementById("saudacao").textContent = "Olá, " + u.nome;
  mostrarProdutos();
  atualizar();
}

// Transforma 24.9 em "R$ 24,90"
function moeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function mostrarProdutos() {
  const lista = document.getElementById("produtos");
  lista.innerHTML = produtos.map(p => `
    <article class="produto">
      <div class="icone">${p.icone}</div>
      <h3>${p.nome}</h3>
      <p class="preco">${moeda(p.preco)}</p>
      <button onclick="adicionar(${p.id})">Adicionar ao carrinho</button>
    </article>
  `).join("");
}

// Ações do usuário: todas mudam o carrinho e depois chamam atualizar()
function adicionar(id) {
  const item = carrinho.find(i => i.id === id);
  if (item) {
    item.qtd++;                        // já existe: aumenta a quantidade
  } else {
    carrinho.push({ id: id, qtd: 1 }); // novo: entra com quantidade 1
  }
  atualizar();
}

function alterarQtd(id, mudanca) {
  const item = carrinho.find(i => i.id === id);
  item.qtd += mudanca;                 // mudanca é +1 ou -1
  if (item.qtd <= 0) {
    carrinho = carrinho.filter(i => i.id !== id); // chegou a zero: remove
  }
  atualizar();
}

function esvaziar() {
  carrinho = [];
  atualizar();
}

function finalizar() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio. Adicione um produto primeiro.");
    return;
  }
  alert("Compra finalizada! Total: " + document.getElementById("total").textContent);
  esvaziar();
}

// Salva o carrinho, recalcula o total e redesenha a lista
function atualizar() {
  localStorage.setItem(chaveCarrinho, JSON.stringify(carrinho));

  let total = 0;
  let quantidade = 0;

  const html = carrinho.map(item => {
    const p = produtos.find(x => x.id === item.id); // busca nome e preço
    total += p.preco * item.qtd;
    quantidade += item.qtd;
    return `
      <li>
        <span>${p.icone} ${p.nome}<br><small>${moeda(p.preco)}</small></span>
        <span class="qtd">
          <button onclick="alterarQtd(${p.id}, -1)">-</button>
          ${item.qtd}
          <button onclick="alterarQtd(${p.id}, 1)">+</button>
        </span>
      </li>`;
  }).join("");

  document.getElementById("itens").innerHTML =
    html || '<li class="vazio">Nenhum produto ainda.</li>';
  document.getElementById("total").textContent = moeda(total);
  document.getElementById("contador").textContent =
    `Carrinho: ${quantidade} ${quantidade === 1 ? "item" : "itens"}`;
}

/* =====================================================
   INÍCIO: quando a página abre, decide qual tela mostrar
   ===================================================== */
abrirSistema();