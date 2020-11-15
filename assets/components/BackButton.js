import {useRouter} from 'next/router'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
export default function BackButton() {
    const router = useRouter()
    return (
        <div className='back-button' onClick={()=>router.back()}>
            <FontAwesomeIcon icon={faArrowLeft}/>
        </div>
    )
}
