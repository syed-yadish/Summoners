import '../styles/error.css';
import SadAmumu from '../assets/images/amumu-sad.gif';

const ErrorMessage = () => {

    return (
        <div className='errorwrapper'> 
          <img className='gif' src={SadAmumu} alt="Sad Amumu Crying"/>
            <div className='errordiv'> 
              <p className='message'> This Summoner does not exist! Check your spelling and try again.</p>
            </div>
        </div>
  );
}

export default ErrorMessage;