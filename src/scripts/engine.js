// view: variaveis que manipulamos coisas visuais
// velues: variaveis que manipulamnos coisas nao visuais (que rodam no background)
// actiions: ações que estão acontecendo em baixo dos panos
const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values: {
        timeId: null,
        hitPosition: 0,
        result: 0,
        currentTime: 60
    },
    actions: {
        countDownTimerId: setInterval(countDown, 1000),
        timerId: setInterval(randomSquare, 1000)
    }
}

//Função para cronometro e resetar o jogo
function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
        alert("Game Over! O seu resultado foi: " + state.values.result)
    }
}

//Função para tocar muscia
function playSound(){
    let audio = new Audio("../src/audios/hit.m4a")
    audio.volume = 0.2
    audio.play()
}

//Define um quadrado aleatorio para sortear um inimigo
function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9); //Sortea um numero aleatorio e pega sua parte inteira de 1 a 9
    let randomSquare = state.view.squares[randomNumber]; //Pega o square do numero sorteado
    randomSquare.classList.add("enemy"); //Adiciona a class enemy no square selecionado
    state.values.hitPosition = randomSquare.id;
}

//Fica ouvinido uma ação (listenner)
function addListennerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound()
            }
        })
    })
}

//Função principal para iniciar
function main() {
    addListennerHitBox();
}

//Inicia a função principal
main();