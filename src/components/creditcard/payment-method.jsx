import { Card } from "@/components/ui/card"
import { Pencil, Plus } from "lucide-react"

export default function PaymentMethods() {
  return (
    <Card className="w-full h-auto p-6 bg-zinc-200 rounded-xl shadow-md flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-semibold text-zinc-800">Payment Method</h3>

        <button className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm">
          <Plus size={16} />
          ADD NEW CARD
        </button>
      </div>

      {/* Cards list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

        {/* Mastercard */}
        <div className="flex items-center justify-between bg-zinc-300 px-5 py-4 rounded-lg">
          <div className="flex items-center gap-4">
            {/* Mastercard logo */}
            <div className="flex">
              <span className="w-6 h-6 bg-red-500 rounded-full" />
              <span className="w-6 h-6 bg-yellow-400 rounded-full -ml-3" />
            </div>

            <p className="text-sm font-medium text-zinc-800">
              **** **** **** 7852
            </p>
          </div>

          <Pencil size={18} className="text-zinc-700 cursor-pointer" />
        </div>

        {/* Visa */}
        <div className="flex items-center justify-between bg-zinc-300 px-5 py-4 rounded-lg">
          <div className="flex items-center gap-4">
            <span className="font-bold italic text-blue-700">VISA</span>

            <p className="text-sm font-medium text-zinc-800">
              **** **** **** 5248
            </p>
          </div>

          <Pencil size={18} className="text-zinc-700 cursor-pointer" />
        </div>

      </div>
    </Card>
  )
}
