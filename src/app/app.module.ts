import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserStoryGeneratorComponent } from './tools/story-generator/user-story-generator/user-story-generator.component';
import { AppAutowidthDirective } from './shared/app-autowidth.directive';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';

import { HttpClientModule } from '@angular/common/http';
import { DialogBubbleComponent } from './tools/story-generator/user-story-generator/dialog-bubble/dialog-bubble.component';

@NgModule({
  declarations: [
    AppComponent,
    UserStoryGeneratorComponent,
    AppAutowidthDirective,
    DialogBubbleComponent
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
