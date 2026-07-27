import { tv } from "@/app/lib/tv";
import Link from "next/link";
import React, { forwardRef } from "react";
import { iconMap, IconName } from "../icons";

// export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   href?: string;
//   variant?: IconName;
//   size?: any;
//   isLoading?: boolean;
// }
type CommonProps = { variant?: IconName; isLoading?: boolean; size?: number };

type ButtonProps =
  | (CommonProps &
      React.ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: never;
      })
  | (CommonProps &
      React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
      });

const buttonStyles = tv({
  slots: {
    button:
      "flex gap-2 bg-accent border-accent border-2 items-center font-mono text-accent-foreground text-langswitch  uppercase px-6 py-3 cursor-pointer transition-smooth",
    buttonIcon: "inline-block animate-none",
  },
  variants: {
    isDisabled: {
      true: {
        button: "cursor-not-allowed isDisabled",
      },
      false: {
        button:
          "hover:bg-accent-foreground hover:text-accent hover:border-accent",
      },
    },
    isLoading: {
      true: {
        button: "border-accent text-accent bg-accent-foreground  isLoading",
        buttonIcon: "animate-spin",
      },
    },
  },
});

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(props, ref) {
  const { variant, isLoading = false, className } = props;
  const isDisabled =
    "disabled" in props && props.disabled === true ? props.disabled : false;

  const { button, buttonIcon } = buttonStyles({
    className,
    isLoading,
    isDisabled,
  });
  const IconComponent = variant ? iconMap[variant] : null;

  if (props.href !== undefined) {
    const {
      variant: _v,
      isLoading: _l,
      size,
      href,
      className: _c,
      children,
      ...linkProps
    } = props;
    return (
      <Link
        href={href}
        className={button({ class: className })}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...linkProps}
      >
        <span>{children}</span>
        {IconComponent && <IconComponent size={16} className={buttonIcon()} />}
      </Link>
    );
  }

  const {
    href: _href,
    variant: _v,
    isLoading: _l,
    size,
    className: _c,
    children,
    ...buttonProps
  } = props;
  console.log(props);
  return (
    <button
      className={button({ class: className })}
      ref={ref as React.Ref<HTMLButtonElement>}
      disabled={isDisabled}
      {...buttonProps}
    >
      <span>{children}</span>
      {IconComponent && <IconComponent size={16} className={buttonIcon()} />}
    </button>
  );
});
