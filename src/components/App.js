import {useEffect, useState} from 'react';

import "../styles/App.scss";
import "../styles/Form.scss";
// import "../styles/Instruction.scss";
// import "../styles/Loading.scss";


import getWordFromApi from '../services/GetWordFromApi';

import Header from './Header';
import Footer from './Footer';
import Dummy from './Dummy';
import SolutionLetters from './SolutionLetters';
import ErrorLetters from './ErrorLetters';
import Form from './Form';

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

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleKeyDown = (ev) => {
    //Esta función es para que no tenga que borrar para escribir otra letra, que en el momento que escriba otra letra se borre la anterior
    ev.target.setSelectionRange(0, 1);
  };


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
    <Header />
    <main className="main">
      <section>
        <SolutionLetters renderSolutionLetters = {renderSolutionLetters()}/>
        <ErrorLetters renderErrorLetters={renderErrorLetters()}/>
        <Form handleInput={handleInput} lastLetter={lastLetter} warningMsg ={warningMsg} handleSubmit={handleSubmit} handleKeyDown={handleKeyDown}/>
      </section>
      <Dummy renderErrorLetters = {renderErrorLetters().length}/>
    </main>
    <Footer />
  </div>
  );
}
export default App;

