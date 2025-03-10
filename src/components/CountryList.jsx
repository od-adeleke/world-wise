import CountryItem from './CountryItem'
import Spinner from './Spinner'
import styles from './CountryList.module.css'
import Message from './Message'

const CountryList = ({cities, isLoading}) => {
  if(isLoading) return <Spinner />
  if(!cities.length) return <Message message='Add your first country by clicking the country on the map' />

  // const countries = cities.reduce((acc, cur)=> , [])
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countriesList}>
      {countries.map(country => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  )
}

export default CountryList
