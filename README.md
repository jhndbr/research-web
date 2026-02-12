# Academic Website

Una plataforma web moderna y completa para la gestión y difusión del trabajo académico, organización y administración de investigaciones académicas y libros, con un sistema robusto de gestión de contenido y panel administrativo.

## Características

- **Portfolio Académico**: Presentación profesional del trabajo de investigación
- **Gestión de Investigaciones**: Sistema completo para organizar y mostrar papers académicos
- **Catálogo de Libros**: Gestión de publicaciones y libros del autor
- **Sistema de Autenticación**: NextAuth.js con soporte para múltiples proveedores
- **Panel Administrativo**: Gestión de contenido y usuarios
- **Diseño Responsivo**: Interfaz moderna con Tailwind CSS
- **Tema Oscuro/Claro**: Soporte para cambio de tema
- **Base de Datos**: PostgreSQL con Prisma ORM
- **SEO Optimizado**: Metadatos y Open Graph configurados

## Tecnologías

### Frontend
- **Next.js 14** - Framework de React con App Router
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS utilitario
- **Framer Motion** - Animaciones
- **Radix UI** - Componentes accesibles
- **Lucide React** - Iconos

### Backend
- **NextAuth.js** - Autenticación
- **Prisma** - ORM para base de datos
- **PostgreSQL** - Base de datos
- **Zod** - Validación de esquemas

### Herramientas de Desarrollo
- **ESLint** - Linter de código
- **PostCSS** - Procesador de CSS
- **tsx** - Ejecutor de TypeScript

## Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Cuenta en [Supabase](https://supabase.com) (gratis)

## Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd research-web
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar Supabase**
   
   a. Crear un nuevo proyecto en [Supabase](https://supabase.com)
   
   b. Ir a **Settings** → **Database** → **Connection string**
   
   c. Copiar ambas URLs (Pooling y Direct)

4. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   
   Editar `.env.local` con tus credenciales:
   ```env
   # Database - Supabase
   DATABASE_URL="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:5432/postgres"
   
   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="genera-un-secret-con-openssl-rand-base64-32"
   
   # Proveedores OAuth (opcional)
   GOOGLE_CLIENT_ID=""
   GOOGLE_CLIENT_SECRET=""
   GITHUB_CLIENT_ID=""
   GITHUB_CLIENT_SECRET=""
   ```

5. **Configurar la base de datos**
   ```bash
   # Generar el cliente de Prisma
   npx prisma generate
   
   # Crear las tablas en Supabase
   npx prisma db push
   ```

6. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:3000`

## Scripts Disponibles

- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Construir para producción
- `npm run start` - Ejecutar en modo producción
- `npm run lint` - Ejecutar linter
- `npm run db:push` - Sincronizar esquema con la base de datos (Supabase)
- `npm run db:generate` - Generar cliente de Prisma
- `npm run db:studio` - Abrir Prisma Studio

##  Estructura de la Base de Datos

### Modelos Principales

- **User**: Usuarios del sistema con roles (USER, ADMIN, MODERATOR)
- **ResearchPaper**: Papers académicos con metadatos SEO
- **Book**: Libros y publicaciones
- **ContactSubmission**: Formularios de contacto
- **SiteSettings**: Configuraciones del sitio

### Características de los Modelos

- **Sistema de roles**: Control de acceso granular
- **SEO optimizado**: Slugs, keywords, metadatos
- **Auditoría**: Timestamps de creación y actualización
- **Relaciones**: Sistema de autores y publicaciones

## Responsive Design

- Diseño mobile-first
- Breakpoints optimizados
- Navegación adaptativa
- Componentes flexibles

## Temas

- Soporte para tema claro y oscuro
- Persistencia de preferencias
- Transiciones suaves
- Componentes adaptativos

## Despliegue

### Vercel + Supabase (Recomendado)

1. **Preparar el proyecto**
   ```bash
   # Asegúrate de que todo esté sincronizado
   npx prisma generate
   npx prisma db push
   ```

2. **Desplegar en Vercel**
   - Conecta tu repositorio a [Vercel](https://vercel.com)
   - Agrega las variables de entorno:
     - `DATABASE_URL` - URL de conexión de Supabase (pooling)
     - `DIRECT_URL` - URL directa de Supabase
     - `NEXTAUTH_URL` - Tu URL de producción (ej: https://tu-app.vercel.app)
     - `NEXTAUTH_SECRET` - Genera uno con `openssl rand -base64 32`
   - Despliega automáticamente

3. **Verificar conexión**
   - La base de datos se conectará automáticamente a Supabase
   - No necesitas ejecutar migraciones adicionales
   - El proyecto inicia con base de datos vacía

### Otras Opciones de Despliegue

- **Netlify**: Compatible con Next.js + Supabase
- **Railway**: Alternativa con soporte PostgreSQL integrado
- **DigitalOcean App Platform**: Despliegue con contenedores

## Monitoreo y Analytics

- Metadatos SEO optimizados
- Open Graph configurado
- Twitter Cards
- Estructura de datos semántica

## Contribución

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

