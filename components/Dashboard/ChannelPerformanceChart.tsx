'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { mockChannels, mockAnalytics } from '@/data/mockData'

export const ChannelPerformanceChart = () => {
  const data = mockAnalytics.channelPerformance.map(perf => {
    const channel = mockChannels.find(c => c.id === perf.channelId)
    return {
      name: channel?.name || 'Unknown',
      revenue: perf.revenue,
      bookings: perf.bookings,
    }
  })

  const formatCurrency = (value: number) => {
    return `₹${(value / 100000).toFixed(1)}L`
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Channel Performance</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={formatCurrency} />
            <Tooltip 
              formatter={(value, name) => [
                name === 'revenue' ? `₹${value.toLocaleString()}` : value,
                name === 'revenue' ? 'Revenue' : 'Bookings'
              ]}
            />
            <Bar dataKey="revenue" fill="#3b82f6" name="revenue" />
            <Bar dataKey="bookings" fill="#10b981" name="bookings" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}