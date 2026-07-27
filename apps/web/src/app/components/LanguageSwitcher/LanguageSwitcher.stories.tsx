import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { getRouter } from "@storybook/nextjs-vite/navigation.mock";
import { expect, within } from "storybook/test";
import { LanguageSwitcher } from "./LanguageSwitcher";

const meta = {
  title: "Components/LanguageSwitcher",
  component: LanguageSwitcher,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true, // App Router (next/navigation) für usePathname
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LanguageSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const German: Story = {
  parameters: {
    nextjs: { navigation: { pathname: "/de/projekte/projekt-xy" } },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 3 Sprachlinks
    const links = canvas.getAllByRole("link");
    await expect(links).toHaveLength(3);

    // en Link zeigt auf englische URL
    const enLink = canvas.getByRole("link", { name: "EN" });
    await expect(enLink).toHaveAttribute("href", "/en/projekte/projekt-xy");
  },
};

export const English: Story = {
  parameters: {
    nextjs: { navigation: { pathname: "/en/projekte/projekt-xy" } },
  },
  play: async ({ canvas, userEvent }) => {
    // 3 Sprachlinks
    const links = canvas.getAllByRole("link");
    await expect(links).toHaveLength(3);

    // de Link zeigt auf deutsche URL
    const enLink = canvas.getByRole("link", { name: "DE" });
    await expect(enLink).toHaveAttribute("href", "/de/projekte/projekt-xy");

    await userEvent.click(enLink);
    await expect(getRouter().push).toHaveBeenCalled;
  },
};

export const Spanish: Story = {
  parameters: {
    nextjs: { navigation: { pathname: "/es/projekte/projekt-xy" } },
  },
  play: async ({ canvas }) => {
    // 3 Sprachlinks
    const links = canvas.getAllByRole("link");
    await expect(links).toHaveLength(3);

    // en Link zeigt auf spanische URL
    const enLink = canvas.getByRole("link", { name: "ES" });
    await expect(enLink).toHaveAttribute("href", "/es/projekte/projekt-xy");
  },
};
