var game = []; // save the positions of plays X or O
var board = []; // control of visual elements
var whoPlays = 0; // 0 = Player and 1 = Cpu
var check; // store the result of function checkVictory()
var gameOver = false;
var difficulty = 2;
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
        if(difficulty == 1) {
            do { // first sortition a random position
                line = Math.round(Math.random()*2);
                column = Math.round(Math.random()*2);
            } while (game[line][column] != ""); // then verify if the position is empty
            game[line][column] = cpuSymbol; //this will be dinamic **

        } else if (difficulty == 2) {
            // level 2
            // Atack
            // Possible plays on line 1
            if ( (game[0][0] == cpuSymbol)&&(game[0][1] == cpuSymbol)&&(game[0][2] == "") ) {
                game[0][2] = cpuSymbol; 
            } else if ( (game[0][0] == cpuSymbol)&&(game[0][2] == cpuSymbol)&&(game[0][1] == "") ) {
                game[0][1] = cpuSymbol;
            } else if ( (game[0][1] == cpuSymbol)&&(game[0][2] == cpuSymbol)&&(game[0][0] == "") ) {
                game[0][0] = cpuSymbol;
            } else
            // Possible plays on line 2
            if ( (game[1][0] == cpuSymbol)&&(game[1][1] == cpuSymbol)&&(game[1][2] == "") ) {
                game[1][2] = cpuSymbol; 
            } else if ( (game[1][0] == cpuSymbol)&&(game[1][2] == cpuSymbol)&&(game[1][1] == "") ) {
                game[1][1] = cpuSymbol;
            } else if ( (game[1][1] == cpuSymbol)&&(game[1][2] == cpuSymbol)&&(game[1][0] == "") ) {
                game[1][0] = cpuSymbol;
            } else
            // Possible plays on line 3
            if ( (game[2][0] == cpuSymbol)&&(game[2][1] == cpuSymbol)&&(game[2][2] == "") ) {
                game[2][2] = cpuSymbol; 
            } else if ( (game[2][0] == cpuSymbol)&&(game[2][2] == cpuSymbol)&&(game[2][1] == "") ) {
                game[1][1] = cpuSymbol;
            } else if ( (game[2][1] == cpuSymbol)&&(game[2][2] == cpuSymbol)&&(game[2][0] == "") ) {
                game[2][0] = cpuSymbol;
            } else
            // Possible plays on column 1
            if ( (game[0][0] == cpuSymbol)&&(game[1][0] == cpuSymbol)&&(game[2][0] == "") ) {
                game[2][0] = cpuSymbol; 
            } else if ( (game[0][0] == cpuSymbol)&&(game[2][0] == cpuSymbol)&&(game[1][0] == "") ) {
                game[1][0] = cpuSymbol;
            } else if ( (game[1][0] == cpuSymbol)&&(game[2][0] == cpuSymbol)&&(game[0][0] == "") ) {
                game[0][0] = cpuSymbol;
            } else
            // Possible plays on column 2
            if ( (game[0][1] == cpuSymbol)&&(game[1][1] == cpuSymbol)&&(game[2][1] == "") ) {
                game[2][1] = cpuSymbol; 
            } else if ( (game[0][1] == cpuSymbol)&&(game[2][1] == cpuSymbol)&&(game[1][1] == "") ) {
                game[1][1] = cpuSymbol;
            } else if ( (game[1][1] == cpuSymbol)&&(game[2][1] == cpuSymbol)&&(game[0][1] == "") ) {
                game[0][1] = cpuSymbol;
            } else
            // Possible plays on column 3
            if ( (game[0][2] == cpuSymbol)&&(game[1][2] == cpuSymbol)&&(game[2][2] == "") ) {
                game[2][2] = cpuSymbol; 
            } else if ( (game[0][2] == cpuSymbol)&&(game[2][2] == cpuSymbol)&&(game[1][2] == "") ) {
                game[1][2] = cpuSymbol;
            } else if ( (game[1][2] == cpuSymbol)&&(game[2][2] == cpuSymbol)&&(game[0][2] == "") ) {
                game[0][2] = cpuSymbol;
            } else
            // Possible play on diagonal 1 --> \
            if ( (game[0][0] == cpuSymbol)&&(game[1][1] == cpuSymbol)&&(game[2][2] == "") ) {
                game[2][2] = cpuSymbol; 
            } else if ( (game[0][0] == cpuSymbol)&&(game[2][2] == cpuSymbol)&&(game[1][1] == "") ) {
                game[1][1] = cpuSymbol;
            } else if ( (game[1][1] == cpuSymbol)&&(game[2][2] == cpuSymbol)&&(game[0][0] == "") ) {
                game[0][0] = cpuSymbol;
            } else
            // Possible play on diagonal 2 --> /
            if ( (game[0][2] == cpuSymbol)&&(game[1][1] == cpuSymbol)&&(game[2][0] == "") ) {
                game[2][0] = cpuSymbol; 
            } else if ( (game[0][2] == cpuSymbol)&&(game[2][0] == cpuSymbol)&&(game[1][1] == "") ) {
                game[1][1] = cpuSymbol;
            } else if ( (game[2][0] == cpuSymbol)&&(game[1][1] == cpuSymbol)&&(game[0][2] == "") ) {
                game[0][2] = cpuSymbol;
            } else
            // Defend
            // Possible plays on line 1
            if ( (game[0][0] == playerSymbol)&&(game[0][1] == playerSymbol)&&(game[0][2] == "") ) {
                game[0][2] = cpuSymbol; 
            } else if ( (game[0][0] == playerSymbol)&&(game[0][2] == playerSymbol)&&(game[0][1] == "") ) {
                game[0][1] = cpuSymbol;
            } else if ( (game[0][1] == playerSymbol)&&(game[0][2] == playerSymbol)&&(game[0][0] == "") ) {
                game[0][0] = cpuSymbol;
            } else
            // Possible plays on line 2
            if ( (game[1][0] == playerSymbol)&&(game[1][1] == playerSymbol)&&(game[1][2] == "") ) {
                game[1][2] = cpuSymbol; 
            } else if ( (game[1][0] == playerSymbol)&&(game[1][2] == playerSymbol)&&(game[1][1] == "") ) {
                game[1][1] = cpuSymbol;
            } else if ( (game[1][1] == playerSymbol)&&(game[1][2] == playerSymbol)&&(game[1][0] == "") ) {
                game[1][0] = cpuSymbol;
            } else
            // Possible plays on line 3
            if ( (game[2][0] == playerSymbol)&&(game[2][1] == playerSymbol)&&(game[2][2] == "") ) {
                game[2][2] = cpuSymbol; 
            } else if ( (game[2][0] == playerSymbol)&&(game[2][2] == playerSymbol)&&(game[2][1] == "") ) {
                game[1][1] = cpuSymbol;
            } else if ( (game[2][1] == playerSymbol)&&(game[2][2] == playerSymbol)&&(game[2][0] == "") ) {
                game[2][0] = cpuSymbol;
            } else
            // Possible plays on column 1
            if ( (game[0][0] == playerSymbol)&&(game[1][0] == playerSymbol)&&(game[2][0] == "") ) {
                game[2][0] = cpuSymbol; 
            } else if ( (game[0][0] == playerSymbol)&&(game[2][0] == playerSymbol)&&(game[1][0] == "") ) {
                game[1][0] = cpuSymbol;
            } else if ( (game[1][0] == playerSymbol)&&(game[2][0] == playerSymbol)&&(game[0][0] == "") ) {
                game[0][0] = cpuSymbol;
            } else
            // Possible plays on column 2
            if ( (game[0][1] == playerSymbol)&&(game[1][1] == playerSymbol)&&(game[2][1] == "") ) {
                game[2][1] = cpuSymbol; 
            } else if ( (game[0][1] == playerSymbol)&&(game[2][1] == playerSymbol)&&(game[1][1] == "") ) {
                game[1][1] = cpuSymbol;
            } else if ( (game[1][1] == playerSymbol)&&(game[2][1] == playerSymbol)&&(game[0][1] == "") ) {
                game[0][1] = cpuSymbol;
            } else
            // Possible plays on column 3
            if ( (game[0][2] == playerSymbol)&&(game[1][2] == playerSymbol)&&(game[2][2] == "") ) {
                game[2][2] = cpuSymbol; 
            } else if ( (game[0][2] == playerSymbol)&&(game[2][2] == playerSymbol)&&(game[1][2] == "") ) {
                game[1][2] = cpuSymbol;
            } else if ( (game[1][2] == playerSymbol)&&(game[2][2] == playerSymbol)&&(game[0][2] == "") ) {
                game[0][2] = cpuSymbol;
            } else
            // Possible play on diagonal 1 --> \
            if ( (game[0][0] == playerSymbol)&&(game[1][1] == playerSymbol)&&(game[2][2] == "") ) {
                game[2][2] = cpuSymbol; 
            } else if ( (game[0][0] == playerSymbol)&&(game[2][2] == playerSymbol)&&(game[1][1] == "") ) {
                game[1][1] = cpuSymbol;
            } else if ( (game[1][1] == playerSymbol)&&(game[2][2] == playerSymbol)&&(game[0][0] == "") ) {
                game[0][0] = cpuSymbol;
            } else
            // Possible play on diagonal 2 --> /
            if ( (game[0][2] == playerSymbol)&&(game[1][1] == playerSymbol)&&(game[2][0] == "") ) {
                game[2][0] = cpuSymbol; 
            } else if ( (game[0][2] == playerSymbol)&&(game[2][0] == playerSymbol)&&(game[1][1] == "") ) {
                game[1][1] = cpuSymbol;
            } else if ( (game[2][0] == playerSymbol)&&(game[1][1] == playerSymbol)&&(game[0][2] == "") ) {
                game[0][2] = cpuSymbol;
            } else {
                if (played < 8 ) {
                    do { // first sortition a random position
                        line = Math.round(Math.random()*2);
                        column = Math.round(Math.random()*2);
                    } while (game[line][column] != ""); // then verify if the position is empty
                    game[line][column] = cpuSymbol; //this will be dinamic **
                } else {
                    for(var line = 0; line < 3; line++) { 
                        for(var column = 0; column < 3; column++ ) {
                            if(game[line][column] == "") {
                                game[line][column] == cpuSymbol;
                            }
                        }
                    }
                }
            }
            //end level 2
        }
        check = checkVictory();
        if (check != "") {
            document.getElementById("winnerDiv").innerHTML = "The winner is <img src='images/" + check + ".png' alt='X Symbol'>";
            gameOver = true;
        }
        refreshBoard();
        played++;
        whoPlays = 0; // set the next play to PLayer
    }
}

