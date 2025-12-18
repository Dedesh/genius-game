var isPlaying = false
var sequenciaBotoes = []
const listaCores = ["roxo", "laranja", "amarelo", "azul"]
var intervalo = 500
var tentativa = []
var level = 1

var mensagem = $("h1")
var botoes = $("#grid-container button")

const audioRoxo = new Audio("./sounds/purple.mp3");
audioRoxo.volume = 0.3;
const audioLaranja = new Audio("./sounds/orange.mp3");
audioLaranja.volume = 0.4;
const audioAmarelo = new Audio("./sounds/yellow.mp3");
audioAmarelo.volume = 1;
const audioAzul = new Audio("./sounds/blue.mp3");
audioAzul.volume = 0.8;
const audioGameOver = new Audio("./sounds/wrong.mp3");
audioGameOver.volume = 0.5;

function efeitoBotao(botao) {
    if (botao.attr("id") === "roxo") {
        audioRoxo.currentTime = 0;
        audioRoxo.play();
    }
    else if (botao.attr("id") === "laranja") {
        audioLaranja.currentTime = 0;
        audioLaranja.play();
    }
    else if (botao.attr("id") === "amarelo") {
        audioAmarelo.currentTime = 0;
        audioAmarelo.play();
    }
    else if (botao.attr("id") === "azul") {
        audioAzul.currentTime = 0;
        audioAzul.play();
    };
    botao.addClass("apertado");
    setTimeout(() => {
        botao.removeClass("apertado")
    }, 100);
};

function começarJogo() {
    isPlaying = true;
    $("body").removeClass("game-over");
    level = 1
    sequenciaBotoes = []
    tentativa = []
    
    botoes.attr("disabled", true);
    mensagem.text("3");
    setTimeout(() => {mensagem.text("2")}, 1000);
    setTimeout(() => {mensagem.text("1")}, 2000);
    setTimeout(() => {mensagem.text("Level 1")}, 3000);
    setTimeout(() => {
        rodarSequenciaAleatoria()
    }, 3000);
};

function rodarSequenciaAleatoria() {
    mensagem.text("Level " + level)
    botoes.attr("disabled", true);

    setTimeout(() => {
        let indexAleatorio = Math.floor(Math.random() * 4);
        sequenciaBotoes.push(listaCores[indexAleatorio]);

        for(let i=0; i<sequenciaBotoes.length; i++) {
            setTimeout(() => {
                efeitoBotao($("#" + sequenciaBotoes[i]))
            }, intervalo * (i+1));
        };
        setTimeout(() => {
            botoes.attr("disabled", false)
        }, intervalo * (sequenciaBotoes.length + 1))
    }, 1000);
};

function gameOver() {
    isPlaying = false
    botoes.attr("disabled", true);
    audioGameOver.play();
    $("body").addClass("game-over");
    mensagem.html("Você chegou ao Level " + level + "<br>Aperte qualquer botão para recomeçar");
    setTimeout(() => {
        botoes.attr("disabled", false)
    }, 1000);
};

botoes.on("click", function () {
    efeitoBotao($(this));
    if (!isPlaying) {
        começarJogo();
    }
    else {
        tentativa.push($(this).attr("id"))
        if (tentativa[tentativa.length - 1] !== sequenciaBotoes[tentativa.length - 1]) {
            gameOver();
        }
        else {
            if (tentativa.length === sequenciaBotoes.length) {
                level++;
                tentativa = [];
                rodarSequenciaAleatoria();
            }
        }
    }
});
