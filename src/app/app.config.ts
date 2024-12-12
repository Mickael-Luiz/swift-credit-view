import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule
  ),
  provideHttpClient(withFetch())
]
};
