"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeGradesToFile = exports.populateData = exports.writeStudentsToFile = void 0;
const constants_1 = require("./constants");
const fs_1 = __importDefault(require("fs"));
async function writeStudentsToFile() {
    try {
        await fs_1.default.writeFileSync("./studentsData/students.json", JSON.stringify(constants_1.studentsList));
    }
    catch (err) {
        console.log("Something went wrong while writing to the students.json file");
    }
}
exports.writeStudentsToFile = writeStudentsToFile;
async function writeGradesToFile() {
    try {
        await fs_1.default.writeFileSync("./studentsData/grades.json", JSON.stringify(constants_1.gradesList));
    }
    catch {
        console.log("Something went wrong while writing to the grades.json file");
    }
}
exports.writeGradesToFile = writeGradesToFile;
async function populateData() {
    try {
        let result = JSON.parse(fs_1.default.readFileSync("./studentsData/students.json", 'utf-8'));
        for (let i = 0; i < result.length; i++) {
            constants_1.studentsList.push(result[i]);
        }
    }
    catch (err) {
        console.log("Something went wrong while trying to retrieve data from students.json file!");
        return;
    }
    try {
        let result = JSON.parse(fs_1.default.readFileSync("./studentsData/grades.json", 'utf-8'));
        for (let i = 0; i < result.length; i++) {
            constants_1.gradesList.push(result[i]);
        }
    }
    catch {
        console.log("Something went wrong while trying to retrieve data from grades.json file!");
        return;
    }
}
exports.populateData = populateData;
//# sourceMappingURL=fileHandling.js.map