const resultado = document.getElementById("resultado");
const expressao = document.getElementById("expressao");

let numeroAtual = "";
let numeroAnterior = "";
let operador = "";
let resultadoAnterior = false;


function adicionarNumero(numero) {


if (resultadoAnterior) {
    numeroAtual = "";
    expressao.textContent = "";
    resultadoAnterior = false;
}


if (numeroAtual.length >= 12) {
    return;
}

if (numeroAtual === "0") {
    numeroAtual = numero;
} else {
    numeroAtual += numero;
}

resultado.textContent = numeroAtual;


}

function adicionarDecimal() {

if (resultadoAnterior) {
    numeroAtual = "";
    expressao.textContent = "";
    resultadoAnterior = false;
}

if (numeroAtual === "") {
    numeroAtual = "0.";
}

if (!numeroAtual.includes(".")) {
    numeroAtual += ".";
}

resultado.textContent = numeroAtual;


}

function escolherOperador(novoOperador) {

if (numeroAtual === "" && numeroAnterior === "") {
    return;
}

if (numeroAnterior !== "" && numeroAtual !== "") {
    calcular();
}

numeroAnterior = numeroAtual;
numeroAtual = "";
operador = novoOperador;

expressao.textContent = numeroAnterior + " " + operador;


}

function calcular() {

if (numeroAnterior === "" || numeroAtual === "" || operador === "") {
    return;
}

const primeiroNumero = Number(numeroAnterior);
const segundoNumero = Number(numeroAtual);

let resultadoFinal;

switch (operador) {

    case "+":
        resultadoFinal = primeiroNumero + segundoNumero;
        break;

    case "−":
        resultadoFinal = primeiroNumero - segundoNumero;
        break;

    case "×":
        resultadoFinal = primeiroNumero * segundoNumero;
        break;

    case "÷":

        if (segundoNumero === 0) {
            resultado.textContent = "Erro";
            expressao.textContent = "Não é possível dividir por 0";

            numeroAtual = "";
            numeroAnterior = "";
            operador = "";

            return;
        }

        resultadoFinal = primeiroNumero / segundoNumero;
        break;
}

resultadoFinal = Number(resultadoFinal.toFixed(10));

expressao.textContent =
    primeiroNumero + " " +
    operador + " " +
    segundoNumero + " =";

resultado.textContent = resultadoFinal;

numeroAtual = String(resultadoFinal);
numeroAnterior = "";
operador = "";

resultadoAnterior = true;


}

function limpar() {

numeroAtual = "";
numeroAnterior = "";
operador = "";
resultadoAnterior = false;

resultado.textContent = "0";
expressao.textContent = "";


}

document.addEventListener("keydown", function(event) {

const tecla = event.key;

if (tecla >= "0" && tecla <= "9") {
    adicionarNumero(tecla);
}

else if (tecla === ".") {
    adicionarDecimal();
}

else if (tecla === "+") {
    escolherOperador("+");
}

else if (tecla === "-") {
    escolherOperador("−");
}

else if (tecla === "*") {
    escolherOperador("×");
}

else if (tecla === "/") {
    escolherOperador("÷");
}

else if (tecla === "Enter" || tecla === "=") {
    calcular();
}

else if (tecla === "Escape" || tecla.toLowerCase() === "c") {
    limpar();
}


});