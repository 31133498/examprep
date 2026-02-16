export const Icon = ({ name, className = '', size = 'base' }) => {
  const sizes = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };
  
  return <span className={`material-icons ${sizes[size]} ${className}`}>{name}</span>;
};
