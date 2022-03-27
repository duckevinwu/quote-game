const Feedback = ({
  revealing,
  content
}) => {
  return (
    <div className={revealing ? "feedback revealed" : "feedback"}>
      <p>{content}</p>
    </div>
  )
}

export default Feedback;
