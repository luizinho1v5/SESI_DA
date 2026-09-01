const casas = document.querySelectorAll(".casa");

const mensagem = document.querySelector("#mensagem");

const botaoReiniciar = document.querySelector("#reiniciar");

const botaoDoisJogadores = document.querySelector("#doisJogadores");

const botaoComputador = document.querySelector("#contraComputador");

const pontosXTexto = document.querySelector("#pontosX");
const pontosOTexto = document.querySelector("#pontosO");


let jogadorAtual = "X";

let jogoAtivo = true;

let contraComputador = false;

let pontosX = 0;
let pontosO = 0;


const combinacoesVitoria = [



    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],


    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

  

    [0, 4, 8],
    [2, 4, 6]

];



casas.forEach(casa => {

    casa.addEventListener("click", () => {

        if (
            casa.innerHTML !== "" ||
            jogoAtivo === false
        ) {
            return;
        }


        
        jogar(casa);


       
        if (
            contraComputador === true &&
            jogoAtivo === true &&
            jogadorAtual === "O"
        ) {

            setTimeout(jogadaComputador, 500);

        }

    });

});


function jogar(casa) {

    casa.innerHTML = jogadorAtual;

    casa.classList.add(jogadorAtual);


    
    const combinacao = verificarVencedor();


    if (combinacao !== null) {

        mensagem.innerHTML =
            "Jogador " + jogadorAtual + " venceu!";


        jogoAtivo = false;


        destacarVencedor(combinacao);


        atualizarPlacar();


        return;

    }


    if (verificarEmpate()) {

        mensagem.innerHTML = "Deu velha!";

        jogoAtivo = false;

        return;

    }


    trocarJogador();

}


function trocarJogador() {

    if (jogadorAtual === "X") {

        jogadorAtual = "O";

    } else {

        jogadorAtual = "X";

    }


    mensagem.innerHTML =
        "Vez do jogador " + jogadorAtual;

}


function verificarVencedor() {

    for (let combinacao of combinacoesVitoria) {

        let a = combinacao[0];
        let b = combinacao[1];
        let c = combinacao[2];


        if (

            casas[a].innerHTML !== "" &&

            casas[a].innerHTML === casas[b].innerHTML &&

            casas[a].innerHTML === casas[c].innerHTML

        ) {

            return combinacao;

        }

    }


    return null;

}


function destacarVencedor(combinacao) {

    combinacao.forEach(indice => {

        casas[indice].classList.add("vencedora");

    });

}

function verificarEmpate() {

    for (let casa of casas) {

        if (casa.innerHTML === "") {

            return false;

        }

    }


    return true;

}

function atualizarPlacar() {

    if (jogadorAtual === "X") {

        pontosX++;

        pontosXTexto.innerHTML = pontosX;

    } else {

        pontosO++;

        pontosOTexto.innerHTML = pontosO;

    }

}


botaoReiniciar.addEventListener("click", reiniciarJogo);


function reiniciarJogo() {

    casas.forEach(casa => {

        casa.innerHTML = "";

        casa.classList.remove("X");

        casa.classList.remove("O");

        casa.classList.remove("vencedora");

    });


    jogadorAtual = "X";

    jogoAtivo = true;


    mensagem.innerHTML = "Vez do jogador X";

}

botaoDoisJogadores.addEventListener("click", () => {

    contraComputador = false;

    pontosX = 0;
    pontosO = 0;

    pontosXTexto.innerHTML = 0;
    pontosOTexto.innerHTML = 0;

    reiniciarJogo();

    mensagem.innerHTML = "Modo: 2 Jogadores - Vez do jogador X";

});

botaoComputador.addEventListener("click", () => {

    contraComputador = true;

    pontosX = 0;
    pontosO = 0;

    pontosXTexto.innerHTML = 0;
    pontosOTexto.innerHTML = 0;

    reiniciarJogo();

    mensagem.innerHTML = "Você é X - Vez do jogador X";

});

function jogadaComputador() {

    if (jogoAtivo === false) {
        return;
    }


    let casasLivres = [];


    casas.forEach(casa => {

        if (casa.innerHTML === "") {

            casasLivres.push(casa);

        }

    });


    if (casasLivres.length === 0) {
        return;
    }


    let numeroAleatorio =
        Math.floor(Math.random() * casasLivres.length);


    let casaEscolhida =
        casasLivres[numeroAleatorio];


    jogar(casaEscolhida);

}