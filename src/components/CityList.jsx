import Spinner from './Spinner'
import CityItem from "./CityItem";
import styles from './CityList.module.css'

const CityList = ({cities, isLoading}) => {
  console.log(cities)
  if(isLoading) return <Spinner />
  return (
    <ul className={styles.cityList}>
      {cities.map(city => <CityItem city={city} key={city.id} />
      )}
    </ul>
  )
}

export default CityList
