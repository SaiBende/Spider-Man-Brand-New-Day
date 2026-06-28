import { useCallback, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Download, Link, Twitter, MessageCircle, Check, Loader } from "lucide-react"
import domtoimage from "dom-to-image-more"

interface DownloadButtonProps {
  ticketGenerated: boolean
  name: string
}

export default function DownloadButton({ ticketGenerated, name }: DownloadButtonProps) {
  const [downloading, setDownloading] = useState(false)
  const [copied, setCopied] = useState(false)
  const ticketSectionRef = useRef<HTMLDivElement>(null)

  const handleDownload = useCallback(async () => {
    if (!ticketGenerated || !name) return
    setDownloading(true)

    try {
      const el = document.querySelector('[data-ticket-preview]') as HTMLElement
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
      console.error("Download failed:", err)
    } finally {
      setDownloading(false)
    }
  }, [ticketGenerated, name])

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [])

  const shareText = encodeURIComponent(
    "🕷️ I just created my Spider-Verse Fan Pass! Create yours at"
  )

  return (
    <div ref={ticketSectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-2 mt-4"
      >
        <motion.button
          type="button"
          onClick={handleDownload}
          disabled={!ticketGenerated || !name || downloading}
          whileHover={ticketGenerated && name ? { scale: 1.05 } : {}}
          whileTap={ticketGenerated && name ? { scale: 0.95 } : {}}
          className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition-all ${
            ticketGenerated && name
              ? "bg-spider-red hover:bg-spider-red-dark text-white shadow-lg shadow-spider-red/20 cursor-pointer"
              : "bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed"
          }`}
        >
          {downloading ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {downloading ? "Processing…" : "Download PNG"}
        </motion.button>

        <motion.button
          type="button"
          onClick={handleCopyLink}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Link className="w-4 h-4" />
          )}
          {copied ? "Copied!" : "Copy Link"}
        </motion.button>

        <motion.a
          href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(window.location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
        >
          <Twitter className="w-4 h-4" />
          Share on X
        </motion.a>

        <motion.a
          href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(window.location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          Share on WhatsApp
        </motion.a>
      </motion.div>
    </div>
  )
}
