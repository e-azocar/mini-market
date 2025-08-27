# Mini Market APP

Este proyecto es una aplicación web que consiste en una vista de _Mini market_ donde los usuarios pueden explorar una lista de productos, filtrarlos por disponibilidad y ordenarlos según su precio o nombre.

## Características

- **Exploración de productos**: Los usuarios pueden ver una lista de productos con imágenes, nombres y precios.
- **Filtrado**: Los productos se pueden filtrar por disponibilidad (disponibles / no disponibles).
- **Ordenación**: Los productos se pueden ordenar por nombre o precio, en orden ascendente o descendente.
- **Búsqueda de productos más baratos**: Los usuarios pueden buscar los N productos más baratos disponibles.

## Tecnologías principales

- **Next.js**: Framework de React para la construcción de aplicaciones web.
- **TypeScript**: Para añadir tipado estático y mejorar la calidad del código.
- **Tailwind CSS**: Framework de CSS para agilizar el desarrollo de la interfaz.
- **Express**: Framework de Node.js para construir APIs.
- **MongoDB**: Base de datos NoSQL para almacenar la información de los productos.

## Tecnologías útiles en el desarrollo

- **Jest**: Framework para realizar pruebas unitarias.
- **DummyJSON**: Para obtener los datos de ejemplo.

## Instalación y ejecución

Para ejecutar este proyecto, es necesario tener instalado Node.js y una instancia de MongoDB en funcionamiento. Pasos para la ejecución:

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/e-azocar/mini-market
   cd mini-market
   ```

2. Crear los archivos .env en `api` y `web` respectivamente.

3. En dos terminales diferentes, ejecutar los siguientes comandos:
    ```bash
   cd api
   npm install # instalar dependencias de la API
   npm run seed # cargar datos de ejemplo
   npm run dev # iniciar el servidor de desarrollo
   ```
   ```bash
   cd web
   npm install # instalar dependencias de la aplicación web
   npm run dev # iniciar el servidor de desarrollo
   ```

4. Abrir `http://localhost:3000` en el navegador.
