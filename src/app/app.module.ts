import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

//#region import custom modules
import { CoreModule } from './@core/core.module';
import { BlockModule } from './@block/block.module';
//#endregion import custom modules

//#region import custom components
import { AppComponent } from './@block/root/app.component';
//#endregion import custom components

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    BlockModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
