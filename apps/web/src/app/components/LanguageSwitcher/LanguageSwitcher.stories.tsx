import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { getRouter } from "@storybook/nextjs-vite/navigation.mock";
import { expect, userEvent, waitFor, within } from "storybook/test";
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
    const links = canvas.getAllByRole("link");
    await expect(links).toHaveLength(3);

    const deLink = canvas.getByRole("link", { name: "DE" });
    await expect(deLink).toHaveAttribute("href", "/de/projekte/projekt-xy");
  },
};

export const English: Story = {
  parameters: {
    nextjs: { navigation: { pathname: "/en/projekte/projekt-xy" } },
  },
  play: async ({ canvas, userEvent }) => {
    const links = canvas.getAllByRole("link");
    await expect(links).toHaveLength(3);

    const enLink = canvas.getByRole("link", { name: "EN" });
    await expect(enLink).toHaveAttribute("href", "/en/projekte/projekt-xy");
  },
};

export const Spanish: Story = {
  parameters: {
    nextjs: { navigation: { pathname: "/en/projekte/projekt-xy" } },
  },
  play: async ({ canvasElement }) => {
    // 3 Sprachlinks
    const canvas = within(canvasElement);
    const links = canvas.getAllByRole("link");
    await expect(links).toHaveLength(3);

    // en Link zeigt auf spanische URL
    const esLink = canvas.getByRole("link", { name: "ES" });
    const deLink = canvas.getByRole("link", { name: "DE" });
    const enLink = canvas.getByRole("link", { name: "EN" });
    await expect(enLink).toHaveAttribute("href", "/en/projekte/projekt-xy");
    await expect(enLink).toHaveClass("bg-accent-tint");
    getRouter().push.mockClear();
    await userEvent.click(esLink);
    await waitFor(() =>
      expect(getRouter().push).toHaveBeenCalledWith(
        expect.stringContaining("/es/"),
      ),
    );
  },
};
