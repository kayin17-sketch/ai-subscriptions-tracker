# AI Subscriptions Tracker

Aplicación de escritorio que reside en la barra de tareas (system tray) para rastrear el uso y gasto de tus suscripciones de IA.

![Preview](preview.png)

## Características

- **System Tray**: Se ejecuta en segundo plano, accesible con un click
- **Multi-servicio**: Soporta OpenAI, Anthropic (Claude), Google Gemini, Midjourney y más
- **Gasto en tiempo real**: Muestra cuánto has gastado en cada servicio
- **Cuenta regresiva**: Días restantes hasta el reinicio mensual
- **Seguro**: Las API keys se almacenan localmente

## Servicios Soportados

| Servicio | Estado | Notas |
|----------|--------|-------|
| OpenAI | ✅ | ChatGPT, GPT-4, DALL-E |
| Anthropic | ✅ | Claude API |
| Google Gemini | ⚠️ | API limitada, requiere configuración manual |
| Midjourney | ⚠️ | Sin API pública, entrada manual |
| Perplexity | ⚠️ | Configuración manual |

## Instalación

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Clonar e instalar

```bash
git clone https://github.com/kayin17-sketch/ai-subscriptions-tracker.git
cd ai-subscriptions-tracker
npm install
```

### Desarrollo

```bash
npm run dev
```

### Build para producción

```bash
npm run build
```

Esto generará ejecutables en la carpeta `dist/` para tu sistema operativo.

## Uso

1. Al ejecutar la app, aparecerá un icono en la barra de tareas
2. Click en el icono para abrir el panel principal
3. Click en ⚙️ para configurar tus API keys
4. Introduce las claves de los servicios que uses
5. El gasto se actualizará automáticamente

## Configuración de APIs

### OpenAI
1. Ve a [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Crea una nueva clave
3. Pégala en la configuración de la app

### Anthropic
1. Ve a [Anthropic Console](https://console.anthropic.com/)
2. Crea una API key
3. Pégala en la configuración

### Google Gemini
1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crea una API key
3. Pégala en la configuración

## Tecnologías

- **Electron** - Framework de escritorio multiplataforma
- **React** - Interfaz de usuario
- **Vite** - Build tool
- **electron-store** - Almacenamiento local seguro
- **Axios** - Peticiones HTTP

## Estructura del Proyecto

```
ai-subscriptions-tracker/
├── electron/
│   ├── main.js        # Proceso principal de Electron
│   └── preload.js     # Bridge seguro entre main y renderer
├── src/
│   ├── components/
│   │   ├── SubscriptionCard.jsx
│   │   └── ConfigModal.jsx
│   ├── services/
│   │   ├── openai.js
│   │   ├── anthropic.js
│   │   ├── google.js
│   │   └── others.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── package.json
└── vite.config.js
```

## Seguridad

- Las API keys se almacenan localmente usando `electron-store`
- Las claves nunca se envían a servidores externos
- Solo se comunican directamente con las APIs oficiales

## Contribuir

1. Fork del repositorio
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

MIT

## Autor

Creado por [kayin17-sketch](https://github.com/kayin17-sketch)
