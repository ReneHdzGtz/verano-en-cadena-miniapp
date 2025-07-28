import { NextRequest, NextResponse } from 'next/server';
import { WEB3_ARCHETYPES, getArchetypeById } from '@/lib/data/archetypes';

// Farcaster Frame utilities
function getFrameHtmlResponse(params: {
  buttons: Array<{
    label: string;
    action: 'post' | 'link';
    target?: string;
  }>;
  image: {
    src: string;
    aspectRatio: string;
  };
  input?: {
    text: string;
  };
  postUrl: string;
}) {
  const { buttons, image, input, postUrl } = params;
  
  let html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Punk Horoscope Frame</title>
    <meta property="fc:frame" content="vNext">
    <meta property="fc:frame:image" content="${image.src}">
    <meta property="fc:frame:image:aspect_ratio" content="${image.aspectRatio}">
    <meta property="fc:frame:post_url" content="${postUrl}">`;

  if (input) {
    html += `\n    <meta property="fc:frame:input:text" content="${input.text}">`;
  }

  buttons.forEach((button, index) => {
    const buttonNumber = index + 1;
    html += `\n    <meta property="fc:frame:button:${buttonNumber}" content="${button.label}">`;
    if (button.action === 'link' && button.target) {
      html += `\n    <meta property="fc:frame:button:${buttonNumber}:action" content="link">`;
      html += `\n    <meta property="fc:frame:button:${buttonNumber}:target" content="${button.target}">`;
    } else if (button.action === 'post' && button.target) {
      html += `\n    <meta property="fc:frame:button:${buttonNumber}:action" content="post">`;
      html += `\n    <meta property="fc:frame:button:${buttonNumber}:target" content="${button.target}">`;
    }
  });

  html += `
</head>
<body>
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: system-ui;">
        <h1>🔮 Punk Horoscope</h1>
        <p>Discover your Web3 archetype and get personalized horoscopes!</p>
        <img src="${image.src}" alt="Punk Horoscope Frame" style="max-width: 100%; height: auto; border-radius: 8px;">
    </div>
</body>
</html>`;
  
  return html;
}

async function getResponse(req: NextRequest): Promise<NextResponse> {
  // For now, we'll create a simplified frame without message validation
  // In production, you'd want to implement proper frame message validation

  const searchParams = new URL(req.url).searchParams;
  const action = searchParams.get('action') || 'home';
  const archetypeId = searchParams.get('archetype');

  // Home frame
  if (action === 'home') {
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: '🎭 Selección Manual',
            action: 'post',
            target: `${process.env.NEXT_PUBLIC_URL}/api/frames/punk-horoscope?action=manual`
          },
          {
            label: '🧪 Test Personalidad', 
            action: 'post',
            target: `${process.env.NEXT_PUBLIC_URL}/api/frames/punk-horoscope?action=quiz`
          },
          {
            label: '🔮 Ver App Completa',
            action: 'link',
            target: `${process.env.NEXT_PUBLIC_URL}/punk-horoscope`
          }
        ],
        image: {
          src: `${process.env.NEXT_PUBLIC_URL}/api/frames/punk-horoscope/image?view=home`,
          aspectRatio: '1.91:1',
        },
        input: {
          text: 'Tu wallet address...',
        },
        postUrl: `${process.env.NEXT_PUBLIC_URL}/api/frames/punk-horoscope?action=home`,
      })
    );
  }

  // Manual selection frame
  if (action === 'manual') {
    const archetypes = Object.values(WEB3_ARCHETYPES);
    const currentIndex = parseInt(searchParams.get('index') || '0');
    const archetype = archetypes[currentIndex];

    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: '◀️ Anterior',
            action: 'post',
            target: `${process.env.NEXT_PUBLIC_URL}/api/frames/punk-horoscope?action=manual&index=${Math.max(0, currentIndex - 1)}`
          },
          {
            label: '🔮 Generar Horóscopo',
            action: 'post',
            target: `${process.env.NEXT_PUBLIC_URL}/api/frames/punk-horoscope?action=horoscope&archetype=${archetype.id}`
          },
          {
            label: 'Siguiente ▶️',
            action: 'post',
            target: `${process.env.NEXT_PUBLIC_URL}/api/frames/punk-horoscope?action=manual&index=${Math.min(archetypes.length - 1, currentIndex + 1)}`
          },
          {
            label: '🏠 Inicio',
            action: 'post',
            target: `${process.env.NEXT_PUBLIC_URL}/api/frames/punk-horoscope?action=home`
          }
        ],
        image: {
          src: `${process.env.NEXT_PUBLIC_URL}/api/frames/punk-horoscope/image?view=archetype&id=${archetype.id}`,
          aspectRatio: '1.91:1',
        },
        postUrl: `${process.env.NEXT_PUBLIC_URL}/api/frames/punk-horoscope?action=manual&index=${currentIndex}`,
      })
    );
  }

  // Quiz frame
  if (action === 'quiz') {
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: '🔮 Próximamente',
            action: 'post',
            target: `${process.env.NEXT_PUBLIC_URL}/api/frames/punk-horoscope?action=home`
          },
          {
            label: '🎭 Selección Manual',
            action: 'post',
            target: `${process.env.NEXT_PUBLIC_URL}/api/frames/punk-horoscope?action=manual`
          },
          {
            label: '📱 Usar App Completa',
            action: 'link',
            target: `${process.env.NEXT_PUBLIC_URL}/punk-horoscope`
          }
        ],
        image: {
          src: `${process.env.NEXT_PUBLIC_URL}/api/frames/punk-horoscope/image?view=quiz`,
          aspectRatio: '1.91:1',
        },
        postUrl: `${process.env.NEXT_PUBLIC_URL}/api/frames/punk-horoscope?action=quiz`,
      })
    );
  }

  // Horoscope generation frame
  if (action === 'horoscope' && archetypeId) {
    const archetype = getArchetypeById(archetypeId);
    if (!archetype) {
      return new NextResponse('Archetype not found', { status: 404 });
    }

    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: '🔄 Nuevo Horóscopo',
            action: 'post',
            target: `${process.env.NEXT_PUBLIC_URL}/api/frames/punk-horoscope?action=horoscope&archetype=${archetypeId}`
          },
          {
            label: '🎭 Cambiar Arquetipo',
            action: 'post',
            target: `${process.env.NEXT_PUBLIC_URL}/api/frames/punk-horoscope?action=manual`
          },
          {
            label: '📱 App Completa',
            action: 'link',
            target: `${process.env.NEXT_PUBLIC_URL}/punk-horoscope`
          }
        ],
        image: {
          src: `${process.env.NEXT_PUBLIC_URL}/api/frames/punk-horoscope/image?view=horoscope&archetype=${archetypeId}&t=${Date.now()}`,
          aspectRatio: '1.91:1',
        },
        postUrl: `${process.env.NEXT_PUBLIC_URL}/api/frames/punk-horoscope?action=horoscope&archetype=${archetypeId}`,
      })
    );
  }

  // Default fallback
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: '🔮 Comenzar',
          action: 'post',
          target: `${process.env.NEXT_PUBLIC_URL}/api/frames/punk-horoscope?action=home`
        }
      ],
      image: {
        src: `${process.env.NEXT_PUBLIC_URL}/api/frames/punk-horoscope/image?view=home`,
        aspectRatio: '1.91:1',
      },
      postUrl: `${process.env.NEXT_PUBLIC_URL}/api/frames/punk-horoscope?action=home`,
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export async function GET(req: NextRequest): Promise<Response> {
  return getResponse(req);
}