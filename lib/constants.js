export const HOST_NAME = "EKRAM";
export const STARTING_BALANCE = 50000000;
export const MAX_PER_TX = 10000;

export const RELATIONSHIPS = [
  { value: "ছোট ভাই", label: "ছোট ভাই" },
  { value: "ছোট বোন", label: "ছোট বোন" },
  { value: "ভাগ্নে", label: "ভাগ্নে" },
  { value: "ভাগ্নি", label: "ভাগ্নি" },
  { value: "চাচাতো ভাই/বোন", label: "চাচাতো ভাই/বোন" },
  { value: "মামাতো ভাই/বোন", label: "মামাতো ভাই/বোন" },
  { value: "বন্ধু", label: "বন্ধু" },
  { value: "সহকর্মী", label: "সহকর্মী" },
  { value: "প্রতিবেশী", label: "প্রতিবেশী" },
  { value: "ছাত্র/ছাত্রী", label: "ছাত্র/ছাত্রী" },
  { value: "অন্যান্য", label: "অন্যান্য" },
];

export const TOAST_MESSAGES = {
  recharge: "ভাই, সালামি নেন, রিচার্জ না! 😂",
  eidOffer: "অফার হলো — সালামি নাও, সম্পূর্ণ ফ্রি! 🎉",
  cashOut: "ক্যাশ আউট বন্ধ! শুধু সালামি চলবে! 🚫",
  addMoney: "আমি আর কত অ্যাড করবো ভাই! 😭",
  helpLine: "হেল্প লাগলে আম্মুকে ফোন করো! 📞",
  scanQR: "QR দিয়ে সালামি? এত আধুনিক হইছো? 😅",
  inbox: "নতুন মেসেজ: ঈদ মোবারক! সালামি দিবো না! 🌙",
  noBalance: "সালামি শেষ! আর নাই ভাই! 😩",
  payBill: "বিল তো EKRAM ভাই দিবে না! সালামি নাও! 💡",
  myBkash: "আমার বিকাশ? এইটা তো সালামি সার্ভিস! 😜",
};

export const SERVICE_ITEMS = [
  { emoji: "💸", label: "সালামি\nপাঠান", action: "sendSalami", color: "#E2136E" },
  { emoji: "📱", label: "মোবাইল\nরিচার্জ", action: "recharge", color: "#FF6B35" },
  { emoji: "🎁", label: "ঈদ\nঅফার", action: "eidOffer", color: "#9C27B0" },
  { emoji: "📋", label: "লেনদেন\nহিস্ট্রি", action: "history", color: "#2196F3" },
  { emoji: "💰", label: "ক্যাশ\nআউট", action: "cashOut", color: "#4CAF50" },
  { emoji: "🏦", label: "অ্যাড\nমানি", action: "addMoney", color: "#FF9800" },
  { emoji: "💡", label: "পে\nবিল", action: "payBill", color: "#00BCD4" },
  { emoji: "❓", label: "হেল্প\nলাইন", action: "helpLine", color: "#795548" },
];
