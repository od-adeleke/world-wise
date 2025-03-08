import Spinner from './Spinner'
import CityItem from "./CityItem";
import styles from './CityList.module.css'

const CityList = ({cities, isLoading}) => {
  if(isLoading) return <Spinner />
  return (
    <ul className={styles.cityList}>
      {cities.map(city => <CityItem city={city} key={city.id} />
      )}
      {/* {cities.map(city=> <li key={city.id}>{city.cityName}</li>)} */}
    </ul>
  )
} 

export default CityList
