import { useState, useEffect, useCallback } from "react"
import { MOVIE } from "./data/movieData"
import { useInView } from "./hooks/useInView"
import {
  Play,
  Calendar,
  Clock,
  Film,

  ChevronDown,
  X,
  ExternalLink,
  Menu,
  Ticket,
} from "lucide-react"

/* ─────────────── Navbar ─────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links = [
    { label: "Synopsis", href: "#synopsis" },
    { label: "Trailer", href: "#trailer" },
    { label: "Cast", href: "#cast" },
    { label: "Details", href: "#details" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-dark-900/90 backdrop-blur-xl shadow-2xl shadow-black/50 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-spider-red rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="4 6 24 22" className="w-6 h-6">
                <ellipse cx="16" cy="13" rx="3.5" ry="3" fill="white"/>
                <ellipse cx="16" cy="19" rx="4.5" ry="5" fill="white"/>
                <path d="M12.5 13 Q8 9 5 7" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
                <path d="M12.5 14.5 Q7 13 4 12" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
                <path d="M11.5 18 Q7 19 4 20" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
                <path d="M12 21 Q8 24 5 27" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
                <path d="M19.5 13 Q24 9 27 7" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
                <path d="M19.5 14.5 Q25 13 28 12" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
                <path d="M20.5 18 Q25 19 28 20" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
                <path d="M20 21 Q24 24 27 27" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-white font-bold text-sm sm:text-base tracking-wider uppercase hidden sm:block">
              Spider-Man
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors uppercase tracking-widest font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Mobile menu */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.marvel.com/movies/spider-man-brand-new-day"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-spider-red hover:bg-spider-red-dark text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95"
            >
              <Ticket className="w-4 h-4" />
              Get Tickets
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark-900/95 backdrop-blur-xl border-t border-white/5">
          <div className="px-4 py-4 space-y-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-gray-300 hover:text-white text-sm uppercase tracking-widest py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://www.marvel.com/movies/spider-man-brand-new-day"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-spider-red hover:bg-spider-red-dark text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all mt-2"
            >
              Get Tickets
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

