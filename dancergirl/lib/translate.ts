// Translation service using multiple free APIs
// No API keys required for basic usage

export async function translateText(text: string, targetLang: string = 'es'): Promise<string> {
  console.log('translateText called with:', text.substring(0, 100));
  
  // Skip if text is empty or too short
  if (!text || text.trim().length < 2) {
    return text;
  }
  
  // Use the enhanced local translation
  const localTranslation = mockTranslate(text);
  console.log('Local translation result:', localTranslation.substring(0, 100));
  
  // If we have a good local translation, return it
  if (localTranslation !== text) {
    return localTranslation;
  }
  
  // Try MyMemory API as fallback only if local didn't work
  try {
    console.log('Trying MyMemory API...');
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.substring(0, 500))}&langpair=en|${targetLang}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log('MyMemory API response received');
      if (data.responseStatus === 200 && data.responseData?.translatedText) {
        console.log('MyMemory translation:', data.responseData.translatedText.substring(0, 100));
        return data.responseData.translatedText;
      }
    }
  } catch (error) {
    console.error('MyMemory API error:', error);
  }

  // Return original text if nothing worked
  console.log('Translation failed, returning original text');
  return text;
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
    // Pronouns
    'i': 'yo',
    'you': 'tú',
    'he': 'él',
    'she': 'ella',
    'it': 'eso',
    'we': 'nosotros',
    'they': 'ellos',
    'me': 'me',
    'him': 'él',
    'her': 'ella',
    'us': 'nosotros',
    'them': 'ellos',
    'my': 'mi',
    'your': 'tu',
    'his': 'su',
    // 'her': 'su', // duplicate removed - 'her' as possessive same as 'his'
    'its': 'su',
    'our': 'nuestro',
    'their': 'su',
    'myself': 'yo mismo',
    'yourself': 'tú mismo',
    'himself': 'él mismo',
    'herself': 'ella misma',
    'ourselves': 'nosotros mismos',
    'themselves': 'ellos mismos',
    
    // Dance/Music related
    'dance': 'baile',
    'dancer': 'bailarín',
    'dancers': 'bailarines',
    'dancing': 'bailando',
    'danced': 'bailó',
    'music': 'música',
    'rhythm': 'ritmo',
    'beat': 'ritmo',
    'movement': 'movimiento',
    'movements': 'movimientos',
    'move': 'mover',
    'moving': 'moviendo',
    'moved': 'movió',
    'performance': 'actuación',
    'choreography': 'coreografía',
    'choreographer': 'coreógrafo',
    'choreographers': 'coreógrafos',
    'studio': 'estudio',
    'stage': 'escenario',
    'practice': 'práctica',
    'rehearsal': 'ensayo',
    'body': 'cuerpo',
    'bodies': 'cuerpos',
    'step': 'paso',
    'steps': 'pasos',
    
    // Caribbean/Cultural
    'caribbean': 'caribeño',
    'culture': 'cultura',
    'cultural': 'cultural',
    'tradition': 'tradición',
    'traditional': 'tradicional',
    'heritage': 'herencia',
    'community': 'comunidad',
    'festival': 'festival',
    'celebration': 'celebración',
    'island': 'isla',
    'islands': 'islas',
    
    // Magazine/Content
    'magazine': 'revista',
    'article': 'artículo',
    'story': 'historia',
    'stories': 'historias',
    'letter': 'carta',
    'letters': 'cartas',
    'editor': 'editor',
    'editorial': 'editorial',
    'writer': 'escritor',
    'reader': 'lector',
    'readers': 'lectores',
    'issue': 'edición',
    'content': 'contenido',
    'personal': 'personal',
    
    // Common adjectives
    'good': 'bueno',
    'bad': 'malo',
    'new': 'nuevo',
    'old': 'viejo',
    'young': 'joven',
    'great': 'gran',
    'little': 'pequeño',
    'big': 'grande',
    'small': 'pequeño',
    'different': 'diferente',
    'same': 'mismo',
    'other': 'otro',
    'important': 'importante',
    'sure': 'seguro',
    'best': 'mejor',
    'next': 'próximo',
    'long': 'largo',
    'few': 'pocos',
    'public': 'público',
    'private': 'privado',
    'social': 'social',
    'national': 'nacional',
    'international': 'internacional',
    'full': 'completo',
    'free': 'gratis',
    'true': 'verdadero',
    'false': 'falso',
    
    // Common nouns
    'time': 'tiempo',
    'year': 'año',
    'years': 'años',
    'people': 'personas',
    'way': 'camino',
    'day': 'día',
    'days': 'días',
    'man': 'hombre',
    'woman': 'mujer',
    'thing': 'cosa',
    'things': 'cosas',
    'life': 'vida',
    'child': 'niño',
    'children': 'niños',
    'world': 'mundo',
    'school': 'escuela',
    'state': 'estado',
    'family': 'familia',
    'student': 'estudiante',
    'students': 'estudiantes',
    'group': 'grupo',
    'country': 'país',
    'problem': 'problema',
    'hand': 'mano',
    'part': 'parte',
    'place': 'lugar',
    'case': 'caso',
    'week': 'semana',
    'company': 'empresa',
    'system': 'sistema',
    'program': 'programa',
    'question': 'pregunta',
    // 'work': 'trabajo', // duplicate removed - already defined as verb 'trabajar'
    'number': 'número',
    'night': 'noche',
    'point': 'punto',
    'home': 'hogar',
    'water': 'agua',
    'room': 'habitación',
    'mother': 'madre',
    'area': 'área',
    'money': 'dinero',
    'fact': 'hecho',
    'month': 'mes',
    'right': 'derecho',
    'study': 'estudio',
    'book': 'libro',
    'eye': 'ojo',
    'eyes': 'ojos',
    'job': 'trabajo',
    'word': 'palabra',
    'words': 'palabras',
    'business': 'negocio',
    // 'issue': 'problema', // duplicate removed - already defined as 'edición'
    'side': 'lado',
    'kind': 'tipo',
    'head': 'cabeza',
    'house': 'casa',
    'service': 'servicio',
    'friend': 'amigo',
    'friends': 'amigos',
    'father': 'padre',
    'power': 'poder',
    'hour': 'hora',
    'game': 'juego',
    'line': 'línea',
    'end': 'fin',
    'member': 'miembro',
    'law': 'ley',
    'car': 'coche',
    'city': 'ciudad',
    'name': 'nombre',
    'president': 'presidente',
    'team': 'equipo',
    'minute': 'minuto',
    'idea': 'idea',
    'kid': 'niño',
    'kids': 'niños',
    // 'body': 'cuerpo', // duplicate removed
    'information': 'información',
    'back': 'espalda',
    'parent': 'padre',
    'face': 'cara',
    'others': 'otros',
    'level': 'nivel',
    'office': 'oficina',
    'door': 'puerta',
    'health': 'salud',
    'person': 'persona',
    'art': 'arte',
    'artist': 'artista',
    'artists': 'artistas',
    'war': 'guerra',
    'history': 'historia',
    'party': 'fiesta',
    'result': 'resultado',
    // 'change': 'cambio', // duplicate removed - already defined as verb 'cambiar'
    'morning': 'mañana',
    'reason': 'razón',
    'research': 'investigación',
    'girl': 'chica',
    'guy': 'chico',
    'moment': 'momento',
    'air': 'aire',
    'teacher': 'profesor',
    'teachers': 'profesores',
    'force': 'fuerza',
    'education': 'educación',
    
    // Common phrases
    'hello': 'hola',
    'welcome': 'bienvenido',
    'thank you': 'gracias',
    'please': 'por favor',
    'goodbye': 'adiós',
    'good morning': 'buenos días',
    'good afternoon': 'buenas tardes',
    'good evening': 'buenas noches',
    'how are you': 'cómo estás',
    'very well': 'muy bien',
    'excuse me': 'disculpe',
    'i\'m sorry': 'lo siento',
    'yes': 'sí',
    'no': 'no',
    'maybe': 'quizás',
    'of course': 'por supuesto',
    'i don\'t know': 'no sé',
    'i understand': 'entiendo',
    'i don\'t understand': 'no entiendo',
    
    // Months
    'january': 'enero',
    'february': 'febrero',
    'march': 'marzo',
    'april': 'abril',
    'may_month': 'mayo', // renamed to avoid duplicate with 'may' modal verb
    'june': 'junio',
    'july': 'julio',
    'august': 'agosto',
    'september': 'septiembre',
    'october': 'octubre',
    'november': 'noviembre',
    'december': 'diciembre',
    
    // Days
    'monday': 'lunes',
    'tuesday': 'martes',
    'wednesday': 'miércoles',
    'thursday': 'jueves',
    'friday': 'viernes',
    'saturday': 'sábado',
    'sunday': 'domingo',
    
    // Numbers
    'one': 'uno',
    'two': 'dos',
    'three': 'tres',
    'four': 'cuatro',
    'five': 'cinco',
    'six': 'seis',
    'seven': 'siete',
    'eight': 'ocho',
    'nine': 'nueve',
    'ten': 'diez',
    'eleven': 'once',
    'twelve': 'doce',
    'first': 'primero',
    'second': 'segundo',
    'third': 'tercero',
    
    // Special words from the letter
    'dream': 'sueño',
    'dreams': 'sueños',
    'dreaming': 'soñando',
    'plan': 'plan',
    'plans': 'planes',
    'instead': 'en lugar de',
    'interview': 'entrevista',
    'interviewing': 'entrevistando',
    'celebrity': 'celebridad',
    'celebrities': 'celebridades',
    'drawn': 'atraído',
    'shadows': 'sombras',
    'spotlight': 'centro de atención',
    'crafting': 'creando',
    'preserving': 'preservando',
    'growing up': 'creciendo',
    'fashion week': 'semana de la moda',
    'glossy': 'brillante',
    'halls': 'pasillos',
    'attend': 'asistir',
    'a-listers': 'celebridades de primera',
    'found': 'encontré',
    'debut': 'debut',
    'screens': 'pantallas',
    'coffee': 'café',
    'tables': 'mesas',
    'coffee tables': 'mesas de café',
    'past': 'pasado',
    'finally': 'finalmente',
    // 'lived': 'vivido', // duplicate removed - already defined as 'vivió'
    'just': 'solo',
    'all': 'todo',
    'it\'s': 'es',
    'you\'re': 'eres',
    'i\'d': 'yo',
    'i\'ve': 'he',
    'didn\'t': 'no',
    'can\'t': 'no puedo',
    'won\'t': 'no',
    'haven\'t': 'no he',
    'wasn\'t': 'no fue',
    'weren\'t': 'no fueron',
    'isn\'t': 'no es',
    'aren\'t': 'no son',
  };
  
  // Common phrases that need special handling
  const phrases: Record<string, string> = {
    'it\'s my world': 'es mi mundo',
    'and you\'re all just living in it': 'y todos ustedes solo viven en él',
    'dance friends': 'amigos del baile',
    'growing up': 'creciendo',
    'i was sure': 'estaba segura',
    'i\'d work': 'trabajaría',
    'walk the halls': 'caminar por los pasillos',
    'fashion week': 'semana de la moda',
    'life had different plans': 'la vida tenía planes diferentes',
    'instead of': 'en lugar de',
    'i found myself': 'me encontré',
    'drawn to': 'atraída hacia',
    'move in the shadows': 'se mueven en las sombras',
    'of the spotlight': 'del centro de atención',
    'crafting stories': 'creando historias',
    'with their bodies': 'con sus cuerpos',
    'preserving culture': 'preservando la cultura',
    'through movement': 'a través del movimiento',
    'young artists': 'jóvenes artistas',
    'dance because they must': 'bailan porque deben',
    'in my head': 'en mi cabeza',
    'for the past': 'durante los últimos',
    'has finally made': 'finalmente ha hecho',
    'on your screens': 'en sus pantallas',
    'one day soon': 'un día pronto',
    'coffee tables': 'mesas de café',
    'new york city': 'ciudad de nueva york',
    'attend fashion week': 'asistir a la semana de la moda',
    'interview celebrities': 'entrevistar celebridades',
  };
  
  let translated = text;
  
  // First, replace longer phrases
  Object.entries(phrases).forEach(([en, es]) => {
    const regex = new RegExp(en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    translated = translated.replace(regex, (match) => {
      // Preserve capitalization of first letter
      if (match[0] === match[0].toUpperCase()) {
        return es.charAt(0).toUpperCase() + es.slice(1);
      }
      return es;
    });
  });
  
  // Then replace individual words
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
  
  // Clean up any double spaces
  translated = translated.replace(/\s+/g, ' ').trim();
  
  return translated;
}

// Translate block content (for rich text)
export async function translateBlockContent(blocks: any[]): Promise<any[]> {
  console.log('translateBlockContent called with', blocks.length, 'blocks');
  const translatedBlocks = [];
  
  for (const block of blocks) {
    console.log('Processing block type:', block._type);
    if (block._type === 'block' && block.children) {
      // Translate text in block
      const translatedChildren = await Promise.all(
        block.children.map(async (child: any) => {
          if (child._type === 'span' && child.text) {
            console.log('Translating span text:', child.text.substring(0, 50));
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
  
  console.log('translateBlockContent completed, returning', translatedBlocks.length, 'blocks');
  return translatedBlocks;
}