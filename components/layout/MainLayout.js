import Navigation from '../navigation/Navigation'

const MainLayout = ({children}) => {
  return (
    <div>
      <Navigation/>
      {children}
    </div>
  )
}

export default MainLayout