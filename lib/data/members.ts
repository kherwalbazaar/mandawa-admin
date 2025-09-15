export interface PaymentHistory {
  id: string
  amount: number
  date: string
  description?: string
}

export interface Member {
  id: string
  name: string
  image: string
  paidDate?: string
  paymentHistory: PaymentHistory[]
}

export const members: Member[] = [
  {
    id: "1",
    name: "Balakram Tudu2",
    image: "https://ik.imagekit.io/kherwalbazaar/BALAK%20BABU12.jpg?updatedAt=1742399275938",
    paidDate: "2025-07-20",
    paymentHistory: [
      { id: "p1-1", amount: 2000, date: "2025-06-15", description: "Member Fee" },
      { id: "p1-2", amount: 225, date: "2025-08-03", description: "Member Fee" },
    ],
  },

  {
    id: "2",
    name: "Kuna Bhai",
    image: "https://ik.imagekit.io/kherwalbazaar/KUNA.jpg?updatedAt=1742397721144",
    paidDate: "2025-07-20",
    paymentHistory: [{ id: "p2-1", amount: 2500, date: "2025-06-20", description: "Member Fee" }],
  },

  {
    id: "3",
    name: "Hemendra Kisku",
    image: "https://ik.imagekit.io/kherwalbazaar/Hemendra.jpg?updatedAt=1741846649094",
    paymentHistory: [],
  },

  {
    id: "4",
    name: "Shiba Bhai",
    image: "https://ik.imagekit.io/kherwalbazaar/siba.jpg",
    paidDate: "2025-07-20",
    paymentHistory: [{ id: "p4-1", amount: 1000, date: "2025-07-20", description: "Member Fee" }],
  },

  {
    id: "5",
    name: "Khelaram Sir",
    image: "https://ik.imagekit.io/kherwalbazaar/Khelaram.jpg?updatedAt=1741845266972",
    paymentHistory: [],
  },

  {
    id: "6",
    name: "Dhaneswar Tudu",
    image: "https://ik.imagekit.io/kherwalbazaar/Dhaneswar.jpg?updatedAt=1741843820028",
    paidDate: "2025-07-20",
    paymentHistory: [
      { id: "p6-1", amount: 3000, date: "2025-07-20", description: "Member Fee" },
      { id: "p6-2", amount: 8500, date: "2025-08-17", description: "Special Contribution" },
    ],
  },

  {
    id: "7",
    name: "Nihar Ranjan Beshra",
    image: "https://ik.imagekit.io/kherwalbazaar/Nihar.jpg?updatedAt=1741844477709",
    paymentHistory: [],
  },

  {
    id: "8",
    name: "Ramsai Sir",
    image: "https://ik.imagekit.io/kherwalbazaar/Ramsai.jpg?updatedAt=1741844913191",
    paymentHistory: [],
  },

  {
    id: "9",
    name: "Badal Babu",
    image: "https://ik.imagekit.io/kherwalbazaar/Badal%20Kaka.jpg?updatedAt=1741844167226",
    paidDate: "2025-07-20",
    paymentHistory: [
      { id: "p9-1", amount: 3000, date: "2025-07-20", description: "Member Fee" },
      { id: "p9-2", amount: 6115, date: "2025-09-01", description: "Special Contribution" },
    ],
  },

  {
    id: "10",
    name: "Suguda Kisku",
    image: "https://ik.imagekit.io/kherwalbazaar/Ruchulu.jpg",
    paidDate: "2025-07-20",
    paymentHistory: [
      { id: "p10-1", amount: 3000, date: "2025-07-20", description: "Member Fee" },
      { id: "p10-2", amount: 2100, date: "2025-07-20", description: "Special Contribution" },
    ],
  },

  {
    id: "11",
    name: "Rama Murmu",
    image: "https://ik.imagekit.io/kherwalbazaar/Rama.jpg",
    paidDate: "2025-09-12",
    paymentHistory: [{ id: "p11-1", amount: 2000, date: "2025-09-12", description: "Member Fee" }],
  },

  {
    id: "12",
    name: "Harish Bhai",
    image: "https://ik.imagekit.io/kherwalbazaar/Harish.jpg",
    paidDate: "2025-07-20",
    paymentHistory: [{ id: "p12-1", amount: 2000, date: "2025-07-20", description: "Member Fee" }],
  },

  {
    id: "13",
    name: "Keshab Dada",
    image: "https://ik.imagekit.io/kherwalbazaar/Kesaab%20Marndi.jpg",
    paidDate: "2025-07-20",
    paymentHistory: [{ id: "p13-1", amount: 1000, date: "2025-07-20", description: "Member Fee" }],
  },

  {
    id: "14",
    name: "Chandulal Murmu",
    image: "https://ik.imagekit.io/kherwalbazaar/Chandulal.jpg?updatedAt=1753351887380",
    paidDate: "2025-09-12",
    paymentHistory: [{ id: "p14-1", amount: 2000, date: "2025-09-12", description: "Member Fee" }],
  },

  {
    id: "16",
    name: "Lal Bahadur Soren",
    image: "https://ik.imagekit.io/kherwalbazaar/Lal%20bahadur.jpg",
    paidDate: "2025-09-01",
    paymentHistory: [{ id: "p16-1", amount: 2000, date: "2025-09-01", description: "Member Fee" }],
  },

  {
    id: "17",
    name: "Bijay hansdah",
    image: "https://ik.imagekit.io/kherwalbazaar/Bijay.jpg",
    paymentHistory: [],
  },

  {
    id: "18",
    name: "Dora Sir",
    image: "https://ik.imagekit.io/kherwalbazaar/Dora%20Sir.jpg",
    paymentHistory: [],
  },

  {
    id: "19",
    name: "Duari Sir",
    image: "https://ik.imagekit.io/kherwalbazaar/Duari.jpg",
    paymentHistory: [],
  },

  {
    id: "20",
    name: "Ramdayal Murmu",
    image: "https://ik.imagekit.io/kherwalbazaar/Ramdayal.jpg",
    paymentHistory: [],
  },

  {
    id: "22",
    name: "Dakhin Hembram",
    image: "https://ik.imagekit.io/kherwalbazaar/Dakhin.jpg",
    paymentHistory: [],
  },

  {
    id: "23",
    name: "Hemanta Kisku",
    image: "https://ik.imagekit.io/kherwalbazaar/Hemanta.jpg",
    paymentHistory: [],
  },

  {
    id: "24",
    name: "Jiten Luhari",
    image: "https://ik.imagekit.io/kherwalbazaar/Jiten%20Luhari?updatedAt=1756882928483",
    paymentHistory: [],
  },

  {
    id: "25",
    name: "Lokanath Sir",
    image: "https://ik.imagekit.io/kherwalbazaar/Lokanath.jpg",
    paymentHistory: [],
  },

  {
    id: "26",
    name: "Sankha marndi",
    image: "https://ik.imagekit.io/kherwalbazaar/Sankha.jpg",
    paymentHistory: [],
  },

  {
    id: "29",
    name: "Sanjay sahu",
    image: "https://ik.imagekit.io/kherwalbazaar/Profile%20Image.jpg?updatedAt=1753196242592",
    paidDate: "2025-09-01",
    paymentHistory: [
      { id: "p29-1", amount: 2000, date: "2025-09-01", description: "Member Fee" },
      { id: "p29-2", amount: 20000, date: "2025-09-01", description: "Special Contribution" },
    ],
  },

  {
    id: "30",
    name: "Shisubalak Hansdah",
    image: "https://ik.imagekit.io/kherwalbazaar/Profile%20Image.jpg?updatedAt=1753196242592",
    paymentHistory: [],
  },

  {
    id: "32",
    name: "Ratnakar Sir",
    image: "https://ik.imagekit.io/kherwalbazaar/Ratnakar.jpg",
    paymentHistory: [],
  },

  {
    id: "35",
    name: "Akhay Naik(Pin2)",
    image: "https://ik.imagekit.io/kherwalbazaar/Profile%20Image.jpg?updatedAt=1753196242592",
    paidDate: "2025-09-05",
    paymentHistory: [{ id: "p35-1", amount: 3000, date: "2025-09-05", description: "Member Fee" }],
  },

  {
    id: "36",
    name: "Sushanta Tudu",
    image: "https://ik.imagekit.io/kherwalbazaar/Profile%20Image.jpg?updatedAt=1753196242592",
    paymentHistory: [],
  },

  {
    id: "38",
    name: "Lingaraj Sir",
    image: "https://ik.imagekit.io/kherwalbazaar/Lingaraj.jpg",
    paymentHistory: [],
  },

  {
    id: "39",
    name: "Ananda babu",
    image: "https://ik.imagekit.io/kherwalbazaar/Profile%20Image.jpg?updatedAt=1753196242592",
    paymentHistory: [],
  },

  {
    id: "41",
    name: "Tiki Sir",
    image: "https://ik.imagekit.io/kherwalbazaar/Tiki%20Sir.jpg?updatedAt=1753351887329",
    paidDate: "2025-08-18",
    paymentHistory: [
      { id: "p41-1", amount: 3000, date: "2025-08-18", description: "Member Fee" },
      { id: "p41-2", amount: 2000, date: "2025-08-18", description: "Special Contribution" },
    ],
  },

  {
    id: "42",
    name: "Satyabrata Sahu",
    image: "https://ik.imagekit.io/kherwalbazaar/Satyabrata?updatedAt=1754288955283",
    paidDate: "2025-08-03",
    paymentHistory: [{ id: "p42-1", amount: 3000, date: "2025-08-03", description: "Member Fee" }],
  },

  {
    id: "43",
    name: "Mohanta",
    image: "https://ik.imagekit.io/kherwalbazaar/Profile%20Image.jpg?updatedAt=1753196242592",
    paymentHistory: [],
  },
  {
    id: "44",
    name: "Bikram Murmu",
    image: "https://ik.imagekit.io/kherwalbazaar/Profile%20Image.jpg?updatedAt=1753196242592",
    paymentHistory: [],
  },

  {
    id: "45",
    name: "Sunaram Hansdah",
    image: "https://ik.imagekit.io/kherwalbazaar/Profile%20Image.jpg?updatedAt=1753196242592",
    paymentHistory: [],
  },

  {
    id: "46",
    name: "Mangal Sarapanch",
    image: "https://ik.imagekit.io/kherwalbazaar/Profile%20Image.jpg?updatedAt=1753196242592",
    paymentHistory: [],
  },

  {
    id: "47",
    name: "Jhapal Kadapalsa",
    image: "https://ik.imagekit.io/kherwalbazaar/Profile%20Image.jpg?updatedAt=1753196242592",
    paymentHistory: [],
  },

  {
    id: "48",
    name: "Samray Murmu",
    image: "https://ik.imagekit.io/kherwalbazaar/Profile%20Image.jpg?updatedAt=1753196242592",
    paymentHistory: [],
  },

  {
    id: "49",
    name: "Budheswar Murmu",
    image: "https://ik.imagekit.io/kherwalbazaar/Budheswar%20sir.jpg",
    paymentHistory: [],
  },

  {
    id: "50",
    name: "Ganeswar Behera",
    image: "https://ik.imagekit.io/kherwalbazaar/Profile%20Image.jpg?updatedAt=1753196242592",
    paidDate: "2025-09-06",
    paymentHistory: [{ id: "p35-1", amount: 3000, date: "2025-09-06", description: "Member Fee" }],
  },
]

