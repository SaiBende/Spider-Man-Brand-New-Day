import { type ChangeEvent } from "react"
import { motion } from "framer-motion"
import { Sparkles, Ticket, Shuffle } from "lucide-react"

const FORMATS = ["IMAX", "4DX", "Dolby Cinema", "3D", "2D"]

interface TicketFormProps {
  name: string
  city: string
  theatre: string
  format: string
  date: string
  time: string
  seat: string
  ticketGenerated: boolean
  onNameChange: (v: string) => void
  onCityChange: (v: string) => void
  onTheatreChange: (v: string) => void
  onFormatChange: (v: string) => void
  onDateChange: (v: string) => void
  onTimeChange: (v: string) => void
  onSeatChange: (v: string) => void
  onGenerateSeat: () => void
  onGenerateTicket: () => void
}

export default function TicketForm({
  name,
  city,
  theatre,
  format,
  date,
  time,
  seat,
  ticketGenerated,
  onNameChange,
  onCityChange,
  onTheatreChange,
  onFormatChange,
  onDateChange,
  onTimeChange,
  onSeatChange,
  onGenerateSeat,
  onGenerateTicket,
}: TicketFormProps) {
  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-spider-red/50 focus:ring-1 focus:ring-spider-red/30 transition-all"

  const labelClass = "block text-gray-400 text-xs uppercase tracking-widest mb-1.5 font-poppins"

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-3 font-display tracking-wide">
          <span className="text-gradient-red">SPIDER-VERSE</span>{" "}
          <span className="text-white">FAN PASS</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
          Create your personalized collectible fan pass. Fill in the details
          below and watch your ticket come to life.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className={labelClass}>Your Name</label>
          <input
            type="text"
            placeholder="e.g. Miles Morales"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onNameChange(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>City</label>
          <input
            type="text"
            placeholder="e.g. New York"
            value={city}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onCityChange(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Favourite Theatre</label>
          <input
            type="text"
            placeholder="e.g. AMC Empire 25"
            value={theatre}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onTheatreChange(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Movie Format</label>
          <select
            value={format}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => onFormatChange(e.target.value)}
            className={inputClass + " appearance-none cursor-pointer"}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              paddingRight: "36px",
            }}
          >
            {FORMATS.map((f) => (
              <option key={f} value={f} className="bg-dark-800 text-white">
                {f}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Show Date</label>
            <input
              type="text"
              value={date}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onDateChange(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Show Time</label>
            <input
              type="text"
              placeholder="e.g. 7:30 PM"
              value={time}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onTimeChange(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Seat Number</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. H12"
              value={seat}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onSeatChange(e.target.value)}
              className={inputClass}
            />
            <button
              type="button"
              onClick={onGenerateSeat}
              className="shrink-0 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl px-4 text-gray-300 hover:text-white transition-all flex items-center gap-2 text-sm"
              title="Generate random seat"
            >
              <Shuffle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <motion.button
        type="button"
        onClick={onGenerateTicket}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full flex items-center justify-center gap-3 font-bold text-sm sm:text-base px-6 py-4 rounded-xl transition-all ${
          ticketGenerated && name
            ? "bg-spider-red/20 border border-spider-red/30 text-spider-red cursor-default"
            : "bg-spider-red hover:bg-spider-red-dark text-white shadow-lg shadow-spider-red/20 hover:shadow-spider-red/30"
        }`}
      >
        {ticketGenerated && name ? (
          <>
            <Sparkles className="w-5 h-5" />
            Ticket Generated!
          </>
        ) : (
          <>
            <Ticket className="w-5 h-5" />
            Generate Your Fan Pass
          </>
        )}
      </motion.button>
    </motion.div>
  )
}
