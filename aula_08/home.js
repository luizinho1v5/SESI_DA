const nomeSalvo = localStorage.getItem("nome");
const usuarioSalvo = localStorage.getItem("usuario");

if (!usuarioSalvo) {
    alert("Você precisa fazer login primeiro!");
    window.location.href = "index.html";
} else {
    document.getElementById("nome-usuario").textContent = nomeSalvo;
    document.getElementById("info-usuario").textContent = usuarioSalvo;
}

function sair() {
    window.location.href = "index.html";
}