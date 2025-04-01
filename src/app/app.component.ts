import { Component, OnInit } from '@angular/core';
import { NgFor } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { Student } from './student';
import { StudentService } from './students.service';

@Component({
    selector: 'my-app',
    standalone: true,
    imports: [HttpClientModule, NgFor, FormsModule],
    template: `<div class="page-header">
    </div>
    <div class="panel">
        <div class="form-inline">
            <div class="form-group">
                <div class="col-md-8">
                    <input class="form-control" [(ngModel)]="id" type="hidden" />
                </div>
            </div>
             <div class="form-group">
                <div class="col-md-8">
                    <input class="form-control" [(ngModel)]="name" placeholder = "Имя" />
                </div>
            </div>
			<div class="form-group">
                <div class="col-md-8">
                    <input class="form-control" [(ngModel)]="surname" placeholder = "Фамилия" />
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-6">
                    <input type="number" class="form-control" [(ngModel)]="age" placeholder="Возраст" />
                </div>
            </div>
             <div class="form-group">
                <div class="col-md-6">
                    <input type="number" class="form-control" [(ngModel)]="gpa" placeholder="Рейтинг" />
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-offset-2 col-md-8">
                    <button class="btn btn-default" (click)="saveStudent()">Сохранить</button>
                </div>
            </div>
        </div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Возраст</th>
                     <th>Рейтинг</th>
                     <th></th>
                      <th></th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let student of students">
                    <td>{{student.name}}</td>
					 <td>{{student.surname}}</td>
                    <td>{{student.age}}</td>
                     <td>{{student.gpa}}</td>
                      <td>
                     <button class="btn btn-default" (click)="getStudent(student.id)">Получить данные</button>
                     </td>
                     <td>
                     <button class="btn btn-default" (click)="deleteStudent(student.id)">Удалить</button>
                     </td>
                </tr>
            </tbody>
        </table>
    </div>`,
    providers: [StudentService]
})
export class AppComponent implements OnInit {

    id: number = 0;
    name: string = "Алексей";
    surname: string = "Алексеев";
    age: number = 25;
    gpa: number = 10;
    students: Array<Student>;

    constructor(private serv: StudentService) {
        this.students = new Array<Student>();
    }

    ngOnInit() {
        this.loadStudents();
    }

    private reset() {
        this.id = 0;
        this.name = "";
        this.surname = "";
        this.age = 0;
        this.gpa = 0;
    }

    private loadStudents() {
        this.serv.getStudents().subscribe({
            next: (data: Student[]) => {
                this.students = data;
            }
        });
    }

    saveStudent() {
        if (this.id == 0) {
            let st = new Student(0, this.name, this.surname, this.age, this.gpa);
            this.serv.createStudent(st).subscribe(
                (data) => {
                    alert('Данные успешно добавлены!');
                    this.reset();
                    this.loadStudents();
                }
            );
        }
        else {
            let st = new Student(this.id, this.name, this.surname, this.age, this.gpa);
            this.serv.updateStudent(st).subscribe(
                (data) => {
                    alert('Данные успешно изменены!');
                    this.reset();
                    this.loadStudents();
                }
            );
        }
    }


    getStudent(id) {
        this.serv.getStudent(id).subscribe(
            {
                next: (data: Student) => {
                    this.id = data["id"];
                    this.name = data["name"];
                    this.surname = data["surname"];
                    this.age = data["age"];
                    this.gpa = data["gpa"];
                }
            }
        );
    }
  

    deleteStudent(id) {
        this.serv.deleteStudent(id).subscribe({
            next: data => {
                alert('Данные успешно удалены!');
                this.reset();
                this.loadStudents();
            }
        });
    }
}