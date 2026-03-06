import Billingheader from '@/components/billing/billing-header'
import React from 'react'
import Creditcard from '@/components/creditcard/credit-card'
import { CardsRow } from '@/components/billing/cards-row'
import InvoicesCard from '@/components/billing/invoices-card'
import PaymentMethods from '@/components/creditcard/payment-method'
import BillingInformation from '@/components/creditcard/billing-info'
import TransactionsCard from '@/components/billing/transaction-card'

const Billing = () => {
  return (
    <div className='w-full min-h-screen flex flex-col'>
      <Billingheader />
      <div className='px-4 sm:px-6 lg:px-8 py-6 space-y-6'>
        <div className='w-full grid grid-cols-1 lg:grid-cols-4 gap-6'>
          {/* Left Column: CardsRow + PaymentMethods stacked */}
          <div className='lg:col-span-3 flex flex-col gap-6'>
            <CardsRow />
            <PaymentMethods />
          </div>

          {/* Right Column: InvoicesCard */}
          <div className='lg:col-span-1'>
            <InvoicesCard />
          </div>
        </div>

        {/* Bottom Row: BillingInformation + TransactionsCard */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <BillingInformation />
          <TransactionsCard />
        </div>
      </div>
    </div>
  )
}

export default Billing