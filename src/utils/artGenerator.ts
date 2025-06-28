import { Mood, ArtStyle, ColorPalette, ArtPiece } from '../types';

export const moodPalettes: Record<Mood, ColorPalette> = {
  happy: {
    primary: '#FFD700',
    secondary: '#FF6B6B',
    accent: '#4ECDC4',
    background: 'linear-gradient(135deg, #FFD700 0%, #FF6B6B 100%)'
  },
  calm: {
    primary: '#87CEEB',
    secondary: '#98D8C8',
    accent: '#E6F3FF',
    background: 'linear-gradient(135deg, #87CEEB 0%, #98D8C8 100%)'
  },
  energetic: {
    primary: '#FF4500',
    secondary: '#FF8C00',
    accent: '#FFD700',
    background: 'linear-gradient(135deg, #FF4500 0%, #FF8C00 100%)'
  },
  mysterious: {
    primary: '#4B0082',
    secondary: '#2E0249',
    accent: '#8A2BE2',
    background: 'linear-gradient(135deg, #4B0082 0%, #2E0249 100%)'
  },
  melancholic: {
    primary: '#708090',
    secondary: '#2F4F4F',
    accent: '#B0C4DE',
    background: 'linear-gradient(135deg, #708090 0%, #2F4F4F 100%)'
  },
  excited: {
    primary: '#FF1493',
    secondary: '#FF69B4',
    accent: '#FFB6C1',
    background: 'linear-gradient(135deg, #FF1493 0%, #FF69B4 100%)'
  },
  adventurous: {
    primary: '#32CD32',
    secondary: '#228B22',
    accent: '#90EE90',
    background: 'linear-gradient(135deg, #32CD32 0%, #228B22 100%)'
  },
  dreamy: {
    primary: '#DDA0DD',
    secondary: '#9370DB',
    accent: '#E6E6FA',
    background: 'linear-gradient(135deg, #DDA0DD 0%, #9370DB 100%)'
  }
};

export const generateArt = async (mood: Mood, style: ArtStyle, customPrompt?: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
  
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  
  const palette = moodPalettes[mood];
  
  // Create beautiful gradient backgrounds
  const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 400);
  
  switch (mood) {
    case 'happy':
      gradient.addColorStop(0, '#FFE066');
      gradient.addColorStop(0.5, '#FF6B9D');
      gradient.addColorStop(1, '#4ECDC4');
      break;
    case 'calm':
      gradient.addColorStop(0, '#E3F2FD');
      gradient.addColorStop(0.5, '#81C784');
      gradient.addColorStop(1, '#4FC3F7');
      break;
    case 'energetic':
      gradient.addColorStop(0, '#FF5722');
      gradient.addColorStop(0.5, '#FF9800');
      gradient.addColorStop(1, '#FFC107');
      break;
    case 'mysterious':
      gradient.addColorStop(0, '#1A237E');
      gradient.addColorStop(0.5, '#512DA8');
      gradient.addColorStop(1, '#7B1FA2');
      break;
    case 'melancholic':
      gradient.addColorStop(0, '#90A4AE');
      gradient.addColorStop(0.5, '#607D8B');
      gradient.addColorStop(1, '#455A64');
      break;
    case 'excited':
      gradient.addColorStop(0, '#E91E63');
      gradient.addColorStop(0.5, '#FF5722');
      gradient.addColorStop(1, '#FF9800');
      break;
    case 'adventurous':
      gradient.addColorStop(0, '#4CAF50');
      gradient.addColorStop(0.5, '#8BC34A');
      gradient.addColorStop(1, '#CDDC39');
      break;
    case 'dreamy':
      gradient.addColorStop(0, '#E1BEE7');
      gradient.addColorStop(0.5, '#CE93D8');
      gradient.addColorStop(1, '#BA68C8');
      break;
  }
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Generate art based on style with improved visuals
  switch (style) {
    case 'abstract':
      generateModernAbstract(ctx, palette, canvas.width, canvas.height, mood);
      break;
    case 'impressionist':
      generateDigitalImpressionist(ctx, palette, canvas.width, canvas.height, mood);
      break;
    case 'minimalist':
      generateCleanMinimalist(ctx, palette, canvas.width, canvas.height, mood);
      break;
    case 'surreal':
      generateDreamySurreal(ctx, palette, canvas.width, canvas.height, mood);
      break;
    case 'pixel':
      generateModernPixel(ctx, palette, canvas.width, canvas.height, mood);
      break;
    case 'watercolor':
      generateDigitalWatercolor(ctx, palette, canvas.width, canvas.height, mood);
      break;
    case 'geometric':
      generateModernGeometric(ctx, palette, canvas.width, canvas.height, mood);
      break;
    case 'cosmic':
      generateSpaceArt(ctx, palette, canvas.width, canvas.height, mood);
      break;
    case 'neon':
      generateNeonArt(ctx, palette, canvas.width, canvas.height, mood);
      break;
    case 'vintage':
      generateVintageArt(ctx, palette, canvas.width, canvas.height, mood);
      break;
  }
  
  return canvas.toDataURL();
};

