import {useSearchParams} from 'react-router-dom'
import styles from './Map.module.css'

const Map = () => {
  const [searchParams, setSearchParams]= useSearchParams()

  const lat = searchParams.get('lat')
  const long = searchParams.get('long')
  return (
    <div className={styles.mapContainer}>
        <h1>Map</h1>
        <h1>Position: {lat},<br /> {long}</h1>
    </div>
  )
}

export default Map
