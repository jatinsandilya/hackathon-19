import { NgModule, Optional, SkipSelf } from '@angular/core';

//Using the new HttpClientModule now. If you're still on < Angular 4.3 see the 
//core.module.ts.httpmodule file instead (simplify rename it to the name 
//of this file to use it instead)
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { DataService } from './data.service';

@NgModule({
  imports: [ 
    HttpClientModule
  ],
  providers: [ DataService] 
})
export class CommonModule {}