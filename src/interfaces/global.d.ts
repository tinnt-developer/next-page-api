declare interface IconProps {
  color?: string;
  size?: Size;
  className?: string;
  onClick?: (e: any) => void;
}

declare type AuthProps = {
  isProtected?: boolean;
  isRestricted?: boolean;
  redirect?: string;
  loading?: import('react').ReactNode;
};
