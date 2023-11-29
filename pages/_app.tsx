import './styles.css'
import Home from '.'
 
// This default export is required in a new `pages/_app.js` file.
export default function MyApp() {
  return (
    <>
      <Home isConnected={false} />
    </>
  )
}