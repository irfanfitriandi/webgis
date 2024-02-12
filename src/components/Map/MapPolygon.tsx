import { Source, Layer, FillLayer } from 'react-map-gl'

import PolygonData from '@/assets/data/polygon.geojson.json'

import { HoverPolyType } from '@/utils/types'

interface IMapPolygon {
  hoverInfo: HoverPolyType
}

export const MapPolygon = ({ hoverInfo }: IMapPolygon) => {
  const layerStyle: FillLayer = {
    id: 'data',
    type: 'fill',
    paint: {
      'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'users'],
        0,
        '#FD9D0D',
        250,
        '#0F9504',
        500,
        '#3BA1FF',
      ],
      'fill-opacity': 0.9,
      'fill-outline-color': '#000000',
    },
  }

  return (
    <>
      <Source id="data" type="geojson" data={PolygonData as any}>
        <Layer {...layerStyle} />
      </Source>
      {hoverInfo && (
        <div
          className="absolute m-2 rounded-md bg-white p-2"
          style={{ left: hoverInfo.x, top: hoverInfo.y }}
        >
          <div>ID: {hoverInfo.feature?.properties.ID}</div>
          <div>Propinsi: {hoverInfo.feature?.properties.Propinsi}</div>
          <div>Users: {hoverInfo.feature?.properties.users}</div>
        </div>
      )}
    </>
  )
}
