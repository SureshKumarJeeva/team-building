/*
Class holding functionality for file operations
*/
const { parse } = require('csv-parse/sync');
import { employeeItem } from "./utils";

export class FileOps{

    constructor(){

    }

    private file: Express.Multer.File | null = null;

    setFile(file:Express.Multer.File){
        this.file = file;
    }

    getFile(): Express.Multer.File | null{
        return this.file;
    }

    //find the file format/type/extension
    getFileFormat(){
        let fileName = this.file?.originalname;
        let extension = fileName?.split(".").pop();
        return extension;
    }

    getParsedFile(){
        try{
            if(this.file){
                const csvBuffer = this.file.buffer;
                const csvString = csvBuffer?.toString('utf8');
                //parse csv string and get the result as array of objects
                const records = parse(csvString, {
                    columns: true,
                    skip_empty_lines: true
                }) as employeeItem[];
                // console.log(records);
                return records;
            }
            else
                throw new Error("File not present");
        }catch(err:any){
            throw new Error("Error while processing the CSV file: "+err.message);
        }
    }
}

// module.exports = FileOps;