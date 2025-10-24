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
- PostgreSQL
- npm o yarn

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

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   
   Editar `.env.local` con las siguientes variables:
   ```env
   # Base de datos
   DATABASE_URL="postgresql://username:password@localhost:5432/research_web"
   
   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   
   # Proveedores de autenticación (opcional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"
   ```

4. **Configurar la base de datos**
   ```bash
   # Generar el cliente de Prisma
   npx prisma generate
   
   # Ejecutar migraciones
   npm run db:migrate
   
   # Poblar la base de datos con datos de ejemplo
   npm run db:seed
   ```

5. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:3000`

## Scripts Disponibles

- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Construir para producción
- `npm run start` - Ejecutar en modo producción
- `npm run lint` - Ejecutar linter
- `npm run db:push` - Sincronizar esquema con la base de datos
- `npm run db:migrate` - Ejecutar migraciones
- `npm run db:seed` - Poblar base de datos con datos de ejemplo
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

### Vercel (Recomendado)

1. Conectar repositorio a Vercel
2. Configurar variables de entorno
3. Desplegar automáticamente

### Otros Proveedores

- **Netlify**: Compatible con Next.js
- **Railway**: Con soporte para PostgreSQL
- **DigitalOcean**: App Platform

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