function checkVictory() {
    var line;
    var column;
    //check all 3 lines
    for (line = 0; line < 3; line++) { 
        if ( (game[line][0] == game[line][1])&&(game[line][1]==game[line][2]) ){
            return game[line][0]; // Return de winner
        }
    }

    //check all 3 columns
    for (column = 0; column < 3; column++) { 
        if ( (game[0][column] == game[1][column])&&(game[1][column]==game[2][column]) ){
            return game[0][column]; // Return de winner
        }
    }

    //check Diagonal 1 --> \
    if ( (game[0][0] == game[1][1])&&(game[1][1]==game[2][2]) ){
        return game[0][0]; // Return de winner
    }

    //check Diagonal 2 --> /
    if ( (game[0][2] == game[1][1])&&(game[1][1]==game[2][0]) ){
        return game[0][2]; // Return de winner
    }
    return "";
}


function play(p) { // the parameter is the position of the element
    if ((!gameOver)&&(whoPlays == 0)) { //if gameOver still false and whoPlays is the player
        switch(p) {
            case 1:
                if(game[0][0] == ""){ // Verify if the position is valid
                    game[0][0] = playerSymbol; //this will be dinamic **
                    whoPlays = 1; // set the next play to Cpu
                }
                break;
            case 2:
                if(game[0][1] == ""){
                    game[0][1] = playerSymbol;
                    whoPlays = 1; 
                }
                break;
            case 3:
                if(game[0][2] == ""){
                    game[0][2] = playerSymbol;
                    whoPlays = 1;
                }
                break;
            case 4:
                if(game[1][0] == ""){
                    game[1][0] = playerSymbol;
                    whoPlays = 1;
                }
                break;
            case 5:
                if(game[1][1] == ""){
                    game[1][1] = playerSymbol;
                    whoPlays = 1;
                }
                break;
            case 6:
                if(game[1][2] == ""){
                    game[1][2] = playerSymbol;
                    whoPlays = 1;
                }
                break;
            case 7:
                if(game[2][0] == ""){
                    game[2][0] = playerSymbol;
                    whoPlays = 1;
                }
            break;
            case 8:
                if(game[2][1] == ""){
                    game[2][1] = playerSymbol;
                    whoPlays = 1;
                }
            break;
            case 9:
                if(game[2][2] == ""){
                    game[2][2] = playerSymbol;
                    whoPlays = 1;
                }
            break;
        }
        if (whoPlays == 1) { // for have sure if the position is valid. 
            refreshBoard();
            check = checkVictory();
            if (check != "") {
                document.getElementById("winnerDiv").innerHTML = "The winner is <img src='images/" + check + ".png' alt='X Symbol'>";
                gameOver = true;
            }
            played++;
            cpuPlaying();
        }
    }
}

function start() {
    document.getElementById("winnerDiv").innerHTML = "";
    setSymbol();
    gameOver = false;
    difficulty = document.getElementById("dvPlayerLevel").value;
    played = 0;
    cpuPlay = 1;
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
        document.getElementById("dvWhoStarts").innerHTML = "The first movement is: " + "<img src='images/" + playerSymbol + ".png' alt='X Symbol' class='img-first-move'> (You)";
    } else {
        whoStart = 1; // inverte **
        whoPlays = whoStart;
        cpuPlaying();
        document.getElementById("dvWhoStarts").innerHTML = "The first movement is: " + "<img src='images/" + cpuSymbol + ".png' alt='X Symbol' class='img-first-move'> (Cpu)";
    }
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