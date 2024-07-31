import { useState } from "react";
import { Divide as HamburgerMenu } from "hamburger-react";

interface HamburgerProps {
  size?: number;
  toggleNavigation: () => void;
}

export const Hamburger = ({ size, toggleNavigation }: HamburgerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
    toggleNavigation();
  };

  return <HamburgerMenu size={size ?? 24} onToggle={toggle} toggled={isOpen} />;
};
