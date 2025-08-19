"use strict";
/*
Class holding functionality for file operations
*/
class FileOps {
    constructor() {
        this.file = null;
    }
    setFile(file) {
        this.file = file;
    }
    getFile() {
        return this.file;
    }
}
module.exports = FileOps;
