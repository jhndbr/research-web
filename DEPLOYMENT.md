# Guía de Despliegue - Supabase + Vercel

Esta guía te ayudará a desplegar tu proyecto con una base de datos vacía en Supabase.

## 1. Configurar Supabase

### Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta (es gratis)
2. Haz clic en "New Project"
3. Completa los datos:
   - **Name**: nombre de tu proyecto
   - **Database Password**: guarda esta contraseña en un lugar seguro
   - **Region**: elige la región más cercana a tus usuarios
4. Espera 2-3 minutos mientras se crea el proyecto

### Obtener URLs de Conexión

1. Ve a **Settings** → **Database**
2. Busca la sección **Connection string**
3. Copia las dos URLs:
   - **Connection pooling** (Pooler): para `DATABASE_URL`
   - **Direct connection**: para `DIRECT_URL`
4. Cambia `[YOUR-PASSWORD]` por tu contraseña de base de datos

Ejemplo de las URLs:
```
DATABASE_URL="postgresql://postgres.xxxxx:TuPassword@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.xxxxx:TuPassword@aws-0-us-west-1.pooler.supabase.com:5432/postgres"
```

## 2. Configurar Localmente

### Crear archivo .env.local

```bash
cp .env.example .env.local
```

### Editar .env.local

Reemplaza con tus valores:

```env
# Database - Supabase
DATABASE_URL="tu-url-de-pooling-de-supabase"
DIRECT_URL="tu-url-directa-de-supabase"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="genera-con: openssl rand -base64 32"

# OAuth (opcional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

### Crear las tablas

```bash
# Generar cliente Prisma
npx prisma generate

# Crear todas las tablas en Supabase
npx prisma db push
```

### Probar localmente

```bash
npm run dev
```

Visita http://localhost:3000

## 3. Desplegar en Vercel

### Preparar el Repositorio

1. Asegúrate de que tu proyecto esté en Git:
```bash
git add .
git commit -m "Preparado para despliegue"
git push
```

### Conectar a Vercel

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta
2. Haz clic en **"Add New Project"**
3. Importa tu repositorio de GitHub/GitLab/Bitbucket
4. Configura el proyecto:
   - **Framework Preset**: Next.js (detectado automáticamente)
   - **Root Directory**: `./`
   - **Build Command**: `next build`
   - **Output Directory**: `.next`

### Configurar Variables de Entorno

En la sección **Environment Variables**, agrega:

```
DATABASE_URL = tu-url-de-pooling-de-supabase
DIRECT_URL = tu-url-directa-de-supabase
NEXTAUTH_URL = https://tu-proyecto.vercel.app
NEXTAUTH_SECRET = ejecuta: openssl rand -base64 32
```

**Importante**: Cambia `NEXTAUTH_URL` cuando tengas tu URL de Vercel.

### Desplegar

1. Haz clic en **"Deploy"**
2. Espera 2-3 minutos
3. Tu sitio estará disponible en `https://tu-proyecto.vercel.app`

### Actualizar NEXTAUTH_URL

1. Ve a **Settings** → **Environment Variables** en Vercel
2. Edita `NEXTAUTH_URL` con tu URL real de Vercel
3. Redespliega desde **Deployments** → **Redeploy**

## 4. Verificar el Despliegue

### Verificar Base de Datos

1. En Supabase, ve a **Table Editor**
2. Deberías ver todas las tablas creadas:
   - users
   - accounts
   - sessions
   - research_papers
   - books
   - contact_submissions
   - site_settings

### Verificar Aplicación

1. Visita tu URL de Vercel
2. La aplicación debería cargar correctamente
3. La base de datos está vacía y lista para usar

## 5. Administración

### Ver datos con Prisma Studio

```bash
npm run db:studio
```

Abre http://localhost:5555 para gestionar los datos visualmente.

### Ver logs en Supabase

1. Ve a **Logs** en tu proyecto de Supabase
2. Selecciona **Database** para ver queries

### Actualizar el esquema

Si cambias el esquema de Prisma:

```bash
npx prisma db push
```

Vercel desplegará automáticamente en el próximo commit.

## Problemas Comunes

### Error de conexión a la base de datos

- Verifica que las URLs sean correctas
- Asegúrate de usar la URL de pooling para `DATABASE_URL`
- Verifica que la contraseña no tenga caracteres especiales sin escapar

### Error 500 en producción

- Revisa los logs en Vercel Dashboard
- Verifica que todas las variables de entorno estén configuradas
- Asegúrate de que `NEXTAUTH_URL` sea la URL correcta de producción

### Tablas no se crean

- Ejecuta `npx prisma db push` localmente primero
- Verifica la conexión a Supabase
- Revisa los permisos del usuario de base de datos

## Recursos

- [Documentación de Supabase](https://supabase.com/docs)
- [Documentación de Vercel](https://vercel.com/docs)
- [Documentación de Prisma](https://www.prisma.io/docs)
- [Documentación de NextAuth.js](https://next-auth.js.org)
