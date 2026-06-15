function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
}) {
  const isCentered = align === 'center'

  return (
    <div className={isCentered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow ? (
        <span className={light ? 'eyebrow border-white/20 bg-white/10 text-white' : 'eyebrow'}>
          {eyebrow}
        </span>
      ) : null}
      <h2 className={`section-title mt-5 ${light ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h2>
      {description ? (
        <p className={`section-copy ${isCentered ? 'mx-auto' : ''} ${light ? 'text-slate-200' : ''}`}>
          {description}
        </p>
      ) : null}
    </div>
  )
}

export default SectionHeading
