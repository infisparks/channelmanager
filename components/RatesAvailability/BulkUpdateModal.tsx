'use client'

import { useState } from 'react'
import { X, Calendar, DollarSign, Users, AlertCircle } from 'lucide-react'

interface BulkUpdateModalProps {
  isOpen: boolean
  onClose: () => void
  onApply: (updateData: BulkUpdateData) => void
  roomTypes: Array<{ id: string; name: string }>
  channels: Array<{ id: string; name: string }>
}

export interface BulkUpdateData {
  roomTypeIds: string[]
  channelIds: string[]
  dateRange: {
    startDate: string
    endDate: string
  }
  rateUpdate: {
    type: 'increase' | 'decrease' | 'set'
    value: number
    isPercentage: boolean
  }
  availabilityUpdate?: {
    value: number
  }
  restrictionsUpdate?: {
    minStay?: number
    maxStay?: number
    closedToArrival?: boolean
    closedToDeparture?: boolean
  }
}

export const BulkUpdateModal = ({
  isOpen,
  onClose,
  onApply,
  roomTypes,
  channels,
}: BulkUpdateModalProps) => {
  const [updateData, setUpdateData] = useState<BulkUpdateData>({
    roomTypeIds: [],
    channelIds: [],
    dateRange: {
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    rateUpdate: {
      type: 'increase',
      value: 0,
      isPercentage: false,
    },
  })

  const [activeTab, setActiveTab] = useState<'rates' | 'availability' | 'restrictions'>('rates')

  if (!isOpen) return null

  const handleApply = () => {
    onApply(updateData)
    onClose()
  }

  const toggleRoomType = (roomTypeId: string) => {
    setUpdateData(prev => ({
      ...prev,
      roomTypeIds: prev.roomTypeIds.includes(roomTypeId)
        ? prev.roomTypeIds.filter(id => id !== roomTypeId)
        : [...prev.roomTypeIds, roomTypeId]
    }))
  }

  const toggleChannel = (channelId: string) => {
    setUpdateData(prev => ({
      ...prev,
      channelIds: prev.channelIds.includes(channelId)
        ? prev.channelIds.filter(id => id !== channelId)
        : [...prev.channelIds, channelId]
    }))
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Bulk Update Rates & Availability</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Selection */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Room Types
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto border rounded-md p-3">
                    {roomTypes.map((roomType) => (
                      <label key={roomType.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={updateData.roomTypeIds.includes(roomType.id)}
                          onChange={() => toggleRoomType(roomType.id)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{roomType.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Channels
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto border rounded-md p-3">
                    {channels.map((channel) => (
                      <label key={channel.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={updateData.channelIds.includes(channel.id)}
                          onChange={() => toggleChannel(channel.id)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{channel.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={updateData.dateRange.startDate}
                      onChange={(e) => setUpdateData(prev => ({
                        ...prev,
                        dateRange: { ...prev.dateRange, startDate: e.target.value }
                      }))}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                    <input
                      type="date"
                      value={updateData.dateRange.endDate}
                      onChange={(e) => setUpdateData(prev => ({
                        ...prev,
                        dateRange: { ...prev.dateRange, endDate: e.target.value }
                      }))}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Update Options */}
              <div className="space-y-6">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8">
                    {['rates', 'availability', 'restrictions'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                          activeTab === tab
                            ? 'border-primary-500 text-primary-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </nav>
                </div>

                {activeTab === 'rates' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rate Update Type
                      </label>
                      <select
                        value={updateData.rateUpdate.type}
                        onChange={(e) => setUpdateData(prev => ({
                          ...prev,
                          rateUpdate: { ...prev.rateUpdate, type: e.target.value as any }
                        }))}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="increase">Increase</option>
                        <option value="decrease">Decrease</option>
                        <option value="set">Set Fixed Rate</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Value
                      </label>
                      <div className="flex space-x-2">
                        <div className="flex-1">
                          <input
                            type="number"
                            value={updateData.rateUpdate.value}
                            onChange={(e) => setUpdateData(prev => ({
                              ...prev,
                              rateUpdate: { ...prev.rateUpdate, value: Number(e.target.value) }
                            }))}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            placeholder="Enter value"
                          />
                        </div>
                        <select
                          value={updateData.rateUpdate.isPercentage ? 'percentage' : 'amount'}
                          onChange={(e) => setUpdateData(prev => ({
                            ...prev,
                            rateUpdate: { ...prev.rateUpdate, isPercentage: e.target.value === 'percentage' }
                          }))}
                          className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        >
                          <option value="amount">₹</option>
                          <option value="percentage">%</option>
                        </select>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-md">
                      <div className="flex">
                        <AlertCircle className="w-5 h-5 text-blue-400 mr-2 mt-0.5" />
                        <div className="text-sm text-blue-700">
                          <p className="font-medium">Preview:</p>
                          <p>
                            {updateData.rateUpdate.type === 'set' 
                              ? `Set rate to ₹${updateData.rateUpdate.value.toLocaleString()}`
                              : `${updateData.rateUpdate.type === 'increase' ? 'Increase' : 'Decrease'} rate by ${
                                  updateData.rateUpdate.isPercentage 
                                    ? `${updateData.rateUpdate.value}%` 
                                    : `₹${updateData.rateUpdate.value.toLocaleString()}`
                                }`
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'availability' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Set Availability
                      </label>
                      <input
                        type="number"
                        value={updateData.availabilityUpdate?.value || ''}
                        onChange={(e) => setUpdateData(prev => ({
                          ...prev,
                          availabilityUpdate: { value: Number(e.target.value) }
                        }))}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        placeholder="Number of rooms available"
                        min="0"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'restrictions' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Min Stay
                        </label>
                        <input
                          type="number"
                          value={updateData.restrictionsUpdate?.minStay || ''}
                          onChange={(e) => setUpdateData(prev => ({
                            ...prev,
                            restrictionsUpdate: { 
                              ...prev.restrictionsUpdate, 
                              minStay: Number(e.target.value) 
                            }
                          }))}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                          placeholder="Nights"
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Max Stay
                        </label>
                        <input
                          type="number"
                          value={updateData.restrictionsUpdate?.maxStay || ''}
                          onChange={(e) => setUpdateData(prev => ({
                            ...prev,
                            restrictionsUpdate: { 
                              ...prev.restrictionsUpdate, 
                              maxStay: Number(e.target.value) 
                            }
                          }))}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                          placeholder="Nights"
                          min="1"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={updateData.restrictionsUpdate?.closedToArrival || false}
                          onChange={(e) => setUpdateData(prev => ({
                            ...prev,
                            restrictionsUpdate: { 
                              ...prev.restrictionsUpdate, 
                              closedToArrival: e.target.checked 
                            }
                          }))}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Closed to Arrival</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={updateData.restrictionsUpdate?.closedToDeparture || false}
                          onChange={(e) => setUpdateData(prev => ({
                            ...prev,
                            restrictionsUpdate: { 
                              ...prev.restrictionsUpdate, 
                              closedToDeparture: e.target.checked 
                            }
                          }))}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Closed to Departure</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleApply}
              disabled={updateData.roomTypeIds.length === 0 || updateData.channelIds.length === 0}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply Changes
            </button>
            <button
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}