const generateModernAbstract = (ctx: CanvasRenderingContext2D, palette: ColorPalette, width: number, height: number, mood: Mood) => {
  // Create flowing abstract shapes
  for (let i = 0; i < 8; i++) {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, palette.primary + '80');
    gradient.addColorStop(1, palette.secondary + '60');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    
    const centerX = Math.random() * width;
    const centerY = Math.random() * height;
    const radius = Math.random() * 150 + 50;
    
    for (let j = 0; j < 20; j++) {
      const angle = (j / 20) * Math.PI * 2;
      const r = radius * (0.7 + Math.sin(j * 0.5) * 0.3);
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      
      if (j === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    
    ctx.closePath();
    ctx.fill();
  }
  
  // Add texture overlay
  addTextureOverlay(ctx, width, height, mood);
};

const generateDigitalImpressionist = (ctx: CanvasRenderingContext2D, palette: ColorPalette, width: number, height: number, mood: Mood) => {
  // Create impressionist brush strokes
  const colors = [palette.primary, palette.secondary, palette.accent];
  
  for (let i = 0; i < 200; i++) {
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)] + '60';
    
    const x = Math.random() * width;
    const y = Math.random() * height;
    const w = Math.random() * 30 + 10;
    const h = Math.random() * 8 + 3;
    const angle = Math.random() * Math.PI;
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillRect(-w/2, -h/2, w, h);
    ctx.restore();
  }
  
  addTextureOverlay(ctx, width, height, mood);
};

const generateCleanMinimalist = (ctx: CanvasRenderingContext2D, palette: ColorPalette, width: number, height: number, mood: Mood) => {
  // Clean geometric shapes
  ctx.fillStyle = palette.primary + 'CC';
  ctx.fillRect(width * 0.1, height * 0.3, width * 0.8, height * 0.05);
  
  ctx.fillStyle = palette.secondary + 'CC';
  ctx.beginPath();
  ctx.arc(width * 0.3, height * 0.6, width * 0.08, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = palette.accent + 'CC';
  ctx.fillRect(width * 0.5, height * 0.7, width * 0.4, height * 0.03);
  
  // Add subtle shadow effects
  ctx.shadowColor = 'rgba(0,0,0,0.2)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  
  addTextureOverlay(ctx, width, height, mood);
};

const generateDreamySurreal = (ctx: CanvasRenderingContext2D, palette: ColorPalette, width: number, height: number, mood: Mood) => {
  // Floating dream-like elements
  for (let i = 0; i < 6; i++) {
    const gradient = ctx.createRadialGradient(
      width * Math.random(), height * Math.random(), 0,
      width * Math.random(), height * Math.random(), 100
    );
    gradient.addColorStop(0, palette.primary + '80');
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(width * Math.random(), height * Math.random(), Math.random() * 80 + 40, 0, Math.PI * 2);
    ctx.fill();
  }
  
  addTextureOverlay(ctx, width, height, mood);
};

const generateModernPixel = (ctx: CanvasRenderingContext2D, palette: ColorPalette, width: number, height: number, mood: Mood) => {
  const pixelSize = 16;
  const colors = [palette.primary, palette.secondary, palette.accent];
  
  // Create pixel pattern
  for (let x = 0; x < width; x += pixelSize) {
    for (let y = 0; y < height; y += pixelSize) {
      if (Math.random() > 0.6) {
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillRect(x, y, pixelSize, pixelSize);
        
        // Add pixel glow effect
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 5;
        ctx.fillRect(x, y, pixelSize, pixelSize);
        ctx.shadowBlur = 0;
      }
    }
  }
  
  addTextureOverlay(ctx, width, height, mood);
};

const generateDigitalWatercolor = (ctx: CanvasRenderingContext2D, palette: ColorPalette, width: number, height: number, mood: Mood) => {
  // Watercolor blending effect
  for (let i = 0; i < 12; i++) {
    const gradient = ctx.createRadialGradient(
      width * Math.random(), height * Math.random(), 0,
      width * Math.random(), height * Math.random(), Math.random() * 150 + 50
    );
    
    gradient.addColorStop(0, palette.primary + '40');
    gradient.addColorStop(0.5, palette.secondary + '30');
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(width * Math.random(), height * Math.random(), Math.random() * 120 + 60, 0, Math.PI * 2);
    ctx.fill();
  }
  
  addTextureOverlay(ctx, width, height, mood);
};

const generateModernGeometric = (ctx: CanvasRenderingContext2D, palette: ColorPalette, width: number, height: number, mood: Mood) => {
  const colors = [palette.primary, palette.secondary, palette.accent];
  
  // Create geometric patterns
  for (let i = 0; i < 12; i++) {
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)] + 'AA';
    
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 80 + 40;
    
    const shapeType = Math.floor(Math.random() * 4);
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.random() * Math.PI);
    
    switch (shapeType) {
      case 0: // Triangle
        ctx.beginPath();
        ctx.moveTo(0, -size/2);
        ctx.lineTo(-size/2, size/2);
        ctx.lineTo(size/2, size/2);
        ctx.closePath();
        ctx.fill();
        break;
      case 1: // Square
        ctx.fillRect(-size/2, -size/2, size, size);
        break;
      case 2: // Circle
        ctx.beginPath();
        ctx.arc(0, 0, size/2, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 3: // Diamond
        ctx.beginPath();
        ctx.moveTo(0, -size/2);
        ctx.lineTo(size/2, 0);
        ctx.lineTo(0, size/2);
        ctx.lineTo(-size/2, 0);
        ctx.closePath();
        ctx.fill();
        break;
    }
    
    ctx.restore();
  }
  
  addTextureOverlay(ctx, width, height, mood);
};

