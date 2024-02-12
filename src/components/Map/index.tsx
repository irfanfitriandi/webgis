import { useCallback, useState } from 'react'
import { Map, NavigationControl, GeolocateControl } from 'react-map-gl'
import { useSelector } from 'react-redux'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

import PolygonData from '@/assets/data/polygon.geojson.json'
import { MapPolygon, Search } from '@/components'
import { HoverPolyType } from '@/utils/types'
import { RootState } from '@/app/store'
import { MapMarker } from './MapMarker'

export const MapPlain = () => {
  const [hoverInfo, setHoverInfo] = useState<HoverPolyType>({})
  const layerState = useSelector((state: RootState) => state.layer)

  const onHover = useCallback((e: any) => {
    const {
      features,
      point: { x, y },
    } = e
    const hoveredFeature = features[0]

    setHoverInfo(hoveredFeature && { feature: hoveredFeature, x, y })
  }, [])

  const localSearch = (query: string) => {
    const matchingFeatures = []
    for (const feature of PolygonData.features) {
      if (
        feature.properties.Propinsi.toLowerCase().includes(query.toLowerCase())
      ) {
        let feature: any
        feature.place_name = `${feature.properties.Propinsi}`
        feature.center = feature.geometry.coordinates[0]
        matchingFeatures.push(feature)
      }
    }
    return matchingFeatures
  }

  return (
    <div className="flex justify-end">
      <Map
        mapLib={maplibregl as any}
        initialViewState={{
          longitude: 112.544,
          latitude: 3.316,
          zoom: 4,
        }}
        style={{
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          left: 0,
          zIndex: 1,
        }}
        mapStyle={`https://api.maptiler.com/maps/streets-v2/style.json?key=${
          import.meta.env.VITE_API_MAPTILER
        }`}
        interactiveLayerIds={['data']}
        onMouseMove={onHover}
      >
        {layerState.polygon && <MapPolygon hoverInfo={hoverInfo} />}
        {layerState.point && <MapMarker />}

        <Search
          mapboxAccessToken={import.meta.env.VITE_API_MAPBOX}
          position="top-right"
          localGeocoder={localSearch as any}
          localGeocoderOnly={true}
        />
        <NavigationControl position="bottom-right" />
        <GeolocateControl position="bottom-right" />
      </Map>
    </div>
  )
}
