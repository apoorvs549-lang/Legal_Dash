import { Card, CardContent } from "@/components/ui/card"
import { Wifi } from "lucide-react"
import pattern from "@/assets/images/pattern-tree.svg"

export default function Creditcard({
  cardNumber,
  holderName,
  expiry,
}) {
  return (
    <Card className="relative w-full h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-800 text-white shadow-xl">

      {/* 🔹 GLOW LAYER (bottom) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_60%)]" />

      {/* ⚡ LIGHTNING SVG (middle) */}
      <img
        src={pattern}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none z-[1]"
      />

      {/* 🧾 CONTENT (top) */}
      <CardContent className="p-6 h-full flex flex-col justify-between relative z-10">

        {/* top section */}
        <div className="flex justify-between items-center">
          <Wifi className="rotate-90 text-white/80" size={22} />
        </div>

        {/* card number */}
        <div className="text-lg tracking-widest font-medium">
          {cardNumber}
        </div>

        {/* bottom section */}
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs text-white/60">Card Holder</p>
            <p className="font-semibold">{holderName}</p>
          </div>

          <div>
            <p className="text-xs text-white/60">Expires</p>
            <p className="font-semibold">{expiry}</p>
          </div>

          {/* Mastercard logo */}
          <div className="flex items-center">
            <span className="w-8 h-8 bg-red-500 rounded-full opacity-90" />
            <span className="w-8 h-8 bg-yellow-400 rounded-full -ml-4 opacity-90" />
          </div>
        </div>

      </CardContent>
    </Card>
  )
}

