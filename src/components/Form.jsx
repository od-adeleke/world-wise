import {useState, useEffect} from 'react'
import {useUrlPosition} from '../hooks/useUrlPosition'

import Button from './Button'
import Spinner from './Spinner'
import Message from './Message'
import BackButton from './BackButton'
import styles from './Form.module.css'

export function convertToEmoji(countryCode) {
  const codePoints= countryCode.toUpperCase().split('').map((char)=> 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}

const BASE_URL= "https://api.bigdatacloud.net/data/reverse-geocode-client"

const Form = () => {
  const [cityName, setCityName] = useState('')
  const [country, setCountry] = useState('')
  const [date, setDate] = useState(new Date())
  const [notes, setNotes] = useState('')
  
  const [lat, lng]= useUrlPosition()
  const [isLoadingGeocoding, setIsLoadingGeocoding]= useState(false)
  const [emoji, setEmoji]= useState('')
  const [geoCodingError, setGeocodingError]= useState('')

  useEffect(()=> {
    if(!lat && !lng) return;

    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");

        const res = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();

        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😉"
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setGeocodingError(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData()
  }, [lat, lng])

  function handleSubmit(e) {
    e.preventDefault()
  }

  if(isLoadingGeocoding) return <Spinner />
  if(geoCodingError) return <Message message={geoCodingError} />
  if(!lat && !lng) return <Message message="Start by clicking somewhere on the map" />

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input 
          id='cityName' 
          onChange={(e)=> setCityName(e.target.value)} 
          value={cityName} 
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>
          When did you go to {cityName}?
        </label>
        <input 
          id='date' 
          onChange={(e)=> setDate(e.target.value)} 
          value={date} 
        />
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>
          Notes about your trip to {cityName}
        </label>
        <textarea 
          id='notes' 
          onChange={(e)=> setNotes(e.target.value)} 
          value={notes} 
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton />
      </div>
    </form>
  )
}

export default Form
