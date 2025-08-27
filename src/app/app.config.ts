// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';
// import { provideHttpClient } from '@angular/common/http'; // ✅ import this

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     provideHttpClient() // ✅ make HttpClient available
//   ],
// };


import { ApplicationConfig, ErrorHandler, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { routes } from './app.routes';
import { GlobalErrorHandlerService } from './components/core/services/error-handler.service';
import { LoggingService } from './components/core/services/logging.service';
import { PerformanceService } from './components/core/services/performance.service';
import { SecurityService } from './components/core/services/security.service';
import { CacheService } from './components/core/services/cache.service';
import { AuthInterceptor } from './components/core/services/http-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      })
    ),
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    ),
    importProvidersFrom([
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        timeOut: 5000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        progressBar: true,
        closeButton: true,
        enableHtml: true,
        toastClass: 'ngx-toastr'
      })
    ]),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    },
    LoggingService,
    PerformanceService,
    SecurityService,
    CacheService
  ],
};