const generateSpaceArt = (ctx: CanvasRenderingContext2D, palette: ColorPalette, width: number, height: number, mood: Mood) => {
  // Space background
  const spaceGradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/2);
  spaceGradient.addColorStop(0, '#0a0a2e');
  spaceGradient.addColorStop(0.5, '#16213e');
  spaceGradient.addColorStop(1, '#0f0f23');
  
  ctx.fillStyle = spaceGradient;
  ctx.fillRect(0, 0, width, height);
  
  // Stars
  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < 150; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 3 + 1;
    
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    
    // Add twinkle effect
    if (Math.random() > 0.8) {
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }
  
  // Nebula effects
  for (let i = 0; i < 5; i++) {
    const nebula = ctx.createRadialGradient(
      width * Math.random(), height * Math.random(), 0,
      width * Math.random(), height * Math.random(), Math.random() * 200 + 100
    );
    
    nebula.addColorStop(0, palette.primary + '60');
    nebula.addColorStop(0.5, palette.secondary + '40');
    nebula.addColorStop(1, 'transparent');
    
    ctx.fillStyle = nebula;
    ctx.beginPath();
    ctx.arc(width * Math.random(), height * Math.random(), Math.random() * 150 + 75, 0, Math.PI * 2);
    ctx.fill();
  }
  
  addTextureOverlay(ctx, width, height, mood);
};

const generateNeonArt = (ctx: CanvasRenderingContext2D, palette: ColorPalette, width: number, height: number, mood: Mood) => {
  // Dark background
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, width, height);
  
  // Neon lines and shapes
  const colors = [palette.primary, palette.secondary, palette.accent];
  
  for (let i = 0; i < 8; i++) {
    ctx.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.lineWidth = Math.random() * 8 + 4;
    ctx.shadowColor = ctx.strokeStyle;
    ctx.shadowBlur = 20;
    
    ctx.beginPath();
    const startX = Math.random() * width;
    const startY = Math.random() * height;
    const endX = Math.random() * width;
    const endY = Math.random() * height;
    
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(
      (startX + endX) / 2 + (Math.random() - 0.5) * 200,
      (startY + endY) / 2 + (Math.random() - 0.5) * 200,
      endX, endY
    );
    ctx.stroke();
  }
  
  ctx.shadowBlur = 0;
  addTextureOverlay(ctx, width, height, mood);
};

const generateVintageArt = (ctx: CanvasRenderingContext2D, palette: ColorPalette, width: number, height: number, mood: Mood) => {
  // Vintage paper texture
  ctx.fillStyle = '#f4f1e8';
  ctx.fillRect(0, 0, width, height);
  
  // Add vintage stains
  for (let i = 0; i < 20; i++) {
    ctx.fillStyle = `rgba(139, 119, 101, ${Math.random() * 0.3})`;
    ctx.beginPath();
    ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 50 + 20, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Vintage art elements
  const vintageColors = [
    '#8B7765', '#A0826D', '#B8956A', '#C9A96E'
  ];
  
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = vintageColors[Math.floor(Math.random() * vintageColors.length)] + 'CC';
    
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 100 + 50;
    
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  addTextureOverlay(ctx, width, height, mood);
};

const addTextureOverlay = (ctx: CanvasRenderingContext2D, width: number, height: number, mood: Mood) => {
  // Add subtle texture based on mood
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 20;
    data[i] += noise;     // Red
    data[i + 1] += noise; // Green
    data[i + 2] += noise; // Blue
  }
  
  ctx.putImageData(imageData, 0, 0);
};

export const createArtPiece = (mood: Mood, style: ArtStyle, imageData: string, customPrompt?: string): ArtPiece => {
  const prompt = customPrompt || `A beautiful ${style} artwork expressing ${mood} emotions`;
  
  return {
    id: Date.now().toString(),
    mood,
    style,
    palette: moodPalettes[mood],
    prompt,
    createdAt: new Date(),
    imageData
  };
};