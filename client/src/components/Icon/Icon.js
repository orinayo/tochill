import React from 'react'
import Icons from '../../assets/img/sprite.svg' // Path to icons.svg
import IconNames from './IconNames'

const Icon = ({ name }) => {
  return (
    <svg className={`${IconNames[name]}`}>
      <use xlinkHref={`${Icons}#icon-${name}`} />
    </svg>
  )
}

export default Icon
