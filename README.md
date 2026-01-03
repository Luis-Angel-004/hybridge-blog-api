# Hybridge Blog API

Esta es una API RESTful para un sistema de blog, construida con Node.js, Express y TypeScript.

## Características

-   **CRUD:** Operaciones para Crear, Leer, Actualizar y Eliminar publicaciones.
-   **Arquitectura por Capas:** Código organizado en Rutas, Controladores y Servicios para una clara separación de responsabilidades.
-   **Autenticación:** Endpoints críticos protegidos mediante JSON Web Tokens usando Passport.js.
-   **TypeScript:** Todo el código está tipado para mayor seguridad y mantenibilidad.
-   **Testing:** Pruebas unitarias para la lógica de negocio con Vitest.

## 🛠️ Stack Tecnológico

-   **Backend:** Node.js, Express.js
-   **Lenguaje:** TypeScript
-   **Autenticación:** Passport.js
-   **Testing:** Vitest

## 🚀 Cómo Empezar

Sigue estos pasos para levantar el proyecto en tu entorno local.

### Prerrequisitos

-   Node.js
-   pnpm

### Instalación y Configuración

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/Luis-Angel-004/hybridge-blog-api.git
    cd hybridge-blog-api
    ```

2.  **Instala las dependencias:**
    ```bash
    pnpm install
    ```

3.  **Crea el archivo de variables de entorno:**
    Copia el archivo `.env.example` y renómbralo a `.env.local`.
    ```bash
    cp .env.example .env.local
    ```
    Luego, modifica el archivo `.env.local` con tus propios secretos. El `JWT_SECRET` debe ser una cadena de texto larga y aleatoria.

### Scripts Disponibles

-   **Ejecutar en modo de desarrollo:**
    ```bash
    pnpm run dev
    ```

-   **Correr los tests:**
    ```bash
    pnpm run test
    ```

-   **Compilar el proyecto para producción:**
    ```bash
    pnpm run build
    ```

-   **Ejecutar la versión de producción:**
    ```bash
    pnpm run start
    ```

## Endpoints de la API

La URL base para la API es `/api`.

### Autenticación

| Método | Endpoint         | Descripción                                     | Body de Ejemplo                          |
| :----- | :--------------- | :---------------------------------------------- | :--------------------------------------- |
| `POST` | `/api/auth/register` | Registra un nuevo usuario.                      | `{"email": "user@mail.com", "password": "securepassword"}` |
| `POST` | `/api/auth/login`    | Autentica un usuario y devuelve un token JWT. | `{"email": "test@example.com", "password": "password123"}` |

### Publicaciones (Posts)

Para acceder a los endpoints protegidos, debes incluir el token en la cabecera `Authorization` como `Bearer <token>`.

| Método   | Endpoint         | Protección | Descripción                        |
| :------- | :--------------- | :--------- | :--------------------------------- |
| `GET`    | `/api/posts`     | Pública    | Obtiene una lista de todas las publicaciones. |
| `GET`    | `/api/posts/:id` | Pública    | Obtiene una publicación por su ID.  |
| `POST`   | `/api/posts`     | JWT        | Crea una nueva publicación.        |
| `PUT`    | `/api/posts/:id` | JWT        | Actualiza una publicación existente. |
| `DELETE` | `/api/posts/:id` | JWT        | Elimina una publicación.           |

## 📝 Ejemplos de Uso

### Registrar un nuevo usuario

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"newuser@example.com","password":"securepassword123"}'
```

**Respuesta exitosa:**
```json
{
  "id": 2,
  "email": "newuser@example.com"
}
```

### Iniciar sesión

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Respuesta exitosa:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Obtener todas las publicaciones

```bash
curl http://localhost:3000/api/posts
```

### Crear una nueva publicación (requiere autenticación)

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"Mi primer post","content":"Este es el contenido de mi post"}'
```

### Actualizar una publicación (requiere autenticación)

```bash
curl -X PUT http://localhost:3000/api/posts/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"Post actualizado","content":"Contenido actualizado"}'
```

### Eliminar una publicación (requiere autenticación)

```bash
curl -X DELETE http://localhost:3000/api/posts/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🔐 Nota sobre Autenticación

Para usar los endpoints protegidos:
1. Primero regístrate usando `/api/auth/register`
2. Luego inicia sesión con `/api/auth/login` para obtener tu token JWT
3. Incluye el token en la cabecera `Authorization: Bearer <tu-token>` en las peticiones protegidas

El usuario de prueba predeterminado es:
- **Email:** `test@example.com`
- **Password:** `password123`