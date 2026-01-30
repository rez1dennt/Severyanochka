import cls from './Text.module.scss';
import clsx from 'clsx';

export const Text = ({
  as: Component = 'span',
  size = 'md',
  color = 'primary',
  weight = 'regular',
  align = 'left',
  className,
  children,
}) => {
  return (
    <Component
      className={clsx(
        cls.text,
        cls[size],
        cls[color],
        cls[weight],
        cls[align],
        className
      )}
    >
      {children}
    </Component>
  );
};
