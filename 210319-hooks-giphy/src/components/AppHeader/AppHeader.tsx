import GIPHYLogo from "../../images/1280px-Giphy-logo.png"

const AppHeader: React.FC = () => {
  return (
    <>
      <img src={GIPHYLogo} alt="GIPHY logo" style={{ width: 300 }} />
      <h1 className="pt-4">Welcome to GIFSearch!</h1>
    </>
  )
}

export default AppHeader
