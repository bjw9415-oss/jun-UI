import { useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-11 h-11 bg-[#161b22] border border-gray-800 text-gray-400 hover:text-white hover:border-gray-600 rounded-xl transition-all duration-300 shadow-lg group relative overflow-hidden"
      title={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
    >
      <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {isDark ? (
        <Moon className="w-5 h-5 relative z-10 animate-in spin-in-90 duration-300" />
      ) : (
        <Sun className="w-5 h-5 relative z-10 animate-in -spin-in-90 duration-300 text-orange-400" />
      )}
    </button>
  );
}
