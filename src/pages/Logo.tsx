import { ComponentProps } from "react";
interface LogoProps extends ComponentProps<"svg"> {
  color?: string;
}

export function Logo({ color, ...props }: LogoProps) {
  return (
    <svg
      {...props}
      width="32"
      height="32"
      viewBox="0 0 59 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.6331 20.4379L31.0154 9.74088V0H21.6331V12.7886H7.29072L0 20.4379H21.6331ZM21.6331 41.832H31.0154V31.613L36.8719 24.7406L47.6885 41.832H58.9234L43.2065 17.2109L57.7282 0H47.0311L21.6331 30.4776V41.832Z"
        fill={color}
      />
    </svg>
  );
}
