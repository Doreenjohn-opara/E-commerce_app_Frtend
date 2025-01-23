import { ChangeEvent, useEffect, useState } from 'react'
import { IPasswordInput } from '../../../utils/interface.utils'
import { Link } from 'react-router-dom';

const PasswordInput = ( props: IPasswordInput ) => {
    const { 
      text,
      placeholder,  
      name, 
      id, 
      onChange, 
      hasIcon = false,
      icon = 'fe-user', 
      transparent = false
    } = props;

    const [passwordType, setPasswordType] = useState<string>('password');

    const toggleType = (e: any) => {
        if (e) {
            if (e) {
                { e.preventDefault() }
            }
            
            if (passwordType === 'password') {
                setPasswordType('text')
            } else {
                setPasswordType('password')
            }
    }
}

    useEffect(() => {

    }, [])
  return (
    <>
        <div className='form-group ui-relative'>
            <div className="control-wrapper">
                <p className='font-aeonik brand-blue mrgb fs-16 mrgt2 mrgb'>{text}</p>
                {
                    hasIcon &&
                    <span className={`fe ${icon} ui-absolute input-icon brand-gray`}></span>
                }
                 <Link to="" onClick={(e) => toggleType(e)} className={`brand-yellow`}>
                    <span className={`fe fe-${passwordType === 'password' ? 'eye' : 'eye-off'} ui-absolute eye-icon`}></span>
                 </Link>
                 <input 
                 id={id ? id : ''}
                 type={passwordType}
                 name={name ? name : '' } 
                 placeholder={placeholder ? placeholder : 'Type Here'}
                 onChange={onChange}
                 className={`form-control fs-16 ${hasIcon ? "pdl3" : "pdl1" } font-aeonik ${transparent ? 'bg-transparent' : ''} brand-white`} 
                 />
            </div>
        </div>
    </>
  )
}

export default PasswordInput;