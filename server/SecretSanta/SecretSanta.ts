const Game = require("../Game");
import { FileOps } from "./FileOps";
import { employeeItem } from "./utils";

class SecretSanta extends Game{
    //store employee list file
    private file;
    //master employee list
    private masterList:Array<employeeItem> = [];
    //unassigned employee list
    private unassignedList:Array<employeeItem> = [];
    //Assigned list
    private assignedList:Array<employeeItem> = [];

    //initialize employee list file with file passed by user
    constructor(f:any){
        super();
        this.file = new FileOps();
        this.file.setFile(f);
    }

    // check if provided file is in csv format
    validateFile() {
        //check if file is in csv format
        let extension = this.file.getFileFormat();
        if(extension != "csv"){
            throw new Error("Invalid file format");
        }
    }

    //function responsible for organizing the game
    organize(){
        try{
            this.validateFile();
            this.masterList = this.file.getParsedFile();
            this.unassignedList = structuredClone(this.masterList);

            if(this.assignChild(this.masterList, this.unassignedList))
                return (this.assignedList);
        }catch(err:any){
            throw new Error(err.message);
        }
    }

    //find and assign secret child for each employee
    assignChild(masterList:Array<employeeItem>, unassignedList:Array<employeeItem>){
        try{
        for(const masterItem of masterList){
            for(let i = unassignedList.length - 1; i >= 0; i--){
                let foundChild = false;
                if(masterItem.Employee_EmailID != unassignedList[i].Employee_EmailID){
                    //check if employee list is from previous year assignment and if so check for additional constraint
                    if(masterItem.Secret_Child_EmailID != null){
                        if(masterItem.Secret_Child_EmailID != unassignedList[i].Employee_EmailID){
                            foundChild = true;
                        }
                    }else
                        foundChild = true;
                    if(foundChild){
                        let newItem:employeeItem = {
                            Employee_Name: masterItem.Employee_Name,
                            Employee_EmailID: masterItem.Employee_EmailID,
                            Secret_Child_Name: unassignedList[i].Employee_Name,
                            Secret_Child_EmailID: unassignedList[i].Employee_EmailID
                        };
                        this.assignedList.push(newItem);
                        unassignedList.splice(i, 1);
                        break;
                    }
                }
            }
        }
        return true;
        }catch(err:any){
            throw new Error("Error while assigning child: "+err.message);
        }
    }
}

module.exports = SecretSanta;