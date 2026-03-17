import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { MapPin, Clock, Search, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { client, urlFor } from '@/lib/sanity';
import PageLayout from '@/components/PageLayout';
import AdSpace from '@/components/AdSpace';
import { motion, AnimatePresence } from 'framer-motion';

type Event = {
  _id: string;
  title: string;
  slug: { current: string };
  startDateTime: string;
  endDateTime?: string;
  location?: {
    name?: string;
    address?: string;
    city?: string;
    country?: string;
    isOnline?: boolean;
  };
  featuredImage?: any;
  categories?: Array<{ title: string }>;
  excerpt?: string;
};

const CARIBBEAN_COUNTRIES = [
  'All Countries',
  'Trinidad & Tobago',
  'Jamaica',
  'Barbados',
  'Bahamas',
  'Guyana',
  'Online',
  'Other',
];

const EVENTS_PER_PAGE = 6;

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All Countries');
  const [timeFilter, setTimeFilter] = useState<'upcoming' | 'past' | 'all'>('upcoming');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const query = `*[_type == "event"] | order(startDateTime asc) {
          _id, title, slug, startDateTime, endDateTime,
          location, featuredImage, categories[]->{title}, excerpt
        }`;
        const data = await client.fetch<Event[]>(query);
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Filter logic
  const filteredEvents = events.filter((event) => {
    const searchLower = searchTerm.toLowerCase();
    const title = event.title?.toLowerCase() || '';
    const excerpt = event.excerpt?.toLowerCase() || '';
    const locationName = event.location?.name?.toLowerCase() || '';
    const locationCity = event.location?.city?.toLowerCase() || '';
    const locationCountry = event.location?.country?.toLowerCase() || '';

    const matchesSearch =
      !searchTerm ||
      title.includes(searchLower) ||
      excerpt.includes(searchLower) ||
      locationName.includes(searchLower) ||
      locationCity.includes(searchLower) ||
      locationCountry.includes(searchLower) ||
      event.categories?.some((c) => c.title.toLowerCase().includes(searchLower));

    // Country matching - handle Trinidad & Tobago variants
    const eventCountry = event.location?.country?.toLowerCase() || '';
    const isOnline = event.location?.isOnline === true;
    const matchesCountry =
      selectedCountry === 'All Countries' ||
      (selectedCountry === 'Online' && isOnline) ||
      (selectedCountry === 'Trinidad & Tobago' &&
        (eventCountry.includes('trinidad') || eventCountry.includes('tobago'))) ||
      (selectedCountry === 'Other' &&
        !isOnline &&
        !['trinidad', 'tobago', 'jamaica', 'barbados', 'bahamas', 'guyana'].some((c) =>
          eventCountry.includes(c)
        ) &&
        eventCountry !== '') ||
      eventCountry === selectedCountry.toLowerCase();

    // Time filter
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const eventStart = event.startDateTime ? new Date(event.startDateTime) : null;
    const matchesTime =
      timeFilter === 'all' ||
      (timeFilter === 'upcoming' && eventStart && eventStart >= todayStart) ||
      (timeFilter === 'past' && eventStart && eventStart < todayStart);

    return matchesSearch && matchesCountry && matchesTime;
  });

  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCountry, timeFilter]);

  const getLocationString = (event: Event) => {
    if (event.location?.isOnline) return 'Online';
    return [event.location?.city, event.location?.country].filter(Boolean).join(', ') ||
      event.location?.name ||
      '';
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-16">
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse bg-card rounded-2xl p-6 border border-border/50 h-40" />
            ))}
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Header */}
      <div className="bg-background border-b border-border py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-secondary font-bold text-foreground mb-4">
              Caribbean Dance Events
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the latest performances, auditions and other dance happenings right here!
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-3 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search events, locations, categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 rounded-xl"
              />
            </div>

            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-full md:w-52 h-11 rounded-xl">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                {CARIBBEAN_COUNTRIES.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={timeFilter} onValueChange={(v: 'upcoming' | 'past' | 'all') => setTimeFilter(v)}>
              <SelectTrigger className="w-full md:w-44 h-11 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="past">Past Events</SelectItem>
                <SelectItem value="all">All Events</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active filters */}
          {(searchTerm || selectedCountry !== 'All Countries') && (
            <div className="flex items-center gap-2 mt-4 justify-center flex-wrap">
              {searchTerm && (
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                  Search: "{searchTerm}"
                </span>
              )}
              {selectedCountry !== 'All Countries' && (
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                  {selectedCountry}
                </span>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-7"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCountry('All Countries');
                }}
              >
                Clear All
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Event List */}
      <div className="container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {filteredEvents.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-secondary font-bold text-foreground mb-2">No events found</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                {searchTerm || selectedCountry !== 'All Countries'
                  ? 'Try adjusting your filters.'
                  : timeFilter === 'upcoming'
                  ? 'No upcoming events. Check back soon!'
                  : 'No events match your criteria.'}
              </p>
              {(searchTerm || selectedCountry !== 'All Countries') && (
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCountry('All Countries');
                  }}
                  variant="outline"
                  className="mt-4 rounded-full"
                >
                  Clear Filters
                </Button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="events"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6 max-w-4xl mx-auto"
            >
              <p className="text-sm text-muted-foreground text-right">
                {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
              </p>

              {paginatedEvents.map((event, index) => {
                const locationStr = getLocationString(event);
                const startDate = event.startDateTime ? parseISO(event.startDateTime) : null;
                const categoryTitle = event.categories?.[0]?.title
                  ? typeof event.categories[0].title === 'string'
                    ? event.categories[0].title
                    : (event.categories[0].title as any)?.en
                  : null;

                return (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Link to={`/events/${event.slug?.current}`}>
                      <div className="bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300 group flex flex-col sm:flex-row">
                        {/* Image */}
                        {event.featuredImage && (
                          <div className="sm:w-56 sm:flex-shrink-0 h-48 sm:h-auto overflow-hidden">
                            <img
                              src={urlFor(event.featuredImage).width(400).height(300).url()}
                              alt={event.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-6 flex flex-col justify-between flex-1">
                          <div>
                            {categoryTitle && (
                              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">
                                {categoryTitle}
                              </span>
                            )}
                            <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                              {event.title}
                            </h2>
                            {event.excerpt && (
                              <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{event.excerpt}</p>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            {startDate && (
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                <span>{format(startDate, 'EEEE, MMMM d, yyyy')}</span>
                              </div>
                            )}
                            {locationStr && (
                              <div className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4" />
                                <span>{locationStr}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="rounded-full"
                  >
                    Previous
                  </Button>
                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className="w-9 h-9 rounded-full p-0"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="rounded-full"
                  >
                    Next
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ad Space */}
        <div className="flex justify-center mt-12">
          <AdSpace size="banner" placement="events-bottom" currentPage="events" className="max-w-4xl" />
        </div>
      </div>
    </PageLayout>
  );
}
