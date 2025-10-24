### 📸 Directorio de Imágenes

Este directorio contiene todas las imágenes utilizadas en el sitio web.

#### 📁 Estructura recomendada:

```
images/
├── 20190708_dr_cristiano.jpg    # Foto principal del Dr. Cristiano
├── dr_cristiano.jpg             # Foto alternativa
├── book1.jpg                    # Portada libro 1 (Reino Unido)
├── book2.jpg                    # Portada libro 2 (Portugal)  
├── book3.jpg                    # Portada libro 3 (España)
├── logos/                       # Logos y iconos
│   ├── logo.png
│   └── favicon.ico
├── research/                    # Imágenes relacionadas con investigación
└── backgrounds/                 # Fondos y texturas
    └── grid.svg
```

#### 🔄 Migración desde el sitio original:

Para migrar las imágenes del sitio original, copia los archivos desde:
```
/home/jhon/Descargas/cristianodeangelis.github.io/image/
```

#### 📋 Lista de archivos a copiar:

- `20190708_dr_cristiano.jpg` - Foto principal del perfil
- `dr_cristiano.jpg` - Foto alternativa
- `book1.jpg` - Portada del libro en inglés
- `book2.jpg` - Portada del libro en portugués
- `book3.jpg` - Portada del libro en español

#### 🖼️ Optimización de imágenes:

Next.js optimiza automáticamente las imágenes, pero para mejor rendimiento:

1. **Formato recomendado**: WebP o AVIF para navegadores modernos
2. **Tamaños**: Múltiples resoluciones para responsive design
3. **Compresión**: Sin pérdida de calidad visible

#### 📖 Uso en componentes:

```tsx
import Image from 'next/image'

// Imagen optimizada
<Image
  src="/images/20190708_dr_cristiano.jpg"
  alt="Dr. Cristiano De Angelis"
  width={200}
  height={200}
  className="rounded-full"
  priority // Para imágenes above-the-fold
/>
```

#### ⚡ Performance:

- **Lazy loading**: Automático para imágenes fuera del viewport
- **Responsive**: Tamaños adaptativos según dispositivo
- **WebP/AVIF**: Formatos modernos cuando están disponibles
- **Placeholder**: Blur o color mientras carga

#### 🔒 Consideraciones:

- ✅ Todas las imágenes deben tener texto alternativo (alt)
- ✅ Usar dimensiones específicas para evitar layout shift
- ✅ Optimizar tamaño de archivo antes de subir
- ✅ Considerar derechos de autor y licencias