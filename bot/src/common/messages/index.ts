import { ApiSummary } from "../../interfaces/api-summary.js";
import { ApiTransaction } from "../../interfaces/api-transaction.js";
import { compareDays, formatAmount, formatDate } from "../utils/index.js";

export const messages = {
  startBeforeLinking:
    "<b>👋 Salom!</b>\n\nBu Hisobchi bot.\nBu yerda daromad va xarajatlaringizni tez va oson yozib borishingiz mumkin.\n\nBoshlash uchun accounting akkauntingizni bog‘lash kerak.\n\n🔗 <b>Hisobni ulash:</b>\nAPI tokeningizni yuboring:\n/link API_TOKEN\n\nMasalan:\n/link eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  initBot: (username: string) => `⚡️ t.me/${username} started successfully!`,
  startAfterLinking:
    "⚡️ Quyidagi buyruqlardan foydalanishingiz mumkin:\n\n• Xarajat qo'shish:\n👉 /expense <miqdor> <kategoriya>, [izoh]\n\n• Daromad qo‘shish:\n👉 /income <miqdor> <kategoriya> [izoh]\n\n• Hisobotni ko‘rish:\n👉 /summary 2026-01-01 2026-01-31 (ixtiyoriy)\n\n• Haftalik hisobot:\n👉 /week\n\n• Bugun uchun hisobot:\n👉 /day\n\n• Hisobni uzish:\n👉 /unlink",
  invalidLinkFormat:
    "❌ Buyruq noto‘g‘ri formatda.\n\nTo‘g‘ri format:\n👉 /link API_TOKEN\n\nMisol:\n/link eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  invalidAccessToken:
    "❌ <b>Token noto‘g‘ri yoki eskirgan.</b>\n\nIltimos, API’dan yangi token olib qayta urinib ko‘ring",
  serverError:
    "❌ Server bian aloqa yo'q. Agar muammo davom etsa, qo‘llab-quvvatlashga murojaat qiling.",
  linkSuccess:
    "<b>✅ Hisob muvaffaqiyatli bog‘landi!</b>\n\nEndi quyidagi buyruqlardan foydalanishingiz mumkin:\n• /expense — xarajat qo‘shish\n• /income — daromad qo‘shish\n• /summary — hisobotni ko‘rish\n• /week — haftalik hisobot\n• /day — bugun uchun hisobot",
  unlinkSuccess: "✅ Hisob muvaffaqiyatli uzildi!",
  alreadyUnlinked: "⚠️ Hisob allaqachon uzilgan.",
  invalidTransactionFormat:
    "❌ Buyruq noto‘g‘ri formatda.\n\nTo‘g‘ri format:\n👉 /income <miqdor> <kategoriya> [izoh = ixtiyoriy]\n👉 /expense <miqdor> <kategoriya> [izoh = ixtiyoriy]\n\nMisol:\n/income 50000 salary oylik daromad\n/expense 50000 food nonushta",
  upgradeTariff:
    "🚫 <b>Oylik limitga yetdingiz.</b>\n\nFREE tarifda oyiga maksimal 50 ta transaction qo‘shish mumkin. Cheklovlarni olib tashlash uchun PRO tarifga o‘ting.",
  expenseSuccess: (transaction: ApiTransaction) =>
    `💸 <b>Xarajat qo‘shildi</b>\n\nMiqdor: ${transaction.amount} so‘m\nKategoriya: ${transaction.category}\nIzoh: ${transaction.description ?? ""}\nSana: bugun\n`,
  incomeSuccess: (transaction: ApiTransaction) =>
    `💰 <b>Daromad qo‘shildi</b>\n\nMiqdor: ${transaction.amount} so‘m\nKategoriya: ${transaction.category}\nIzoh: ${transaction.description ?? ""}\nSana: bugun\n`,
  summary: ({ total_income, total_expense, balance, from, to }: ApiSummary) => {
    const period = compareDays(from, to)
      ? formatDate(from)
      : `${formatDate(from)} — ${formatDate(to)}`;

    return `📊 Hisobot\n🗓 ${period}\n\n💰 Daromad: +${formatAmount(total_income)}\n💸 Xarajat: -${formatAmount(total_expense)}\n—————————————\n📉 Balans: ${formatAmount(balance)}`;
  },
  onlyProForSummary:
    "🚫 Ushbu funksiya faqat PRO tarifda mavjud.\n\nFREE tarifda faqat oylik hisobotni ko‘rish mumkin.",
  globalError:
    "⚠️ Xatolik yuz berdi.\n\nIltimos, birozdan so‘ng qayta urinib ko‘ring.\nAgar muammo davom etsa, qo‘llab-quvvatlashga murojaat qiling.",
  invalidDateRange:
    "❌ Sana noto‘g‘ri formatda.\n\nTo‘g‘ri format:\nYYYY-MM-DD\n\nMasalan:\n/summary 2026-01-01 2026-01-31",
  alreadyLinked:
    "⚠️ <b>Ushbu hisob allaqachon boshqa telegram akkauntiga bog‘langan.</b>",
};
