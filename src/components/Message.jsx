import styles from './Message.module.css'

const Message = ({message}) => {
  return (
    <p className={styles.message}>
      <span role='img'>👋🏽</span> {message}
    </p>
  )
}

export default Message
