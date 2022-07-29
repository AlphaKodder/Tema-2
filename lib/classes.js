"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grade = exports.Student = void 0;
const uuid_1 = require("uuid");
class Student {
    id;
    firstName;
    lastName;
    classNumber;
    constructor(firstName, lastName, classNo) {
        this.id = (0, uuid_1.v4)();
        this.firstName = firstName;
        this.lastName = lastName;
        this.classNumber = classNo;
    }
    getId() {
        return this.id;
    }
}
exports.Student = Student;
class Grade {
    studentId;
    subjectName;
    grade;
    constructor(studentId, subjectName, grade) {
        this.studentId = studentId;
        this.subjectName = subjectName;
        this.grade = grade;
    }
}
exports.Grade = Grade;
//# sourceMappingURL=classes.js.map