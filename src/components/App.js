import {useEffect, useState} from 'react';

import "../styles/scss/main.scss";

import getWordFromApi from '../services/getWordFromApi';

function App() {

  const [lastLetter, setLastLetter] = useState('');
  const [warningMsg, setWarningMsg] = useState('');
  const[word, setWord] = useState('');
  const[userLetters, setUserLetters] = useState([]);

  useEffect(() => {
    getWordFromApi().then((word) => {
      setWord(word);
    });
}, []);

  const handleInput =(event) =>{
    const inputValue = event.currentTarget.value.toLowerCase();
    const valided = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü]{1}$/;
    if (valided.test(inputValue)){
      setLastLetter(inputValue);
      setUserLetters([...userLetters, inputValue]);
      setWarningMsg("");
    }
    else{
      setLastLetter(inputValue);
      setWarningMsg("Debes introducir una letra correcta");
    }
  }

  const renderSolutionLetters = () =>{
    const wordLetters = word.split('');
    return(
      wordLetters.map((letterItem, index) => {
        if(!userLetters.includes(letterItem)) {
          return (<li key={index} className="letter"></li>)
        }
        else {
          return (<li key={index} className="letter">{letterItem}</li>)
        }
        
      })
    )}

  const renderErrorLetters = (event) => {
    const errorLetters = userLetters.filter((letterItem) => (!word.includes(letterItem)))
    return errorLetters.map((letterItem, index) => {
      return (<li key={index} className="letter">{letterItem}</li>)})
  }
  

  return (
    <div className="page">
    <header>
      <h1 className="header__title">Juego del ahorcado</h1>
    </header>
    <main className="main">
      <section>
        <div className="solution">
          <h2 className="title">Solución:</h2>
          <ul className="letters">
            {renderSolutionLetters()}
          </ul>
        </div>
        <div className="error">
          <h2 className="title">Letras falladas:</h2>
          <ul className="letters">
            {renderErrorLetters()}
          </ul>
        </div>
        <form className="form">
          <label className="title" htmlFor="last-letter">Escribe una letra:</label>
          <input
            autoComplete="off"
            className="form__input"
            maxLength="1"
            type="text"
            name="last-letter"
            id="last-letter"
            value={lastLetter}
            onChange={handleInput}
          />
          <p className="form__warning">{warningMsg}</p>
        </form>
      </section>
      <section className= {`dummy error-${renderErrorLetters().length}`}>
        <span className="error-13 eye"></span>
        <span className="error-12 eye"></span>
        <span className="error-11 line"></span>
        <span className="error-10 line"></span>
        <span className="error-9 line"></span>
        <span className="error-8 line"></span>
        <span className="error-7 line"></span>
        <span className="error-6 head"></span>
        <span className="error-5 line"></span>
        <span className="error-4 line"></span>
        <span className="error-3 line"></span>
        <span className="error-2 line"></span>
        <span className="error-1 line"></span>
      </section>
    </main>
    <footer className="footer__name">Created by Yaiza Soria Felices 2022</footer>
  </div>
  );
}
export default App;

