import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { CurrencyChipComponent } from './currency-chip/currency-chip.component';
import { InputConverterComponent } from './input-converter/input-converter.component';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from "primeng/dropdown";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CurrencyChipComponent,
    InputConverterComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NgbModule,
        HttpClientModule,
        HttpClientJsonpModule,
        InputTextModule,
        DropdownModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
