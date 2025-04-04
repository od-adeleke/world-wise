import { useEffect, createContext, useContext, useReducer } from 'react'

const CitiesContext = createContext()

const BASE_URL= 'http://localhost:9000'

const initialState= {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ''
}

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return({
        ...state,
        isLoading: true
      })
    case 'cities/loaded':
      return({
        ...state, 
        isLoading: false, 
        cities: action.payload
      })
    case 'city/loaded':
      return({
        ...state, 
        isLoading: false, 
        currentCity: action.payload
      })
    case 'city/created':
      return({
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload
      })
    case 'city/deleted':
      return({
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {}
      })
    case 'rejected':
      return({
        ...state,
        isLoading: false,
        error: action.payload
      })
    default:
      throw new Error('Unknown action type')
  }
}

function CitiesProvider({children}){
  const [{cities, isLoading, currentCity}, dispatch]= useReducer(reducer, initialState)

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({type: 'loading'})
        const res= await fetch(`${BASE_URL}/cities`)
        const data= await res.json()
        dispatch({
          type: 'cities/loaded', 
          payload: data
        })
      } catch {
        dispatch({
          type: 'rejected', 
          payload: `there was an error loading cities.`
        })
      }
    }
    fetchCities();
  },[])

  async function getCity(id){
    try {
      dispatch({type: 'loading'})
      const res= await fetch(`${BASE_URL}/cities/${id}`)
      const data= await res.json()
      dispatch({
        type: 'city/loaded', 
        payload: data
      })
    } catch {
      dispatch({
        type: 'rejected', 
        payload: `there was an error loading city.`
      })
    }
  }

  async function createCity(newCity){
    try {
      dispatch({type: 'loading'})
      const res= await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data= await res.json()
      dispatch({
        type: 'city/created', 
        payload: data
      })
    } catch {
      dispatch({
        type: 'rejected', 
        payload: `there was an error creating city.`
      })
    }
  }
  
  async function deleteCity(id){
    try {
      dispatch({type: 'loading'})
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE'
      })

      dispatch({
        type: 'city/deleted', 
        payload: id
      })
    } catch {
      dispatch({
        type: 'rejected', 
        payload: `there was an error deleting the city.`
      })
    }
  }

  return (
    <CitiesContext.Provider value={{
      cities,
      isLoading,
      currentCity,
      getCity,
      createCity,
      deleteCity
    }}>
      {children}
    </CitiesContext.Provider>
  )
}

function useCities() {
  const context = useContext(CitiesContext)
  if(context === undefined) throw new Error('CitiesContext was used outside the CitiesProvider')
  return context
}

export {CitiesProvider, useCities}