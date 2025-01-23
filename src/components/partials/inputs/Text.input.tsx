import { useEffect } from 'react'
import { ITextInput } from '../../../utils/interface.utils';

const TextInput = ( props: ITextInput ) => {
    const { 
      text,
      placeholder, 
      type, 
      name, 
      id, 
      onChange, 
      hasIcon = false,
      icon = 'fe-user',
      transparent = false 
    } = props;

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
                 <input 
                 id={id ? id : ''}
                 type={type} 
                 name={name ? name : '' } 
                 placeholder={placeholder ? placeholder : 'Type Here'}
                 onChange={onChange}
                 className={`form-control fs-16 ${hasIcon ? "pdl3" : "pdl1" } font-aeonik ${transparent ?  'bg-transparent' : ''} brand-white`} 
                 />
            </div>
        </div>
    </>
  )
}

export default TextInput;