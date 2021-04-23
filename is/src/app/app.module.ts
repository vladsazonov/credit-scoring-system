import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeRu from '@angular/common/locales/ru';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';

registerLocaleData(localeRu);

@NgModule({
  imports: [BrowserModule, AppRoutingModule, CoreModule, BrowserAnimationsModule, HttpClientModule],
  declarations: [AppComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
