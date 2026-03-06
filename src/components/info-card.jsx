import { Card, CardContent } from "@/components/ui/card"

export function InfoCard({
  icon: Icon,
  title,
  subtitle,
  amount,
  iconBg = "bg-blue-500",
}) {
  return (
    <Card className="w-full max-w-full h-48 rounded-2xl shadow-md bg-[#d9d9d9] flex flex-col justify-center">
      <CardContent className="flex flex-col items-center gap-3 py-6">
        
        {/* Icon */}
        <div
          className={`h-14 w-14 rounded-xl flex items-center justify-center text-white ${iconBg}`}
        >
          <Icon className="h-6 w-6" />
        </div>

        {/* Text */}
        <div className="text-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>

        {/* Amount */}
        <p className="text-xl font-bold mt-2">{amount}</p>
      </CardContent>
    </Card>
  )
}
