# 🏢 CRM - Guía General del Proyecto

Este repositorio contiene la guía técnica oficial para la configuración del entorno, base de datos PostgreSQL, flujo de trabajo con Git y resolución de errores para el desarrollo del CRM.

---

## 📌 Regla de Oro del Equipo

> ⛔ **Nadie trabaja ni hace push directo sobre las ramas `main` o `dev`.**
> * Las ramas `main` y `dev` están protegidas.
> * Cada tarea se realiza en una rama propia creada a partir de `dev` (ej. `feature/nombre-tarea`).
> * Toda integración se hace **ÚNICAMENTE mediante Pull Request (PR)** hacia `dev` con la revisión del Tech Lead.

---

## 💻 Requisitos Previos
* **Node.js** (v18 o superior)
* **PostgreSQL** (v14 o superior)
* **Git**
* Cliente de BD (pgAdmin, DBeaver o la consola `psql`)

---

## 🛠️ Instalación y Configuración Inicial

### 1. Clonar el repositorio y posicionarse en `dev`
```bash
git clone https://github.com/vagos-discord/BACKEND-CRM-TEST-GROUP-MARKETING-AGENCY.git
cd BACKEND-CRM-TEST-GROUP-MARKETING-AGENCY
git checkout dev
git pull origin dev
```

### 2. Instalar dependencias del proyecto
```bash
npm install
```

### 3. Configurar las Variables de Entorno (`.env`)
Crea el archivo `.env` en la raíz del proyecto copiando el archivo de ejemplo `.env.example`:

* **En Linux / macOS / Bash:**
  ```bash
  cp .env.example .env
  ```
* **En Windows (PowerShell):**
  ```powershell
  Copy-Item .env.example .env
  ```

Abre el archivo `.env` generado y configura tus datos locales de PostgreSQL:

```env
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario_postgres
DB_PASSWORD=tu_password_postgres
DB_NAME=crm_db
JWT_SECRET=tu_clave_secreta_local_crm_2026
```

---

## 🗄️ Configuración de Base de Datos PostgreSQL

1. Abre tu cliente de base de datos (pgAdmin, DBeaver o la consola `psql`).
2. Crea la base de datos principal ejecutando:
   ```sql
   CREATE DATABASE crm_db;
   ```
3. Selecciona la base de datos `crm_db` y ejecuta el script de estructura localizado en `database/schema.sql`.
4. Este script generará la estructura de tablas (`usuarios`, `contactos`, `etapas`, `notas`)

### 4. Levantar el servidor en modo desarrollo
```bash
npm run dev
```

> ✅ **Verificación:** Si todo está bien, verás en la consola:
> ```text
> Servidor corriendo en el puerto 4000
> Conexión exitosa a la base de datos PostgreSQL: crm_db
> ```

---

## 🎨 Configuración e Instalación del FRONTEND

### 1. Clonar el repositorio y posicionarse en `dev`
```bash
git clone https://github.com/vagos-discord/FRONTEND-CRM-TEST-GROUP-MARKETING-AGENCY.git
cd FRONTEND-CRM-TEST-GROUP-MARKETING-AGENCY
git checkout dev
git pull origin dev
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar las Variables de Entorno (`.env.local`)
Crea un archivo llamado `.env.local` en la raíz del proyecto frontend:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### 4. Iniciar servidor Frontend
```bash
npm run dev
```

---

## 🔄 Flujo de Trabajo con Git (Gitflow)

Sigue estos 4 pasos para cada tarea asignada:

### Paso 1: Iniciar una nueva tarea
```bash
git checkout dev
git pull origin dev
git checkout -b feature/nombre-de-tu-tarea
```

### Paso 2: Guardar y subir avances
```bash
git add .
git commit -m "feat: crear controlador y rutas para modulo de contactos"
git push -u origin feature/nombre-de-tu-tarea
```

### Paso 3: Sincronizar tu rama con `dev` antes de entregar (Rebase)
```bash
git fetch origin dev
git rebase origin/dev
```

### Paso 4: Abrir el Pull Request (PR)
1. Ve al repositorio en **GitHub**.
2. Haz clic en **Compare & pull request**.
3. Revisa los destinos: `base: dev` 👈 `compare: feature/nombre-de-tu-tarea`.
4. Asigna al **Tech Lead** como revisor.

---

## 💡 Convención de Commits

* `feat:` Nueva funcionalidad o endpoint.
* `fix:` Corrección de errores o bugs.
* `docs:` Cambios exclusivamente en la documentación.
* `refactor:` Cambios de código que no corrigen bugs ni agregan funcionalidades.

---

## ⚠️ Resolución de Problemas Frecuentes

* 🔴 **Error:** `GH006: Protected branch update failed for refs/heads/dev`
  * **Solución:** Crea tu rama propia (`git checkout -b feature/mi-tarea`), sube tu rama y abre un PR en GitHub.

* 🔴 **Error:** `password authentication failed for user`
  * **Solución:** Verifica tus credenciales locales de Postgres y asegúrate de que coincidan con `.env`.

* 🔴 **Error:** `relation "usuarios" does not exist`
  * **Solución:** Abre tu gestor SQL y ejecuta el archivo `database/schema.sql`.

* 🔴 **Error:** `ECONNREFUSED 127.0.0.1:4000`
  * **Solución:** Ejecuta `npm run dev` en el proyecto backend antes de probar la app en el navegador.
