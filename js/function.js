/*
    Name: Vincent Gordon
    Email: vincent_gordon@student.uml.edu
    Copyright (c) 2023 by Vincent.
    Date of file creation: June 21st 2023 at 10:56 AM
    Last updated by Vincent June 29th 2023 at 11:42 AM
    This holds all of the functionality for the project. It allows for resetting of the board, replacing specific tiles, submitting words, and more.
    The page dynamically creates and removes objects while also displaying error messages for the user to correct thier mistakes.
*/

$(function () {
    var tiles;
    var totalLeft = 100;
    var score = 0;
    var totalScore = 0;
    var word = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]; //15 long. One to represent each board piece.
    var blankReplace = "/";
    var pastWords = [];

    //Empties the tiles and the checkboxes then creates brand new ones. This is only used on setup of the program (on website load or reset button.)
    function getTiles() {
        $('#tiles').text("");
        $('#checks').text("");

        for(var i = 0; i < 7; i++) {
            generateTile(i, "e");
            generateCheckbox(i);
        }
    }

    function isBlankOpen() {
        for(var i = 0; i < word.length; i++) {
            if(word[i] == "/") {
                return true;
            }
        }
    }

    /*
        Generates a tile at the ith spot in the user's "hand".
        The change variable is to indicate where it's being called from. This changes how to append the image.
        If change is c (for...well change) then it inserts before the next element to replace the one getting removed.
        If change is anything else, it just appends to the end.
    */
    function generateTile(i, change) {
        if(totalLeft == 0) {
            return false;
        }
        else {
            var tile = tiles[Math.floor(Math.random() * (tiles.length + 1))];

            //Due to dictionary lookups, there is a chance of it being undefined. This loops to make sure it is defined before trying to work on it.
            //If I didn't do this, it would error out often.
            while(tile == undefined) {
                tile = tiles[Math.floor(Math.random() * (tiles.length + 1))];
            }
    
            while(tile.count < 1) {
                tile = tiles[Math.floor(Math.random() * (tiles.length + 1))];
    
                if(tile == undefined) {
                    tile = tiles[Math.floor(Math.random() * (tiles.length + 1))];
                }
            }
    
            tile.count--;
            totalLeft--;
    
            //Create the image element and append based on change variable.
            //Then make the element draggable.
            var img = document.createElement("img");
            img.setAttribute("src", "Tiles/Scrabble_Tile_" + tile.letter + ".jpg")
            img.setAttribute("class", "ui-widget-content draggable");
            img.setAttribute("id", "img" + i);
            if(change == "c") {
                document.getElementById('tiles').insertBefore(img, document.getElementById('tiles').children[parseInt(i) + 1]);
            }
            else {
                $('#tiles').append(img);
            }

            $('.draggable').draggable({
                snap: '.droppable',
                snapMode: "inner",
                revert : function(event) {
                    if(!event) {
                        $('#error').text("Tiles can only be placed on valid board spaces.");
                    }
                    return !event;
                },
                
                //Adds styling to the board to indicate where a tile can be placed when a tile is picked up.
                start: function () {
                    //Checks for the / meaning blank. If it is in there, then the user has not chosen a letter.
                    //Remove the board pieces from the placableBoard array and disable the board.
                    //This ensures no tiles can be placed until the blank is resolved.
                    if(isBlankOpen()) {
                        for(var i = 0; i < placableBoard.length; i++) {
                            tempHoldTiles.push(placableBoard[i]);
                        }
    
                        placableBoard = [];
    
                        for(var i = 0; i < $('#board').children().length; i++) {
                            $('#board').children(i).droppable("disable");
                        }

                        $('#error').text("You must choose a letter for the blank tile.");
                    }
                    else {
                        //This else re-enables the board pieces that was previously enabled before the blank.
                        for(var i = 0; i < tempHoldTiles.length; i++) {
                            placableBoard.push(tempHoldTiles[i]);
                        }
    
                        tempHoldTiles = [];

                        for(var i = 0; i < placableBoard.length; i++) {
                            $('#' + placableBoard[i].id).droppable("enable");
                        }
                    }

                    for(var i = 0; i < placableBoard.length; i++) {
                        placableBoard[i].style.opacity = "30%";
                    }
                },
                stop: function() {
                    for(var i = 0; i < placableBoard.length; i++) {
                        placableBoard[i].style.opacity = "100%";
                    }
                }
            });

            $('#tilesLeft').text("Tiles left: " + totalLeft);
            return true;
        }
    }

    function generateCheckbox(i) {
        //This creates a label and checkbox to replace individual tiles.
        label = document.createElement("label");
        label.setAttribute("for", "check" + i);
        label.innerText = "Replace";
    
        input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("name", "check" + i);
        input.setAttribute("id", "check" + i);
        input.setAttribute("class", "replaceTile");
    
        $('#checks').append(label);
        $('#checks').append(input);
    }
    
    function reset() {
        //This function just puts a ton of values back to default so that resets and reloading of page can occur.
        //This is also considered the "main" of the program as it is the only function called at the bottom of the page not inside of another function.
        tiles = 
        [
            {letter: "a", value: 1, count: 9},
            {letter: "b", value: 3, count: 2},
            {letter: "c", value: 3, count: 2},
            {letter: "d", value: 2, count: 4},
            {letter: "e", value: 1, count: 12},
            {letter: "f", value: 4, count: 2},
            {letter: "g", value: 2, count: 3},
            {letter: "h", value: 4, count: 2},
            {letter: "i", value: 1, count: 9},
            {letter: "j", value: 8, count: 1},
            {letter: "k", value: 5, count: 1},
            {letter: "l", value: 1, count: 4},
            {letter: "m", value: 3, count: 2},
            {letter: "n", value: 1, count: 6},
            {letter: "o", value: 1, count: 8},
            {letter: "p", value: 3, count: 2},
            {letter: "q", value: 10, count: 1},
            {letter: "r", value: 1, count: 6},
            {letter: "s", value: 1, count: 4},
            {letter: "t", value: 1, count: 6},
            {letter: "u", value: 1, count: 4},
            {letter: "v", value: 4, count: 2},
            {letter: "w", value: 4, count: 2},
            {letter: "x", value: 8, count: 1},
            {letter: "y", value: 4, count: 2},
            {letter: "z", value: 10, count: 1},
            {letter: "blank", value: 0, count: 2}
        ];

        totalLeft = 100;
        score = 0;
        totalScore = 0;
        word = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
        placableBoard = [];
        pastWords = [];
        tilesOnBoard = [];
        changeType = "";

        $('#score').text("Score: 0");
        $('#totalScore').text("0");
        $('#word').text("Current word: ");
        $('#blankTile').hide();
        $('#change').show();
        $('#checks').show();
        $('#tilesLeft').text("Tiles left: " + totalLeft);
        $('#error').text("");
        $('#changeHand').show();
        $('#changeConfirm').hide();
        $('#words').html("<tr><th>Word</th><th>Value</th></tr><tr id='scoreTable'><td>Total score:</td><td id='totalScore'>" + score + "</td></tr>");

        generateBoard();
        getTiles();
    }

    //This changes the selected tiles using the checkboxes. It takes in an array of numbers representing the location in the user's "hand".
    function changeTiles(checkBoxes) {
        if(checkBoxes.length != 0) {
            if(checkBoxes.length > totalLeft) {
                return false; //Returns as there is no need to continue.
            }
            else {
                //Adds the tiles to be replaced into the ids array, then does edge case checking. It creates a tile then removes the old one.
                var ids = [];
                for(var i = 0; i < checkBoxes.length; i++) {
                    ids.push(document.getElementById('tiles').children[checkBoxes[i]].id.slice(3, 4));
                }

                for(var i = 0; i < ids.length; i++) {
                    if(ids[i] == 0) {
                        generateTile(0, "c");
                    }
                    else if(ids[i] == 6) {
                        generateTile(6, "c");
                    }
                    else {
                        generateTile(ids[i], "c");
                    }
                    document.getElementById('tiles').children[ids[i]].remove();
                }

                return true;
            }
        }
    }

    //DWActive is for Double word active.
    var DWActive = false;
    var tilesOnBoard = [];
    var tempHoldTiles = [];
    var blankOpen = false;

    //This is the meat of the game. It generates the board and along with it the droppable objects.
    function generateBoard() {
        $('#board').text("");
        //The board line is 15 pieces long.
        for(var i = 0; i < 15; i++) {
            //Create the images for the board.
            var img = document.createElement("img");
            img.setAttribute("class", "droppable");

            //IDs of 2 and 12 are double words, 6 and 8 are double letters, and the rest are regular squares. These numbers can be changed.
            if(i == 2 || i == 12) {
                img.setAttribute("id", "Piece" + i); //Double word tiles
                img.setAttribute("src", "Board_pieces/doubleWordPiece.png");
            }
            else if (i == 6 || i == 8) {
                img.setAttribute("id", "Piece" + i); //Double letter tiles
                img.setAttribute("src", "Board_pieces/doubleLetterPiece.png");
            }
            else {
                img.setAttribute("id", "Piece" + i); //Blank space or normal tiles
                img.setAttribute("src", "Board_pieces/blankBoardPiece.png");
            }
            $('#board').append(img);

            $('#Piece' + i).droppable({
                //This function runs when a draggable is dropped onto it. It first grabs the ID of the draggable.
                //Next it checks for blank tile or not. If it is, show the input to change the letter to the desired one.
                //Third, it calculates the score based on the board piece type and whether DW is active or not.
                drop: function(event, ui) {
                    if(!isBlankOpen()) {
                        //If the tile is dropped, then there is no problems.
                        $('#error').text("");

                        var letter = document.getElementById(ui.draggable.prop('id')).getAttribute("src").slice(20, 30);
                        var dragID = ui.draggable.prop('id');

                        if(letter.length > 5) {
                            letter = "blank";
                            word[this.id.slice(5, 7)] = "/";
                            $('#blankTile').show();
                        }
                        else {
                            letter = letter.slice(0, 1);
                            word[this.id.slice(5, 7)] = letter;
                        }

                        var currWord = getWord();
                        $('#word').text("Current word: " + currWord);
                    
                        if(this.id == "Piece2" || this.id == "Piece12") {
                            for(var i = 0; i < tiles.length; i++) {
                                if(tiles[i].letter == letter) {
                                    score += tiles[i].value;
                                    score *= 2;
                                    $('#score').text("Score: " + score);
                                    DWActive = true;
                                    break;
                                }
                            }
                        
                        }
                        else if (this.id == "Piece6" || this.id == "Piece8") {
                            for(var i = 0; i < tiles.length; i++) {
                                if(tiles[i].letter == letter) {
                                    if(DWActive) {
                                        score += (tiles[i].value * 4);
                                    }
                                    else {
                                        score += (tiles[i].value * 2);
                                    }
                                    $('#score').text("Score: " + score);
                                    break;
                                }
                            }
                        }
                        else {
                            for(var i = 0; i < tiles.length; i++) {
                                if(tiles[i].letter == letter) {
                                    if(DWActive) {
                                        score += (tiles[i].value * 2);
                                    }
                                    else {
                                        score += tiles[i].value;
                                    }
                                    $('#score').text("Score: " + score);
                                    break;
                                }
                            }
                        }
                    
                        //In the rules of scrabble, if the word is all 7 tiles long you get 50 bonus points, so this checks for that.
                        if(currWord.length == 7) {
                            score += 50;
                            $('#score').text("Score: " + score);
                        }

                        //Creates an array of tiles currently on the board, checks if the word is empty and if it isn't, disable all droppables.
                        tilesOnBoard.push($('#' + dragID).attr('id'));
                        $('#' + dragID).draggable('disable');
                        $('#change').hide();
                        $('#changeHand').hide();

                        if(currWord != 0) {
                            for(var i = 0; i < $('#board').children().length; i++) {
                                $('#board').children(i).droppable("disable");
                            }
                            reenable(this.id);
                        }
                    }
                }
            });
        }
    }

    //Get the current word on the board.
    function getWord() {
        var currWord = "";
        var firstLetter = "";
        for(var i = 0; i < word.length; i++) {
            if(word[i] != "" && firstLetter == "") {
                firstLetter = word[i].toUpperCase();
                currWord += firstLetter;
            }
            else if(word[i] != "") {
                currWord += word[i];
            }
        }
        return currWord;
    }

    //placableBoard is an array to state where tiles can be placed while prevBoardPiece indicates where tiles are already placed.
    var placableBoard = [];
    var prevBoardPiece = [];

    function reenable(tileID) {
        var currTile = document.getElementById(tileID);
        var num = tileID.slice(5, 7);

        //If this is the first tile placed
        if(placableBoard.length == 0) {
            //Edge case checking. If it's at 0, or the left most side of the board, don't try to add the previous (-1) to the array.
            //This is the same but opposite for the right side, or 14, of the board.
            if(num == 0) {
                placableBoard.push(currTile.nextElementSibling);
            }
            else if(num == 14) {
                placableBoard.push(currTile.previousElementSibling);
            }
            else {
                placableBoard.push(currTile.nextElementSibling);
                placableBoard.push(currTile.previousElementSibling);
            }
        }
        else {
            //Check if the tile was placed to the left or right of an already placed tile, then add the next tile.
            //If placed to the left, add the left of the one placed to the possible placement points.
            for(var i = 0; i < prevBoardPiece.length; i++) {
                if(currTile.previousElementSibling && prevBoardPiece[i].id == currTile.previousElementSibling.id) {
                    //Indicates right-most spot of the board.
                    if(currTile.id != "Piece14") {
                        placableBoard.push(currTile.nextElementSibling);
                    }

                    var index = placableBoard.indexOf(currTile);
                    if (index !== -1) {
                        placableBoard.splice(index, 1);
                    }
                }
                else if(currTile.nextElementSibling && prevBoardPiece[i].id == currTile.nextElementSibling.id) {
                    //Indicates left-most spot of the board.
                    if(currTile.id != "Piece0") {
                        placableBoard.push(currTile.previousElementSibling);
                    }

                    var index = placableBoard.indexOf(currTile);
                    if (index !== -1) {
                        placableBoard.splice(index, 1);
                    }
                }
            }
        }

        //Finally, enable all droppables that are able to be placed on. If already enabled, this won't do anything to it.
        for(var i = 0; i < document.getElementById("board").children.length; i++) {
            for(var j = 0; j < placableBoard.length; j++) {
                if(placableBoard[j].id == document.getElementById("board").children[i].id) {
                    var id = document.getElementById("board").children[i].id;
                    $('#' + id).droppable("enable");
                    break;
                }
            }
        }
        
        prevBoardPiece.push(currTile);
    }

    $('#reset').on("click", () => {
        reset();
    })

    var changeType = "";

    //This is the button that initiates tile changes using the checkboxes.
    $('#change').on("click", () => {
        var tilesToReplace = [];
        //Finds all the checked boxes.
        var checkboxes = $("#checks").find(".replaceTile");
        for(var i = 0; i < checkboxes.length; i++) {
            if(checkboxes[i].checked) {
                tilesToReplace.push(i);
            }
        }

        if(tilesToReplace.length == 0) {
            $('#error').text("There were no tiles selected. Please select at least one.");
        }
        else {
            changeType = "single";
            $('#replaceP').text("Are you sure you want to replace the selected tiles?");
            $('#change').hide();
            $('#changeHand').hide();
            $('#changeConfirm').show();
        }
    })

    //This buttons changes out the entire hand for new tiles. This is similar to reset, but does not replenish the tile pile.
    $('#changeHand').on("click", () => {
        changeType = "whole";
        $('#replaceP').text("Are you sure you want to replace all tiles?");
        $('#change').hide();
        $('#changeHand').hide();
        $('#changeConfirm').show();
    });

    //The confirm and deny on click events are buttons that make sure you really meant to replace tiles in your hand.
    //I've accidentally replaced tiles a few times during testing.
    $('#confirm').on("click", () => {
        if(changeType == "single") {
            var tilesToReplace = [];
            //Finds all the checked boxes.
            var checkboxes = $("#checks").find(".replaceTile");
            for(var i = 0; i < checkboxes.length; i++) {
                if(checkboxes[i].checked) {
                    tilesToReplace.push(i);
                    checkboxes[i].checked = false; //Resets the checked boxes to unchecked.
                }
            }
    
            changeErrors(tilesToReplace);
        }
        else {
            //Utilizing the same function for change, this just does it for all tiles.
            var tilesToReplace = [];
            //Finds all the checked boxes.
            var checkboxes = $("#checks").find(".replaceTile");
            for(var i = 0; i < checkboxes.length; i++) {
                tilesToReplace.push(i);
                checkboxes[i].checked = false; //Resets the checked boxes to unchecked.
            }

            changeErrors(tilesToReplace);
        }

        $('#change').show();
        $('#changeHand').show();
        $('#changeConfirm').hide();
    })

    $('#deny').on("click", () => {
        $('#change').show();
        $('#changeHand').show();
        $('#changeConfirm').hide();
    })

    //Does basic checks to make sure tiles are selected and there is enough tiles left to replace.
    function changeErrors(tilesToReplace) {
        if(tilesToReplace.length == 0) {
            $('#error').text("There were no tiles selected. Please select at least one.");
        }
        else {
            $('#error').text("");
        }

        if(changeTiles(tilesToReplace) == false) {
            $('#error').text("Not enough tiles.");
        }

        if(totalLeft == 0) {
            $('#error').text("No more tiles.");
            $('#change').hide();
            $('#changeHand').hide();
        }
    }

    //Submit the letter change for the blank tile.
    $('#changeBlank').on("click", () => {
        blankReplace = $('#blank').val();

        //Since numbers and symbols don't have different values in terms of ascii, we can use this hack to check if it's a letter.
        if(blankReplace.toLowerCase() != blankReplace.toUpperCase()) {
            for(var i = 0; i < word.length; i++) {
                if(word[i] == "/") {
                    word[i] = blankReplace.toLowerCase();
                }
            }
            
            var currWord = "";
            for(var i = 0; i < word.length; i++) {
                if(word[i] != "") {
                    currWord += word[i];
                }
            }
            $('#word').text("Current word: " + currWord);
    
            blankReplace = "/";
            $('#blankTile').hide();
            $('#error').text("");
            blankOpen = false;
        }
        else {
            $('#error').text("The blank tile must be a letter.");
        }
    })

    //Submits a word and resets certain things.
    //It first does the same algorithm as changeTiles by adding and removing certain tiles.
    //Then, it adds the score to the total running score. If the game is over, it subtracts points based on the tiles in hand (as per scrabble rules).
    $('#submit').on("click", () => {
        if(!isBlankOpen()) {
            if(tilesOnBoard.length > 0) {
                if(tilesOnBoard.length <= totalLeft) {
                    var ids = [];
                    for(var i = 0; i < tilesOnBoard.length; i++) {
                        ids.push(document.getElementById('tiles').children[tilesOnBoard[i]].id.slice(3, 4));
                    }
        
                    for(var i = 0; i < ids.length; i++) {
                        if(ids[i] == 0) {
                            generateTile(0, "c");
                        }
                        else if(ids[i] == 6) {
                            generateTile(6, "c");
                        }
                        else {
                            generateTile(ids[i], "c");
                        }
                        document.getElementById('tiles').children[ids[i]].remove();
                    }
                }
                else {
                    for(var i = 0; i < tilesOnBoard.length; i++) {
                        document.getElementById('tiles').children[tilesOnBoard[i]].remove();
                    }
                    totalLeft = 0;
                }
        
                totalScore += score; //Must happen before the check if empty. Otherwise the total score won't reflect correct.
                if(document.getElementById('tiles').children.length < 7 && totalLeft == 0) {
                    $('#error').text("No more tiles left. Please reset game.");
                    $('#change').hide();
                    $('#changeHand').hide();
                    $('#checks').hide();
        
                    for(var i = 0; i < document.getElementById('tiles').children.length; i++) {
                        var letter = document.getElementById('tiles').children[i].getAttribute("src").slice(20, 30);
                        if(letter.length > 5) {
                            letter = "blank";
                        }
                        else {
                            letter = letter.slice(0, 1);
                        }
        
                        for(var j = 0; j < tiles.length; j++) {
                            if(tiles[j].letter == letter) {
                                totalScore -= tiles[j].value;
                                break;
                            }
                        }

                        $('#' + document.getElementById('tiles').children[i].id).draggable("disable");
                    }
                }
                else {
                    $('#change').show();
                    $('#changeHand').show();
                    $('#checks').show();
                }
        
                //Prevents the total score from going under 0...if you somehow get that low of a score.
                if(totalScore < 0) {
                    totalScore = 0;
                }
                
                //Adds the words submitted with the point amount. This is just for the user to remember things.
                pastWords.push(getWord());

                var tr = document.createElement("tr");
                var tdWord = document.createElement("td");
                var tdVal = document.createElement("td");

                tdWord.innerText = getWord();
                tdVal.innerText = score;
        
                tr.appendChild(tdWord);
                tr.appendChild(tdVal);

                $('#scoreTable').before(tr);
        
                //Reset everything to default without resetting the tiles or board.
                score = 0;
                DWActive = false;
                tilesOnBoard = [];
                for(var i = 0; i < word.length; i++) {
                    word[i] = "";
                }
                $('#word').text("Current word: ");
                $('#score').text("Score: 0");
                $('#totalScore').text(totalScore);
        
                for(var i = 0; i < $('#board').children().length; i++) {
                    $('#board').children(i).droppable("enable");
                    $('#board').children(i).css("opacity", "100%");
                }
    
                placableBoard = [];
            }
            else {
                $('#error').text("Board is empty. Please place at least 1 tile.");
            }
        }
        else {
            $('#error').text("You must choose a letter for the blank tile.");
        }
    })

    //Starts everything. This is essentially the "main" of the project.
    reset();
})