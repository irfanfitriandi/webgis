import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { setPoint, setPolygon } from '@/app/reducers/layer.slice'
import {
  ArrowIcon,
  BinIcon,
  ButtonIcon,
  LayerIcon,
  LayerPlusIcon,
  MapIcon,
} from './Icons'

export const Sidebar = () => {
  const [miniSidebar, setMiniSidebar] = useState(true)
  const [menuSidebar, setMenuSidebar] = useState(false)
  const [activeItem, setActiveItem] = useState<'list' | 'active'>('list')
  const layerState = useSelector((state: RootState) => state.layer)
  const dispatch = useDispatch()

  return (
    <div className="flex">
      <div
        className={`flex flex-col justify-between bg-primary ${
          miniSidebar ? 'w-28' : 'w-52'
        } z-50 h-screen w-28 py-5 duration-300 ease-in-out`}
      >
        <div className="flex flex-col text-white">
          <img className="mx-auto mb-8 w-16" src="/logo.svg" alt="logo" />

          <button
            className={`flex ${
              miniSidebar ? 'items-center justify-center' : 'items-center'
            } gap-6 p-4 text-sm duration-300 ease-in-out hover:bg-white/10 ${
              activeItem === 'list' && 'bg-white/30'
            }`}
            onClick={() => {
              setMenuSidebar(true)
              setActiveItem('list')
            }}
          >
            <LayerIcon className="w-4" />
            {miniSidebar ? ' ' : 'Layer List'}
          </button>
          <button
            className={`flex ${
              miniSidebar ? 'items-center justify-center' : 'items-center'
            } gap-6 p-4 text-sm duration-300 ease-in-out hover:bg-white/10 ${
              activeItem === 'active' ? 'bg-white/30' : ''
            }`}
            onClick={() => {
              setMenuSidebar(true)
              setActiveItem('active')
            }}
          >
            <MapIcon className="w-4" />
            {miniSidebar ? ' ' : 'Active Layer'}
          </button>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <ArrowIcon
            className={`mx-auto w-8 cursor-pointer ${miniSidebar && 'rotate-180'}`}
            onClick={() => setMiniSidebar(!miniSidebar)}
          />
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1">
              <a
                href="https://www.linkedin.com/in/irfanfitriandi/"
                target="_blank"
              >
                <img
                  src="https://img.icons8.com/?size=24&id=8808&format=png"
                  alt="linkedin"
                  className="opacity-90 invert"
                />
              </a>
              <a href="https://github.com/irfanfitriandi" target="_blank">
                <img
                  src="https://img.icons8.com/?size=28&id=62856&format=png"
                  alt="github"
                  className="opacity-90 invert"
                />
              </a>
            </div>
            <div className="text-xs text-white">@irfanfitriandi</div>
          </div>
        </div>
      </div>

      <div
        className={`z-10 flex h-screen w-52 flex-col items-center gap-4 bg-accent p-5 text-sm font-medium shadow-md duration-300 ease-in-out ${
          menuSidebar ? 'translate-x-0' : '-translate-x-[210px]'
        }`}
      >
        {activeItem === 'list' ? (
          <>
            <div className="flex h-10 w-full items-center justify-between rounded-md bg-white p-2 shadow-sm">
              Point
              <LayerPlusIcon
                onClick={() => dispatch(setPoint(true))}
                className="w-5 cursor-pointer"
              />
            </div>
            <div className="flex h-10 w-full items-center justify-between rounded-md bg-white p-2 shadow-sm">
              Polygon
              <LayerPlusIcon
                onClick={() => dispatch(setPolygon(true))}
                className="w-5 cursor-pointer"
              />
            </div>
          </>
        ) : (
          <>
            {!layerState.point && !layerState.polygon && (
              <div>No Active Layer</div>
            )}
            {layerState.point && (
              <div className="flex h-10 w-full items-center justify-between rounded-md bg-white p-2 shadow-sm">
                Point
                <BinIcon
                  onClick={() => dispatch(setPoint(false))}
                  className="w-5 cursor-pointer"
                />
              </div>
            )}
            {layerState.polygon && (
              <div className="flex h-10 w-full items-center justify-between rounded-md bg-white p-2 shadow-sm">
                Polygon
                <BinIcon
                  onClick={() => dispatch(setPolygon(false))}
                  className="w-5 cursor-pointer"
                />
              </div>
            )}
          </>
        )}
      </div>

      <ButtonIcon
        className={`absolute top-1/2 w-12 cursor-pointer ease-in-out ${
          miniSidebar ? 'left-[88px]' : 'left-[184px]'
        } ${
          menuSidebar
            ? 'translate-x-[210px] -scale-x-100 transform'
            : 'translate-x-0'
        } z-50 duration-300`}
        onClick={() => setMenuSidebar(!menuSidebar)}
      />
    </div>
  )
}
