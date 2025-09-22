import { SectionHeader } from "../SectionHeader";
import styles from "./index.module.css";



export const SectionCategories = () => {
    return (
        <div className = "sectionWrapper">
<SectionHeader
  title="Categories"
  buttonText="Alle Kategorien"
  fromRouterPath="/categories"
/>
        </div>)
   
}