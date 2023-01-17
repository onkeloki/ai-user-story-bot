import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserStoryGeneratorComponent } from './tools/story-generator/user-story-generator/user-story-generator.component';
import { AppAutowidthDirective } from './shared/app-autowidth.directive';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { DialogComponent } from './tools/story-generator/user-story-generator/dialog/dialog.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    UserStoryGeneratorComponent,
    AppAutowidthDirective,
    DialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    TextareaAutosizeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
