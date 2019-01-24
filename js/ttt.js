var game = []; // save the positions of plays X or O
var board = []; // control of visual elements
var whoPlays = 0; // 0 = Player and 1 = Cpu
var check; // store the result of function checkVictory()
var draw;
var gameOver = false;
var whoStart = 1;
var playerSymbol;
var cpuSymbol;
var played = 0; // count the number of plays
var cordinateX = '';
var cordinateY = '';

async function getCordenates () {
    return new P (async (resolve, reject) => {
        try {
            resolve(await axios.get("https://nexmo.damagecloud.de/JsonServer/api/coordinates"));
        } catch (err) {
            // console.log(err);
            reject(err);
        }
    })   
}

async function consulataCord() {
    return new P (async (resolve, reject) => { 

        var { data } = await getCordenates();
        var {x, y} = data;

        x = parseInt(x) - 1; // The cordinates are 1 to 3 and my array works in 0 to 1
        y = parseInt(y) - 1;

        if (checkArray({ x, y })) { // check if the position of cordinates is possible plays (empty)
            resolve({ x, y });
        } else { // if the play is not possible recall the function in 2 seconds
            if (whoPlays == 0) {
                setTimeout(() => play(), 2000); 
            } else {
                setTimeout(() => cpuPlaying(), 2000);
            }
        }
    })
}

function checkArray(data) { // recive the cordinates 
    return game[data.x][data.y].length == ""; // verify if the cordinates is possible plays
}

async function play(p) { // the parameter is the position of the element
    if ((!gameOver) && (whoPlays == 0)) { //if gameOver still false and whoPlays is the player
        WhoIsPlaying();
        //sleep(2000);
        
        if (played < 8) { // check if has been played 8 times
            var data = await consulataCord();
            game[data.x][data.y] = playerSymbol;
            
        } else {  // just Fill the only position avaliable

            for(var line = 0; line < 3; line++) { 
                for(var column = 0; column < 3; column++ ) {
                    if(game[line][column] == "") {
                        game[line][column] = playerSymbol;
                    }
                }
            }
        }

        refreshBoard();
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
        whoPlays = 1; // set the next play to the other PLayer
        played++;
        cpuPlaying();
    }
}

async function cpuPlaying() {
    if (!gameOver) {
        WhoIsPlaying();
        //sleep(2000);

        if (played < 8) { // check if has been played 8 times

            var data = await consulataCord();
            game[data.x][data.y] = cpuSymbol;
            
        } else { // just Fill the only position avaliable

            for(var line = 0; line < 3; line++) { 
                for(var column = 0; column < 3; column++ ) {
                    if(game[line][column] == "") {
                        game[line][column] = cpuSymbol;
                    }
                }
            }
        }
        
        refreshBoard();
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
        
        played++;
        whoPlays = 0; // set the next play to the other PLayer
        play();
    }
}

function setSymbol() {
    playerSymbol = document.getElementById("dvPlayerSymbol").value;
    if (playerSymbol == "X") {
        cpuSymbol = "O";
    } else {
        cpuSymbol = "X";
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

function updateScore(winner) { // recive the winner: X or Y
    var Element = ".scoretext" + winner; // select the respective winner score input in HTML
    var soma = document.querySelector(Element).value;
    soma++; // increment the value present in input
    document.querySelector(Element).value = soma; // aply the new value in score
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
    //check all 3 columns
    for (column = 0; column < 3; column++) { 
        if ( (game[0][column] == game[1][column]) && (game[1][column]==game[2][column]) && (game[0][column]!= "") ){
            return game[0][column]; // Return de winner
        }
    }
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

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

function start() {
    document.getElementById("winnerDiv").innerHTML = "";
    setSymbol();
    gameOver = false;
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
        whoStart = 0; // reverse the symbol that will start **
        whoPlays = whoStart;
        play();
        document.getElementById("dvWhoStarts").innerHTML = "The first movement is: " + "<img src='images/" + playerSymbol + ".png' alt='X Symbol' class='img-first-move'>";
    } else {
        whoStart = 1; // reverse the symbol that will start **
        whoPlays = whoStart;
        cpuPlaying();
        document.getElementById("dvWhoStarts").innerHTML = "The first movement is: " + "<img src='images/" + cpuSymbol + ".png' alt='X Symbol' class='img-first-move'>";
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

function WhoIsPlaying() {
    if (whoPlays == 0 ) { //first
        document.getElementById("dvWhoIsPlaying").innerHTML = "Who is playing now is: " + "<img src='images/" + playerSymbol + ".png' alt='' class='img-first-move'>";
    } else {
        document.getElementById("dvWhoIsPlaying").innerHTML = "Who is playing now is: " + "<img src='images/" + cpuSymbol + ".png' alt='' class='img-first-move'>";
    }
}

window.addEventListener("load", start);

