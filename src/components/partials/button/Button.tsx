import React from 'react';
import { IButton } from '../../../utils/interface.utils';

const Button = (props: IButton) => {
    const {
        type,
        text,
        onClick,
        color = 'initial' // Default color if not provided
    } = props;
    
    return (
        <>
            <div className='form-group ui-relative mrgt2'>
                <button 
                    className='btn font-aeonik-bold onwhite' 
                    onClick={onClick} 
                    type="button"
                    style={{ backgroundColor: color}} // Apply the color prop
                >
                    {text}
                </button> 
            </div>
        </> 
    );
}

export default Button;
