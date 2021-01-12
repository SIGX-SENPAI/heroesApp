import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../Models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor( private http: HttpClient ) { }

  private url = 'https://login-app-8fee1.firebaseio.com';

  crearHeroe( heroe: HeroeModel ) {

    return this.http.post(`${this.url}/heroes.json`, heroe).
    pipe(
      map( (resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );

  }

  actualizarHeroe( heroe: HeroeModel ) {
    const heroeTemp = {
      ...heroe
    };
    delete heroeTemp.id;
    return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`, heroeTemp);
  }

  getHeroes() {
    return this.http.get(`${ this.url }/heroes.json`).pipe(
      map( this.crearArreglo ),
            delay( 0 )
    );
  }

  private crearArreglo( heroesObj: object ) {

    const heroes: HeroeModel[] = [];

    console.log(heroesObj);

    if ( heroesObj === null ) { return []; }

    Object.keys( heroesObj ).forEach( key => {

      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push( heroe );

    });
    return heroes;

  }

  borrarHeroe( id: string ) {
    return this.http.delete(`${ this.url }/heroes/${ id }.json`);
  }

  getHeroe( id: string ) {
    return this.http.get(`${ this.url }/heroes/${ id }.json`);
  }
}
