/**
 * HomepageMagazine — magazine-style panels for the homepage
 *
 * Panels (in order):
 *  1. Letters from the Editor  — New Yorker split: text left, photo right
 *  2. D.O.M. Archive           — horizontal scroll of dancer portraits
 *  3. Upcoming Events          — dark-bg newspaper list
 */

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Clock } from "lucide-react";
import { getFeaturedEditorLetter } from "@/lib/sanity/queries/editor-letters";
import { getDancersOfMonth } from "@/lib/sanity/queries/dancers-of-month";
import { getUpcomingEvents } from "@/lib/sanity/queries/events";
import { urlFor } from "@/lib/sanity";
import type { SanityEditorLetter, SanityDancerOfTheMonth, SanityEvent } from "@/lib/sanity/types";
import { format, parseISO } from "date-fns";

// ─── helpers ─────────────────────────────────────────────────────────────────

function str(v: unknown): string {
  if (!v) return "";
  if (typeof v === "string") return v;
  return (v as any)?.en ?? "";
}

function fadeIn(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 } as any,
    viewport: { once: true },
    transition: { duration: 0.7, delay },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Panel 1 — Letters from the Editor
// ─────────────────────────────────────────────────────────────────────────────

function EditorLetterPanel({ letter }: { letter: SanityEditorLetter }) {
  const title = str(letter.title);
  const excerpt = str(letter.excerpt);
  const authorName =
    letter.author
      ? typeof letter.author.name === "string"
        ? letter.author.name
        : (letter.author.name as any)?.en ?? ""
      : "";
  const coverImg =
    letter.mainImage
      ? urlFor(letter.mainImage).width(900).height(1100).url()
      : letter.author?.image
        ? urlFor(letter.author.image).width(900).height(1100).url()
        : null;
  const slug = letter.slug?.current;

  return (
    <section className="border-t border-b border-border" style={{ background: "hsl(var(--caribbean-orange) / 0.07)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Text column */}
          <motion.div
            {...fadeIn()}
            className="flex flex-col justify-center px-8 md:px-16 py-16 md:py-20 order-2 md:order-1"
          >
            {/* Section label */}
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-6">
              Letters from the Editor
            </p>

            {/* Title */}
            <h2 className="font-primary text-3xl md:text-4xl lg:text-5xl leading-tight text-foreground mb-6">
              {title}
            </h2>

            {/* Excerpt — centred, body serif, generous leading */}
            {excerpt && (
              <p className="text-base md:text-lg leading-[1.9] text-foreground/80 font-body text-center md:text-left max-w-md mb-8">
                {excerpt}
              </p>
            )}

            {/* Byline */}
            {authorName && (
              <p className="text-sm uppercase tracking-[0.15em] font-semibold text-foreground/60 mb-6">
                By {authorName}
              </p>
            )}

            {/* Read link */}
            {slug && (
              <Link
                to={`/editor-letters/${slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-200"
              >
                Read the Full Letter <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </motion.div>

          {/* Image column */}
          <motion.div
            {...fadeIn(0.15)}
            className="relative min-h-[340px] md:min-h-0 order-1 md:order-2 overflow-hidden"
          >
            {coverImg ? (
              <img
                src={coverImg}
                alt={authorName || "Editor"}
                className="w-full h-full object-cover object-top"
                style={{ minHeight: "100%" }}
              />
            ) : (
              <img
                src="/images/editor.png"
                alt="Letters from the Editor"
                className="w-full h-full object-cover object-top"
                style={{ minHeight: "100%" }}
              />
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Panel 2 — D.O.M. Archive horizontal scroll
// ─────────────────────────────────────────────────────────────────────────────

function DomArchivePanel({ dancers }: { dancers: SanityDancerOfTheMonth[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 280 : -280, behavior: "smooth" });
  };

  return (
    <section
      className="py-16 md:py-20 border-t border-b border-border"
      style={{ background: "hsl(var(--caribbean-gold) / 0.15)" }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div {...fadeIn()} className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
            Celebrating Excellence
          </p>
          <h2 className="font-primary text-3xl md:text-4xl uppercase tracking-[0.1em] text-foreground">
            D.O.M. Archive
          </h2>
          <p className="mt-2 font-secondary italic text-muted-foreground text-lg">
            The dancers who define Caribbean dance culture
          </p>
        </motion.div>

        {/* Scroll row */}
        <div className="relative">
          {/* Prev / Next buttons — only when enough cards to scroll */}
          {dancers.length > 3 && (
            <>
              <button
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                className="hidden sm:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background border border-border shadow items-center justify-center hover:border-primary/40 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                className="hidden sm:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background border border-border shadow items-center justify-center hover:border-primary/40 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Cards */}
          <div
            ref={scrollRef}
            className={dancers.length <= 3 ? "flex gap-5 pb-4 justify-center flex-wrap" : "flex gap-5 overflow-x-auto pb-4 scroll-smooth"}
            style={dancers.length <= 3 ? {} : { scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
          >
            {dancers.map((dancer, i) => {
              const name = dancer.dancerName || 'Unknown Dancer';
              const imgUrl = dancer.featuredImage
                ? urlFor(dancer.featuredImage).width(400).height(500).url()
                : null;

              return (
                <motion.div
                  key={dancer._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  style={{ scrollSnapAlign: "start", flexShrink: 0, width: 200 }}
                >
                  <Link to={`/dancers-of-the-month/${dancer.slug?.current}`} className="block group">
                    {/* Portrait */}
                    <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm bg-muted mb-3">
                      {imgUrl ? (
                        <img
                          src={imgUrl}
                          alt={name}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <span className="font-primary text-4xl text-muted-foreground/30">DG</span>
                        </div>
                      )}
                    </div>
                    {/* Name */}
                    <p className="font-semibold text-foreground text-sm leading-tight group-hover:text-primary transition-colors">
                      {name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {dancer.month} {dancer.year}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Link
            to="/dancers-of-the-month"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors uppercase tracking-[0.1em]"
          >
            View Full Archive <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Panel 3 — Upcoming Events (dark bg)
// ─────────────────────────────────────────────────────────────────────────────

function UpcomingEventsPanel({ events }: { events: SanityEvent[] }) {
  return (
    <section
      className="py-16 md:py-20"
      style={{ background: "#3A151C" }}
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div {...fadeIn()} className="mb-10">
          <p
            className="text-xs uppercase tracking-[0.3em] mb-2"
            style={{ color: "hsl(var(--caribbean-gold))" }}
          >
            Don't miss out
          </p>
          <h2
            className="font-primary text-3xl md:text-4xl uppercase tracking-[0.08em]"
            style={{ color: "hsl(0 0% 96%)" }}
          >
            Upcoming Events
          </h2>
          <div
            className="mt-4 h-px w-16"
            style={{ background: "hsl(var(--caribbean-gold) / 0.5)" }}
          />
        </motion.div>

        {/* Event rows */}
        {events.length === 0 ? (
          <p className="text-sm" style={{ color: "hsl(0 0% 60%)" }}>
            No upcoming events at the moment. Check back soon.
          </p>
        ) : (
          <div className="divide-y" style={{ borderColor: "hsl(0 0% 96% / 0.1)" }}>
            {events.map((event, i) => {
              const title = str(event.title);
              const startDate = event.startDateTime ? parseISO(event.startDateTime) : null;
              const location = event.location;
              const locationStr = location?.isOnline
                ? "Online"
                : [location?.city, location?.country].filter(Boolean).join(", ") ||
                  location?.name ||
                  "";
              const categoryTitle = event.categories?.[0]
                ? str(event.categories[0].title)
                : null;

              return (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Link
                    to={`/events/${event.slug?.current}`}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-5 group"
                  >
                    <div className="flex-1">
                      {categoryTitle && (
                        <span
                          className="text-xs uppercase tracking-[0.15em] font-medium mb-1 block"
                          style={{ color: "hsl(var(--caribbean-gold))" }}
                        >
                          {categoryTitle}
                        </span>
                      )}
                      <h3
                        className="font-semibold text-lg leading-snug group-hover:underline"
                        style={{ color: "hsl(0 0% 96%)" }}
                      >
                        {title}
                      </h3>
                    </div>

                    <div
                      className="flex flex-col sm:items-end gap-1 text-sm flex-shrink-0"
                      style={{ color: "hsl(0 0% 60%)" }}
                    >
                      {startDate && (
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {format(startDate, "MMM d, yyyy")}
                        </span>
                      )}
                      {locationStr && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {locationStr}
                        </span>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <motion.div {...fadeIn(0.2)} className="mt-10">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] hover:gap-3 transition-all duration-200"
            style={{ color: "hsl(var(--caribbean-gold))" }}
          >
            View All Events <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Panel 4 — Music (warm gold)
// ─────────────────────────────────────────────────────────────────────────────


// ─────────────────────────────────────────────────────────────────────────────
// Main export — fetches all data, renders all panels
// ─────────────────────────────────────────────────────────────────────────────

export default function HomepageMagazine() {
  const [editorLetter, setEditorLetter] = useState<SanityEditorLetter | null>(null);
  const [dancers, setDancers] = useState<SanityDancerOfTheMonth[]>([]);
  const [events, setEvents] = useState<SanityEvent[]>([]);

  useEffect(() => {
    getFeaturedEditorLetter().then(setEditorLetter).catch(() => {});
    getDancersOfMonth({ limit: 10 }).then(setDancers).catch(() => {});
    getUpcomingEvents(5).then(setEvents).catch(() => {});
  }, []);

  return (
    <>
      {editorLetter && <EditorLetterPanel letter={editorLetter} />}
      {dancers.length > 0 && <DomArchivePanel dancers={dancers} />}
      {events.length > 0 && <UpcomingEventsPanel events={events} />}
    </>
  );
}
