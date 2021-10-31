import { MostrarImagenPipe } from './mostrar-imagen.pipe';
import { NgModule } from "@angular/core";


@NgModule({
    declarations:[
        MostrarImagenPipe
    ],
    exports:[
        MostrarImagenPipe

    ]

})

export class PipesModule {}