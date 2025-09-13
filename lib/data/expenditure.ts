export interface ExpenditureItem {
  id: string
  name: string
  amount: number
  date: string
  memberId: string
  memberName: string
}

export interface ExpenditureType {
  id: string
  name: string
  items: ExpenditureItem[]
}

export const expenditureData: ExpenditureType[] = [
  {
    id: "1",
    name: "Adim Owar jarpa Opera",
    items: [
      {
        id: "1-1",
        name: "Jarpa Advance",
        amount: 20000,
        date: "2025-07-20",
        memberId: "1",
        memberName: "Badal Babu",
      },
      {
        id: "1-2",
        name: "Jarpa Advance",
        amount: 10000,
        date: "2025-09-08",
        memberId: "1",
        memberName: "Balakram Tudu",
      },
    ],
  },
  {
    id: "2",
    name: "Munirushi Opera",
    items: [
      {
        id: "2-1",
        name: "Munirushi Advance",
        amount: 5000,
        date: "2025-07-27",
        memberId: "1",
        memberName: "Suguda Kisku",
      },
      {
        id: "2-2",
        name: "Munirushi Advance",
        amount: 10000,
        date: "2025-09-01",
        memberId: "1",
        memberName: "Balakram Tudu",
      },
    ],
  },
  {
    id: "3",
    name: "LUGUBURU OPERA",
    items: [
      {
        id: "3-1",
        name: "Luguburu Advance",
        amount: 5000,
        date: "2025-08-18",
        memberId: "1",
        memberName: "Badal Babu",
      },
    ],
  },
  {
    id: "4",
    name: "NONA TENT ADVANCE",
    items: [
      {
        id: "4-1",
        name: "Nona Tent Advance",
        amount: 3000,
        date: "2025-08-10",
        memberId: "1",
        memberName: "Balakram Tudu",
      },
    ],
  },
  {
    id: "5",
    name: "Food & Meal",
    items: [
      {
        id: "5-1",
        name: "Tiffin in BPD",
        amount: 2100,
        date: "2025-07-20",
        memberId: "4",
        memberName: "Sugda Kisku",
      },
      {
        id: "5-2",
        name: "Light Tiffin with Munirushi",
        amount: 100,
        date: "2025-07-27",
        memberId: "1",
        memberName: "Badal Babu",
      },
      {
        id: "5-3",
        name: "Fooding for Munirushi",
        amount: 600,
        date: "2025-07-27",
        memberId: "1",
        memberName: "Badal Babu",
      },
      {
        id: "5-4",
        name: "Chicken",
        amount: 480,
        date: "2025-08-03",
        memberId: "1",
        memberName: "Badal Babu",
      },
      {
        id: "5-5",
        name: "Coocking Fees",
        amount: 350,
        date: "2025-08-03",
        memberId: "1",
        memberName: "Badal Babu",
      },
      {
        id: "5-6",
        name: "ଖଲି, ଦୁନା ଓ ମୁଢ଼ି",
        amount: 225,
        date: "2025-08-03",
        memberId: "1",
        memberName: "Balakram Tudu",
      },
      {
        id: "5-7",
        name: "ଚା'ପାଣି with Luguburu",
        amount: 600,
        date: "2025-08-18",
        memberId: "1",
        memberName: "Badal Babu",
      },
    ],
  },
  {
    id: "6",
    name: "Transporting",
    items: [
      {
        id: "6-1",
        name: "Petrol",
        amount: 1000,
        date: "2025-07-20",
        memberId: "1",
        memberName: "Badal Babu",
      },
      {
        id: "6-2",
        name: "Transporting",
        amount: 1500,
        date: "2025-07-20",
        memberId: "1",
        memberName: "Balakram Tudu",
      },
    ],
  },
  {
    id: "7",
    name: "BANNER & PRINTING",
    items: [
      {
        id: "7-1",
        name: "Banner",
        amount: 2160,
        date: "2025-09-05",
        memberId: "1",
        memberName: "Balakram Tudu",
      },
      {
        id: "7-2",
        name: "Wire & Pin",
        amount: 125,
        date: "2025-09-05",
        memberId: "1",
        memberName: "Balakram Tudu",
      },
      {
        id: "7-3",
        name: "Ticket Advances",
        amount: 5000,
        date: "2025-09-06",
        memberId: "1",
        memberName: "Balakram Tudu",
      },
      {
        id: "7-4",
        name: "Football Banner",
        amount: 480,
        date: "2025-09-09",
        memberId: "1",
        memberName: "Balakram Tudu",
      },
    ],
  },
  {
    id: "8",
    name: "PERMISSION",
    items: [
      {
        id: "8-1",
        name: "Collector Permission",
        amount: 1200,
        date: "2025-09-08",
        memberId: "1",
        memberName: "Kuna Bhai",
      },
    ],
  },
]

export const getExpenditureTotalAmount = (expenditure: ExpenditureType): number => {
  return expenditure.items.reduce((sum, item) => sum + item.amount, 0)
}

export const getTotalExpenditure = (): number => {
  return expenditureData.reduce((total, type) => total + getExpenditureTotalAmount(type), 0)
}

export const addExpenditureItem = (typeId: string, item: Omit<ExpenditureItem, "id">): void => {
  const newItem: ExpenditureItem = {
    ...item,
    id: `${typeId}-${Date.now()}`,
  }

  const typeIndex = expenditureData.findIndex((type) => type.id === typeId)
  if (typeIndex !== -1) {
    expenditureData[typeIndex].items.push(newItem)
  }
}
