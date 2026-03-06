import { Card } from "@/components/ui/card"
import { Pencil, Trash } from "lucide-react"

export default function BillingInformation() {
  return (
    <Card className="mt-6 p-6 bg-zinc-200 rounded-xl shadow-md">

      {/* Section title */}
      <h3 className="font-semibold text-zinc-800 mb-4">
        Billing Information
      </h3>

      <div className="space-y-4">

        {/* Item 1 */}
        <div className="bg-zinc-300 rounded-lg p-5 flex justify-between">
          <div>
            <h4 className="font-semibold text-zinc-800 mb-2">
              Oliver Liam
            </h4>

            <p className="text-sm text-zinc-600">
              Company Name: <span className="font-medium text-zinc-800">Viking Burrito</span>
            </p>
            <p className="text-sm text-zinc-600">
              Email Address: <span className="font-medium text-zinc-800">oliver@burrito.com</span>
            </p>
            <p className="text-sm text-zinc-600">
              VAT Number: <span className="font-medium text-zinc-800">FRB1235476</span>
            </p>
          </div>

          <div className="flex gap-4">
            <button className="flex items-center gap-1 text-red-600 text-sm">
              <Trash size={16} />
              DELETE
            </button>
            <button className="flex items-center gap-1 text-blue-800 text-sm">
              <Pencil size={16} />
              EDIT
            </button>
          </div>
        </div>

        {/* Item 2 */}
        <div className="bg-zinc-300 rounded-lg p-5 flex justify-between">
          <div>
            <h4 className="font-semibold text-zinc-800 mb-2">
              Lucas Harper
            </h4>

            <p className="text-sm text-zinc-600">
              Company Name: <span className="font-medium text-zinc-800">Stone Tech Zone</span>
            </p>
            <p className="text-sm text-zinc-600">
              Email Address: <span className="font-medium text-zinc-800">lucas@stone-tech.com</span>
            </p>
            <p className="text-sm text-zinc-600">
              VAT Number: <span className="font-medium text-zinc-800">FRB1235476</span>
            </p>
          </div>

          <div className="flex gap-4">
            <button className="flex items-center gap-1 text-red-600 text-sm">
              <Trash size={16} />
              DELETE
            </button>
            <button className="flex items-center gap-1 text-blue-800 text-sm">
              <Pencil size={16} />
              EDIT
            </button>
          </div>
        </div>

        {/* Item 3 */}
        <div className="bg-zinc-300 rounded-lg p-5 flex justify-between">
          <div>
            <h4 className="font-semibold text-zinc-800 mb-2">
              Ethan James
            </h4>

            <p className="text-sm text-zinc-600">
              Company Name: <span className="font-medium text-zinc-800">Fiber Notion</span>
            </p>
            <p className="text-sm text-zinc-600">
              Email Address: <span className="font-medium text-zinc-800">ethan@fiber.com</span>
            </p>
            <p className="text-sm text-zinc-600">
              VAT Number: <span className="font-medium text-zinc-800">FRB1235476</span>
            </p>
          </div>

          <div className="flex gap-4">
            <button className="flex items-center gap-1 text-red-600 text-sm">
              <Trash size={16} />
              DELETE
            </button>
            <button className="flex items-center gap-1 text-blue-800 text-sm">
              <Pencil size={16} />
              EDIT
            </button>
          </div>
        </div>

      </div>
    </Card>
  )
}
