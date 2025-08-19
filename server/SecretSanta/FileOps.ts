/*
Class holding functionality for file operations
*/

class FileOps{
    private file: Express.Multer.File | null = null;

    setFile(file:Express.Multer.File){
        this.file = file;
    }

    getFile(): Express.Multer.File | null{
        return this.file;
    }
}

module.exports = FileOps;