var wordGuessGame  = {
    wordList:{
    introspection   :{meaning :"examining one's own thoughts and feelings"},
    philanthropist  :{meaning :"one who loves mankind"},
    antidote        :{meaning :"medicine used against a poison or a disease"},
    strive          :{meaning :"to make great efforts, to struggle"},
    ambidextrous    :{meaning :"able to use the left hand or the right equally well"},
    retrospective   :{meaning :"Looking back on past"},
    precursors      :{meaning :"a person or thing that precedes, as in a process or job."},
    introvert       :{meaning :"one who turns towards himself"},
    gerontocracy    :{meaning :"government ruled by old people"},
    ambiguous       :{meaning :"doubtful; uncertain"},
    braggart        :{meaning :"boastful"},
    abate           :{meaning :"to diminish in intensity"},
    aberrant        :{meaning:"diverging from the standard type"},
    abjure          :{meaning:"to reject or renounce"},
    abscond         :{meaning:"to leave secretly, evading detection"}
    },

    wordInPlay:null,
    lettertsOfTheWord:[],
    matchedLetters: [],
    guessedLetters: [],
    guessesLeft: 0,
    totalGuesses: 0,
    letterGuessed: null,
    wins: 0,
    meaning:null,

    setUpGame: function() {

        var objKeys = Object.keys(this.wordList);
        this.wordInPlay = objKeys[Math.floor(Math.random()*objKeys.length)];
        this.meaning = this.wordList[this.wordInPlay].meaning;
        console.log(this.meaning);
        console.log(this.wordInPlay);

        document.getElementById("wordMean").textContent = this.meaning;

        this.lettertsOfTheWord = this.wordInPlay.split("");
        console.log(this.lettertsOfTheWord);

        this.rebuildWordView();

        this.processUpdateTotalGuesses();
        
        

    },

    rebuildWordView: function() {
        var wordView = "";
        for(var i=0;i<this.lettertsOfTheWord.length;i++) {
            if(this.matchedLetters.indexOf(this.lettertsOfTheWord[i])!== -1){
                wordView += this.lettertsOfTheWord[i];
            }
            else{
                wordView += "&nbsp;_&nbsp;";
            }
        }
        console.log("wordView"+wordView);
        document.getElementById("word").innerHTML = wordView;
    },

    processUpdateTotalGuesses: function() {
        this.totalGuesses = this.wordInPlay.length + 5;
        this.guessesLeft = this.totalGuesses;

        document.getElementById("guessLeft").textContent= this.guessesLeft;
    },

    updatePage: function(letter) {
        if(this.guessesLeft === 0){
            this.restartGame();
        }
        else {
            this.updateGuesses(letter);

            this.updateMatchedLetters(letter);

            this.rebuildWordView();

            if(this.updateWins() === true){
                this.restartGame();
            }
        }
    },

    updateGuesses: function(letter) {
        if(this.guessedLetters.indexOf(letter) === -1 && this.lettertsOfTheWord.indexOf(letter) === -1) {
            this.guessedLetters.push(letter);
            this.guessesLeft = this.guessesLeft -1;
            document.getElementById("guessLeft").textContent = this.guessesLeft;
            document.getElementById("gLetters").textContent = this.guessedLetters.join(",");
        }
        else{
            this.guessesLeft = this.guessesLeft -1;
            document.getElementById("guessLeft").textContent = this.guessesLeft;
        }
    },

    updateMatchedLetters: function(letter) {
        for(var i=0;i<this.lettertsOfTheWord.length;i++){
            if(letter === this.lettertsOfTheWord[i] && this.matchedLetters.indexOf(letter) === -1) {
                this.matchedLetters.push(letter);
            }
        }
    },

    restartGame: function() {
        document.getElementById("gLetters").textContent = "";
        this.wordInPlay=null,
        this.lettertsOfTheWord=[],
        this.matchedLetters = [],
        this.guessedLetters = [],
        this.guessesLeft = 0,
        this.totalGuesses = 0,
        this.letterGuessed = null,
        this.meaning=null,
        this.setUpGame(),
        this.rebuildWordView()

    },

    updateWins: function() {
        var win;

        if(this.matchedLetters.length === 0){
            win = false;
        }
        else{
            win = true;
        }

        for(var i=0;i<this.lettertsOfTheWord.length;i++){
            if(this.matchedLetters.indexOf(this.lettertsOfTheWord[i])===-1){
                win = false;
            }
        }

        if(win){
            this.wins = this.wins+1;
            console.log(this.wins);
            document.getElementById("wins").textContent = this.wins;
            var num = Math.floor(Math.random()*5)+1;
            document.getElementById("imag").setAttribute("src","assets/images/win"+num+".gif");
            document.getElementById("imag").setAttribute("height","400px");
            document.getElementById("imag").setAttribute("width","200px");
            document.getElementById("content").style.display="none";
            document.getElementById("images").style.display="block";
            setTimeout(function(){
            document.getElementById("content").style.display="block";
            document.getElementById("images").style.display="none";
            
            },2000);
            return true;
        }
        return false;
        
    },

    


};



wordGuessGame.setUpGame();

document.onkeyup = function(event) {
    if(event.keyCode>=49 && event.keyCode<=90){
        wordGuessGame.letterGuessed = event.key.toLowerCase();
        wordGuessGame.updatePage(wordGuessGame.letterGuessed);
    }
}