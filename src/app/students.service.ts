import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from './student';

@Injectable()
export class StudentService {

    private url = "https://localhost:7111/api/Students";
    constructor(private http: HttpClient) { }

    getStudents() {
        return this.http.get(this.url);
    }

    createStudent(student: Student) {
        return this.http.post(this.url, student);
    }
    getStudent(id: number) {
        let _url:string = this.url;
        _url += "/" + id;
        return this.http.get(_url);
    }
    updateStudent(student: Student) {
        return this.http.put(this.url, student);
    }
    deleteStudent(id: number) {
        let _url: string = this.url;
        _url += "/" + id;
        return this.http.delete(_url);
    }
}