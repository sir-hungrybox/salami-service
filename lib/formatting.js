export function formatTaka(amount) {
  const str = String(Math.floor(amount));
  if (str.length <= 3) return str;
  const last3 = str.slice(-3);
  let rest = str.slice(0, -3);
  const parts = [];
  while (rest.length > 2) {
    parts.unshift(rest.slice(-2));
    rest = rest.slice(0, -2);
  }
  if (rest.length > 0) parts.unshift(rest);
  return parts.join(",") + "," + last3;
}

export function maskNumber(phone) {
  if (!phone || phone.length < 7) return phone;
  return phone.slice(0, 4) + "•••••" + phone.slice(-2);
}

export function maskName(name) {
  if (!name || name.length <= 4) return name;
  const first2 = name.slice(0, 2);
  const last2 = name.slice(-2);
  const middle = "•".repeat(Math.min(name.length - 4, 6));
  return first2 + middle + last2;
}

export function genTxId() {
  const num = Math.floor(10000000 + Math.random() * 90000000);
  return "SAL" + num;
}

export function formatTime(date) {
  const d = date instanceof Date ? date : new Date(date);
  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}

export function formatDateBengali(date) {
  const d = date instanceof Date ? date : new Date(date);
  const months = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
  ];
  return `${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`;
}
