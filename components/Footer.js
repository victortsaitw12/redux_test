import React from 'react'
import FilterLink from '../containers/FilterLink'

export const Footer = () => (
  <p>
    Show:
      {' '}
    <FilterLink filter="SHOW_ALL">
      All
    </FilterLink>
      {', '}
    <FilterLink filter="SHOW_ACTIVE">
      Active
    </FIlterLink>
      {', '}
    <FilterLink filter="SHOW_COMPLETED">
      completed
    </FilterLink>
  </p>
)