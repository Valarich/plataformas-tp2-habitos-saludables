export const usuariosIniciales = [
  {
    id: 1,
    nombre: 'Murad',
    email: 'admin@habitos.com',
    password: '1234',
    rol: 'Administrador',
  },
  {
    id: 2,
    nombre: 'Usuario Demo',
    email: 'usuario@habitos.com',
    password: '1234',
    rol: 'Usuario',
  },
];

export const habitosIniciales = [
  {
    id: 1,
    usuarioId: 1,
    nombre: 'Tomar 2 litros de agua',
    categoria: 'Salud',
    frecuencia: 'Diario',
    completado: false,
  },
  {
    id: 2,
    usuarioId: 1,
    nombre: 'Caminar 30 minutos',
    categoria: 'Actividad física',
    frecuencia: 'Diario',
    completado: true,
  },
  {
    id: 3,
    usuarioId: 2,
    nombre: 'Leer 10 páginas',
    categoria: 'Desarrollo personal',
    frecuencia: 'Diario',
    completado: false,
  },
];