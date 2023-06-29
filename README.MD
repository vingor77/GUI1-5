This is a simple one-line scrabble board project made for GUI 1 homework 5. It utilizes Jquery UI draggable and droppable objects.
Below are the features fully implemented, followed by stretch features that was unfortunately not included.

The required features included are:
- Proper scrabble tile distribution.
- Drag and drop tiles.
- Differentiation between what tile was placed on what board piece.
- Bonus square calculations.
- The board clears after a word is submitted, and the hand is refilled to 7 tiles.
- Full game functionality (spell out words until there are no tiles left).
- Total score after each word is calculated.
- Tiles may only be placed on legal board pieces, else it reverts back to the tile "rack".
- Once a tile is placed, it cannot be moved. Tiles snap to the board pieces.
- Legal board pieces are calculated after the first tile is placed. This causes only the tiles to the left and right of an already placed tile to be legal.
- Restart at any time.

The extra features included are:
- Display the score and word for the current turn as more tiles are placed.
- Display the amount of tiles left in the "bag".
- Replace all tiles in hand.
- Replace selected tiles in hand.
- Previous turn words are displayed with the score acquired attached.
- Per scrabble rules, add 50 points if the word is 7 letters long.
- Per scrabble rules, subtract the value of the tiles left in hand when no more tiles are available. When the game ends essentially.

Features I was not able to implement in time:
- Full scrabble board
- Dictionary verification
