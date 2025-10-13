export function LightDark(lightClass: string, darkClass: string) {
  return lightClass + " " + darkClass;
}

export function toggleLayoutMode() {
  document.documentElement.classList.toggle("dark");
}

// Simple theme detection function
export function getTheme() {
  return {
    darkMode: document.documentElement.classList.contains("dark")
  };
}
