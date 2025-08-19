const Game = require("../Game");
const Files = require("./FileOps");

class SecretSanta extends Game{
    //store employee list file
    private file:FileOps;

    //initialize employee list file with file passed by user
    constructor(f:any){
        super();
        this.file = new Files();
        this.file.setFile(f);
    }

    organize(){
        if(this.file)
            return "File submitted";
        else
            return "File not present";
    }
}

module.exports = SecretSanta;