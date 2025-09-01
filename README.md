# Proyecto de Ejemplo - Estructura de Entrevista

Este repositorio es un proyecto de ejemplo similar al utilizado en entrevistas, que contiene tanto un backend (API) como un frontend (aplicación web). El proyecto está estructurado para demostrar una aplicación full-stack completa.

## Estructura del Proyecto

- `backend/` - API backend construida con NestJS
- `front/` - Aplicación frontend construida con Next.js

## Backend

### Descripción

Este es el monolito de Ruuf (en una versión muy antigua, pero es el real!). Toda la lógica de Ruuf debería ir en este repositorio por defecto.

### Instalación del Backend

```bash
cd backend
npm install
```

### Ejecutar el Backend

```bash
npm run db:setup # Esto crea la DB de development y testing.
npm run db:seed
npm run dev
```

La base de datos de development corre migraciones, la de testing no (solo sincroniza el schema directamente).
A menos que botes el servicio de la db (`npm run db:dev:drop`, `npm run db:test:drop` o manualmente), no es necesario hacer `db:setup` nuevamente.
Por defecto, la app corre en el puerto 3000 => [localhost:3000](http://localhost:3000).

### Pruebas del Backend

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e
```

## Frontend

### Descripción

Este es un proyecto de [Next.js](https://nextjs.org) creado con [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Instalación del Frontend

```bash
cd front
npm install
```

### Ejecutar el Frontend

Primero, ejecuta el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:8080](http://localhost:8080) en tu navegador para ver el resultado.
