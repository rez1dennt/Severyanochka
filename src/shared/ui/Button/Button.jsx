import cls from './Button.module.scss'
import clsx from 'clsx'

export const Button = ({
                         as: Component = 'button',
                         variant = 'primary',
                         size = 'md',
                         fullWidth = false,
                         iconLayout = 'inline', // 'inline' | 'absolute'
                         leftIcon,
                         rightIcon,
                         type = 'button',
                         disabled = false,
                         className,
                         children,
                         ...props
                       }) => {
  const isButtonTag = Component === 'button'
  
  return (
    <Component
      type={isButtonTag ? type : undefined}
      disabled={isButtonTag ? disabled : undefined}
      aria-disabled={!isButtonTag ? disabled : undefined}
      className={clsx(
        cls.button,
        cls[variant],
        cls[size],
        fullWidth && cls.fullWidth,
        iconLayout === 'absolute' && cls.iconAbsolute,
        className
      )}
      {...props}
    >
      {leftIcon && <span className={cls.iconLeft}>{leftIcon}</span>}
      <span className={cls.content}>{children}</span>
      {rightIcon && <span className={cls.iconRight}>{rightIcon}</span>}
    </Component>
  )
}
