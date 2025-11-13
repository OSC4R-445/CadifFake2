import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ActionSheetController, AlertController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.page.html',
  styleUrls: ['./examen.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class ExamenPage implements OnInit {
  indice: number = 0;
  preguntas: any[] = [
    {
      id: 1,
      enunciado: '¿Cuál es el comando para crear un nuevo componente en Ionic?',
      option1: 'ionic generate component',
      option2: 'ionic new component',
      option3: 'ng generate component',
      option4: 'ionic create component'
    },
    {
      id: 2,
      enunciado: '¿Qué decorador se usa para definir un componente en Angular?',
      option1: '@Component',
      option2: '@Directive',
      option3: '@Injectable',
      option4: '@Pipe'
    },
    {
      id: 3,
      enunciado: '¿Cuál es el hook del ciclo de vida que se ejecuta después de que el componente se inicializa?',
      option1: 'ngOnInit',
      option2: 'ngOnChanges',
      option3: 'ngAfterViewInit',
      option4: 'ngOnDestroy'
    },
    {
      id: 4,
      enunciado: '¿Qué tipo de dato TypeScript se usa para variables que pueden ser nulas?',
      option1: 'tipo | null',
      option2: 'Nullable<tipo>',
      option3: 'tipo?',
      option4: 'Optional<tipo>'
    },
    {
      id: 5,
      enunciado: '¿Cómo se define una propiedad de entrada en un componente Angular?',
      option1: '@Input()',
      option2: '@Output()',
      option3: '@ViewChild()',
      option4: '@ContentChild()'
    }
  ];

  esUltimaPregunta: boolean = false;
  respuestas: any = {};

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.actualizarEstado();
  }

  siguiente() {
    if (this.indice < this.preguntas.length - 1) {
      this.indice++;
      this.actualizarEstado();
    }
  }

  anterior() {
    if (this.indice > 0) {
      this.indice--;
      this.actualizarEstado();
    }
  }

  async finalizar() {
    const alert = await this.alertController.create({
      header: 'Desafío Completado',
      message: '¡Fin del desafío teórico! Has completado todas las preguntas.',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  private actualizarEstado() {
    this.esUltimaPregunta = this.indice === this.preguntas.length - 1;
  }

  async abandonarDesafio() {
    const alert = await this.alertController.create({
      header: 'Abandonar Desafío',
      message: '¿Estás seguro de que quieres abandonar el desafío? Tu progreso se perderá.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Abandonar',
          role: 'confirm',
          handler: () => {
            window.history.back();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones del Desafío',
      buttons: [
        {
          text: 'Abandonar Desafío Teórico',
          role: 'destructive',
          icon: 'exit',
          data: {
            action: 'abandonar',
          },
          handler: () => {
            this.abandonarDesafio();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

  onOptionSelect(preguntaId: number, opcion: string) {
    this.respuestas[preguntaId] = opcion;
  }
}