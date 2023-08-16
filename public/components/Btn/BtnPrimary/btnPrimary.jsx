

const btnPrimary = (props) => {
  return (
        <button className='btn btn-primary' onClick={props.onClick}>{props.text}</button>
  )
}

export default btnPrimary