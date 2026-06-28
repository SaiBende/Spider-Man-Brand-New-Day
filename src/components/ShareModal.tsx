import { useCallback, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Download,
  Twitter,
  MessageCircle,
  Send,
  Link,
  Check,
  Share2,
  X,
  Mail,
  Globe,
} from "lucide-react"

interface ShareModalProps {
  open: boolean
  onClose: () => void
  onDownload: () => void
  onCopied: () => void
  copied: boolean
  name: string
}

const shareUrl = typeof window !== "undefined" ? window.location.href : ""
const shareText = encodeURIComponent(
  "🕷️ I just created my Spider-Verse Fan Pass! Create yours at"
)

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
    </svg>
  )
}

const shareLinks = [
  {
    label: "Instagram",
    icon: InstagramIcon,
    color: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] hover:from-[#722da3] hover:via-[#e01a1a] hover:to-[#f09e3a]",
    action: "download" as const,
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`,
    icon: MessageCircle,
    color: "bg-[#25D366] hover:bg-[#1da851]",
    action: "link" as const,
  },
  {
    label: "X (Twitter)",
    href: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`,
    icon: Twitter,
    color: "bg-[#1DA1F2] hover:bg-[#1a8cd8]",
    action: "link" as const,
  },
  {
    label: "Facebook",
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    icon: () => (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    color: "bg-[#1877F2] hover:bg-[#166fe5]",
    action: "link" as const,
  },
  {
    label: "Telegram",
    href: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${shareText}`,
    icon: Send,
    color: "bg-[#0088cc] hover:bg-[#0077b5]",
    action: "link" as const,
  },
  {
    label: "Reddit",
    href: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent("Spider-Verse Fan Pass")}`,
    icon: Globe,
    color: "bg-[#FF4500] hover:bg-[#e03d00]",
    action: "link" as const,
  },
  {
    label: "Email",
    href: `mailto:?subject=${encodeURIComponent("Spider-Verse Fan Pass")}&body=${shareText}%20${encodeURIComponent(shareUrl)}`,
    icon: Mail,
    color: "bg-gray-600 hover:bg-gray-500",
    action: "link" as const,
  },
]

export default function ShareModal({
  open,
  onClose,
  onDownload,
  onCopied,
  copied,
  name,
}: ShareModalProps) {
  const [instagramDone, setInstagramDone] = useState(false)

  const handleInstagram = useCallback(() => {
    onDownload()
    // Open the Instagram app directly (deep link) or fall back to web
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    if (isMobile) {
      // Try deep link to open Instagram app
      const deepLink = "instagram://library"
      const iframe = document.createElement("iframe")
      iframe.style.display = "none"
      iframe.src = deepLink
      document.body.appendChild(iframe)
      setTimeout(() => document.body.removeChild(iframe), 3000)
    } else {
      window.open("https://www.instagram.com/", "_blank", "noopener")
    }
    setInstagramDone(true)
    setTimeout(() => setInstagramDone(false), 4000)
  }, [onDownload])

  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Spider-Verse Fan Pass",
          text: `🕷️ I just created my Spider-Verse Fan Pass! Create yours at`,
          url: shareUrl,
        })
      } catch {
        // user cancelled
      }
    } else {
      onCopied()
    }
  }, [onCopied])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-sm bg-dark-800 border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
          >
            {/* Top accent */}
            <div className="h-1 bg-gradient-to-r from-spider-red via-spider-red/70 to-transparent" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="px-6 pt-6 pb-5">
              {/* Header */}
              <div className="text-center mb-5">
                <div className="w-12 h-12 mx-auto rounded-full bg-spider-red/10 border border-spider-red/20 flex items-center justify-center mb-3">
                  <Share2 className="w-6 h-6 text-spider-red" />
                </div>
                <h3 className="text-lg font-bold text-white font-poppins">
                  Share Your Fan Pass
                </h3>
                <p className="text-xs text-gray-400 mt-1 font-poppins">
                  {name
                    ? `${name}'s Spider-Verse Fan Pass`
                    : "Your Spider-Verse Fan Pass"}
                </p>
              </div>

              {/* Share buttons grid */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {shareLinks.map((link) =>
                  link.action === "download" ? (
                    <button
                      key={link.label}
                      onClick={handleInstagram}
                      className="flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 relative"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${link.color} shadow-lg transition-transform`}
                      >
                        <link.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[9px] text-gray-400 font-medium font-poppins">
                        {instagramDone ? "Saved!" : link.label}
                      </span>
                      {instagramDone && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white shadow-lg">
                          ✓
                        </span>
                      )}
                    </button>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all hover:scale-105 active:scale-95"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${link.color} shadow-lg transition-transform`}
                      >
                        <link.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-[9px] text-gray-400 font-medium font-poppins">
                        {link.label}
                      </span>
                    </a>
                  )
                )}

                {/* Copy Link */}
                <button
                  onClick={onCopied}
                  className="flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all hover:scale-105 active:scale-95"
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center shadow-lg transition-colors">
                    {copied ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <Link className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <span className="text-[9px] text-gray-400 font-medium font-poppins">
                    {copied ? "Copied!" : "Copy Link"}
                  </span>
                </button>

                {/* Download */}
                <button
                  onClick={onDownload}
                  className="flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all hover:scale-105 active:scale-95"
                >
                  <div className="w-10 h-10 rounded-full bg-spider-red/20 border border-spider-red/30 flex items-center justify-center shadow-lg transition-colors hover:bg-spider-red/30">
                    <Download className="w-5 h-5 text-spider-red" />
                  </div>
                  <span className="text-[9px] text-gray-400 font-medium font-poppins">
                    Download
                  </span>
                </button>
              </div>

              {/* Toast for Instagram */}
              <AnimatePresence>
                {instagramDone && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="text-center text-[10px] text-green-400 font-poppins mb-3 bg-green-500/10 border border-green-500/20 rounded-lg py-2"
                  >
                    📸 Image saved!{" "}
                    {/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
                      ? "Opening Instagram — post from your gallery!"
                      : "Post it on Instagram from your gallery!"}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Native Share button (mobile) */}
              {"share" in navigator && typeof navigator.share === "function" && (
                <button
                  onClick={handleNativeShare}
                  className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white text-sm font-bold py-3 rounded-xl transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  More Share Options
                </button>
              )}
            </div>

            {/* Bottom accent */}
            <div className="h-1 bg-gradient-to-r from-transparent via-spider-blue/70 to-spider-blue" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
