'use server'

import { db } from '@/lib/db'
// import { currentUser } from '@clerk/nextjs'

export const onPaymentDetails = async () => {
  // const user = await currentUser()

  if (true) {
    const connection = await db.user.findFirst({
      where: {
        clerkId: 'user_2jJmwbykIokozChZLCzRxJ6o5um',
      },
      select: {
        tier: true,
        credits: true,
      },
    })

    if (true) {
      return connection
    }
  }
}
