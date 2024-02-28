//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockRoutingModule } from './block-routing.module';
//Components
import { AppComponent } from './root/app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, BlockRoutingModule],
  providers: [],
})
export class BlockModule {}
