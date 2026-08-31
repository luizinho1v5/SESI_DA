const campo1 = document.getElementById("campo1");
const campo2 = document.getElementById("campo2");
const resultado = document.getElementsByTagName("h1")[0];
function somaDeDoisValores() {

    var soma = Number(campo1.value) + Number(campo2.value);

    resultado.innerHTML = "Resultado: " + soma;

}
function subtrairDoisValores() {

    var subtracao = Number(campo1.value) - Number(campo2.value);

    resultado.innerHTML = "Resultado: " + subtracao;

}
function multiplicarDoisValores() {

    var multiplicacao = Number(campo1.value) * Number(campo2.value);

    resultado.innerHTML = "Resultado: " + multiplicacao;

}
function dividirDoisValores() {

    var divisao = Number(campo1.value) / Number(campo2.value);

    resultado.innerHTML = "Resultado: " + divisao;

}