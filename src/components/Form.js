const Form = (props) => {
    return (
        <form className="form" onSubmit={props.handleSubmit}>
            <label className="title" htmlFor="last-letter">Escribe una letra:</label>
            <input
            autoComplete="off"
            className="form__input"
            maxLength="1"
            type="text"
            name="last-letter"
            id="last-letter"
            value={props.lastLetter}
            onKeyDown={props.handleKeyDown}
            onChange={props.handleInput}
            />
            <p className="form__warning">{props.warningMsg}</p>
        </form>
    )
  };

export default Form;