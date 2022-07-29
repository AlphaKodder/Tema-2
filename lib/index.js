"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("./classes");
const utilityFunctions_1 = require("./utilityFunctions");
const body_parser_1 = __importDefault(require("body-parser"));
const constants_1 = require("./constants");
const fileHandling_1 = require("./fileHandling");
const express = require('express');
const app = express();
app.use(body_parser_1.default.json());
app.post("/create-student", (req, res) => {
    if (req.body.firstName && req.body.lastName && req.body.classNumber) {
        if (typeof (req.body.firstName) != "string" || req.body.firstName.length != 0) {
            res.sendStatus(400);
            return;
        }
        if (typeof (req.body.lastName) != "string" || req.body.lastName.length != 0) {
            res.sendStatus(400);
            return;
        }
        if (isNaN(req.body.classNumber) || req.body.classNumber < 1 || req.body.classNumber > 13) {
            res.sendStatus(400);
            return;
        }
        const newStudent = new classes_1.Student(req.body.firstName, req.body.lastName, req.body.classNumber);
        (0, utilityFunctions_1.addStudent)(newStudent);
        res.status(200).json(newStudent);
    }
    else {
        res.sendStatus(400);
    }
});
app.post('/grade-student', (req, res) => {
    if (req.body.firstName && req.body.lastName && req.body.grade && req.body.subjectName) {
        if (typeof (req.body.firstName) != "string" || req.body.firstName.length != 0) {
            res.sendStatus(400);
            return;
        }
        if (typeof (req.body.lastName) != "string" || req.body.lastName.length != 0) {
            res.sendStatus(400);
            return;
        }
        if (typeof (req.body.subjectName) != "string" || req.body.subjectName.length != 0) {
            res.sendStatus(400);
            return;
        }
        if (isNaN(req.body.grade) || req.body.grade < 1 || req.body.grade > 10) {
            res.sendStatus(400);
            return;
        }
        let newStudent = (0, utilityFunctions_1.checkStudentExists)(req.body.firstName, req.body.lastName);
        if (newStudent === undefined) {
            res.sendStatus(404);
            return;
        }
        const newGrade = new classes_1.Grade(newStudent.id, req.body.subjectName, req.body.grade);
        constants_1.gradesList.push(newGrade);
        (0, utilityFunctions_1.updateRecords)();
        res.sendStatus(200);
        return;
    }
    else {
        res.sendStatus(400);
    }
});
app.get('/student-grades', (req, res) => {
    if (req.body.firstName && req.body.lastName) {
        if (typeof (req.body.firstName) != "string" || req.body.firstName.length != 0) {
            res.sendStatus(400);
            return;
        }
        if (typeof (req.body.lastName) != "string" || req.body.lastName.length != 0) {
            res.sendStatus(400);
            return;
        }
        if ((0, utilityFunctions_1.checkStudentExists)(req.body.firstName, req.body.lastName) === undefined) {
            return res.status(404).json("Student was not found in our records!");
        }
        const studentGrades = (0, utilityFunctions_1.getStudentGrades)(req.body.firstName, req.body.lastName);
        if (studentGrades.length === 0) {
            return res.status(404).json("The student does not have any grades!");
        }
        let gradesReport = [];
        for (const grade of studentGrades) {
            const newGrade = {
                subjectName: grade.subjectName,
                gradeValue: grade.grade
            };
        }
        return res.status(200).json(gradesReport);
    }
    else {
        res.sendStatus(400);
    }
});
(0, fileHandling_1.populateData)();
app.listen(3000, () => {
    console.log("The server is running!");
});
module.exports = { student: classes_1.Student, grade: classes_1.Grade };
//# sourceMappingURL=index.js.map