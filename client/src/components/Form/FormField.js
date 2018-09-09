import React from 'react'

// Get label, type and input object from props
export default ({ input, label, type }) => {
  return (
    <div className='form__group'>
      <input {...input}
        className='form__input'
        type={type} placeholder={label}
        maxLength={label === 'Name Of Spot' ? '12' : undefined}
        min={label === 'Budget' ? '1000' : label === 'Rating' ? '1' : undefined}
        max={label === 'Rating' ? '5' : undefined}
        step={label === 'Budget' ? '1000' : label === 'Rating' ? '1' : undefined}
        required={(label === 'Admin Code (optional)' || label === 'Avatar URL (optional)')
          ? null : 'required'} />
      <label className='form__label'>{label}</label>
    </div>
  )
}
