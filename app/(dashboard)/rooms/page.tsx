'use client'

import { useState } from 'react'
import { Plus, Search, Users, Bed, Wifi, Car } from 'lucide-react'
import { mockRoomTypes } from '@/data/mockData'
import Image from 'next/image'

export default function RoomTypes() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredRoomTypes = mockRoomTypes.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-4 h-4" />
      case 'parking':
        return <Car className="w-4 h-4" />
      default:
        return <div className="w-4 h-4 bg-gray-300 rounded-full" />
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Room Types</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your room types, amenities, and inventory.
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Add Room Type
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Search room types..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredRoomTypes.map((room) => (
          <div
            key={room.id}
            className="bg-white overflow-hidden shadow-sm rounded-lg border hover:shadow-md transition-all duration-200"
          >
            <div className="relative h-48">
              <Image
                src={room.images[0]}
                alt={room.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
                <div className="text-lg font-bold text-primary-600">
                  ₹{room.baseRate.toLocaleString()}/night
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{room.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Max {room.maxOccupancy} guests</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bed className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{room.bedType}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.slice(0, 4).map((amenity, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {getAmenityIcon(amenity)}
                      <span className="ml-1">{amenity}</span>
                    </span>
                  ))}
                  {room.amenities.length > 4 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      +{room.amenities.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex space-x-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Rooms</p>
                    <p className="font-semibold">{room.totalRooms}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Available</p>
                    <p className="font-semibold text-green-600">{room.availableRooms}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-2 text-sm font-medium text-primary-600 bg-primary-50 border border-primary-200 rounded-md hover:bg-primary-100 transition-colors">
                    Edit
                  </button>
                  <button className="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors">
                    Rates
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}