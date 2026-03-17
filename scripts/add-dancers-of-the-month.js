import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'f37vktt0',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.VITE_SANITY_TOKEN,
  useCdn: false,
});

async function addDancersOfTheMonth() {
  try {
    console.log('🚀 Adding Dancers of the Month data...');

    // First, let's create some sample artists if they don't exist
    const sampleArtists = [
      {
        _type: 'artist',
        _id: 'artist-addison-morgan',
        name: {
          en: 'Addison Morgan',
          es: 'Addison Morgan'
        },
        slug: {
          _type: 'slug',
          current: 'addison-morgan'
        },
        bio: {
          en: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Addison Morgan is a rising star in Caribbean dance, known for her dynamic performances and innovative choreography. Her signature move with flowing fabric has captivated audiences worldwide, earning her recognition as one of the most promising dancers of her generation.',
                },
              ],
            },
          ],
          es: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Addison Morgan es una estrella emergente en la danza caribeña, conocida por sus actuaciones dinámicas y coreografía innovadora.',
                },
              ],
            },
          ]
        },
        socialLinks: [
          {
            platform: 'instagram',
            url: 'https://instagram.com/addisonmorgan'
          },
          {
            platform: 'youtube',
            url: 'https://youtube.com/@addisonmorgan'
          },
          {
            platform: 'tiktok',
            url: 'https://tiktok.com/@addisonmorgan'
          }
        ],
        isFeatured: true
      },
      {
        _type: 'artist',
        _id: 'artist-maya-rodriguez',
        name: {
          en: 'Maya Rodriguez',
          es: 'Maya Rodríguez'
        },
        slug: {
          _type: 'slug',
          current: 'maya-rodriguez'
        },
        bio: {
          en: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Maya Rodriguez is a professional dancer and choreographer specializing in traditional Caribbean and contemporary fusion styles. With over 10 years of experience, she has performed at major cultural festivals across the Caribbean.',
                },
              ],
            },
          ],
          es: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Maya Rodríguez es bailarina profesional y coreógrafa especializada en estilos tradicionales caribeños y fusión contemporánea.',
                },
              ],
            },
          ]
        },
        socialLinks: [
          {
            platform: 'instagram',
            url: 'https://instagram.com/mayarodriguez'
          },
          {
            platform: 'youtube',
            url: 'https://youtube.com/@mayarodriguez'
          }
        ],
        isFeatured: true
      },
      {
        _type: 'artist',
        _id: 'artist-carlos-martinez',
        name: {
          en: 'Carlos Martinez',
          es: 'Carlos Martínez'
        },
        slug: {
          _type: 'slug',
          current: 'carlos-martinez'
        },
        bio: {
          en: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Carlos Martinez is a versatile dancer known for his mastery of multiple Caribbean dance styles including dancehall, soca, and reggaeton. His high-energy performances and teaching style have made him a favorite in dance communities worldwide.',
                },
              ],
            },
          ],
          es: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Carlos Martínez es un bailarín versátil conocido por su dominio de múltiples estilos de danza caribeña.',
                },
              ],
            },
          ]
        },
        socialLinks: [
          {
            platform: 'instagram',
            url: 'https://instagram.com/carlosmartinez'
          },
          {
            platform: 'tiktok',
            url: 'https://tiktok.com/@carlosmartinez'
          }
        ],
        isFeatured: true
      }
    ];

    // Create or update artists
    console.log('📝 Creating/updating artists...');
    for (const artist of sampleArtists) {
      try {
        await client.createOrReplace(artist);
        console.log(`✅ Created/updated artist: ${artist.name.en}`);
      } catch (error) {
        console.error(`❌ Error creating artist ${artist.name.en}:`, error.message);
      }
    }

    // Now create dancers of the month entries
    const dancersOfTheMonth = [
      {
        _type: 'dancerOfTheMonth',
        month: 'January',
        year: 2024,
        artist: {
          _type: 'reference',
          _ref: 'artist-addison-morgan'
        },
        slug: {
          _type: 'slug',
          current: 'addison-morgan-january-2024'
        },
        featuredStory: {
          en: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'This month, we are thrilled to feature Addison Morgan, a dancer whose innovative use of fabric in her performances has redefined contemporary Caribbean dance. Addison\'s journey began in her hometown of Trinidad, where she first discovered her love for movement and expression through dance.'
                }
              ]
            },
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Her signature style combines traditional Caribbean rhythms with modern contemporary techniques, creating performances that are both visually stunning and emotionally powerful. The flowing fabric she incorporates isn\'t just a prop—it\'s an extension of her body, moving in harmony with every beat and gesture.'
                }
              ]
            },
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Over the past year, Addison has performed at major festivals across the Caribbean and has begun teaching workshops to share her unique approach with the next generation of dancers. Her dedication to preserving Caribbean dance traditions while pushing creative boundaries makes her a perfect choice for our January Dancer of the Month.'
                }
              ]
            }
          ],
          es: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Este mes, estamos encantados de presentar a Addison Morgan, una bailarina cuyo uso innovador de tela en sus actuaciones ha redefinido la danza caribeña contemporánea.'
                }
              ]
            }
          ]
        },
        excerpt: {
          en: 'Addison Morgan redefines contemporary Caribbean dance with her innovative use of flowing fabric, creating performances that are both visually stunning and emotionally powerful.',
          es: 'Addison Morgan redefine la danza caribeña contemporánea con su uso innovador de tela fluida.'
        },
        categories: ['Contemporary', 'Dancehall', 'Performance', 'Choreography'],
        achievements: [
          {
            achievement: {
              en: 'Winner - Caribbean Dance Innovation Award',
              es: 'Ganadora - Premio de Innovación en Danza Caribeña'
            },
            year: 2023,
            description: {
              en: 'Recognized for her groundbreaking fusion of traditional and contemporary styles',
              es: 'Reconocida por su fusión innovadora de estilos tradicionales y contemporáneos'
            }
          },
          {
            achievement: {
              en: 'Featured Performer - Trinidad Carnival',
              es: 'Artista Principal - Carnaval de Trinidad'
            },
            year: 2023,
            description: {
              en: 'Headlined the main stage with her fabric dance performance',
              es: 'Encabezó el escenario principal con su actuación de danza con tela'
            }
          }
        ],
        videoHighlights: [
          {
            title: 'Fabric Flow Masterclass',
            videoUrl: 'https://youtube.com/watch?v=example1',
            description: 'Addison demonstrates her signature fabric techniques in this stunning performance piece.'
          },
          {
            title: 'Caribbean Fusion Performance',
            videoUrl: 'https://youtube.com/watch?v=example2',
            description: 'A mesmerizing blend of traditional and contemporary Caribbean dance styles.'
          }
        ],
        publishedAt: '2024-01-01T00:00:00Z',
        isFeatured: true,
        isActive: true,
        seoTitle: {
          en: 'Addison Morgan - January 2024 Dancer of the Month | DancerGirl',
          es: 'Addison Morgan - Bailarina del Mes de Enero 2024 | DancerGirl'
        },
        seoDescription: {
          en: 'Meet Addison Morgan, our January 2024 Dancer of the Month. Discover her innovative Caribbean dance style and signature fabric performances.',
          es: 'Conoce a Addison Morgan, nuestra Bailarina del Mes de Enero 2024. Descubre su estilo innovador de danza caribeña.'
        }
      },
      {
        _type: 'dancerOfTheMonth',
        month: 'February',
        year: 2024,
        artist: {
          _type: 'reference',
          _ref: 'artist-maya-rodriguez'
        },
        slug: {
          _type: 'slug',
          current: 'maya-rodriguez-february-2024'
        },
        featuredStory: {
          en: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'February brings us Maya Rodriguez, a master of traditional Caribbean dance forms who has dedicated her career to preserving and celebrating the rich cultural heritage of Caribbean movement. Born in Puerto Rico, Maya began dancing at the age of five and has never looked back.'
                }
              ]
            },
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'What sets Maya apart is her deep respect for tradition combined with her ability to make ancient dance forms relevant to modern audiences. She has studied with master dancers across the Caribbean, learning not just the steps but the stories and cultural significance behind each movement.'
                }
              ]
            },
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'As a choreographer and teacher, Maya has trained hundreds of dancers and has been instrumental in keeping traditional Caribbean dance alive in diaspora communities around the world. Her work bridges generations, connecting young dancers to their cultural roots.'
                }
              ]
            }
          ],
          es: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Febrero nos trae a Maya Rodríguez, una maestra de las formas tradicionales de danza caribeña que ha dedicado su carrera a preservar y celebrar la rica herencia cultural del movimiento caribeño.'
                }
              ]
            }
          ]
        },
        excerpt: {
          en: 'Maya Rodriguez is a master of traditional Caribbean dance forms, dedicated to preserving cultural heritage while making ancient movements relevant to modern audiences.',
          es: 'Maya Rodríguez es una maestra de las formas tradicionales de danza caribeña, dedicada a preservar la herencia cultural.'
        },
        categories: ['Traditional', 'Cultural Dance', 'Heritage', 'Choreography'],
        achievements: [
          {
            achievement: {
              en: 'Cultural Ambassador Award - Puerto Rico Arts Council',
              es: 'Premio Embajadora Cultural - Consejo de Artes de Puerto Rico'
            },
            year: 2022,
            description: {
              en: 'Honored for her work in preserving and promoting traditional Caribbean dance',
              es: 'Honrada por su trabajo en preservar y promover la danza tradicional caribeña'
            }
          },
          {
            achievement: {
              en: 'Master Teacher Certification - Caribbean Dance Institute',
              es: 'Certificación de Maestra - Instituto de Danza Caribeña'
            },
            year: 2020,
            description: {
              en: 'Achieved highest level of certification in traditional Caribbean dance instruction',
              es: 'Logró el nivel más alto de certificación en instrucción de danza tradicional caribeña'
            }
          }
        ],
        publishedAt: '2024-02-01T00:00:00Z',
        isFeatured: false,
        isActive: true,
        seoTitle: {
          en: 'Maya Rodriguez - February 2024 Dancer of the Month | DancerGirl',
          es: 'Maya Rodríguez - Bailarina del Mes de Febrero 2024 | DancerGirl'
        },
        seoDescription: {
          en: 'Meet Maya Rodriguez, our February 2024 Dancer of the Month. Discover her dedication to preserving traditional Caribbean dance forms.',
          es: 'Conoce a Maya Rodríguez, nuestra Bailarina del Mes de Febrero 2024.'
        }
      },
      {
        _type: 'dancerOfTheMonth',
        month: 'March',
        year: 2024,
        artist: {
          _type: 'reference',
          _ref: 'artist-carlos-martinez'
        },
        slug: {
          _type: 'slug',
          current: 'carlos-martinez-march-2024'
        },
        featuredStory: {
          en: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'March spotlights Carlos Martinez, a dynamic performer who has taken the Caribbean dance world by storm with his incredible versatility and infectious energy. From the streets of Jamaica to the stages of Miami, Carlos has made his mark wherever Caribbean music plays.'
                }
              ]
            },
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Carlos is a true student of the culture, having mastered dancehall, soca, reggaeton, and numerous other Caribbean styles. His performances are known for their high energy and authentic connection to the music, making him a favorite at festivals and clubs worldwide.'
                }
              ]
            },
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Beyond performing, Carlos has become a sought-after instructor, known for his ability to break down complex movements and help dancers of all levels find their own style within Caribbean dance traditions. His workshops always sell out, and his online tutorials have millions of views.'
                }
              ]
            }
          ],
          es: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Marzo destaca a Carlos Martínez, un artista dinámico que ha tomado el mundo de la danza caribeña por asalto con su increíble versatilidad y energía contagiosa.'
                }
              ]
            }
          ]
        },
        excerpt: {
          en: 'Carlos Martinez has taken the Caribbean dance world by storm with his incredible versatility in dancehall, soca, reggaeton, and his infectious energy.',
          es: 'Carlos Martínez ha tomado el mundo de la danza caribeña por asalto con su increíble versatilidad en dancehall, soca, reggaeton.'
        },
        categories: ['Dancehall', 'Soca', 'Reggae', 'Performance'],
        achievements: [
          {
            achievement: {
              en: 'Best Male Dancer - Caribbean Music Awards',
              es: 'Mejor Bailarín Masculino - Premios de Música Caribeña'
            },
            year: 2023,
            description: {
              en: 'Recognized for outstanding performance and contribution to Caribbean dance',
              es: 'Reconocido por su actuación excepcional y contribución a la danza caribeña'
            }
          },
          {
            achievement: {
              en: 'Viral Dance Creator - TikTok Caribbean Challenge',
              es: 'Creador de Baile Viral - Desafío Caribeño TikTok'
            },
            year: 2023,
            description: {
              en: 'Created a dance challenge that received over 10 million views globally',
              es: 'Creó un desafío de baile que recibió más de 10 millones de visualizaciones globalmente'
            }
          }
        ],
        publishedAt: '2024-03-01T00:00:00Z',
        isFeatured: false,
        isActive: true,
        seoTitle: {
          en: 'Carlos Martinez - March 2024 Dancer of the Month | DancerGirl',
          es: 'Carlos Martínez - Bailarín del Mes de Marzo 2024 | DancerGirl'
        },
        seoDescription: {
          en: 'Meet Carlos Martinez, our March 2024 Dancer of the Month. Discover his mastery of multiple Caribbean dance styles.',
          es: 'Conoce a Carlos Martínez, nuestro Bailarín del Mes de Marzo 2024.'
        }
      }
    ];

    // Create dancers of the month entries
    console.log('💃 Creating dancers of the month entries...');
    for (const dancer of dancersOfTheMonth) {
      try {
        const result = await client.create(dancer);
        console.log(`✅ Created dancer of the month: ${dancer.month} ${dancer.year} - ${dancer.slug.current}`);
      } catch (error) {
        console.error(`❌ Error creating dancer of the month for ${dancer.month} ${dancer.year}:`, error.message);
      }
    }

    console.log('\n🎉 Successfully added Dancers of the Month data!');
    console.log('🌐 You can now view them at: /dancers-of-the-month');
    console.log('\n📋 Next Steps:');
    console.log('1. Add images to the artists and dancers of the month entries in Sanity Studio');
    console.log('2. Update video URLs with real content');
    console.log('3. Add more dancers for future months');

  } catch (error) {
    console.error('❌ Error adding dancers of the month:', error);
  }
}

// Run the script
addDancersOfTheMonth();