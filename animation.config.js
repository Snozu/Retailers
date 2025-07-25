/**
 * Configuración de animaciones para la aplicación Retailers
 * Este archivo contiene constantes y configuraciones para las animaciones utilizadas en la aplicación
 */

// Configuración para animaciones de contador
export const COUNTER_ANIMATION_CONFIG = {
  // Duración en segundos
  duration: 2.5,
  // Habilitar activación por scroll
  enableScrollSpy: true,
  // Retraso antes de iniciar la animación (en ms)
  delay: 0,
  // Función de aceleración
  easing: 'easeOutCubic',
  // Separador de miles
  separator: ',',
  // Decimales a mostrar
  decimals: 0,
};

// Configuración para animaciones de entrada
export const ENTRANCE_ANIMATION_CONFIG = {
  // Duración de la animación en segundos
  duration: 0.6,
  // Función de aceleración
  easing: 'ease-out',
  // Retrasos para cada tarjeta (en ms)
  delays: {
    total: 0,
    pending: 150,
    approved: 300,
    rejected: 450,
  },
  // Distancia inicial de desplazamiento (en px)
  translateY: 30,
};

// Configuración para animaciones de hover
export const HOVER_ANIMATION_CONFIG = {
  // Duración de la animación en segundos
  duration: 0.3,
  // Escala al hacer hover
  scale: 1.05,
  // Función de aceleración
  easing: 'ease-in-out',
};

/**
 * Función para aplicar configuración de animación de contador
 * @param {Object} customConfig - Configuración personalizada
 * @returns {Object} - Configuración final
 */
export const getCounterConfig = (customConfig = {}) => {
  return {
    ...COUNTER_ANIMATION_CONFIG,
    ...customConfig,
  };
};

/**
 * Función para obtener el estilo de retraso de animación
 * @param {string} type - Tipo de tarjeta (total, pending, approved, rejected)
 * @returns {Object} - Objeto de estilo con animationDelay
 */
export const getAnimationDelayStyle = (type) => {
  const delay = ENTRANCE_ANIMATION_CONFIG.delays[type] || 0;
  return {
    animationDelay: `${delay}ms`,
  };
};