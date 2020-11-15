import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";


export default function Alert({text='not text entered' , type = 'success' , open= false , onClose}) {

  return (
    <div className={`alert alert--${type} ${ open ? 'alert--open' : ''} `}>
      <div>
        <FontAwesomeIcon  icon={faExclamationCircle} />
        <span className='alert__Text'> {text} </span>
      </div>
      <FontAwesomeIcon className='alert__close-btn' onClick={onClose} icon={faTimesCircle} />
    </div>
  );
}
