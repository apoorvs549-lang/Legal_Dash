import { InfoCard } from "../info-card"
import { Landmark, Wallet } from "lucide-react"
import Creditcard from "../creditcard/credit-card"

export function CardsRow() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-2">
        <Creditcard
          cardNumber="4562 1122 4594 7852"
          holderName="Jack Peterson"
          expiry="11/22"
        />
      </div>

      <InfoCard
        icon={Landmark}
        title="Salary"
        subtitle="Belong Interactive"
        amount="+$2000"
      />

      <InfoCard
        icon={Wallet}
        title="Paypal"
        subtitle="Freelance Payment"
        amount="$455.00"
      />
    </div>
  )
}
