import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../lib/sanity';
import { urlFor } from '../lib/sanity';
import { Calendar, Clock, MapPin, ArrowLeft } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { PortableText } from '../lib/portableText';
import PageLayout from '../components/PageLayout';

type Event = {
  _id: string;
  title: string;
  description: any[];
  startDateTime: string;
  endDateTime?: string;
  location?: {
    name?: string;
    city?: string;
    isOnline?: boolean;
    meetingUrl?: string;
  };
  featuredImage?: any;
  categories?: Array<{ title: string }>;
  price?: number;
  registrationRequired?: boolean;
  registrationUrl?: string;
};

export default function EventDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const query = `
          *[_type == "event" && slug.current == $slug][0] {
            _id, title, description,
            startDateTime, endDateTime, location,
            featuredImage, "categories": categories[]->{title},
            price, registrationRequired, registrationUrl
          }
        `;
        setEvent(await client.fetch(query, { slug }));
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchEvent();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <PageLayout className="py-12">
      <div className="container mx-auto px-4">
        <Link to="/events" className="flex items-center text-indigo-600 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Events
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">{event.title}</h1>
          
          {event.featuredImage && urlFor(event.featuredImage) && (
            <div className="relative w-full mb-6 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={urlFor(event.featuredImage)?.width(1200).fit('max').url()}
                alt={event.title}
                className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Event Details</h2>
                <div className="space-y-4">
                  <div className="flex">
                    <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">
                        {format(parseISO(event.startDateTime), 'EEEE, MMMM d, yyyy')}
                      </p>
                      <p className="text-gray-600">
                        {format(parseISO(event.startDateTime), 'h:mm a')}
                        {event.endDateTime && ` - ${format(parseISO(event.endDateTime), 'h:mm a')}`}
                      </p>
                    </div>
                  </div>

                  {event.location && (
                    <div className="flex">
                      <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">
                          {event.location.isOnline ? 'Online Event' : event.location.name}
                        </p>
                        {!event.location.isOnline && event.location.city && (
                          <p className="text-gray-600">{event.location.city}</p>
                        )}
                        {event.location.isOnline && event.location.meetingUrl && (
                          <a 
                            href={event.location.meetingUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                          >
                            Join Meeting
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {event.description && event.description.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-3">About This Event</h3>
                    <div className="prose max-w-none">
                      <PortableText value={event.description} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow sticky top-24">
                <h3 className="text-lg font-semibold mb-4">Register</h3>
                <div className="text-2xl font-bold mb-4">
                  {event.price ? `$${event.price}` : 'Free'}
                </div>
                
                {event.registrationRequired ? (
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-indigo-600 text-white text-center py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
                  >
                    Register Now
                  </a>
                ) : (
                  <div className="text-gray-600">No registration required</div>
                )}

                {event.categories && event.categories.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {event.categories.map((category) => (
                        <span
                          key={category.title}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                        >
                          {category.title}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
