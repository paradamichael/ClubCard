import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export default function Button({ variant = 'primary', className = '', children, ...rest }: Props) {
  const cls = `btn ${variant === 'secondary' ? 'secondary' : variant === 'ghost' ? 'ghost' : ''} ${className}`.trim()
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  )
}

