import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "live" | "neutral";
}

const variants = {
  live: "bg-red-600 text-white",
  neutral: "bg-gray-200 text-gray-800",
};

const Badge: React.FC<BadgeProps> = ({ children, className = "", variant = "neutral" }) => {
  return <span className={`${variants[variant]} px-2 py-1 rounded-full text-xs font-semibold ${className}`}>{children}</span>;
};

export default Badge;
