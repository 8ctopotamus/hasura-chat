import { ReactNode } from 'react'

const ScrollView = ({ children } : {children: ReactNode}) => {
  return (
    <div className="scrollview">
      {children}
    </div>
  )
}

export default ScrollView