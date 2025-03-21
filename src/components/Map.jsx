import {useState, useEffect} from 'react'
import {useSearchParams, useNavigate} from 'react-router-dom'
import {useCities} from '../contexts/CitiesContext'
import  {MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents} from 'react-leaflet'
import styles from './Map.module.css'

const Map = () => {
  const [mapPosition, setMapPosition]= useState([40, 0])
  const {cities, currentCity}= useCities()
  const [searchParams, setSearchParams]= useSearchParams()

  const mapLat = searchParams.get('lat')
  const mapLng = searchParams.get('long')

  useEffect(()=> {
    if(mapLat && mapLng) setMapPosition([mapLat, mapLng])
  }, [mapLat, mapLng])
  return (
    <div className={styles.mapContainer}>
      <MapContainer 
        center={mapPosition} 
        zoom={6}
        scrollWheelZoom={true} 
        className={styles.map}
      >
        <TileLayer 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" 
        />
        {cities.map((city)=> (
          <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
            <Popup>
              <span>{city.emoji}</span><span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeMapPosition position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  )
}

function ChangeMapPosition({position}) {
  const map= useMap()
  map.setView(position)
  return null
}

function DetectClick() {
  const navigate= useNavigate()
  
  useMapEvents({
    // saving the state of the lat and lng of the point where the map is clicked to the URL
    click: (e)=> navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })
}
export default Map
