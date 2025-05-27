interface BackIconProps {
  onClick?: () => void
}

export const BackIcon = ({ onClick }: BackIconProps) => {
  return (
    <svg
      width='14'
      height='27'
      viewBox='0 0 14 27'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ display: 'flex', alignSelf: 'flex-start' }}
      onClick={onClick}
    >
      <path
        d='M12 2L2 13.5L12 25'
        stroke='white'
        strokeOpacity='0.87'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
