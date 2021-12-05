// Cria uma variável para a seção do html que vai ser manipulada
let canvas = document.getElementById("snake");

// O context renderiza o desenho; colocando 2d, ele trata o arquivo como um plano 2d
let context = canvas.getContext("2d");

// Define o número de pixels por quadrado
let box = 32;

// Cria o array - o "corpo" da cobrinha
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

// Cria variável com a direção que a cobrinha vai seguir
let direction = "right"; 

// O Math.floor retira a parte flutuante do número
let comida = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}


// Cria o background do jogo
function criarBG() {
    context.fillStyle = "lightgreen";

    // fillRect tem 4 parâmetros: posição de x, y, altura e largura 
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// Cria a cobrinha; ela será um array que vai sendo percorrido
function criarCobrinha() {
    for(i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Cria a comida da cobrinha

function criarComida() {
    context.fillStyle = "red";
    context.fillRect(comida.x, comida.y, box, box);
}

// Ao apertar a tecla, o addEventListener chama a função update, passando como argumento os eventos 
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

// Carrega e atualiza o jogo de tempo em tempo
function iniciarJogo() {

    // Faz com que a cobrinha "passe para o outro lado"
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16*box;

    // Checa se a cabeça da cobrinha se choca com o próprio corpo e define o fim do jogo

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo)
            alert("Game over :(")
        }
    }

    criarBG();
    criarCobrinha();
    criarComida();

    // Cria a posição de partida da cobrinha
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Condicionais que definem para onde a cobrinha vai em cada situação (a "cabeça")
    // O que faz ela se "mover" são os quadradinhos, que vão sendo preenchidos e adicionados
    // Tira do final -> adiciona no início
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    // Para incrementar a cobrinha

    if(snakeX != comida.x || snakeY != comida.y){

        // Retira o último elemento do array, pois nesse caso ela não pega a comida, então não aumenta
        snake.pop();
    }
    else{
        comida.x = Math.floor(Math.random() * 15 + 1) * box,
        comida.y = Math.floor(Math.random() * 15 + 1) * box
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // Adiciona elemento no início do array
    snake.unshift(newHead);
}

// Passa intervalo de 100 milissegundos para a função iniciarJogo ser executada
let jogo = setInterval(iniciarJogo, 100);





