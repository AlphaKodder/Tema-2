import {Grade, Student} from "./classes";
import {addStudent, checkStudentExists, getStudentGrades, updateRecords} from "./utilityFunctions";
import { gradesList, studentsList } from "./constants";

import inquirer from "inquirer";

function insertAStudent():void
{
    inquirer.prompt([
        {
            type:'input',
            name:'student-firstName',
            message:'Enter student first name:',
            validate:(answer)=>{
                if(answer.length === 0)
                    return "Please enter the student's first name!!"
                return true;
            }
        },
        {
            type:'input',
            name:'student-lastName',
            message:'Enter student last name:',
            validate:(answer)=>{
                if(answer.length === 0)
                    return "Please enter student's last name"
              return true;
            }
        },
        {
            type:"input",
            message:"Please enter class number:",
            name:"class-number",
            validate:(answer)=>{
                if(isNaN(answer))
                    return "please enter a number";
                else if(answer<1 || answer>13)
                    return "this is not a valid class number!"
              return true;
            }
        }
    ])
    .then(answers=>{
        const newStudent:Student = new Student(answers["student-firstName"],answers["student-lastName"],answers["class-number"]);
        addStudent(newStudent);
        return mainMenu();
    }) 
}

function gradeAStudentMenu():void{
    inquirer.prompt([
        {
            type:'input',
            name:'student-firstName',
            message:'Enter student first name:',
            validate:(answer)=>{
                if(answer.length === 0)
                    return "Please enter the student's first name!!"
                return true;
            }
        },
        {
            type:'input',
            name:'student-lastName',
            message:'Enter student last name:',
            validate:(answer)=>{
                if(answer.length === 0)
                    return "Please enter student's last name"
              return true;
            }
        },
        {
            type:"input",
            message:"Please enter subject name:",
            name:"subject-name",
            validate:(answer)=>{
                if(answer.length === 0)
                    return "Please enter student's last name"
              return true;
            }
        },
        {
            type:"input",
            message:"Please enter a grade for the subject (1-10):",
            name:"grade-number",
            validate:(answer)=>{
                if(isNaN(answer))
                    return "please enter a number";
                else if(answer<1 || answer>10)
                    return "this is not a valid grade!"
              return true;
            }
        }   

    ])
    .then(answers=>{
        const searchedStudent:Student = checkStudentExists(answers["student-firstName"],answers["student-lastName"]) as Student ; 
        if( searchedStudent === undefined)
        {
            console.log();
            console.log("Student does not exists in our record!");
            console.log();
            return gradeAStudentMenu();
        } else {
            const newGrade:Grade = new Grade(searchedStudent.id,answers["subject-name"],answers["grade-number"]);
            gradesList.push(newGrade);
            updateRecords();
            return mainMenu();
        }
    }) 
}

function seeStudentGrades():void{
   
    inquirer.prompt([
        {
            type:'input',
            name:'student-firstName',
            message:'Enter student first name:',
            validate:(answer)=>{
                if(answer.length === 0)
                    return "Please enter the student's first name!!"
                return true;
            }
        },
        {
            type:'input',
            name:'student-lastName',
            message:'Enter student last name:',
            validate:(answer)=>{
                if(answer.length === 0)
                    return "Please enter student's last name"
              return true;
            }
        }
    ])
    .then(answers=>{
       const firstName:string = answers["student-firstName"];
       const lastName:string = answers["student-lastName"];
        if(checkStudentExists(firstName,lastName) === undefined)
        {
            console.log();
            console.log("Student does not exists in our records!");
            return seeStudentGrades();
        } else {
            const gradesArr: Array<Grade> = getStudentGrades(firstName,lastName);
            if(gradesArr.length === 0)
            {
                console.log("This student does not have any grades in his record!");
                return mainMenu();
            }
            let gradesReport:string = "\n";
            for(const grade of gradesArr)
            {
                const str:string = `Subject Name - ${grade.subjectName}  Grade - ${grade.grade}`;
                gradesReport+=str;
                gradesReport+="\n";
            }
            console.log(gradesReport);
            console.log();
            return mainMenu();
        }
    })

}

function mainMenu():void{

    inquirer.prompt([
        {
            type:'list',
            name:'welcome-prompt',
            message:'Select one of the options below',
            choices:["See a student's grades","Grade a student","Insert a new student","Exit"]
        }
    ])
    .then(answers=>{
        if(answers["welcome-prompt"] === "Insert a new student")
        {
            insertAStudent();
        }
        else if(answers["welcome-prompt"] === "Grade a student")
        {
            gradeAStudentMenu();
        }
        else if(answers["welcome-prompt"] === "See a student's grades")
        {
            seeStudentGrades();
        } 
         else if(answers["welcome-prompt"] === "Exit")
        {
            return;
        }
    })
}

export {mainMenu};