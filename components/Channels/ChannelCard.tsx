'use client'

import { Channel } from '@/types'
import { Wifi, WifiOff, AlertTriangle, DollarSign, Calendar } from 'lucide-react'

interface ChannelCardProps {
  channel: Channel
  onConnect: (channelId: string) => void
  onDisconnect: (channelId: string) => void
}

export const ChannelCard = ({
  channel,
  onConnect,
  onDisconnect,
}: ChannelCardProps) => {
  const getStatusIcon = () => {
    switch (channel.status) {
      case 'connected':
        return <Wifi className="w-5 h-5 text-green-500" />
      case 'disconnected':
        return <WifiOff className="w-5 h-5 text-gray-400" />
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-500" />
    }
  }

  const getStatusColor = () => {
    switch (channel.status) {
      case 'connected':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'disconnected':
        return 'bg-gray-50 text-gray-700 border-gray-200'
      case 'error':
        return 'bg-red-50 text-red-700 border-red-200'
    }
  }

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
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{channel.logo}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{channel.name}</h3>
              <p className="text-sm text-gray-500 capitalize">{channel.type}</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center space-x-1 ${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="capitalize">{channel.status}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Revenue</p>
              <p className="font-semibold">{formatCurrency(channel.revenue)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Bookings</p>
              <p className="font-semibold">{channel.bookings}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Commission</p>
            <p className="font-semibold">{channel.commission}%</p>
          </div>
          <div className="flex space-x-2">
            {channel.status === 'connected' ? (
              <button
                onClick={() => onDisconnect(channel.id)}
                className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
              >
                Disconnect
              </button>
            ) : (
              <button
                onClick={() => onConnect(channel.id)}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors"
              >
                Connect
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}