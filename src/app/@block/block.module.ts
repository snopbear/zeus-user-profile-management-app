//#region Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockRoutingModule } from './block-routing.module';
//#endregion Modules

//#region Components
import { AppComponent } from '.';
//#endregion Components

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, BlockRoutingModule],
  providers: [],
})
export class BlockModule {}
