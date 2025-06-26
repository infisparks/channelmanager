export interface Hotel {
  id: string
  name: string
  address: string
  city: string
  country: string
  phone: string
  email: string
  starRating: number
  totalRooms: number
  status: 'active' | 'inactive'
  createdAt: Date
}

export interface RoomType {
  id: string
  hotelId: string
  name: string
  description: string
  maxOccupancy: number
  bedType: string
  amenities: string[]
  baseRate: number
  totalRooms: number
  availableRooms: number
  images: string[]
}

export interface Channel {
  id: string
  name: string
  type: 'ota' | 'direct' | 'gds' | 'metasearch'
  logo: string
  status: 'connected' | 'disconnected' | 'error'
  commission: number
  lastSync: Date
  bookings: number
  revenue: number
}

export interface Rate {
  id: string
  roomTypeId: string
  channelId: string
  date: Date
  rate: number
  availability: number
  minStay: number
  maxStay: number
  closedToArrival: boolean
  closedToDeparture: boolean
}

export interface Booking {
  id: string
  hotelId: string
  roomTypeId: string
  channelId: string
  guestName: string
  checkIn: Date
  checkOut: Date
  nights: number
  guests: number
  totalAmount: number
  status: 'confirmed' | 'cancelled' | 'no-show'
  createdAt: Date
}

export interface Analytics {
  totalRevenue: number
  totalBookings: number
  averageRate: number
  occupancyRate: number
  revpar: number
  channelPerformance: {
    channelId: string
    revenue: number
    bookings: number
    percentage: number
  }[]
}