import { differenceInHours } from "date-fns";
import { Wallet } from "../../@types/Wallet";

interface Schedule {
  wallet: string;
  name: string;
  date: string;
}

export function getSchedules(wallets: Wallet[]) {
  const schedules: Schedule[] = [];

  wallets.forEach((wallet) => {
    wallet.transactions.forEach((transaction) => {
      if (transaction.isSchedule) {
        const hoursRemaining = differenceInHours(
          new Date(transaction.transactionDate),
          new Date(),
        );

        if (hoursRemaining < 24) {
          schedules.push({
            wallet: wallet.name,
            name: transaction.name,
            date: transaction.transactionDate,
          });

          transaction.isSchedule = false;
        }
      }
    });
  });

  return [schedules, wallets];
}
