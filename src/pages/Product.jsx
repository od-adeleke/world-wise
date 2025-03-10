import PageNav from '../components/PageNav'
import styles from './Product.module.css'

const Product = () => {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img src='/img-1.jpg' alt='person with dog overlooking mountain with sunset' />
        <div>
          <h2>About WorldWise.</h2>
          <p>
            Lorem ipsum dolor sit amet consectur adipiscing elit. Illo est dicta illum vero culpa cum quaerat architecto sapiente eius no soluta, molestiae nihil laorum, placeat debitis, laboriosam at fuga perspiciatis?
          </p>
          
          <p>
            Lorem ipsum dolor sit amet consectur adipiscing elit. Illo est dicta illum vero culpa cum quaerat architecto sapiente eius no soluta, molestiae nihil laorum, placeat debitis, laboriosam at fuga perspiciatis?
          </p>
        </div>
      </section>
    </main>
  )
}

export default Product
