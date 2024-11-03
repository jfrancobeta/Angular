import { Injectable } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { findAll, load } from "../products.actions";
import { exhaustMap, map, of } from "rxjs";

@Injectable()
export class ProductsEffects{

    loadProuduct = createEffect(
        () => this.actions$.pipe(
            ofType(findAll),
            exhaustMap(() => of(this.service.findAll()))
            
        ).pipe(
            map(products => (load({products})))
        )
    );
    constructor(private actions$: Actions,
        private service: ProductService
    ){

    }
}