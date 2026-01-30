import clsx from "clsx";
import cls from './Container.module.scss'

export const Container = ({children, className}) => {
return (
  <div className={clsx(cls.container, className)}>
    {children}
  </div>
)
}