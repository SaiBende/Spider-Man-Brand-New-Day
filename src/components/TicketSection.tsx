import { useState, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import domtoimage from "dom-to-image-more"
import { useInView } from "../hooks/useInView"
import TicketForm from "./TicketForm"
import TicketPreview from "./TicketPreview"
import DownloadButton from "./DownloadButton"
import ShareModal from "./ShareModal"

function generateBookingId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let id = "SMB-"
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)]
  }
  return id
}

function generateRandomSeat() {
  const row = String.fromCharCode(65 + Math.floor(Math.random() * 15))
  const num = Math.floor(Math.random() * 30) + 1
  return `${row}${num}`
}

export default function TicketSection() {
  const [name, setName] = useState("")
  const [city, setCity] = useState("")
  const [theatre, setTheatre] = useState("")
  const [format, setFormat] = useState("IMAX")
  const [date, setDate] = useState("July 31, 2026")
  const [time, setTime] = useState("")
  const [seat, setSeat] = useState("")
  const [bookingId, setBookingId] = useState("")
  const [ticketGenerated, setTicketGenerated] = useState(false)
  const [animKey, setAnimKey] = useState(0)
  const [showShareModal, setShowShareModal] = useState(false)
  const [copied, setCopied] = useState(false)
  const { ref } = useInView(0.1)

  const handleGenerateSeat = useCallback(() => {
    setSeat(generateRandomSeat())
  }, [])

  const handleGenerateTicket = useCallback(() => {
    if (!bookingId) {
      setBookingId(generateBookingId())
    }
    if (!seat) {
      setSeat(generateRandomSeat())
    }
    if (!time) {
      const times = ["10:30 AM", "1:00 PM", "4:00 PM", "7:30 PM", "10:45 PM"]
      setTime(times[Math.floor(Math.random() * times.length)])
    }
    setTicketGenerated(true)
    setAnimKey((k) => k + 1)

    // Show share modal after short delay (let ticket animation play)
    setTimeout(() => setShowShareModal(true), 600)
  }, [bookingId, seat, time])

  const handleDownload = useCallback(async () => {
    const el = document.querySelector("[data-ticket-preview]") as HTMLElement
    if (!el) return

    // Inline font CSS so dom-to-image can read @font-face rules
    const fontStyle = document.createElement("style")
    fontStyle.id = "capture-font-css"
    try {
      const res = await fetch(
        "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Bebas+Neue&family=Poppins:wght@400;500;600;700;800&display=swap"
      )
      fontStyle.textContent = await res.text()
      document.head.appendChild(fontStyle)
    } catch {
      // font fetch failed, proceed without inline fonts
    }

    // Suppress dom-to-image's noisy cross-origin CSS warnings
    const origError = console.error
    console.error = () => {}

    try {
      const dataUrl = await domtoimage.toPng(el, {
        width: el.offsetWidth * 3,
        height: el.offsetHeight * 3,
        style: {
          transform: "scale(3)",
          transformOrigin: "top left",
        },
        quality: 1,
      })
      console.error = origError
      const fs = document.getElementById("capture-font-css")
      if (fs) fs.remove()

      const link = document.createElement("a")
      link.download = "spider-verse-fan-pass.png"
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error = origError
      const fs = document.getElementById("capture-font-css")
      if (fs) fs.remove()
      console.error("Download failed:", err)
    }
  }, [])

  const handleCopied = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [])

  // Reset copied state when modal opens
  useEffect(() => {
    if (showShareModal) setCopied(false)
  }, [showShareModal])

  return (
    <section
      id="fanpass"
      ref={ref}
      className="relative py-24 sm:py-32 bg-dark-800 overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-spider-red/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-spider-blue/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-spider-red text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
            Your Pass
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Spider-Verse{" "}
            <span className="text-gradient-red">Fan Pass</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left — Form */}
          <TicketForm
            name={name}
            city={city}
            theatre={theatre}
            format={format}
            date={date}
            time={time}
            seat={seat}
            ticketGenerated={ticketGenerated}
            onNameChange={setName}
            onCityChange={setCity}
            onTheatreChange={setTheatre}
            onFormatChange={setFormat}
            onDateChange={setDate}
            onTimeChange={setTime}
            onSeatChange={setSeat}
            onGenerateSeat={handleGenerateSeat}
            onGenerateTicket={handleGenerateTicket}
          />

          {/* Right — Preview + Download */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div data-ticket-preview>
              <TicketPreview
                name={name}
                city={city}
                theatre={theatre}
                format={format}
                date={date}
                time={time}
                seat={seat}
                bookingId={bookingId}
                animKey={animKey}
              />
            </div>

            <DownloadButton
              ticketGenerated={ticketGenerated}
              name={name}
            />
          </motion.div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        open={showShareModal}
        onClose={() => setShowShareModal(false)}
        onDownload={handleDownload}
        onCopied={handleCopied}
        copied={copied}
        name={name}
      />
    </section>
  )
}
