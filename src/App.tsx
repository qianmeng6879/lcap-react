import { NavigateFunction, useNavigate, useRoutes } from 'react-router-dom'


export let router: NavigateFunction;

import routes from './router'
import { useEffect } from 'react'
export default function App() {
  const element = useRoutes(routes)
  const navigate = useNavigate()

  useEffect(() => {
    router = navigate
  }, [])
  return (
    <>
      {element}
    </>
  )
}