export const getMemberTotalPaid = (member: Member): number => {
  return member.paymentHistory.reduce((sum, payment) => sum + payment.amount, 0)
}

export const getMemberIsPaid = (member: Member): boolean => {
  return getMemberTotalPaid(member) >= 3000
}

// Stats & helpers
export const getTotalMembers = () => members.length

export const getPaidMembers = () => members.filter((m) => getMemberTotalPaid(m) >= 3000)

export const getTotalCollection = () => members.reduce((total, member) => total + getMemberTotalPaid(member), 0)

export const getMembersSortedByTotalPaid = (): Member[] => {
  return [...members].sort((a, b) => getMemberTotalPaid(b) - getMemberTotalPaid(a))
}

export const getPaymentStatus = (member: Member) => {
  const totalPaid = getMemberTotalPaid(member)
  if (totalPaid === 0) {
    return { status: "Unpaid", color: "text-red-600", bgColor: "bg-red-100" }
  } else if (totalPaid < 3000) {
    return { status: `₹${totalPaid}`, color: "text-yellow-600", bgColor: "bg-yellow-100" }
  } else if (totalPaid === 3000) {
    return { status: "Paid", color: "text-green-600", bgColor: "bg-green-100" }
  } else {
    return { status: "VIP Member", color: "text-purple-600", bgColor: "bg-purple-100" }
  }
}
