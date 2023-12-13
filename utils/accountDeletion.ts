import { PrismaClient } from "@prisma/client";
import schedule from "node-schedule";

const prisma = new PrismaClient();

// This will run every day at 12:00 AM
schedule.scheduleJob("0 0 * * *", async function () {
  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

  // const inactiveAccounts = await prisma.account.findMany({
  //   where: {
  //     createdAt: {
  //       lt: threeDaysAgo,
  //     },
  //     controlNumber: null,
  //   },
  // })

  // for (const account of inactiveAccounts) {
  //   await prisma.account.delete({
  //     where: {
  //       id: account.id,
  //     },
  //   })
  // }
});
