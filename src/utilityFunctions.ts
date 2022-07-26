import {Grade, Student} from "./classes";
import { gradesList, studentsList } from "./constants";
import {writeGradesToFile, writeStudentsToFile} from "./fileHandling";

function checkStudentExists (firstName:string,lastName:string):Student|undefined {
    for(const studentRecord of studentsList )
    {   
        if(studentRecord.firstName === firstName && studentRecord.lastName === lastName)
        {
            return studentRecord;
        }
    }
    return undefined;
}

function getStudentGrades(firstName:string, lastName:string):Array<Grade> {
    
    let searchedStudent:Student = studentsList.find((st)=>{
        if(st.firstName === firstName && st.lastName === lastName)
            return true;
        return false;
    }) as Student;

    if(searchedStudent === undefined)
        return [];
    
    const gradesArr:Array<Grade> = gradesList.filter((gr)=>{
        if(gr.studentId === searchedStudent.id)
            return true;
        return false;
    });

    return gradesArr;
}

async function addStudent(student:Student):Promise<void>{
    studentsList.push(student);
    await writeStudentsToFile();
}

async function updateRecords()
{
    try{
        await writeGradesToFile();
        await writeStudentsToFile();

    }catch{
        console.log("Something went wrong when we updated our records!");
    }
}

export {checkStudentExists,getStudentGrades,addStudent,updateRecords};