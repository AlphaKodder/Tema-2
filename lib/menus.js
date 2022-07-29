"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainMenu = void 0;
const classes_1 = require("./classes");
const utilityFunctions_1 = require("./utilityFunctions");
const constants_1 = require("./constants");
const inquirer_1 = __importDefault(require("inquirer"));
function insertAStudent() {
    inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'student-firstName',
            message: 'Enter student first name:',
            validate: (answer) => {
                if (answer.length === 0)
                    return "Please enter the student's first name!!";
                return true;
            }
        },
        {
            type: 'input',
            name: 'student-lastName',
            message: 'Enter student last name:',
            validate: (answer) => {
                if (answer.length === 0)
                    return "Please enter student's last name";
                return true;
            }
        },
        {
            type: "input",
            message: "Please enter class number:",
            name: "class-number",
            validate: (answer) => {
                if (isNaN(answer))
                    return "please enter a number";
                else if (answer < 1 || answer > 13)
                    return "this is not a valid class number!";
                return true;
            }
        }
    ])
        .then(answers => {
        const newStudent = new classes_1.Student(answers["student-firstName"], answers["student-lastName"], answers["class-number"]);
        (0, utilityFunctions_1.addStudent)(newStudent);
        return mainMenu();
    });
}
function gradeAStudentMenu() {
    inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'student-firstName',
            message: 'Enter student first name:',
            validate: (answer) => {
                if (answer.length === 0)
                    return "Please enter the student's first name!!";
                return true;
            }
        },
        {
            type: 'input',
            name: 'student-lastName',
            message: 'Enter student last name:',
            validate: (answer) => {
                if (answer.length === 0)
                    return "Please enter student's last name";
                return true;
            }
        },
        {
            type: "input",
            message: "Please enter subject name:",
            name: "subject-name",
            validate: (answer) => {
                if (answer.length === 0)
                    return "Please enter student's last name";
                return true;
            }
        },
        {
            type: "input",
            message: "Please enter a grade for the subject (1-10):",
            name: "grade-number",
            validate: (answer) => {
                if (isNaN(answer))
                    return "please enter a number";
                else if (answer < 1 || answer > 10)
                    return "this is not a valid grade!";
                return true;
            }
        }
    ])
        .then(answers => {
        const searchedStudent = (0, utilityFunctions_1.checkStudentExists)(answers["student-firstName"], answers["student-lastName"]);
        if (searchedStudent === undefined) {
            console.log();
            console.log("Student does not exists in our record!");
            console.log();
            return gradeAStudentMenu();
        }
        else {
            const newGrade = new classes_1.Grade(searchedStudent.id, answers["subject-name"], answers["grade-number"]);
            constants_1.gradesList.push(newGrade);
            (0, utilityFunctions_1.updateRecords)();
            return mainMenu();
        }
    });
}
function seeStudentGrades() {
    inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'student-firstName',
            message: 'Enter student first name:',
            validate: (answer) => {
                if (answer.length === 0)
                    return "Please enter the student's first name!!";
                return true;
            }
        },
        {
            type: 'input',
            name: 'student-lastName',
            message: 'Enter student last name:',
            validate: (answer) => {
                if (answer.length === 0)
                    return "Please enter student's last name";
                return true;
            }
        }
    ])
        .then(answers => {
        const firstName = answers["student-firstName"];
        const lastName = answers["student-lastName"];
        if ((0, utilityFunctions_1.checkStudentExists)(firstName, lastName) === undefined) {
            console.log();
            console.log("Student does not exists in our records!");
            return seeStudentGrades();
        }
        else {
            const gradesArr = (0, utilityFunctions_1.getStudentGrades)(firstName, lastName);
            if (gradesArr.length === 0) {
                console.log("This student does not have any grades in his record!");
                return mainMenu();
            }
            let gradesReport = "\n";
            for (const grade of gradesArr) {
                const str = `Subject Name - ${grade.subjectName}  Grade - ${grade.grade}`;
                gradesReport += str;
                gradesReport += "\n";
            }
            console.log(gradesReport);
            console.log();
            return mainMenu();
        }
    });
}
function mainMenu() {
    inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'welcome-prompt',
            message: 'Select one of the options below',
            choices: ["See a student's grades", "Grade a student", "Insert a new student", "Exit"]
        }
    ])
        .then(answers => {
        if (answers["welcome-prompt"] === "Insert a new student") {
            insertAStudent();
        }
        else if (answers["welcome-prompt"] === "Grade a student") {
            gradeAStudentMenu();
        }
        else if (answers["welcome-prompt"] === "See a student's grades") {
            seeStudentGrades();
        }
        else if (answers["welcome-prompt"] === "Exit") {
            return;
        }
    });
}
exports.mainMenu = mainMenu;
//# sourceMappingURL=menus.js.map