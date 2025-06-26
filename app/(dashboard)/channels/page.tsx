'use client'

import { ChannelCard } from '@/components/Channels/ChannelCard'
import { mockChannels } from '@/data/mockData'
import { Plus } from 'lucide-react'

export default function Channels() {
  const handleConnect = (channelId: string) => {
    console.log('Connecting channel:', channelId)
    // Implement connection logic
  }

  const handleDisconnect = (channelId: string) => {
    console.log('Disconnecting channel:', channelId)
    // Implement disconnection logic
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Distribution Channels</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your online distribution channels and monitor their performance.
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Add Channel
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {mockChannels.map((channel) => (
          <ChannelCard
            key={channel.id}
            channel={channel}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
          />
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Channel Integration Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {mockChannels.filter(c => c.status === 'connected').length}
            </div>
            <div className="text-sm text-gray-500">Connected</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {mockChannels.filter(c => c.status === 'error').length}
            </div>
            <div className="text-sm text-gray-500">Errors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">
              {mockChannels.filter(c => c.status === 'disconnected').length}
            </div>
            <div className="text-sm text-gray-500">Disconnected</div>
          </div>
        </div>
      </div>
    </div>
  )
}