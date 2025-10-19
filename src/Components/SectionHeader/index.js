import styles from './index.module.css'
import { Link } from 'react-router-dom'

export const SectionHeader = ({ title, buttonText, fromRouterPath }) => {
  
  return (
    <div className={styles.h2_Link_Wrapper }>
      <h2 className="sectionTitle"> {title} </h2>

      <div className={styles.line} />

      <Link className={styles.btnLink} to={fromRouterPath} >
          {buttonText}
        </Link>
    </div>
  )
}