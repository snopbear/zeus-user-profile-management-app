//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [ReactiveFormsModule, FormsModule],
  providers: [],
})
export class SharedModule {}
