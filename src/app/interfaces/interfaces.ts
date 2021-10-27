//craeremos el molde de la estructura de los datos que manejaremos en Avisos
//por ahora nos faltaria añadir comunidad y tipo a la interfaz de aviso NO OLVIDAR!!
//esta interfaz la añadiremos al servicio de los avisos
export interface AvisosCreados {
  ok: boolean;
  pagina: number;
  avisosPublicados: Avisos[];
}

export interface Avisos {
  imagenAviso?: string[];
  _id?: string;
  titulo?: string;
  descripcion?: string;
  usuario?: Usuario;
  fechaCreacion?: string;
 
}

export interface Usuario {
  _id?: string;
  nombre?: string;
  fechaNacimiento?: string;
  email?: string;
  imagenPerfil?: string;
  rol?: number;
  
}