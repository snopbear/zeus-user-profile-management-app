import { Component, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControlOptions,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserManagers } from '@models/interfaces/user-managers/user-managers';
import { UserManagersService } from '@services/custom/user-managers/user-managers.service';
import { ValidationService } from '@services/index';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css'],
})
export class CreateUsersComponent implements OnInit {
  _validationService = inject(ValidationService);

  userManagers!: IUserManagers;
  _form!: FormGroup;
  _formErrors = {} as any;
  _validationMessages: any = {
    fullName: {
      required: 'Full Name is required.',
      minlength: 'Full Name must be greater than 2 characters.',
      maxlength: 'Full Name must be less than 10 characters.',
    },
    email: {
      required: 'Email is required.',
      emailDomain: 'Email domian should be dell.com',
    },
    confirmEmail: {
      required: 'Confirm Email is required.',
    },
    emailGroup: {
      emailMismatch: 'Email and Confirm Email do not match.',
    },
    phone: {
      required: 'Phone is required.',
    },
    skillName: {
      required: 'Skill Name is required.',
    },
    experienceInYears: {
      required: 'Experience in years is required.',
    },
    proficiency: {
      required: 'Proficiency is required.',
    },
    password: {
      required: 'Password is required.',
    },
    confirmPassword: {
      required: 'Confirm Password is required.',
      mismatch: 'Password and Confirm Password do not match',
    },
  };

  constructor(
    private _fb: FormBuilder,
    private _userManagerService: UserManagersService,
    private _activeRoute: ActivatedRoute,
    private _router: Router
  ) {
    this._form = this._fb.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      contactPreference: ['email'],
      emailGroup: this._fb.group(
        {
          email: [
            '',
            [
              Validators.required,
              this._validationService.emailDomain('dell.com'),
            ],
          ],
          confirmEmail: ['', [Validators.required]],
        },
        {
          validator: this._validationService.matchEmails,
        } as FormControlOptions
      ),
      phone: [''],
      skills: this._fb.array([this.addSkillFormGroup()]),
    });
  }

  logValidationErrors() {
    this._formErrors = this._validationService.getValidationErrors(
      this._form,
      this._validationMessages
    );
  }

  onSubmit(): void {
    debugger;
    this.mapFormValuesToEmployeeModel();

    if (this.userManagers.id!==0) {
      this._userManagerService.putUser(this.userManagers).subscribe({
        next: () => {
          debugger;
          this._router.navigate(['/manage-user/list-users']);
        },
        error: (err: any) => {
          debugger;
          console.log;
        },
      });
    }
    else{
          this._userManagerService.postUser(this.userManagers).subscribe({
            next: () => {
              debugger;
              this._router.navigate(['/manage-user/list-users']);
            },
            error: (err: any) => {
              debugger;
              console.log;
            },
          });
    }
  }

  mapFormValuesToEmployeeModel() {
    this.userManagers.fullName = this._form.value.fullName;
    this.userManagers.contactPreference = this._form.value.contactPreference;
    this.userManagers.email = this._form.value.emailGroup.email;
    this.userManagers.phone = this._form.value.phone;
    this.userManagers.skills = this._form.value.skills;
  }

  ngOnInit() {
    this._activeRoute.paramMap.subscribe((params) => {
      debugger;
      const userId = params.get('id');
      if (userId) {
        this.getUserManager(+userId);
      } else {
        this.userManagers = {
          id: 0,
          fullName: '',
          contactPreference: '',
          email: '',
          phone: 0,
          skills: [],
        };
      }
    });

    this._form
      .get('contactPreference')
      ?.valueChanges.subscribe((data: string) => {
        this.onContactPrefrenceChange(data);
      });

    this._form.get('fullName')?.valueChanges.subscribe((data: string) => {
      console.log(data);
    });
  }

  getUserManager(id: number) {
    this._userManagerService.getUserManager(id).subscribe({
      next: (user: IUserManagers) => {
        debugger;
        // Store the employee object returned by the
        // REST API in the employee property
        this.userManagers = user;
        this.editUserManager(user);
      },
      error: (error) => {
        // treat error
      },
      complete: () => {
        // define on request complete logic
        // 'complete' is not the same as 'finalize'!!
        // this logic will not be executed if error is fired
      },
    });
  }

  editUserManager(employee: IUserManagers) {
    this._form.patchValue({
      fullName: employee.fullName,
      contactPreference: employee.contactPreference,
      emailGroup: {
        email: employee.email,
        confirmEmail: employee.email,
      },
      phone: employee.phone,
    });
    this._form.setControl('skills', this.setExistingSkills(employee.skills));
  }

  setExistingSkills(skillSets: any[]): FormArray {
    const formArray = new FormArray<FormGroup>([]);
    skillSets.forEach((s) => {
      formArray.push(
        this._fb.group({
          skillName: s.skillName,
          experienceInYears: s.experienceInYears,
          proficiency: s.proficiency,
        })
      );
    });

    return formArray;
  }

  addSkillButtonClick(): void {
    (<FormArray>this._form.get('skills')).push(this.addSkillFormGroup());
  }
  get skillsControls(): any {
    return (<FormArray>this._form.get('skills')).controls;
  }

  addSkillFormGroup(): FormGroup {
    return this._fb.group({
      skillName: ['', Validators.required],
      experienceInYears: ['', Validators.required],
      proficiency: ['', Validators.required],
    });
  }

  removeSkillGroup(index: number): void {
    const skillsFormArray = <FormArray>this._form.get('skills');
    skillsFormArray.removeAt(index);
    skillsFormArray.markAsDirty();
    skillsFormArray.markAsTouched();
  }

  removeSkillButtonClick(skillGroupIndex: number): void {
    const skillsFormArray = <FormArray>this._form.get('skills');
    skillsFormArray.removeAt(skillGroupIndex);
    skillsFormArray.markAsDirty();
    skillsFormArray.markAsTouched();
  }
  onContactPrefrenceChange(selectedValue: string) {
    const phoneFormControl = this._form.get('phone');
    if (selectedValue === 'phone') {
      phoneFormControl?.setValidators(Validators.required);
    } else {
      phoneFormControl?.clearValidators();
    }
    phoneFormControl?.updateValueAndValidity();
  }
  loadDataClick() {}
}
