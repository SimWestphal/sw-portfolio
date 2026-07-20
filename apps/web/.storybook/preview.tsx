import type { Preview } from "@storybook/nextjs-vite";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "../src/app/globals.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={`${sans.variable} ${mono.variable}`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
