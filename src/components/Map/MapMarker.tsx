import { useState } from 'react'
import { Marker, Popup } from 'react-map-gl'

import PointData from '@/assets/data/marker.geojson.json'

import { getMarker } from '@/utils/helpers/getMarker'
import { PointFeaturesType } from '@/utils/types'

export const MapMarker = () => {
  const [popup, setPopup] = useState<PointFeaturesType | null>(null)

  return (
    <>
      {PointData.features?.map((data: PointFeaturesType, idx: number) => {
        const lng = data.geometry?.coordinates[0]
        const lat = data.geometry?.coordinates[1]
        const { status } = data.properties
        const marker = getMarker(status)

        return (
          <Marker
            key={idx}
            longitude={lng as number}
            latitude={lat as number}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              setPopup(data)
            }}
            style={{ cursor: 'pointer' }}
          >
            <img src={marker} alt="Status point" />
          </Marker>
        )
      })}

      {popup && (
        <Popup
          anchor="top"
          longitude={Number(popup.geometry?.coordinates[0])}
          latitude={Number(popup.geometry?.coordinates[1])}
          onClose={() => setPopup(null)}
        >
          <p>Project ID: {popup.properties.project_id}</p>
          <p>Status: {popup.properties.status}</p>
        </Popup>
      )}
    </>
  )
}
