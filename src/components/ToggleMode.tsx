import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Theme = "light" | "dark" | "system";

function getThemeFromStorage(): Theme {
  if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
    return localStorage.getItem("theme") as Theme;
  }
  return "light";
}

export function ModeToggle() {
  const [theme, setThemeState] = React.useState<Theme>("light");

  React.useEffect(() => {
    setThemeState(getThemeFromStorage());
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setThemeState("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeState("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeState("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
