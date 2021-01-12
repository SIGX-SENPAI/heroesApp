import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/Models/heroe.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false;
  constructor( private heroesService: HeroesService ) { }

  ngOnInit() {

    this.cargando = true;
    this.heroesService.getHeroes()
    .subscribe( resp => {
      this.heroes = resp;
      this.cargando = false;
    } );

  }

  borrarHeroe( heroe: HeroeModel, i: number ) {
    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta seguro de que desea borrar a ${heroe.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if ( resp.value ) {
        this.heroes.splice( i , 1 );
        this.heroesService.borrarHeroe( heroe.id ).subscribe();
      }
    });
  }

}
