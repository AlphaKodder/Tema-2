import {v4 as uniqueIdFunc} from "uuid";

class Student{
    public id:string;
    public firstName:string;
    public lastName:string;
    public classNumber:number;
    
    constructor(firstName:string,lastName:string,classNo:number)
    {
        this.id = uniqueIdFunc();
        this.firstName = firstName;
        this.lastName = lastName;
        this.classNumber = classNo;
    }

    getId():string
    {
        return this.id;
    }
}

class Grade {
    public studentId:string;
    public subjectName:string;
    public grade:number;

    constructor(studentId:string,subjectName:string,grade:number)
    {
        this.studentId = studentId;
        this.subjectName = subjectName;
        this.grade = grade;
    }
}

export {Student,Grade};
