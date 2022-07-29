"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRecords = exports.addStudent = exports.getStudentGrades = exports.checkStudentExists = void 0;
const constants_1 = require("./constants");
const fileHandling_1 = require("./fileHandling");
function checkStudentExists(firstName, lastName) {
    for (const studentRecord of constants_1.studentsList) {
        if (studentRecord.firstName === firstName && studentRecord.lastName === lastName) {
            return studentRecord;
        }
    }
    return undefined;
}
exports.checkStudentExists = checkStudentExists;
function getStudentGrades(firstName, lastName) {
    let searchedStudent = constants_1.studentsList.find((st) => {
        if (st.firstName === firstName && st.lastName === lastName)
            return true;
        return false;
    });
    if (searchedStudent === undefined)
        return [];
    const gradesArr = constants_1.gradesList.filter((gr) => {
        if (gr.studentId === searchedStudent.id)
            return true;
        return false;
    });
    return gradesArr;
}
exports.getStudentGrades = getStudentGrades;
async function addStudent(student) {
    constants_1.studentsList.push(student);
    await (0, fileHandling_1.writeStudentsToFile)();
}
exports.addStudent = addStudent;
async function updateRecords() {
    try {
        await (0, fileHandling_1.writeGradesToFile)();
        await (0, fileHandling_1.writeStudentsToFile)();
    }
    catch {
        console.log("Something went wrong when we updated our records!");
    }
}
exports.updateRecords = updateRecords;
//# sourceMappingURL=utilityFunctions.js.map