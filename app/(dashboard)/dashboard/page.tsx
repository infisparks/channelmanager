'use client'

import { StatsCard } from '@/components/Dashboard/StatsCard'
import { ChannelPerformanceChart } from '@/components/Dashboard/ChannelPerformanceChart'
import { DollarSign, Calendar, TrendingUp, Users, Building2, Bed } from 'lucide-react'
import { mockAnalytics, mockHotels } from '@/data/mockData'

export default function Dashboard() {
  const totalHotels = mockHotels.length
  const totalRooms = mockHotels.reduce((sum, hotel) => sum + hotel.totalRooms, 0)

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}K`
    }
    return `₹${amount.toLocaleString()}`
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back! Here's what's happening with your hotels today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(mockAnalytics.totalRevenue)}
          change="+12.5%"
          changeType="positive"
          icon={DollarSign}
          color="green"
        />
        <StatsCard
          title="Total Bookings"
          value={mockAnalytics.totalBookings}
          change="+8.2%"
          changeType="positive"
          icon={Calendar}
          color="blue"
        />
        <StatsCard
          title="Occupancy Rate"
          value={`${mockAnalytics.occupancyRate}%`}
          change="+3.1%"
          changeType="positive"
          icon={TrendingUp}
          color="purple"
        />
        <StatsCard
          title="RevPAR"
          value={`₹${mockAnalytics.revpar.toLocaleString()}`}
          change="+5.7%"
          changeType="positive"
          icon={Users}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChannelPerformanceChart />
        </div>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Building2 className="w-5 h-5 text-primary-600" />
                  <span className="text-sm text-gray-600">Total Hotels</span>
                </div>
                <span className="font-semibold">{totalHotels}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bed className="w-5 h-5 text-primary-600" />
                  <span className="text-sm text-gray-600">Total Rooms</span>
                </div>
                <span className="font-semibold">{totalRooms}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-5 h-5 text-primary-600" />
                  <span className="text-sm text-gray-600">Avg. Rate</span>
                </div>
                <span className="font-semibold">₹{mockAnalytics.averageRate.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">New booking from Booking.com - ₹12,999</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Rate updated for Deluxe Room - ₹8,999</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Channel sync completed - MakeMyTrip</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Bulk rate update applied - 15 rooms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}