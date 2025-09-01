## Description

Este es el monolito de Ruuf (en una versión muy antigua, pero es el real!). Toda la lógica de Ruuf debería ir en este repositorio por defecto.

## Installation

```bash
npm install
```

## Running the app

```bash
npm run db:setup # Esto crea la DB de development y testing.
npm run db:seed
npm run dev
```

La base de datos de development corre migraciones, la de testing no (solo sincroniza el schema directamente).
A menos que botes el servicio de la db (`npm run db:dev:drop`, `npm run db:test:drop` o manualmente), no es necesario hacer `db:setup` nuevamente.
Por defecto, la app corre en el puerto 3000 => [localhost:3000](localhost:3000).

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```
