import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Projects } from './projects/projects';

@NgModule({
  declarations: [ // list of comps
    App,
    Projects
  ],
  imports: [ // lists of modules
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ // list of services
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection()
  ],
  bootstrap: [App] // root component
})
export class AppModule { }
