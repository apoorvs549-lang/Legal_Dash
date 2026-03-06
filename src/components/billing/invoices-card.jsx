import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

const invoices = [
  {
    date: "March, 01, 2020",
    id: "#MS-415646",
    amount: "$180",
  },
  {
    date: "February, 10, 2021",
    id: "#RV-126749",
    amount: "$250",
  },
  {
    date: "April, 05, 2020",
    id: "#QW-103578",
    amount: "$120",
  },
  {
    date: "June, 25, 2019",
    id: "#MS-415646",
    amount: "$180",
  },
  {
    date: "March, 01, 2019",
    id: "#AR-803481",
    amount: "$300",
  },
]

export default function InvoicesCard() {
  return (
    <Card className="w-full rounded-2xl bg-[#dddbdb]">
      
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-lg font-semibold">Invoices</h3>
        <Button
          variant="outline"
          size="sm"
          className="rounded-lg border-blue-600 text-blue-600"
        >
          VIEW ALL
        </Button>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-5">
        {invoices.map((invoice, index) => (
          <div
            key={index}
            className="flex items-center justify-between"
          >
            {/* Left */}
            <div>
              <p className="font-medium">{invoice.date}</p>
              <p className="text-sm text-muted-foreground">
                {invoice.id}
              </p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              <span className="font-medium">{invoice.amount}</span>
              <div className="flex items-center gap-1 text-sm font-medium cursor-pointer">
                <FileText className="h-4 w-4" />
                PDF
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
