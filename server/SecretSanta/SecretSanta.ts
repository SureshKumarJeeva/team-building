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
    validate(params:any) {
        //check if file is in csv format
        //check if file is from previous year assignment or just employees list
    }

    //function responsible for organizing the game
    organize(){
        try{
            this.masterList = this.file.getParsedFile();
            this.unassignedList = structuredClone(this.masterList);

            if(this.masterList[0].Secret_Child_Name != null)
                console.log("secret friend exists");
            else
                console.log("secret friend does not exists");
            if(this.assignChild(this.masterList, this.unassignedList))
                return (this.assignedList);
        }catch(err:any){
            return err.message;
        }
    }

    //find and assign secret child for each employee
    assignChild(masterList:Array<employeeItem>, unassignedList:Array<employeeItem>){
        try{
        for(const masterItem of masterList){
            console.log(masterItem);
            for(let i = unassignedList.length - 1; i >= 0; i--){
                if(masterItem.Employee_EmailID != unassignedList[i].Employee_EmailID 
                    && masterItem.Secret_Child_EmailID != unassignedList[i].Employee_EmailID){
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
        console.log(this.assignedList);
        return true;
        }catch(err:any){
            throw new Error("Error while assigning child: "+err.message);
        }
    }
}

module.exports = SecretSanta;