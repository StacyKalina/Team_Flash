import styles from "./index.module.css"


export const FooterContact = ({ contact }) => {

    const socials = contact.socials || [];

    return (
            <div className = "sectionWrapper">

            <h2 className="sectionTitle" >
                Contact
            </h2>
            <div className={styles.contactsGrid}>

                <div className={styles.contactsCard}>
                    <div className={styles.cardLabel}>Phone</div>
                    <div className={styles.cardValue}>{contact.phone}</div>
                </div>

                <div className={styles.contactsCard}>
                    
                    <div className={styles.cardLabel}>Socials</div>
                    <div className={styles.cardValueSocials}>
                        {socials.length === 0 ? (
                            <span>—</span>
                        ) : (
                            socials.map(s => (
                                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer">
                                    <img src={s.icon} alt={s.name} />
                                </a>
                            ))
                        )}
                    </div>
                </div>

                <div className={styles.contactsCard}>
                    <div className={styles.cardLabel}>Address</div>
                    <div className={styles.cardValue}>{contact.address}</div>
                </div>

                <div className={styles.contactsCard}>
                    <div className={styles.cardLabel}>Working hours</div>
                    <div className={styles.cardValue}>{contact.hours}</div>
                </div>

            </div>
        </div>

    )
}
