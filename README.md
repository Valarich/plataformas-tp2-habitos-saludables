# Sistema de Hábitos Saludables

## Materia

Plataformas de Desarrollo

## Integrante

* Murad Annamuradov

## Descripción del proyecto

Sistema web desarrollado como Single Page Application (SPA) para gestionar hábitos saludables diarios.

La aplicación permite iniciar sesión con distintos tipos de usuarios, administrar hábitos, cambiar su estado, editarlos, eliminarlos y gestionar usuarios según el rol correspondiente.

## Temática

La temática elegida es la gestión de hábitos saludables.

El objetivo del sistema es ayudar a los usuarios a organizar y controlar actividades diarias relacionadas con salud, actividad física, alimentación, estudio y desarrollo personal.

## Tecnologías utilizadas

* React
* JavaScript
* HTML
* CSS
* Vite
* LocalStorage

## Roles de usuario

### Administrador

El administrador puede:

* Iniciar sesión
* Cerrar sesión
* Ver todos los hábitos del sistema
* Agregar hábitos
* Editar hábitos
* Eliminar hábitos
* Cambiar el estado de los hábitos
* Filtrar hábitos por estado
* Gestionar usuarios
* Crear usuarios
* Cambiar roles de usuarios
* Eliminar usuarios

### Usuario

El usuario puede:

* Iniciar sesión
* Cerrar sesión
* Ver sus propios hábitos
* Agregar hábitos propios
* Editar hábitos propios
* Eliminar hábitos propios
* Cambiar el estado de sus hábitos
* Filtrar hábitos por estado

## Usuarios de prueba

### Administrador

Email:

```text
admin@habitos.com
```

Contraseña:

```text
1234
```

### Usuario

Email:

```text
usuario@habitos.com
```

Contraseña:

```text
1234
```

## Funcionalidades principales

* Login
* Logout
* Gestión de usuarios
* Gestión de hábitos
* Roles de usuario
* Filtro de hábitos por estado
* Persistencia de datos en LocalStorage
* Separación del código en componentes

## Estructura del proyecto

```text
src
├── components
│   ├── Dashboard.jsx
│   ├── HabitosPanel.jsx
│   ├── Header.jsx
│   ├── LoginForm.jsx
│   └── UsuariosPanel.jsx
├── data
│   └── datosIniciales.js
├── utils
│   └── localStorage.js
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

## Comandos para ejecutar el proyecto

Instalar dependencias:

```bash
npm install
```

Ejecutar en modo desarrollo:

```bash
npm run dev
```

Generar versión de producción:

```bash
npm run build
```

Previsualizar la versión de producción:

```bash
npm run preview
```

## Estado del proyecto

Frontend funcional para Parcial 2.

El proyecto queda preparado para una futura integración con backend/API REST en la instancia final.
