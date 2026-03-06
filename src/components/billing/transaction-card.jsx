import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowDown, ArrowUp, AlertCircle, Calendar } from "lucide-react"

const transactions = [
    {
        category: "NEWEST",
        items: [
            {
                name: "Netflix",
                date: "27 March 2020, at 12:30 PM",
                amount: "- $ 2,500",
                type: "negative",
                icon: ArrowDown
            },
            {
                name: "Apple",
                date: "27 March 2020, at 04:30 AM",
                amount: "+ $ 2,000",
                type: "positive",
                icon: ArrowUp
            }
        ]
    },
    {
        category: "YESTERDAY",
        items: [
            {
                name: "Stripe",
                date: "26 March 2020, at 13:45 PM",
                amount: "+ $ 750",
                type: "positive",
                icon: ArrowUp
            },
            {
                name: "HubSpot",
                date: "26 March 2020, at 12:30 PM",
                amount: "+ $ 1,000",
                type: "positive",
                icon: ArrowUp
            },
            {
                name: "Creative Tim",
                date: "26 March 2020, at 08:30 AM",
                amount: "+ $ 2,500",
                type: "positive",
                icon: ArrowUp
            },
            {
                name: "Webflow",
                date: "26 March 2020, at 05:00 AM",
                amount: "Pending",
                type: "pending",
                icon: AlertCircle
            }
        ]
    }
]

export default function TransactionsCard() {
    return (
        <Card className="w-full rounded-2xl bg-[#dddbdb]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <h3 className="text-lg font-semibold">Your Transaction's</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    23 - 30 March 2020
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {transactions.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-4">
                            {section.category}
                        </h4>
                        <div className="space-y-6">
                            {section.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex items-center justify-between">
                                    {/* Left: Icon + Name/Date */}
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`
                        flex items-center justify-center w-8 h-8 rounded-full border
                        ${item.type === 'negative' ? 'border-red-500 text-red-500' : ''}
                        ${item.type === 'positive' ? 'border-green-500 text-green-500' : ''}
                        ${item.type === 'pending' ? 'border-gray-500 text-gray-500' : ''}
                      `}
                                        >
                                            <item.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">{item.name}</p>
                                            <p className="text-xs text-muted-foreground">{item.date}</p>
                                        </div>
                                    </div>

                                    {/* Right: Amount */}
                                    <div className={`
                    font-semibold text-sm
                    ${item.type === 'negative' ? 'text-red-500' : ''}
                    ${item.type === 'positive' ? 'text-green-500' : ''}
                    ${item.type === 'pending' ? 'text-gray-700' : ''}
                  `}>
                                        {item.amount}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
