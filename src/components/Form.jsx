import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useUrlPosition} from '../hooks/useUrlPosition'

import Button from './Button'
import BackButton from './BackButton'
import styles from './Form.module.css'

export function convertToEmoji(countryCode) {
  const codePoints= countryCode.toUpperCase().split('').map((char)=> 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}

const Form = () => {
  const [cityName, setCityName] = useState('')
  const [country, setCountry] = useState('')
  const [date, setDate] = useState(new Date())
  const [notes, setNotes] = useState('')
  const [mapLat, mapLng]= useUrlPosition()

  const navigate = useNavigate()

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input id='cityName' onChange={(e)=> setCityName(e.target.value)} value={cityName} />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityName}?</label>
        <input id='date' onChange={(e)=> setDate(e.target.value)} value={date} />
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>Notes about your trip to {cityName}</label>
        <textarea id='notes' onChange={(e)=> setNotes(e.target.value)} value={notes} />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton />
      </div>
    </form>
  )
}

export default Form
