import MarkerGreen from '@/assets/icons/marker-green.png'
import MarkerYellow from '@/assets/icons/marker-yellow.png'
import MarkerRed from '@/assets/icons/marker-red.png'

import { PointStatus } from '../types'

export const getMarker = (status: PointStatus | string) => {
  switch (status) {
    case PointStatus.done:
      return MarkerGreen
    case PointStatus.ongoing:
      return MarkerYellow
    case PointStatus.cancelled:
      return MarkerRed
  }
}
