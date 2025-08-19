"use strict";
const Game = require("../Game");
const Files = require("./FileOps");
class SecretSanta extends Game {
    //initialize employee list file with file passed by user
    constructor(f) {
        super();
        this.file = new FileOps();
        this.file.setFile(f);
    }
    organize() {
        if (this.file)
            return "File submitted";
        else
            return "File not present";
    }
}
module.exports = SecretSanta;
