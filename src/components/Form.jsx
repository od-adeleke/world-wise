import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import {useCities} from '../contexts/CitiesContext'
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
  const [isLoadingGeocoding, setIsLoadingGeocoding]= useState(false)
  const [emoji, setEmoji]= useState('')
  const [geoCodingError, setGeocodingError]= useState('')

  const [lat, lng]= useUrlPosition()
  const {createCity}= useCities()

  const navigate= useNavigate()

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

  async function handleSubmit(e) {
    e.preventDefault()

    // don't sumbit without city name or date
    if(!cityName || !date) return

    const newCity= {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {lat, lng}
    }
    
    await createCity(newCity)
    // console.log(newCity)
    navigate("/app/cities");
  }

  if(isLoadingGeocoding) return <Spinner />
  if(geoCodingError) return <Message message={geoCodingError} />
  // to prevent the user from accessing the form through the url only
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
        <DatePicker 
          onChange={date=> setDate(date)} 
          selected={date} // 'selected' prop here does the same work as 'value' prop
          dateFormat='dd/MM/yyyy' 
          id='date' />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>
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
