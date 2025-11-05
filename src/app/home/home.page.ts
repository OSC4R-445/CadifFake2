import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngIf, *ngFor
import { RouterModule } from '@angular/router'; // Para routerLink

// Importaciones de Ionic: IonicModule para componentes visuales
import { 
  AlertController, 
  ToastController, 
  ActionSheetController, 
  SegmentCustomEvent,
  IonicModule // Módulo que provee todos los componentes como IonCard, IonHeader, etc.
} from '@ionic/angular';

// Interfaz para la estructura de datos del video (Requerimiento 4)
interface Video {
  titulo: string;
  asesor: string;
  miniaturaUrl: string;
  chip1: string; // Activa Alert
  chip2: string; // Activa Toast
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  // *** Configuración Standalone Requerida ***
  standalone: true,
  imports: [
    // Módulos de Angular
    CommonModule, 
    RouterModule,
    
    // Módulo General de Ionic
    IonicModule 
  ]
})
export class HomePage implements OnInit {
  
  // Datos simulados para las ion-card (Requerimiento 4)
  public videos: Video[] = [
    {
      titulo: 'Introducción a Angular',
      asesor: 'Juan Pérez',
      miniaturaUrl: 'assets/img/angular-mini.jpg', 
      chip1: 'Componentes', // Primer chip: Activa ion-alert
      chip2: 'Directivas'  // Segundo chip: Activa ion-toast
    },
    {
      titulo: 'Fundamentos de Ionic',
      asesor: 'María López',
      miniaturaUrl: 'assets/img/ionic-mini.jpg', 
      chip1: 'Navegación', // Primer chip: Activa ion-alert
      chip2: 'Servicios'   // Segundo chip: Activa ion-toast
    }
  ];

  constructor(
    // Inyección de Controladores de Interfaz
    private alertController: AlertController,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
    // Lógica de inicialización
  }

  // --- REQUERIMIENTO 2: ion-alert personalizado (Botón del header) ---
  async presentCustomAlert() {
    const alert = await this.alertController.create({
      header: '¡Alerta Personalizada!',
      subHeader: 'Has presionado el botón de agregar',
      message: 'Este es el mensaje del ion-alert requerido en la imagen.',
      buttons: ['OK', 'Cancelar']
    });

    await alert.present();
  }

  // --- REQUERIMIENTO 3: ion-toast (Al presionar ion-segment) ---
  async segmentChanged(event: Event) {
    // Asegurar el tipo de evento para obtener el detalle
    const customEvent = event as SegmentCustomEvent;
    // Obtener el valor del segmento seleccionado (ej: 'Material', 'Videos', 'Desafios')
    const segmentValue = customEvent.detail.value; 
    
    // Imprimir el nombre del botón del ion-segment en el mensaje del toast
    const toast = await this.toastController.create({
      message: `Segmento presionado. Nombre del botón: **${segmentValue}**`,
      duration: 2000,
      color: 'dark',
      position: 'bottom'
    });
    
    await toast.present();
  }
  
  // --- REQUERIMIENTO 4: ion-alert (Al presionar el primer ion-chip) ---
  async showAlertForChip(chipName: string) {
    const alert = await this.alertController.create({
      header: 'Tema Seleccionado',
      message: `Has seleccionado el tema: **${chipName}**. Esto activa un ion-alert.`,
      buttons: ['Entendido']
    });

    await alert.present();
  }

  // --- REQUERIMIENTO 4: ion-toast (Al presionar el segundo ion-chip) ---
  async showToastForChip(chipName: string) {
    const toast = await this.toastController.create({
      message: `Tema seleccionado: **${chipName}**. Esto activa un ion-toast.`,
      duration: 1500,
      color: 'success',
      position: 'top'
    });

    await toast.present();
  }

  // --- REQUERIMIENTO 5: ion-action-sheet (Botón del header) ---
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones de Usuario',
      subHeader: 'Selecciona una acción:',
      buttons: [
        {
          text: 'Mi Perfil',
          icon: 'person-circle-outline',
          handler: () => { console.log('Mi Perfil seleccionado'); }
        },
        {
          text: 'Configuración',
          icon: 'settings-outline',
          handler: () => { console.log('Configuración seleccionada'); }
        },
        {
          text: 'Cerrar Sesión',
          role: 'destructive',
          icon: 'log-out-outline',
          handler: () => { console.log('Cerrar Sesión seleccionado'); }
        },
        {
          text: 'Cancelar', // Requerimiento: Dejar un botón de "cancel"
          icon: 'close',
          role: 'cancel',
          handler: () => { console.log('Acción cancelada'); }
        }
      ]
    });

    await actionSheet.present();
  }
}