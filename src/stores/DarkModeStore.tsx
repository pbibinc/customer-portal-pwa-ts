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
  theme: "light", // default theme
  mounted: false,
  setTheme: (theme: string) => set({ theme }),
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "dark" ? "light" : "dark",
    })),
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

// Subscribe to theme changes to update the document attribute and localStorage,
// but only if the store has been initialized (mounted).
if (typeof window !== "undefined") {
  useDarkModeStore.subscribe((state) => {
    if (state.mounted) {
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("theme", state.theme);
    }
  });
}
