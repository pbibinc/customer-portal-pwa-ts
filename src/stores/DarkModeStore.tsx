import { create } from "zustand";

interface DarkModeStore {
  theme: string;
  mounted: boolean;
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
  handleDarkModeToggle: () => void;
  init: () => void;
}

export const useDarkModeStore = create<DarkModeStore>((set, get) => ({
  theme: "light",
  mounted: false,
  setTheme: (theme: string) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    set({ theme });
  },
  toggleTheme: () => {
    const currentTheme = get().theme;
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    set({ theme: newTheme });
  },
  handleDarkModeToggle: () => {
    if (typeof window !== "undefined") {
      const dmContainer = document.querySelector(
        ".dark-mode-switching"
      ) as HTMLElement;
      if (dmContainer) {
        dmContainer.style.display = "block";
        dmContainer.style.opacity = "1";

        setTimeout(() => {
          const fadeOut = setInterval(() => {
            if (parseFloat(dmContainer.style.opacity) > 0) {
              dmContainer.style.opacity = (
                parseFloat(dmContainer.style.opacity) - 0.1
              ).toString();
            } else {
              clearInterval(fadeOut);
              dmContainer.style.display = "none";
            }
          }, 20);
        }, 1000);
      }
    }
    get().toggleTheme();
  },
  init: () => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") || "light";
      set({ theme: savedTheme, mounted: true });
    }
  },
}));
