import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      'nav.home': 'Home',
      'nav.watch': 'Watch',
      'nav.stories': 'Stories',
      'nav.events': 'Events',
      'nav.features': 'Features',
      'nav.tutorials': 'Tutorials',
      'nav.music': 'Music',
      'nav.artists': 'Artists',
      'nav.community': 'Community',
      'nav.about': 'About',
      
      // Artist Detail Page
      'artist.back': 'Back to Artists',
      'artist.connect': 'Connect',
      'artist.photoGallery': 'Photo Gallery',
      'artist.about': 'About',
      
      // Common
      'common.subscribe': 'SUBSCRIBE',
      'common.search': 'Search',
      'common.loading': 'Loading...',
      'common.error': 'Error',
      'common.notFound': 'Not Found',
      
      // Hero Section
      'hero.title': 'DancerGirl',
      'hero.fullTitle': 'DancerGirl Island Rhythms',
      'hero.subtitle': 'Celebrating Dance Culture',
      'hero.scrollToExplore': 'Scroll to explore',
      'hero.watchLatestVideos': 'Watch Latest Videos',
      'hero.readStories': 'Read Stories',
      'hero.discoverRhythm': 'Discover the rhythm, passion, and stories that make Caribbean dance truly extraordinary',
      'hero.digitalMagazine': 'Digital Magazine',
      
      // Footer
      'footer.description': 'Celebrating the art of dance and the stories of dancers worldwide.',
      'footer.quickLinks': 'Quick Links',
      'footer.resources': 'Resources',
      'footer.contact': 'Contact',
      'footer.stayUpdated': 'Stay Updated',
      'footer.newsletterDescription': 'Subscribe to our newsletter for the latest updates and stories.',
      'footer.emailPlaceholder': 'Your email',
      'footer.join': 'Join',
      'footer.copyright': '© {{year}} DancerGirl. All rights reserved.',
      'footer.privacy': 'Privacy Policy',
      'footer.terms': 'Terms of Service',
      
      // Language Toggle
      'language.english': 'English',
      'language.spanish': 'Español',
      'language.toggle': 'Toggle Language',
      
      // UI Elements
      'ui.toggleMenu': 'Toggle menu',
      'ui.search': 'Search',
      'ui.account': 'Account',
      'ui.sections': 'SECTIONS',
      'ui.viewAllEvents': 'View All Events',
      
      // Sections
      'sections.latestStories': 'Latest Stories',
      'sections.latestStoriesDescription': 'Discover the latest articles, insights, and stories from the world of Caribbean dance',
      
      // LatestStories Component
      'stories.browseAll': 'Browse All Stories',
      'stories.viewAll': 'View All Stories',
      'stories.mostPopular': 'Most Popular',
      'stories.featuredDancer': 'Featured Dancer',
      'stories.watchLatest': '▷ Watch Latest',
      'stories.exploreVideos': 'Explore Videos',
      'stories.noImage': 'No image',
      'stories.minRead': 'min read',
      'stories.noArticlesYet': 'No articles yet',
      'stories.addArticles': 'Add some articles in your Sanity Studio to see them featured here!',
      'stories.exclusiveContent': 'Exclusive dance tutorials, behind-the-scenes content, and performance highlights from across the Caribbean.',
      'stories.viewProfile': 'View Profile',
      'stories.keishaDesc': 'International dancehall champion and choreographer from Kingston, Jamaica. Known for innovative fusion of traditional and contemporary styles.',
      
        // Choreographer's Corner
  'choreographers.title': 'Choreographer\'s Corner',
  'choreographers.subtitle': 'Discover the creative minds behind Caribbean dance, their techniques, and the stories that inspire their choreography',
  'choreographers.featuredArticle': 'Featured Article',
  'choreographers.readFullArticle': 'Read Full Article',
  'choreographers.areYouChoreographer': 'Are You a Choreographer?',
  'choreographers.submitStory': 'Submit Your Story',
  'choreographers.shareInsights': 'Share your choreography insights, techniques, and stories with the Caribbean dance community. Get featured in our Choreographer\'s Corner series.',
  
  // Podcast
  'podcast.ourPodcast': 'Our Podcast',
  'podcast.title': 'Jamaican Girl, Big World',
  'podcast.description': 'Join us as we explore Caribbean culture, dance, and the stories that make our community vibrant',
  'podcast.episode1': 'Episode 1: Introducing Me',
  'podcast.listenOnGoodpods': 'Listen on Goodpods',
      
      // Gallery/D.O.M Archive
      'gallery.dancersOfTheMonth': 'D.O.M Archive',
      'gallery.dancersOfTheMonthSubtitle': 'Celebrating the exceptional talent and artistry of Caribbean dancers through our monthly spotlight on the region\'s most inspiring performers',
      'gallery.loading': 'Loading dancers...',
      'gallery.noDancersFound': 'No dancers found yet.',
      'gallery.addDancersInStudio': 'Add some dancers in your Sanity Studio to see them featured here!',
      'gallery.noImage': 'No image',
      'gallery.untitled': 'Untitled',
      'gallery.noImageAvailable': 'No image available',
      'gallery.quote': '"Dance is the hidden language of the soul, and the Caribbean soul speaks volumes through movement"',
      'gallery.quoteAuthor': '— DancerGirl Magazine',
    }
  },
  es: {
    translation: {
      // Navigation
      'nav.home': 'Inicio',
      'nav.watch': 'Ver',
      'nav.stories': 'Historias',
      'nav.events': 'Eventos',
      'nav.features': 'Características',
      'nav.tutorials': 'Tutoriales',
      'nav.music': 'Música',
      'nav.artists': 'Artistas',
      'nav.community': 'Comunidad',
      'nav.about': 'Acerca de',
      
      // Artist Detail Page
      'artist.back': 'Volver a Artistas',
      'artist.connect': 'Conectar',
      'artist.photoGallery': 'Galería de Fotos',
      'artist.about': 'Acerca de',
      
      // Common
      'common.subscribe': 'SUSCRIBIRSE',
      'common.search': 'Buscar',
      'common.loading': 'Cargando...',
      'common.error': 'Error',
      'common.notFound': 'No Encontrado',
      
      // Hero Section
      'hero.title': 'DancerGirl',
      'hero.fullTitle': 'DancerGirl Island Rhythms',
      'hero.subtitle': 'Celebrando la Cultura del Baile',
      'hero.scrollToExplore': 'Desplázate para explorar',
      'hero.watchLatestVideos': 'Ver Videos Recientes',
      'hero.readStories': 'Leer Historias',
      'hero.discoverRhythm': 'Descubre el ritmo, la pasión y las historias que hacen del baile caribeño algo verdaderamente extraordinario',
      'hero.digitalMagazine': 'Revista Digital',
      
      // Footer
      'footer.description': 'Celebrando el arte de la danza y las historias de bailarines de todo el mundo.',
      'footer.quickLinks': 'Enlaces Rápidos',
      'footer.resources': 'Recursos',
      'footer.contact': 'Contacto',
      'footer.stayUpdated': 'Mantente Actualizado',
      'footer.newsletterDescription': 'Suscríbete a nuestro boletín para las últimas actualizaciones e historias.',
      'footer.emailPlaceholder': 'Tu correo electrónico',
      'footer.join': 'Unirse',
      'footer.copyright': '© {{year}} DancerGirl. Todos los derechos reservados.',
      'footer.privacy': 'Política de Privacidad',
      'footer.terms': 'Términos de Servicio',
      
      // Language Toggle
      'language.english': 'English',
      'language.spanish': 'Español',
      'language.toggle': 'Cambiar Idioma',
      
      // UI Elements
      'ui.toggleMenu': 'Alternar menú',
      'ui.search': 'Buscar',
      'ui.account': 'Cuenta',
      'ui.sections': 'SECCIONES',
      'ui.viewAllEvents': 'Ver Todos los Eventos',
      
      // Sections
      'sections.latestStories': 'Últimas Historias',
      'sections.latestStoriesDescription': 'Descubre los últimos artículos, ideas e historias del mundo del baile caribeño',
      
      // LatestStories Component
      'stories.browseAll': 'Explorar Todas las Historias',
      'stories.viewAll': 'Ver Todas las Historias',
      'stories.mostPopular': 'Más Popular',
      'stories.featuredDancer': 'Bailarín Destacado',
      'stories.watchLatest': '▷ Ver Últimos',
      'stories.exploreVideos': 'Explorar Videos',
      'stories.noImage': 'Sin imagen',
      'stories.minRead': 'min de lectura',
      'stories.noArticlesYet': 'Aún no hay artículos',
      'stories.addArticles': '¡Agrega algunos artículos en tu Sanity Studio para verlos destacados aquí!',
      'stories.exclusiveContent': 'Tutoriales de baile exclusivos, contenido detrás de escena y destacados de actuaciones de todo el Caribe.',
      'stories.viewProfile': 'Ver Perfil',
      'stories.keishaDesc': 'Campeona internacional de dancehall y coreógrafa de Kingston, Jamaica. Conocida por la fusión innovadora de estilos tradicionales y contemporáneos.',
      
      // Choreographer's Corner
      'choreographers.title': 'Rincón del Coreógrafo',
      'choreographers.subtitle': 'Descubre las mentes creativas detrás del baile caribeño, sus técnicas y las historias que inspiran su coreografía',
      'choreographers.featuredArticle': 'Artículo Destacado',
      'choreographers.readFullArticle': 'Leer Artículo Completo',
      'choreographers.areYouChoreographer': '¿Eres un Coreógrafo?',
      'choreographers.submitStory': 'Enviar Tu Historia',
      'choreographers.shareInsights': 'Comparte tus ideas de coreografía, técnicas e historias con la comunidad del baile caribeño. Destácate en nuestra serie Rincón del Coreógrafo.',
      
      // Podcast
      'podcast.ourPodcast': 'Nuestro Podcast',
      'podcast.title': 'Jamaican Girl, Big World',
      'podcast.description': 'Únete a nosotros mientras exploramos la cultura caribeña, la danza y las historias que hacen vibrante nuestra comunidad',
      'podcast.episode1': 'Episodio 1: Presentándome',
      'podcast.listenOnGoodpods': 'Escuchar en Goodpods',
      
      // Gallery/D.O.M Archive  
      'gallery.dancersOfTheMonth': 'Archivo D.O.M',
      'gallery.dancersOfTheMonthSubtitle': 'Celebrando el talento excepcional y la creatividad de los bailarines caribeños a través de nuestro enfoque mensual en los intérpretes más inspiradores de la región',
      'gallery.loading': 'Cargando bailarines...',
      'gallery.noDancersFound': 'No se encontraron bailarines aún.',
      'gallery.addDancersInStudio': '¡Agrega algunos bailarines en tu Sanity Studio para verlos destacados aquí!',
      'gallery.noImage': 'Sin imagen',
      'gallery.untitled': 'Sin título',
      'gallery.noImageAvailable': 'No hay imagen disponible',
      'gallery.quote': '"El baile es el lenguaje oculto del alma, y el alma caribeña habla volúmenes a través del movimiento"',
      'gallery.quoteAuthor': '— Revista DancerGirl',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n; 