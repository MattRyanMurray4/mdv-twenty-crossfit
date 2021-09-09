import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { WildComponent } from './wild/wild.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from '@crossfit/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [LoginComponent, WildComponent, ToolbarComponent],
  exports: [LoginComponent, ToolbarComponent, WildComponent],
})
export class UiLibraryModule {}
