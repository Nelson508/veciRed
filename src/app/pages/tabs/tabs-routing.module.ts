import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'acuerdos',
        loadChildren: () => import('../acuerdos/acuerdos.module').then(m => m.AcuerdosPageModule)
      },
      {
        path: 'crear-aviso',
        loadChildren: () => import('../crear-aviso/crear-aviso.module').then(m => m.CrearAvisoPageModule)
      }, 
      {
        path: 'crear-acuerdo',
        loadChildren: () => import('../crear-acuerdo/crear-acuerdo.module').then( m => m.CrearAcuerdoPageModule)
      },
      {
        path: 'opciones',
        loadChildren: () => import('../opciones/opciones.module').then( m => m.OpcionesPageModule)
      },
      {
        path: 'votaciones',
        loadChildren: () => import('../votaciones/votaciones.module').then( m => m.VotacionesPageModule)
      },
      {
        path: 'detalle-votacion',
        loadChildren: () => import('../detalle-votacion/detalle-votacion.module').then( m => m.DetalleVotacionPageModule)
      },
      {
        path: 'editar-acuerdo',
        loadChildren: () => import('../editar-acuerdo/editar-acuerdo.module').then( m => m.EditarAcuerdoPageModule)
      },
      {
        path: 'editar-opciones',
        loadChildren: () => import('../editar-opciones/editar-opciones.module').then( m => m.EditarOpcionesPageModule)
      },
      {
        path: 'mis-avisos',
        loadChildren: () => import('../mis-avisos/mis-avisos.module').then( m => m.MisAvisosPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
