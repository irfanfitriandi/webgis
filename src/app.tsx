import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import routes from './routes'

import { LoadingSpinner } from './components'

const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner loadingPage />}>
      <RouterProvider router={routes} />
    </Suspense>
  )
}

export default App
