# Prueba Técnica

Proyecto para el punto 3 de la prueba técnica. Es un CRUD de consumidores, productos y órdenes.

Jhonier David Ortiz Hernandez

## Tecnologías

- Backend: Node.js + Express
- Base de datos: SQLite (better-sqlite3)
- Frontend: Angular 
- Estilos: Tailwind CSS via CDN

## Estructura del proyecto

```
prueba-tecnica/ 
├── backend/
│   └── src/
│       ├── app.js
│       ├── models/
│       │   └── database.js
│       └── routes/
│           ├── consumers.routes.js
│           ├── products.routes.js
│           └── orders.routes.js
├── frontend/
│   └── src/app/
│       ├── consumers/
│       ├── products/
│       ├── orders/
│       └── services/
└── README.md
```

## Cómo correrlo

### Backend

```
cd backend
npm install
node src/app.js
```

Queda corriendo en el puerto 3000.

### Frontend

```
cd frontend
npm install
ng serve
```

Queda corriendo en el puerto 4200. Hay que tener el backend prendido para que cargue la info.

## Tablas

- consumers: id, name, email
- products: id, name, description, price, stock
- orders: id, consumer_id, total
- order_details: id, order_id, product_id, quantity, price

Una orden tiene un consumidor y varios productos (a través de order_details).

## Endpoints

- /consumers (GET, POST, PUT, DELETE)
- /products (GET, POST, PUT, DELETE)
- /orders (GET, POST)
- /orders/:id (GET, trae el detalle con los productos)

Para crear una orden el body:

```
{
  "consumer_id": 1,
  "items": [
    { "product_id": 1, "quantity": 2 }
  ]
}
```

## Qué hace la app

- Crear, editar, consultar y eliminar consumidores
- Crear, editar, consultar y eliminar productos
- Crear, consultar órdenes con varios productos
- Validar que haya stock antes de crear la orden
- Calcular totales de las ordenes 
- Ver el detalle de una orden

## link de despliegues
- https://prueba-tecnica-dk1d.onrender.com/
- https://prueba-tecnica-jhonier.vercel.app/




