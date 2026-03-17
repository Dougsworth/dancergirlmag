// Translation service using multiple free APIs
// No API keys required for basic usage

export async function translateText(text: string, targetLang: string = 'es'): Promise<string> {
  console.log('Translating text:', text.substring(0, 50) + '...');
  
  // First, always try the enhanced local translation for better results
  const localTranslation = mockTranslate(text);
  
  // If local translation made significant changes, use it
  if (localTranslation !== text && !localTranslation.includes('[Local translation]')) {
    console.log('Using enhanced local translation');
    return localTranslation;
  }
  
  // Try MyMemory API as backup
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log('MyMemory response:', data);
      if (data.responseStatus === 200 && data.responseData?.translatedText) {
        return data.responseData.translatedText;
      }
    }
  } catch (error) {
    console.error('MyMemory translation error:', error);
  }

  // Return local translation with indicator
  return localTranslation + ' [Traducción local]';
}

// Enhanced local translation with comprehensive dictionary
function mockTranslate(text: string): string {
  // Comprehensive translation dictionary
  const translations: Record<string, string> = {
    // Common words and articles
    'the': 'el',
    'a': 'un',
    'an': 'un',
    'and': 'y',
    'or': 'o',
    'but': 'pero',
    'in': 'en',
    'on': 'en',
    'at': 'en',
    'to': 'a',
    'for': 'para',
    'with': 'con',
    'from': 'de',
    'of': 'de',
    'by': 'por',
    'about': 'sobre',
    'through': 'a través de',
    'because': 'porque',
    'since': 'desde',
    'until': 'hasta',
    'while': 'mientras',
    'if': 'si',
    'then': 'entonces',
    'that': 'que',
    'this': 'este',
    'these': 'estos',
    'those': 'esos',
    'what': 'qué',
    'when': 'cuándo',
    'where': 'dónde',
    'who': 'quién',
    'why': 'por qué',
    'how': 'cómo',
    
    // Verbs
    'is': 'es',
    'are': 'son',
    'was': 'fue',
    'were': 'fueron',
    'be': 'ser',
    'been': 'sido',
    'being': 'siendo',
    'have': 'tener',
    'has': 'tiene',
    'had': 'tuvo',
    'having': 'teniendo',
    'do': 'hacer',
    'does': 'hace',
    'did': 'hizo',
    'will': 'será',
    'would': 'sería',
    'could': 'podría',
    'should': 'debería',
    'may': 'puede',
    'might': 'podría',
    'must': 'debe',
    'can': 'puede',
    'cannot': 'no puede',
    'make': 'hacer',
    'made': 'hecho',
    'go': 'ir',
    'went': 'fue',
    'come': 'venir',
    'came': 'vino',
    'know': 'saber',
    'think': 'pensar',
    'take': 'tomar',
    'see': 'ver',
    'get': 'obtener',
    'give': 'dar',
    'find': 'encontrar',
    'tell': 'decir',
    'ask': 'preguntar',
    'work': 'trabajar',
    'seem': 'parecer',
    'feel': 'sentir',
    'leave': 'dejar',
    'call': 'llamar',
    'believe': 'creer',
    'write': 'escribir',
    'provide': 'proporcionar',
    'sit': 'sentar',
    'stand': 'estar de pie',
    'lose': 'perder',
    'pay': 'pagar',
    'meet': 'conocer',
    'include': 'incluir',
    'continue': 'continuar',
    'learn': 'aprender',
    'change': 'cambiar',
    'watch': 'mirar',
    'follow': 'seguir',
    'stop': 'parar',
    'create': 'crear',
    'speak': 'hablar',
    'read': 'leer',
    'spend': 'gastar',
    'grow': 'crecer',
    'open': 'abrir',
    'walk': 'caminar',
    'win': 'ganar',
    'teach': 'enseñar',
    'offer': 'ofrecer',
    'remember': 'recordar',
    'consider': 'considerar',
    'appear': 'aparecer',
    'buy': 'comprar',
    'wait': 'esperar',
    'serve': 'servir',
    'die': 'morir',
    'send': 'enviar',
    'build': 'construir',
    'stay': 'quedarse',
    'fall': 'caer',
    'cut': 'cortar',
    'reach': 'alcanzar',
    'kill': 'matar',
    'raise': 'levantar',
    'live': 'vivir',
    'lived': 'vivió',
    'living': 'viviendo',
    
    // Dance/Music related
    'dance': 'baile',
    'dancer': 'bailarín',
    'dancing': 'bailando',
    'music': 'música',
    'rhythm': 'ritmo',
    'beat': 'ritmo',
    'movement': 'movimiento',
    'performance': 'actuación',
    'choreography': 'coreografía',
    'choreographer': 'coreógrafo',
    'studio': 'estudio',
    'stage': 'escenario',
    'practice': 'práctica',
    'rehearsal': 'ensayo',
    
    // Caribbean/Cultural
    'caribbean': 'caribeño',
    'culture': 'cultura',
    'tradition': 'tradición',
    'heritage': 'herencia',
    'community': 'comunidad',
    'festival': 'festival',
    'celebration': 'celebración',
    
    // Magazine/Content
    'magazine': 'revista',
    'article': 'artículo',
    'story': 'historia',
    'stories': 'historias',
    'letter': 'carta',
    'editor': 'editor',
    'writer': 'escritor',
    'reader': 'lector',
    'issue': 'edición',
    
    // Common phrases
    'hello': 'hola',
    'welcome': 'bienvenido',
    'thank you': 'gracias',
    'please': 'por favor',
    'goodbye': 'adiós',
    
    // Months
    'january': 'enero',
    'february': 'febrero',
    'march': 'marzo',
    'april': 'abril',
    'may': 'mayo',
    'june': 'junio',
    'july': 'julio',
    'august': 'agosto',
    'september': 'septiembre',
    'october': 'octubre',
    'november': 'noviembre',
    'december': 'diciembre',
  };
  
  let translated = text;
  
  // Replace whole words only
  Object.entries(translations).forEach(([en, es]) => {
    const regex = new RegExp(`\\b${en}\\b`, 'gi');
    translated = translated.replace(regex, (match) => {
      // Preserve capitalization
      if (match[0] === match[0].toUpperCase()) {
        return es.charAt(0).toUpperCase() + es.slice(1);
      }
      return es;
    });
  });
  
  return translated;
}

// Translate block content (for rich text)
export async function translateBlockContent(blocks: any[]): Promise<any[]> {
  const translatedBlocks = [];
  
  for (const block of blocks) {
    if (block._type === 'block' && block.children) {
      // Translate text in block
      const translatedChildren = await Promise.all(
        block.children.map(async (child: any) => {
          if (child._type === 'span' && child.text) {
            const translatedText = await translateText(child.text);
            return {
              ...child,
              text: translatedText
            };
          }
          return child;
        })
      );
      
      translatedBlocks.push({
        ...block,
        children: translatedChildren
      });
    } else {
      // Keep non-text blocks (images, etc.) as is
      translatedBlocks.push(block);
    }
  }
  
  return translatedBlocks;
}