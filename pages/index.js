import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'

export default function Home() {

  const [loading, setLoading] = useState(false);
  
  const URL_API = "https://jsonplaceholder.typicode.com/todos/";
  const [data, setData] = useState(null)

  const fetchAllData = async () => {
    try{
      setLoading(true)

      const response = await fetch(URL_API)
      const data = await response.json()

      console.log(response.status, data);

      if (!data) 
        throw "Problema na requisição"
     
      setData(data)
    } catch(error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllData();
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.box}>
      {loading && !data  &&
        <p>Carregando...</p>
      }

      {
        data && data.map((item) => (
          <h2 className={styles.text}>{item.title}</h2>
        ))
      }
      </div>
    </div>
  )
}
