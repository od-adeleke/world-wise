import {useCities} from '../contexts/CitiesContext'

import Spinner from './Spinner'
import CityItem from "./CityItem";
import Message from "./Message";
import styles from './CityList.module.css'

const CityList = () => {
  const {isLoading, cities} = useCities()
  
  if(isLoading) return <Spinner />
  if(!cities.length) return <Message message='Add your first city by clicking the city on the map' />

  return (
    <ul className={styles.cityList}>
      {cities.map(city => <CityItem city={city} key={city.id} />
      )}
    </ul>
  )
} 

export default CityList
