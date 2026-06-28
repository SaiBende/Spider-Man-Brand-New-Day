import { forwardRef, useState, useEffect, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import QRCode from "qrcode"
import { MOVIE } from "../data/movieData"

interface TicketPreviewProps {
  name: string
  city: string
  theatre: string
  format: string
  date: string
  time: string
  seat: string
  bookingId: string
  animKey: number
}

const TicketPreview = forwardRef<HTMLDivElement, TicketPreviewProps>(
  (
    { name, city, theatre, format, date, time, seat, bookingId, animKey },
    ref
  ) => {
    const [qrDataUrl, setQrDataUrl] = useState("")
    const [rotate, setRotate] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)
    const [imgLoaded, setImgLoaded] = useState(false)
    const ticketInnerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      QRCode.toDataURL("https://spidermanbrandnewday.app", {
        width: 160,
        margin: 1,
        color: { dark: "#e62429", light: "#ffffff00" },
      }).then(setQrDataUrl)
    }, [])

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      const el = ticketInnerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -4
      const rotateY = ((x - centerX) / centerX) * 4
      setRotate({ x: rotateX, y: rotateY })
    }, [])

    const handleMouseLeave = useCallback(() => {
      setRotate({ x: 0, y: 0 })
      setIsHovered(false)
    }, [])

    return (
      <motion.div
        key={animKey}
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-full sm:max-w-[420px] mx-auto"
        ref={ref}
      >
        <div
          ref={ticketInnerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          className="relative overflow-hidden rounded-[16px] transition-transform duration-200 ease-out cursor-default"
          style={{
            transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Glow */}
          <div
            className={`absolute -inset-2 rounded-[20px] transition-all duration-700 ${
              isHovered ? "opacity-100 blur-xl" : "opacity-20 blur-lg"
            }`}
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(230,36,41,0.2), transparent)",
              zIndex: -1,
            }}
          />

          {/* Ticket card */}
          <div className="relative bg-white rounded-[16px] shadow-xl shadow-black/10 border border-gray-200 overflow-hidden">
            {/* ===== TOP: Poster strip ===== */}
            <div className="relative h-[200px] sm:h-[240px] overflow-hidden bg-gray-100">
              {!imgLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
              )}
              <img
                src={MOVIE.images.poster}
                alt=""
                crossOrigin="anonymous"
                className={`w-full h-full object-cover object-center transition-all duration-700 ${
                  imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
                loading="eager"
                onLoad={() => setImgLoaded(true)}
              />
              {/* Badge on image */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
                <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-full px-4 py-1 flex items-center gap-2 shadow-lg shadow-black/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-spider-red animate-pulse" />
                  <span className="text-[9px] text-gray-700 uppercase tracking-[0.25em] font-semibold font-poppins">
                    First Day · First Show
                  </span>
                </div>
              </div>
            </div>

            {/* ===== DASHED PERFORATION ===== */}
            <div className="relative h-6 flex items-center justify-center bg-white">
              <div
                className="absolute left-0 right-0 border-t-2 border-dashed border-gray-200"
                style={{ borderImageRepeat: "round", borderImageSlice: "2" }}
              />
              {/* Perforation dots */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-100 border border-gray-200" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-100 border border-gray-200" />
              {/* Circle cutouts along perforation */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-gray-100"
                  style={{
                    left: `calc(${(i + 1) * 12}% + 8px)`,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
              ))}
              {/* Center icon */}
              <div className="relative w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center z-10 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-spider-red shadow-sm" />
              </div>
            </div>

            {/* ===== BOTTOM: Ticket Content ===== */}
            <div className="px-5 sm:px-6 pb-4 bg-white">
              {/* Title */}
              <div className="text-center mt-1 mb-3">
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-wide leading-none font-display">
                  SPIDER-MAN
                </h3>
                <p className="text-base sm:text-lg font-bold text-gray-600 -mt-0.5 font-display tracking-wide">
                  BRAND NEW DAY
                </p>
                <div className="mt-1.5">
                  <span className="text-[8px] text-spider-red font-bold uppercase tracking-[0.3em] font-poppins bg-spider-red/5 px-4 py-0.5 rounded-full border border-spider-red/15 inline-block">
                    ★ Fan Ticket ★
                  </span>
                </div>
              </div>

              {/* Divider line */}
              <div className="border-t border-gray-100 mb-3" />

              {/* Issued To */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[9px] text-gray-400 uppercase tracking-widest shrink-0 font-poppins font-semibold w-14">
                  Issued To
                </span>
                <span className="text-sm font-bold text-gray-900 font-poppins">
                  {name || "Your Name Here"}
                </span>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-1.5 mb-2">
                {[
                  { label: "City", value: city },
                  { label: "Theatre", value: theatre },
                  { label: "Seat", value: seat },
                  { label: "Format", value: format },
                  { label: "Date", value: date },
                  { label: "Time", value: time },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-gray-50 rounded-lg border border-gray-100 px-3 py-1.5"
                  >
                    <span className="text-[7px] text-gray-400 uppercase tracking-widest block font-poppins font-semibold">
                      {item.label}
                    </span>
                    <span className="text-[11px] font-bold text-gray-900 font-poppins">
                      {item.value || "—"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider line */}
              <div className="border-t border-gray-100 mb-2" />

              {/* Booking + Status + QR */}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="text-[8px] text-gray-400 uppercase tracking-widest block font-poppins font-semibold">
                    Booking ID
                  </span>
                  <span className="text-xs font-bold text-gray-900 tracking-wider font-mono">
                    {bookingId || "SMB-XXXXXX"}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[8px] text-gray-400 uppercase tracking-widest block font-poppins font-semibold">
                    Status
                  </span>
                  <span className="text-[11px] font-bold text-gray-900 flex items-center gap-1 font-poppins">
                    TRUE BELIEVER ✅
                  </span>
                </div>
              </div>

              {/* QR + watermark */}
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
                <div className="shrink-0 w-9 h-9 rounded-md bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden">
                  {qrDataUrl ? (
                    <img src={qrDataUrl} alt="QR Code" className="w-7 h-7" />
                  ) : (
                    <div className="w-6 h-6 border-2 border-gray-200 rounded" />
                  )}
                </div>
                <div className="text-[7px] text-gray-400 leading-tight font-poppins">
                  Generated by
                  <br />
                  <span className="text-gray-500 font-medium text-[8px]">
                    spidermanbrandnewday.app
                  </span>
                </div>
                <div className="ml-auto text-[8px] text-gray-300 font-poppins text-right leading-tight">
                  This is a fan-made
                  <br />
                  collectible
                </div>
              </div>
            </div>

            {/* Bottom red accent strip */}
            <div className="h-[3px] bg-gradient-to-r from-spider-red via-spider-red/60 to-spider-blue" />
          </div>
        </div>
      </motion.div>
    )
  }
)

TicketPreview.displayName = "TicketPreview"

export default TicketPreview
