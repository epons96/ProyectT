import { NgModule } from '@angular/core';
import { ChangePassAuthRoutingModule } from './change-pass-auth-routing.module';
import { ChangePassAuthComponent } from './change-pass-auth.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    ChangePassAuthRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatCardModule,
    FlexLayoutModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  declarations: [ChangePassAuthComponent],
})
export class ChangePassAuthModule {}
