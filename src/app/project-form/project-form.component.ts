import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css',
})
export class ProjectFormComponent implements OnInit {
  addProjectForm!: FormGroup;

  ngOnInit() {
    this.addProjectForm = new FormGroup({
      projectData: new FormGroup({
        projectName: new FormControl(null, [Validators.required]),
        // email: new FormControl(null, [Validators.required, Validators.email]),
      }),
      projectStatus: new FormControl('critical'),
    });
  }

  onSubmit() {
    console.log(this.addProjectForm.value);
    this.addProjectForm.reset();
  }
}
