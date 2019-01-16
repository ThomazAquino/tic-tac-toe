var game = []; // save the positions of plays X or O
var board = []; // control of visual elements
var whoPlays = 0; // 0 = Player and 1 = Cpu
var check; // store the result of function checkVictory()
var draw;
var gameOver = false;
var difficulty = 1;
var whoStart = 1;
var playerSymbol;
var cpuSymbol;
var played = 0; // count the number of plays

function setSymbol() {
    playerSymbol = document.getElementById("dvPlayerSymbol").value;
    if (playerSymbol == "X") {
        cpuSymbol = "O";
    } else {
        cpuSymbol = "X";
    }
}

function cpuPlaying() {
    if(!gameOver) {
        var line;
        var column;
        if (difficulty == 1) {

            do { // first sortition a random position
                line = Math.round(Math.random()*2);
                column = Math.round(Math.random()*2);
            } while (game[line][column] != ""); // then verify if the position is empty
            game[line][column] = cpuSymbol; //this will be dinamic **
            console.log("Jogada CPU:");
            console.log(game);

        } 
        check = checkVictory();
        draw = checkDraw();
        if (check != "") {
            document.getElementById("winnerDiv").innerHTML = "The winner is <img src='images/" + check + ".png' alt='X Symbol'>";
            updateScore(check);
            gameOver = true;
            setTimeout(start, 3000);
        }  else if (draw == "draw") {
            document.getElementById("winnerDiv").innerHTML = "Draw!";
            gameOver = true;
            setTimeout(start, 3000);
        }
        refreshBoard();
        played++;
        whoPlays = 0; // set the next play to PLayer
        play();
    }
}

function checkDraw() {

    if (
        (game[0][0] != "") && (game[0][1] != "") && (game[0][2] != "") &&
        (game[1][0] != "") && (game[1][1] != "") && (game[1][2] != "") &&
        (game[2][0] != "") && (game[2][1] != "") && (game[2][2] != "")
    ) {
            return "draw";
        }
    
}

function updateScore(winner) {
    var Element = ".scoretext" + winner;
    //document.querySelector(Element).innerHTML = "OK";
    var soma = document.querySelector(Element).value;
    soma++;
    document.querySelector(Element).value = soma;
}

function checkVictory() {
    var line;
    var column;
    //check all 3 lines
    for (line = 0; line < 3; line++) { 
        if ( (game[line][0] == game[line][1]) && (game[line][1] == game[line][2]) && (game[line][0] != "") ) {
            return game[line][0]; // Return de winner
        }
    }
    console.log("chegou na line " + line + "-->" + Math.round(Math.random()*100) );
    //check all 3 columns
    for (column = 0; column < 3; column++) { 
        if ( (game[0][column] == game[1][column]) && (game[1][column]==game[2][column]) && (game[0][column]!= "") ){
            return game[0][column]; // Return de winner
        }
    }
    console.log("chegou na coluna " + column + "-->" + Math.round(Math.random()*100) );
    //check Diagonal 1 --> \
    if ( (game[0][0] == game[1][1]) && (game[1][1]==game[2][2]) && (game[0][0]!="") ){
        return game[0][0]; // Return de winner
    }

    //check Diagonal 2 --> /
    if ( (game[0][2] == game[1][1]) && (game[1][1]==game[2][0]) && (game[1][1]!="") ){
        return game[0][2]; // Return de winner
    }
    return "";
}

function play(p) { // the parameter is the position of the element
    if ((!gameOver)&&(whoPlays == 0)) { //if gameOver still false and whoPlays is the player
        //switch
            do { // first sortition a random position
                line = Math.round(Math.random()*2);
                column = Math.round(Math.random()*2);
            } while (game[line][column] != ""); // then verify if the position is empty
            game[line][column] = playerSymbol; 
            console.log("Jogada Player:");
            console.log(game);
        // se swuitch for jogavel passa whoplays para 1


        
            refreshBoard();
            console.log("Minha jogada:");
            console.log(game);
            
            check = checkVictory();
            draw = checkDraw();
            if (check != "") {
                document.getElementById("winnerDiv").innerHTML = "The winner is <img src='images/" + check + ".png' alt='X Symbol'>";
                updateScore(check);
                gameOver = true;
                setTimeout(start, 3000);
            } else if (draw == "draw") {
                document.getElementById("winnerDiv").innerHTML = "Draw!";
                gameOver = true;
                setTimeout(start, 3000);
            }
            whoPlays == 1;
            played++;
            cpuPlaying();
        
    }
}

function start() {
    document.getElementById("winnerDiv").innerHTML = "";
    setSymbol();
    gameOver = false;
    //difficulty = document.getElementById("dvPlayerLevel").value;
    played = 0;
    game = [
            ["","",""],
            ["","",""],
            ["","",""]
    ];
    board = [
        [document.getElementById("p1"),document.getElementById("p2"),document.getElementById("p3")],
        [document.getElementById("p4"),document.getElementById("p5"),document.getElementById("p6")],
        [document.getElementById("p7"),document.getElementById("p8"),document.getElementById("p9")]
    ];
    refreshBoard();
    if (whoStart == 1) {
        whoStart = 0; // inverte **
        whoPlays = whoStart;
        play();
        document.getElementById("dvWhoStarts").innerHTML = "The first movement is: " + "<img src='images/" + playerSymbol + ".png' alt='X Symbol' class='img-first-move'> (You)";
    } else {
        whoStart = 1; // inverte **
        whoPlays = whoStart;
        cpuPlaying();
        document.getElementById("dvWhoStarts").innerHTML = "The first movement is: " + "<img src='images/" + cpuSymbol + ".png' alt='X Symbol' class='img-first-move'> (Cpu)";
    }
    console.log("====  Ja resetou o jogo, proximo é vazio");
    console.log(game);
}

function refreshBoard() {
    for(var line = 0; line < 3; line++) { // one for to the lines
        for(var column = 0; column < 3; column++ ) { // one for to the columns
            if (game[line][column] == playerSymbol) {
                board[line][column].innerHTML = "<img src='images/" + playerSymbol + ".png' alt='X Symbol'>";
                board[line][column].style.cursor = "default";

            } else if (game[line][column] == cpuSymbol) {
                board[line][column].innerHTML = "<img src='images/" + cpuSymbol + ".png' alt='X Symbol'>";
                board[line][column].style.cursor = "default";
            } else {
                board[line][column].innerHTML = "";
                board[line][column].style.cursor = "pointer";
            }
        }
    }
}

window.addEventListener("load", start);