# 🔮 Punk Horoscope

**Horóscopos Web3 para arquetipos crypto** - Una miniapp de Farcaster que revoluciona los horóscopos tradicionales con 12 arquetipos únicos del ecosistema Web3.

![Punk Horoscope](https://verano-en-cadena-miniapp.vercel.app/api/frames/punk-horoscope/image?view=home)

## ✨ Características

- **12 Arquetipos Web3 únicos**: Desde The Maximalist hasta el Farcaster Maxi
- **Quiz interactivo**: 5 preguntas para descubrir tu arquetipo automáticamente
- **Selección manual**: Explora todos los arquetipos y elige el tuyo
- **Horóscopos dinámicos**: Predicciones, consejos, emociones y tokens de la suerte
- **Integración con Farcaster**: Comparte tu horóscopo como Frame
- **Built on Base**: Conecta tu wallet y disfruta de la experiencia Web3

## 🎭 Los 12 Arquetipos

| Arquetipo | Emoji | Personalidad |
|-----------|-------|--------------|
| **The Maximalist** | ₿ | Cree que todo lo no-BTC es scam. Hardcore. |
| **Airdrop Hunter** | 🪂 | Farmer profesional. Testnet warrior. |
| **DeFi DJ** | 🎧 | Remix de yields. APY composer. |
| **Rugged Dreamer** | 💎 | Ve 100x en cada proyecto. Eternal optimist. |
| **DAO Preacher** | 🗳️ | Governance is life. Power to the people. |
| **NFT Degen** | 🖼️ | Art collector meets speculation. |
| **Chain Hopper** | 🌉 | Multichain native. Bridge runner. |
| **Tech Prophet** | 🔬 | Cutting-edge tech explainer. |
| **Builder** | 🔨 | Crea, no especula. Ship everyday. |
| **Governance Nerd** | 📊 | Vote analysis expert. |
| **Lurker** | 👀 | Silent observer. Zen master. |
| **Farcaster Maxi** | 💜 | Social decentralization advocate. |

## 🚀 Demo

**Live App**: [https://verano-en-cadena-miniapp.vercel.app](https://verano-en-cadena-miniapp.vercel.app)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 con App Router
- **Blockchain**: Base L2 con OnchainKit
- **Wallet**: Wagmi v2 + Viem v2
- **Farcaster**: Frame SDK integration
- **Styling**: Tailwind CSS con tema personalizado
- **TypeScript**: Full type safety

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/ReneHdzGtz/verano-en-cadena-miniapp.git
cd verano-en-cadena-miniapp

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Iniciar desarrollo
npm run dev
```

## ⚙️ Variables de Entorno

```bash
# Requeridas
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_coinbase_api_key
NEXT_PUBLIC_URL=https://your-domain.vercel.app

# Opcionales para branding
NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME="Punk Horoscope"
NEXT_PUBLIC_APP_SUBTITLE="Horóscopos Web3 para arquetipos crypto"
NEXT_PUBLIC_APP_DESCRIPTION="Descubre tu arquetipo Web3 y obtén predicciones personalizadas"
```

## 🎯 Cómo Funciona

### 1. Selección de Arquetipo
- **Manual**: Explora los 12 arquetipos y selecciona tu favorito
- **Quiz**: Responde 5 preguntas sobre tu comportamiento Web3
- **Auto-detección**: _Próximamente_ - Análisis de actividad en Farcaster

### 2. Generación de Horóscopo
Cada horóscopo incluye:
- **🔮 Predicción**: Situación divertida e irónica del día
- **💡 Consejo Web3**: Guidance específico para tu arquetipo
- **🎭 Estado Emocional**: Tu mood crypto del momento
- **🪙 Token de la Suerte**: El token que podría traerte fortuna

### 3. Compartir en Farcaster
- Genera automáticamente un Frame para compartir
- Imagen personalizada con los colores de tu arquetipo
- Metadata optimizada para la experiencia social

## 🔧 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # ESLint
npm run type-check   # Verificación de TypeScript
```

## 📱 Farcaster Frame API

La app incluye endpoints para Frames:

- `GET /api/frames/punk-horoscope` - Frame principal
- `GET /api/frames/punk-horoscope/image` - Generación de imágenes dinámicas

## 🎨 Customización

### Arquetipos
Los arquetipos se definen en `/lib/data/archetypes.ts`. Cada uno incluye:
- Personalidad única
- Colores temáticos
- Traits específicos
- Templates de horóscopos

### Quiz
Las preguntas están en `/lib/data/quiz-questions.ts` con sistema de puntos para determinar el arquetipo resultante.

## 🤝 Contribuir

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/amazing-feature`)
3. Commit cambios (`git commit -m 'Add amazing feature'`)
4. Push a branch (`git push origin feature/amazing-feature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Créditos

- **Frutero Club** - Concepto y desarrollo
- **Base** - Blockchain infrastructure
- **Farcaster** - Social protocol
- **OnchainKit** - Web3 components

---

**¿Tu horóscopo crypto te espera! 🔮✨**

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ReneHdzGtz/verano-en-cadena-miniapp)