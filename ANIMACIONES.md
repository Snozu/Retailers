# Documentación de Animaciones

## Animaciones Implementadas

Este documento describe las animaciones implementadas en la aplicación Retailers para mejorar la experiencia de usuario.

### 1. Animación de Contador en Tarjetas de Resumen

Se ha implementado una animación de contador para los valores numéricos en las tarjetas de resumen utilizando la biblioteca `react-countup`.

#### Características:

- **Efecto de Conteo**: Los números se incrementan desde cero hasta su valor final
- **Duración**: 2.5 segundos para cada contador
- **Activación por Scroll**: Se activa cuando las tarjetas entran en el viewport

### 2. Animación de Entrada para Tarjetas

Se ha implementado una animación de entrada para las tarjetas de resumen con un efecto de desvanecimiento y desplazamiento hacia arriba.

#### Características:

- **Efecto Escalonado**: Las tarjetas aparecen secuencialmente con retrasos diferentes
  - Tarjeta "Total": 0ms de retraso
  - Tarjeta "Pendientes": 150ms de retraso
  - Tarjeta "Aprobadas": 300ms de retraso
  - Tarjeta "Rechazadas": 450ms de retraso
- **Duración**: 0.6 segundos para cada animación
- **Curva de Aceleración**: Ease-out para un efecto más natural

## Implementación Técnica

### Bibliotecas Utilizadas

- **react-countup**: Para la animación de contador

### Archivos Modificados

- **SolicitudesCard.jsx**: Implementación de CountUp y animaciones de entrada
- **index.css**: Estilos CSS para las animaciones

### Código CSS Relevante

```css
/* Estilos para la animación de contador */
.scroll-spy-init {
  visibility: hidden;
}

.scroll-spy-inview {
  visibility: visible;
  animation: countAnimation 0.5s ease-out;
}

@keyframes countAnimation {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animación de entrada para las tarjetas */
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Consideraciones Futuras

- Implementar animaciones para las transiciones entre páginas
- Agregar efectos de hover más elaborados para los elementos interactivos
- Optimizar el rendimiento de las animaciones en dispositivos de gama baja