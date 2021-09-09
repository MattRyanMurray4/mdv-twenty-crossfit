import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreStateModule } from '@crossfit/core-state';
import { CoreDataModule } from '@crossfit/core-data';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoxComponent } from './box/box.component';
import { BoxesListComponent } from './box/boxes-list/boxes-list.component';
import { BoxDetailsComponent } from './box/box-details/box-details.component';
import { BoxItemComponent } from './box/box-item/box-item.component';
import { BoxInfoComponent } from './box/box-info/box-info.component';
import { MaterialModule } from '@crossfit/material';
import { UiLibraryModule } from '@crossfit/ui-library';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BoxComponent,
    BoxesListComponent,
    BoxDetailsComponent,
    BoxItemComponent,
    BoxInfoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    UiLibraryModule,
    CoreDataModule,
    CoreStateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
