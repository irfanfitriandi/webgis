import { useState } from 'react'
import { useControl, Marker, MarkerProps, ControlPosition } from 'react-map-gl'
import MapboxGeocoder, { GeocoderOptions } from '@mapbox/mapbox-gl-geocoder'

type GeocoderControlProps = Omit<
  GeocoderOptions,
  'accessToken' | 'mapboxgl' | 'marker'
> & {
  mapboxAccessToken: string
  marker?: boolean | Omit<MarkerProps, 'longitude' | 'latitude'>

  position: ControlPosition

  onLoading?: any
  onResults?: any
  onResult?: any
  onError?: any
}

export const Search = (props: GeocoderControlProps) => {
  const [marker, setMarker] = useState<any>()

  const geocoder = useControl<MapboxGeocoder>(
    () => {
      const ctrl = new MapboxGeocoder({
        ...props,
        marker: false,
        accessToken: props.mapboxAccessToken,
      })
      ctrl.on('loading', props.onLoading)
      ctrl.on('results', props.onResults)
      ctrl.on('result', (evt) => {
        props.onResult(evt)

        const { result } = evt
        const location =
          result &&
          (result.center ||
            (result.geometry?.type === 'Point' && result.geometry.coordinates))
        if (location && props.marker) {
          setMarker(<Marker longitude={location[0]} latitude={location[1]} />)
        } else {
          setMarker(null)
        }
      })
      ctrl.on('error', props.onError)
      return ctrl
    },
    {
      position: props.position,
    },
  )

  if ((geocoder as any)._map) {
    if (
      geocoder.getProximity() !== props.proximity &&
      props.proximity !== undefined
    ) {
      geocoder.setProximity(props.proximity)
    }
    if (
      geocoder.getRenderFunction() !== props.render &&
      props.render !== undefined
    ) {
      geocoder.setRenderFunction(props.render)
    }
    if (
      geocoder.getLanguage() !== props.language &&
      props.language !== undefined
    ) {
      geocoder.setLanguage(props.language)
    }
    if (geocoder.getZoom() !== props.zoom && props.zoom !== undefined) {
      geocoder.setZoom(props.zoom)
    }
    if (geocoder.getFlyTo() !== props.flyTo && props.flyTo !== undefined) {
      geocoder.setFlyTo(props.flyTo)
    }
    if (
      geocoder.getPlaceholder() !== props.placeholder &&
      props.placeholder !== undefined
    ) {
      geocoder.setPlaceholder(props.placeholder)
    }
    if (
      geocoder.getCountries() !== props.countries &&
      props.countries !== undefined
    ) {
      geocoder.setCountries(props.countries)
    }
    if (geocoder.getTypes() !== props.types && props.types !== undefined) {
      geocoder.setTypes(props.types)
    }
    if (
      geocoder.getMinLength() !== props.minLength &&
      props.minLength !== undefined
    ) {
      geocoder.setMinLength(props.minLength)
    }
    if (geocoder.getLimit() !== props.limit && props.limit !== undefined) {
      geocoder.setLimit(props.limit)
    }
    if (geocoder.getFilter() !== props.filter && props.filter !== undefined) {
      geocoder.setFilter(props.filter)
    }
    if (geocoder.getOrigin() !== props.origin && props.origin !== undefined) {
      geocoder.setOrigin(props.origin)
    }
  }
  return marker
}

const noop = () => {}

Search.defaultProps = {
  marker: true,
  onLoading: noop,
  onResults: noop,
  onResult: noop,
  onError: noop,
}
