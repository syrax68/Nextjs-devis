import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Devis from './components/DevisModal'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Devis React</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Devis />
    </div>
  )
}
