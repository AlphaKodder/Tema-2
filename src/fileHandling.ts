import { Grade, Student } from "./classes";
import { gradesList, studentsList } from "./constants";

import fs from "fs";

async function writeStudentsToFile():Promise<void>{

    try{
        await fs.writeFileSync("./studentsData/students.json",JSON.stringify(studentsList));
    } catch(err)
    {
        console.log("Something went wrong while writing to the students.json file");
    }
}

async function writeGradesToFile():Promise<void>{
    try{
        await fs.writeFileSync("./studentsData/grades.json",JSON.stringify(gradesList));
    } catch{
        console.log("Something went wrong while writing to the grades.json file");
    }
}

async function populateData():Promise<void>{
    try{
        let result:Array<Student>  = JSON.parse(fs.readFileSync("./studentsData/students.json",'utf-8'));
        for(let i=0;i<result.length;i++)
        {
            studentsList.push(result[i]);
        }
    } catch(err)
    {
        console.log("Something went wrong while trying to retrieve data from students.json file!");
        return;
    }

    try{
        let result:Array<Grade>  = JSON.parse(fs.readFileSync("./studentsData/grades.json",'utf-8'));
        for(let i=0;i<result.length;i++)
        {
            gradesList.push(result[i]);
        }
    } catch{
        console.log("Something went wrong while trying to retrieve data from grades.json file!");
        return;
    }
}

export{writeStudentsToFile, populateData,writeGradesToFile};