const main = document.querySelector("main")
const root = document.querySelector(":root")

document.getElementById('themeSwitcher').addEventListener('click', function () {
    if(main.dataset.theme === "dark") {
    root.style.setProperty("--bg-color", "#f1f5f9")
    root.style.setProperty("--border-color", "#aaa")
    root.style.setProperty("--font-color", "#212529")
    root.style.setProperty("--primary-color", "#26834a")
    main.dataset.theme = "light"
  } else {
    root.style.setProperty("--bg-color", "#212529")
    root.style.setProperty("--border-color", "#666")
    root.style.setProperty("--font-color", "#f1f5f9")
    root.style.setProperty("--primary-color", "#4dff91")
    main.dataset.theme = "dark"
  }
})

const boardRegions = document.querySelectorAll('#gameBoard span')
let vBoard = [] //tabuleiro virtual
let turnPlayer = ''

function updateTitle () { //serve para mostrar no html de quem é a vez
    const playerInput = document.getElementById(turnPlayer) //Selecionar o jogador do turno atual
    document.getElementById('turnPlayer').innerText = playerInput.value 
}

function initializeGame () {
    vBoard = [['','',''],['','',''],['','','']] //criar uma matriz para mostrar a situação do tabuleiro com tres linhas e tres colunas
    turnPlayer = 'player1' //jogador que vai começar
    document.querySelector('h2').innerHTML = 'Vez de: <span id="turnPlayer"></span>' //setar exatamente oque esta no html para modifica-lo conforme o andamento do jogo
    updateTitle()
    boardRegions.forEach(function (element) { //o forEach serve para pegar um span para cada elemento
        element.classList.remove('win') // Essa função não apenas servira para inicializar o jogo mas também para REINICIALIZAR o jogo
        element.innerText = ''
        element.classList.add('cursor-pointer')
        element.addEventListener('click', handleBoardClick)
    })
}

function disableRegion (element){ //Serve para não permitir que o jogador jogue no mesmo lugar mais de uma vez
    element.classList.remove('cursor-pointer')
    element.removeEventListener('click', handleBoardClick)
}

function getWinRegions () {
    const winRegions = []
    if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2]) winRegions.push("0.0", "0.1", "0.2")
    if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2]) winRegions.push("1.0", "1.1", "1.2")
    if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2]) winRegions.push("2.0", "2.1", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0]) winRegions.push("0.0", "1.0", "2.0")
    if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1]) winRegions.push("0.1", "1.1", "2.1")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2]) winRegions.push("0.2", "1.2", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2]) winRegions.push("0.0", "1.1", "2.2")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0]) winRegions.push("0.2", "1.1", "2.0")
    return winRegions
}

function handleWin (regions) { //Função para exibir a vitória
    regions.forEach(function (region) {
        document.querySelector('[data-region="' + region + '"]').classList.add('win') // Para cada uma das regiões, seleciona o elemento da região, pegando um atributo expecifico que seria o "[data-region]", e esta concatenado com a "region" que se refere as regioes ex: 0.0 , 0.1 e etc... com isso, pegar a classe dele e associar com a classe 'win' que criamos no CSS para pintar as regiões de verde quando um jogador vencer
    })
    const playerName = document.getElementById(turnPlayer).value //Selecionando o nome do jogador que venceu para exibi-lo 
    document.querySelector('h2').innerHTML = playerName + ' venceu!'
}

function handleBoardClick (ev) { //Servirá para quando o jogador clicar em alguma região para jogar
    const region = ev.currentTarget.dataset.region //No caso o 'currentTarget' é o span que o jogador clica
    const rowColumnPair = region.split('.') //O metodo 'split' serve para dividia a string transformando-a em um array (no exemplo do jogo, cada região tem um '.', que seri um 0.0 e assim por diante)
    const row = rowColumnPair[0] 
    const column = rowColumnPair[1] //na matematica o primeiro numero é a linha(row), e o segundo é a coluna(column)
    if (turnPlayer === 'player1') {
        ev.currentTarget.innerText = 'X'
        vBoard[row][column] = 'X'
    } else {
        ev.currentTarget.innerText = 'O'
        vBoard[row][column] = 'O'
    }

    console.clear() //Para limpar o console sempre que chegarmos a este ponto
    console.table(vBoard) //Para mostrar uma informação em formato de tabela (Representa mais nitidamente o conseito das linhas e das colunas)
    disableRegion(ev.currentTarget)
    const winRegions = getWinRegions() //Para verificar se o jogador venceu
    if (winRegions.length > 0){ //Verificar se tem alguma coisa dentro do 'winRegion'
        handleWin (winRegions)
    } else if(vBoard.flat().includes('')){ //O método flat serve para "achatar" uma array
        turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1' //Para alternar os jogadores enquanto ouver espaço vazio no tabuleiro
        updateTitle()
    } else {
        document.querySelector('h2').innerHTML = 'EMPATE!'
    }
}

document.getElementById('start').addEventListener('click', function () { //inicializar o jogo 
    initializeGame()
})

//Anotações feitas por Pedroca !!