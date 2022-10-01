import { NgModule } from '@angular/core';
import { EmailForgotPassRoutingModule } from './email-forgot-pass-routing.module';
import { EmailForgotComponent } from './email-forgot-pass.component';
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
    EmailForgotPassRoutingModule,
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
  declarations: [EmailForgotComponent],
})
export class EmailForgotPassModule {}
