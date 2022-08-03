import {Grade, Student} from "./classes";
import { Request, Response } from "express";
import { addStudent, checkStudentExists, getStudentGrades, updateRecords } from "./utilityFunctions";
import { gradesList, studentsList } from "./constants";

import bodyParser from "body-parser";
import cors from "cors"
import { populateData } from "./fileHandling";

const express = require('express');
const app = express();

type StudentReq = {
    firstName:string,
    lastName:string,
    classNumber:number
}

app.use(cors());
app.use(bodyParser.json() );

app.get("/all-students",(req:Request, res:Response)=>{
    let data_resp = studentsList.map((st)=>{
        const{id,...studentData} = st;
        return studentData;
    })
    return res.json(data_resp);
});

app.post("/create-student",(req:Request,res:Response)=>{
   
    if(req.body.firstName && req.body.lastName && req.body.classNumber)
    {
        if(typeof(req.body.firstName) != "string" || req.body.firstName.length == 0)
        {
            res.sendStatus(400);
            return;
        }
        if(typeof(req.body.lastName) != "string" || req.body.lastName.length == 0)
        {
            res.sendStatus(400);
            return;
        }
        if(isNaN(req.body.classNumber) || req.body.classNumber<1 || req.body.classNumber>13)
        {
            res.sendStatus(400);
            return;
        }
        const newStudent:Student = new Student(req.body.firstName,req.body.lastName,req.body.classNumber);
        addStudent(newStudent);
        res.status(200).json(newStudent);

    } else {
        res.sendStatus(400);
    }

})

app.post('/grade-student',(req:Request,res:Response)=>{
	
    if(req.body.firstName && req.body.lastName && req.body.grade && req.body.subjectName)
    {
        
        if(typeof(req.body.firstName) != "string" || req.body.firstName.length == 0)
        {
            res.sendStatus(400);
            return;
        }
       
        if(typeof(req.body.lastName) != "string" || req.body.lastName.length == 0)
        {
            res.sendStatus(400);
            return;
        }
        
        if(typeof(req.body.subjectName) != "string" || req.body.subjectName.length == 0)
        {
            res.sendStatus(400);
            return;
        }
        
        if(isNaN(req.body.grade) || req.body.grade<1 || req.body.grade>10)
        {
            res.sendStatus(400);
            return;
        }
     
        let newStudent:Student|undefined = checkStudentExists(req.body.firstName,req.body.lastName);

        if(newStudent === undefined)
        {
            res.sendStatus(404);
            return;
        }

        const newGrade:Grade = new Grade(newStudent.id,req.body.subjectName,req.body.grade);
        gradesList.push(newGrade);
        updateRecords();
        res.sendStatus(200);
        return;

    } else {
        res.sendStatus(400);
    }
})

app.get('/student-grades',(req:Request,res:Response)=>{

    if(req.headers.firstname && req.headers.lastname)
    {
        
        if(typeof(req.headers.firstname) != "string" || req.headers.firstname.length == 0)
        {
            res.sendStatus(400);
            return;
        }
        
        if(typeof(req.headers.lastname) != "string" || req.headers.lastname.length == 0)
        {
            res.sendStatus(400);
            return;
        }
        
        if(checkStudentExists(req.headers.firstname,req.headers.lastname) === undefined)
        {
            return res.status(404).json("Student was not found in our records!");
        }
        
        const studentGrades  : Array<Grade>  = getStudentGrades(req.headers.firstname,req.headers.lastname);
        if(studentGrades.length === 0)
        {
            
            return res.status(404).json("The student does not have any grades!");
        }
        console.log(studentGrades.length);
        type GradeDisplay = {
            subjectName:string,
            gradeValue:number
        }

        let gradesReport:Array<GradeDisplay> = [];
        
        for(const grade of studentGrades)
        {
            const newGrade:GradeDisplay = {
                subjectName:grade.subjectName,
                gradeValue:grade.grade
            }
            gradesReport.push(newGrade);
        }
        return res.status(200).json(gradesReport);

    } else {
        res.sendStatus(400);
    }
});

populateData();

app.listen(5000,()=>{
    console.log("The server is running!");
})


module.exports = {student:Student,grade:Grade};