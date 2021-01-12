import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/Models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor( private heroesService: HeroesService,
               private route: ActivatedRoute ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if ( id !== 'nuevo') {
      this.heroesService.getHeroe( id )
      .subscribe( (resp: HeroeModel) => {
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
  }
  guardar( form: NgForm ) {
    if ( form.invalid ) {
      console.log('Formulario no valido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false,
    });

    Swal.showLoading();

    let peticion: Observable<any>;
    if ( this.heroe.id ) {
      peticion = this.heroesService.actualizarHeroe( this.heroe );
      // this.heroesService.actualizarHeroe( this.heroe ).subscribe( resp => {
      //   console.log(resp);
      // });
    } else {
      peticion = this.heroesService.crearHeroe( this.heroe );
      // this.heroesService.crearHeroe( this.heroe ).subscribe( resp => {
      //   console.log(resp);
      //   this.heroe = resp;
      // });
    }
    peticion.subscribe( resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Sec actualizo correctamente',
        icon: 'success',
      });
    });
  }
}
