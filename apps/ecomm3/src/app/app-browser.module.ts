import { NgModule } from '@angular/core';

// modules (angular)
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// modules
import { AppModule } from './app.module';
import { LanguageBrowserModule } from './shared/language/language-browser.module';

// components
import { AppComponent } from './app.component';


@NgModule({
    imports: [
        // modules (angular)
        BrowserAnimationsModule,
        // modules
        AppModule,
        LanguageBrowserModule,
    ],
    bootstrap: [AppComponent],
})
export class AppBrowserModule {}
