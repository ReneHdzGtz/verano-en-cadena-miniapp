# 🔮 Punk Horoscope - Web3 Archetype Horoscope App

Una miniapp para Farcaster que entrega horóscopos personalizados usando arquetipos Web3 en lugar de signos zodiacales clásicos.

## 🎭 Características Principales

### 12 Arquetipos Web3
- **The Maximalist** ₿ - Purista de Bitcoin
- **The Airdrop Hunter** 💸 - Cazador de recompensas
- **The DeFi DJ** 🌽 - Maestro de yield farming
- **The Rugged Dreamer** 🪤 - Optimista resiliente
- **The DAO Preacher** 🏛️ - Evangelista de descentralización
- **The NFT Degen** 🖼️ - Coleccionista compulsivo
- **The Chain Hopper** 🔁 - Explorador multichain
- **The Tech Prophet** 🧬 - Visionario tecnológico
- **The Builder** 🔧 - Creador incansable
- **The Governance Nerd** 📜 - Especialista en gobernanza
- **The Lurker** 👁️ - Observador silencioso
- **The Farcaster Maxi** 📡 - Nativo de Farcaster

### Métodos de Asignación
1. **Selección Manual** - Explora y elige tu arquetipo
2. **Test de Personalidad** - Quiz de 5 preguntas con sistema de puntuación
3. **Auto Detección** - Análisis de actividad (próximamente)

### Horóscopos Dinámicos
Cada horóscopo incluye:
- 🔮 **Predicción** - Divertida e irónica
- 💡 **Consejo Web3** - Específico para tu arquetipo
- 🎭 **Estado Emocional** - En clave Web3
- 🪙 **Token de la Suerte** - Recomendación del día

## 🚀 Tecnologías Utilizadas

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base L2 con OnchainKit
- **Farcaster**: Frame SDK para integración nativa
- **UI**: Tailwind CSS con tema personalizado
- **TypeScript**: Tipado estricto
- **Integración**: Frames y compartir en Farcaster

## 📁 Estructura de Archivos

```
app/punk-horoscope/
├── components/
│   ├── ArchetypeCard.tsx        # Tarjeta individual de arquetipo
│   ├── ArchetypeSelector.tsx    # Selector manual de arquetipos
│   ├── QuizComponent.tsx        # Test de personalidad
│   └── HoroscopeDisplay.tsx     # Visualización del horóscopo
├── layout.tsx                   # Metadatos y SEO específicos
└── page.tsx                     # Página principal

lib/
├── types/punk-horoscope.ts      # Tipos TypeScript
├── data/
│   ├── archetypes.ts           # Definición de 12 arquetipos
│   └── quiz-questions.ts       # Preguntas del test
├── hooks/
│   └── usePunkHoroscope.ts     # Lógica principal del horóscopo
└── utils/
    └── farcaster-share.ts      # Utilidades para compartir

app/api/frames/punk-horoscope/
├── route.ts                    # API de Farcaster Frames
└── image/
    └── route.ts               # Generación de imágenes dinámicas
```

## 🧪 Test de Personalidad

### Sistema de Puntuación
- 5 preguntas con múltiples opciones
- Cada respuesta suma puntos a arquetipos específicos
- El arquetipo con mayor puntuación es asignado al usuario

### Preguntas Incluidas
1. **Día a día en Web3** - Actividades principales
2. **Relación con NFTs** - Enfoque hacia coleccionables
3. **Frase matutina** - Expresión típica
4. **Fuente de información** - Canales preferidos
5. **Proyecto ideal** - Tipo de construcción preferida

## 📱 Integración con Farcaster

### Frames Disponibles
- **Home Frame** - Introducción y opciones
- **Manual Selection** - Navegación por arquetipos
- **Quiz Frame** - Redirección a app completa
- **Horoscope Frame** - Visualización del resultado

### Funcionalidades de Compartir
- Generación automática de texto para cast
- URL con Frame embebido
- Imágenes dinámicas por arquetipo
- Metadatos Open Graph optimizados

## 🎨 Sistema de Diseño

### Colores por Arquetipo
Cada arquetipo tiene su paleta única:
- **Primary/Secondary Colors** - Para elementos principales
- **Background** - Fondo temático
- **Gradientes dinámicos** - Aplicados contextualmente

### Componentes Responsivos
- Diseño mobile-first
- Navegación táctil optimizada (44x44px mínimo)
- Transiciones suaves entre estados
- Modo oscuro por defecto

## 🔮 Generación de Horóscopos

### Templates por Arquetipo
- **Predicciones** - Array de opciones divertidas
- **Consejos** - Advice específico para cada tipo
- **Emociones** - Estados en jerga Web3
- **Tokens** - Lista de tokens temáticos

### Mecánica de Generación
- Selección aleatoria de templates
- Fecha actual para contexto
- ID único por horóscopo
- Persistencia temporal en estado

## 🚦 Rutas y Navegación

### Rutas Web
- `/punk-horoscope` - Aplicación principal
- `/punk-horoscope?method=manual` - Selección directa
- `/punk-horoscope?method=quiz` - Test directo

### APIs
- `/api/frames/punk-horoscope` - Frame principal
- `/api/frames/punk-horoscope/image` - Generación de imágenes
- Parámetros: `view`, `archetype`, `action`, `index`

## 🛠️ Instalación y Desarrollo

### Requisitos Previos
- Node.js 18+
- Variables de entorno configuradas
- Base network configurado

### Variables de Entorno Necesarias
```env
NEXT_PUBLIC_URL=https://tu-dominio.com
NEXT_PUBLIC_ONCHAINKIT_API_KEY=tu-coinbase-api-key
# ... otras variables del proyecto kiwik
```

### Comandos de Desarrollo
```bash
# Instalar dependencias
bun install

# Desarrollo local
bun run dev

# Build de producción
bun run build

# Verificar tipos
bun run type-check
```

## 🔗 Integración con kiwik

La miniapp está integrada dentro del ecosistema kiwik:
- Usa la misma arquitectura Next.js
- Comparte componentes de UI base
- Utiliza el sistema de theming existente
- Mantiene consistencia con OnchainKit

## 📈 Futuras Mejoras

### V1.1 - Funcionalidades Pendientes
- [ ] Auto-detección basada en actividad Farcaster
- [ ] Persistencia de usuarios con wallet
- [ ] Histórico de horóscopos
- [ ] Sistema de logros/badges

### V1.2 - Gamificación
- [ ] NFT coleccionables por horóscopo
- [ ] Ranking de arquetipos más populares
- [ ] Compatibilidad social (amigos/seguidores)
- [ ] Integración con Zora para minteo

### V1.3 - API Pública
- [ ] Endpoint para bots de Farcaster
- [ ] Webhook para notificaciones diarias
- [ ] SDK para terceros
- [ ] Analytics y métricas

## 🎯 Casos de Uso

1. **Usuario Casual** - Descubre su arquetipo y comparte
2. **Crypto Native** - Horóscopo diario como ritual
3. **Community Builder** - Content para canales/DAOs
4. **Developer** - Inspiración para proyectos temáticos

## 🤝 Contribuciones

El proyecto está listo para contribuciones:
- Nuevos arquetipos o personalización
- Templates adicionales de horóscopos
- Mejoras en UI/UX
- Optimizaciones de performance

---

**Built with ❤️ for the Web3 community**
**Powered by Base • Farcaster • kiwik**