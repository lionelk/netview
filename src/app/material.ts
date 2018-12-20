import { MatButtonModule, MatCheckboxModule, MatCheckbox } from '@angular/material/';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule],
    exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule]
})

export class MaterialModule { }