/* ─────────────── Hero Section ─────────────── */
function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Background image — show only the top ~60% of the image (title + Spider-Man) */}
      <div className="absolute inset-0">
        <img
          src={MOVIE.images.hero}
          alt="Spider-Man: Brand New Day"
          className="w-full h-[50%] sm:h-[60%] lg:h-[70%] object-cover object-[center_20%]"
          loading="eager"
        />
        {/* Solid dark fill below the cropped image */}
        <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-dark-900" />
        {/* Gradient to seamlessly blend image into the dark area */}
        <div className="absolute top-[40%] left-0 right-0 h-[35%] bg-gradient-to-b from-transparent to-dark-900" />
      </div>

      {/* Spacer to push content to bottom */}
      <div className="flex-1" />

      {/* Content — anchored to bottom of viewport */}
      <div
        className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 text-center transition-all duration-1000 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Tagline */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 font-light tracking-wide mb-6 max-w-2xl mx-auto">
          {MOVIE.tagline}
        </p>

        {/* Meta pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/10 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-spider-red" />
            {MOVIE.releaseDate}
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/10 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
            <Film className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-spider-red" />
            {MOVIE.rating}
          </span>
          {MOVIE.genres.map((g) => (
            <span
              key={g}
              className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/10 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
            >
              {g}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href="#trailer"
            className="group inline-flex items-center gap-3 bg-spider-red hover:bg-spider-red-dark text-white font-bold text-sm sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all hover:scale-105 active:scale-95 animate-pulse-glow"
          >
            <Play className="w-5 h-5 fill-white" />
            Watch Trailer
          </a>
          <a
            href="#synopsis"
            className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/20 text-white font-semibold text-sm sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all hover:scale-105 active:scale-95"
          >
            Learn More
            <ChevronDown className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 pb-6 flex justify-center animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/40" />
      </div>
    </section>
  )
}

/* ─────────────── Synopsis Section ─────────────── */
function Synopsis() {
  const { ref, isInView } = useInView(0.2)

  return (
    <section
      id="synopsis"
      ref={ref}
      className="relative py-24 sm:py-32 web-pattern"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Poster */}
          <div
            className={`transition-all duration-1000 ${
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-spider-red/20 to-spider-blue/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-60" />
              <img
                src={MOVIE.images.poster}
                alt="Spider-Man: Brand New Day Poster"
                className="relative w-full max-w-md mx-auto rounded-xl shadow-2xl shadow-black/50 group-hover:scale-[1.02] transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>

          {/* Text */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <span className="text-spider-red text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
              The Story
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              A Hero Reborn.
              <br />
              <span className="text-gradient-red">A Legend Tested.</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-6">
              {MOVIE.synopsis}
            </p>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              {MOVIE.synopsis2}
            </p>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-xl p-4">
                <p className="text-spider-red text-xs uppercase tracking-widest mb-1">
                  Director
                </p>
                <p className="text-white font-semibold">{MOVIE.director}</p>
              </div>
              <div className="glass rounded-xl p-4">
                <p className="text-spider-red text-xs uppercase tracking-widest mb-1">
                  Studio
                </p>
                <p className="text-white font-semibold text-sm">
                  Marvel Studios
                </p>
              </div>
              <div className="glass rounded-xl p-4">
                <p className="text-spider-red text-xs uppercase tracking-widest mb-1">
                  Producers
                </p>
                <p className="text-white font-semibold text-sm">
                  {MOVIE.producers.join(", ")}
                </p>
              </div>
              <div className="glass rounded-xl p-4">
                <p className="text-spider-red text-xs uppercase tracking-widest mb-1">
                  In Theaters
                </p>
                <p className="text-white font-semibold">{MOVIE.releaseDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────── Trailer Section ─────────────── */
function Trailer() {
  const { ref, isInView } = useInView(0.1)
  const [playing, setPlaying] = useState(false)

  return (
    <section
      id="trailer"
      ref={ref}
      className="relative py-24 sm:py-32 bg-dark-800"
    >
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-spider-red/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-spider-red text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
            Official Trailer
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Watch the{" "}
            <span className="text-gradient-red">First Look</span>
          </h2>
        </div>

        {/* Video container */}
        <div
          className={`relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-black/50 transition-all duration-1000 delay-200 ${
            isInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {!playing ? (
            <div className="relative w-full h-full cursor-pointer group" onClick={() => setPlaying(true)}>
              <img
                src={MOVIE.images.trailerThumb}
                alt="Watch Spider-Man: Brand New Day Trailer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-spider-red/90 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-spider-red transition-all shadow-2xl shadow-spider-red/30">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8">
                <p className="text-white/80 text-sm sm:text-base font-medium">
                  Spider-Man: Brand New Day — Official Trailer
                </p>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <iframe
                src={`${MOVIE.trailerUrl}?autoplay=1&rel=0&modestbranding=1`}
                title="Spider-Man: Brand New Day Official Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
              <button
                onClick={() => setPlaying(false)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
                aria-label="Close trailer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Trailer stats */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-12 mt-10">
          {[
            { label: "Views in 24hrs", value: "500M+" },
            { label: "Record Broken", value: "GTA 6" },
            { label: "Most Watched", value: "#1 Trailer" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">
                {stat.value}
              </p>
              <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-widest mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────── Cast Section ─────────────── */
function CastCard({
  member,
  index,
  isInView,
}: {
  member: (typeof MOVIE.cast)[number]
  index: number
  isInView: boolean
}) {
  const [imgError, setImgError] = useState(false)

  return (
    <div
      className={`group relative transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="relative overflow-hidden rounded-xl bg-dark-700 shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-spider-red/10 transition-all duration-500">
        {/* Image */}
        <div className="aspect-[2/3] overflow-hidden">
          {!imgError && member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full bg-dark-600 flex items-center justify-center">
              <span className="text-4xl font-bold text-dark-500">
                {member.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-white font-bold text-sm sm:text-base truncate">
            {member.name}
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm mt-0.5 truncate">
            {member.role}
          </p>
        </div>

        {/* Hover accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-spider-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </div>
  )
}

function Cast() {
  const { ref, isInView } = useInView(0.05)

  return (
    <section id="cast" ref={ref} className="relative py-24 sm:py-32 web-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-spider-red text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
            The Cast
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Meet the <span className="text-gradient-red">Heroes & Villains</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {MOVIE.cast.map((member, i) => (
            <CastCard key={member.name} member={member} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────── Details Section ─────────────── */
function Details() {
  const { ref, isInView } = useInView(0.1)

  return (
    <section
      id="details"
      ref={ref}
      className="relative py-24 sm:py-32 bg-dark-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-spider-red text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
            Movie Info
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Film <span className="text-gradient-red">Details</span>
          </h2>
        </div>

        <div
          className={`grid md:grid-cols-3 gap-6 transition-all duration-1000 delay-200 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Card 1 - Production */}
          <div className="glass rounded-2xl p-8 hover:border-spider-red/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-spider-red/10 flex items-center justify-center mb-5 group-hover:bg-spider-red/20 transition-colors">
              <Film className="w-6 h-6 text-spider-red" />
            </div>
            <h3 className="text-white font-bold text-xl mb-4">Production</h3>
            <dl className="space-y-3">
              {[
                ["Director", MOVIE.director],
                ["Producers", MOVIE.producers.join(", ")],
                ["Studio", MOVIE.studio],
                ["Rating", MOVIE.rating],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-gray-500 text-xs uppercase tracking-widest">
                    {label}
                  </dt>
                  <dd className="text-gray-300 text-sm mt-0.5">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Card 2 - Release */}
          <div className="glass rounded-2xl p-8 hover:border-spider-red/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-spider-red/10 flex items-center justify-center mb-5 group-hover:bg-spider-red/20 transition-colors">
              <Calendar className="w-6 h-6 text-spider-red" />
            </div>
            <h3 className="text-white font-bold text-xl mb-4">Release</h3>
            <dl className="space-y-3">
              {[
                ["US Release", MOVIE.releaseDate],
                ["Format", "IMAX, Dolby Atmos, 3D, Standard"],
                ["Distribution", "Sony Pictures / Disney"],
                ["Genres", MOVIE.genres.join(", ")],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-gray-500 text-xs uppercase tracking-widest">
                    {label}
                  </dt>
                  <dd className="text-gray-300 text-sm mt-0.5">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Card 3 - MCU Timeline */}
          <div className="glass rounded-2xl p-8 hover:border-spider-red/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-spider-red/10 flex items-center justify-center mb-5 group-hover:bg-spider-red/20 transition-colors">
              <Clock className="w-6 h-6 text-spider-red" />
            </div>
            <h3 className="text-white font-bold text-xl mb-4">MCU Timeline</h3>
            <dl className="space-y-3">
              {[
                ["Follows", "Spider-Man: No Way Home (2021)"],
                ["MCU Phase", "Phase Six"],
                ["Timeline", "4 years after No Way Home"],
                ["Connections", "Avengers, Daredevil, Punisher"],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-gray-500 text-xs uppercase tracking-widest">
                    {label}
                  </dt>
                  <dd className="text-gray-300 text-sm mt-0.5">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────── Countdown ─────────────── */
function Countdown() {
  const target = new Date("2026-07-31T00:00:00").getTime()

  const calcTimeLeft = useCallback(() => {
    const diff = target - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }, [target])

  const [timeLeft, setTimeLeft] = useState(calcTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [calcTimeLeft])

  const { ref, isInView } = useInView(0.2)

  return (
    <section ref={ref} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={MOVIE.images.hero}
          alt=""
          className="w-full h-full object-cover object-center opacity-20"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm" />
      </div>

      <div
        className={`relative max-w-4xl mx-auto px-4 sm:px-6 text-center transition-all duration-1000 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <span className="text-spider-red text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
          Coming Soon
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-12">
          Swinging Into Theaters In
        </h2>

        <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-lg mx-auto mb-12">
          {(
            [
              ["days", timeLeft.days],
              ["hours", timeLeft.hours],
              ["minutes", timeLeft.minutes],
              ["seconds", timeLeft.seconds],
            ] as const
          ).map(([label, value]) => (
            <div key={label} className="glass rounded-2xl p-4 sm:p-6">
              <div className="text-3xl sm:text-5xl font-bold text-white tabular-nums">
                {String(value).padStart(2, "0")}
              </div>
              <div className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-widest mt-2">
                {label}
              </div>
            </div>
          ))}
        </div>

        <a
          href="https://www.marvel.com/movies/spider-man-brand-new-day"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-spider-red hover:bg-spider-red-dark text-white font-bold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 active:scale-95"
        >
          <Ticket className="w-5 h-5" />
          Get Tickets on Marvel.com
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </section>
  )
}

/* ─────────────── Footer ─────────────── */
function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-white/5 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div>
            <img
              src={MOVIE.images.logo}
              alt="Spider-Man: Brand New Day"
              className="w-48 mb-4"
              loading="lazy"
            />
            <p className="text-gray-500 text-sm leading-relaxed">
              The official fan site for Spider-Man: Brand New Day. In theaters{" "}
              {MOVIE.releaseDate}.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Synopsis", href: "#synopsis" },
                { label: "Trailer", href: "#trailer" },
                { label: "Cast", href: "#cast" },
                { label: "Details", href: "#details" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Official */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
              Official Links
            </h4>
            <ul className="space-y-2">
              {[
                {
                  label: "Marvel.com",
                  href: "https://www.marvel.com/movies/spider-man-brand-new-day",
                },
                {
                  label: "Watch Trailer on YouTube",
                  href: "https://youtu.be/8TZMtslA3UY",
                },
                {
                  label: "IMDb",
                  href: "https://www.imdb.com/title/tt22084616/",
                },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} spidermanbrandnewday.app — Fan site. Not affiliated with Marvel Studios or Sony Pictures.
          </p>
          <p className="text-gray-600 text-xs">
            All images &copy; Marvel Studios / Sony Pictures
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ─────────────── App ─────────────── */
export default function App() {
  return (
    <div className="min-h-screen bg-dark-900 text-white font-sans">
      <Navbar />
      <Hero />
      <Synopsis />
      <Trailer />
      <Cast />
      <Details />
      <Countdown />
      <Footer />
    </div>
  )
}
