# Añade tus propias imágenes aquí

Esta carpeta es para almacenar imágenes estáticas que se usarán en tu sitio web.

## Ejemplos de uso:

- Fotos de perfil
- Imágenes de portadas de libros
- Ilustraciones para artículos de investigación
- Logos y recursos visuales del sitio

Las imágenes aquí se pueden referenciar desde tu código como:

```jsx
<img src="/images/tu-imagen.jpg" alt="Descripción" />
```

O con el componente Image de Next.js:

```jsx
import Image from 'next/image'

<Image 
  src="/images/tu-imagen.jpg" 
  alt="Descripción" 
  width={500} 
  height={300} 
/>
```
