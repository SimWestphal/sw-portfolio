import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultButton: Story = {
  args: {
    children: "test",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /test/i });

    await expect(button).toBeInTheDocument();
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const DefaultWithIconButton: Story = {
  args: {
    variant: "nearrow",
    children: "Default with icon",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /Default with icon/i });
    const spanEl = canvas.getByText("Default with icon");
    const nextEl = spanEl.nextElementSibling;

    await expect(button).toBeInTheDocument();
    await expect(nextEl).not.toBeNull();
    await expect(nextEl?.tagName.toLowerCase()).toBe("svg");
    await expect(button).toHaveClass("hover:text-accent");
  },
};

export const IsLoadingButton: Story = {
  args: {
    variant: "spinner",
    isLoading: true,
    children: "Is loading",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /Is loading/i });
    const spanEl = canvas.getByText("Is loading");
    const svgEl = canvas.getByTestId("icon-spinner");

    await expect(button).toBeInTheDocument();
    await expect(button).toHaveClass("isLoading");
    await expect(spanEl.nextElementSibling).toBe(svgEl);
  },
};

export const IsDisabledButton: Story = {
  args: {
    variant: "nearrow",
    children: "Is disabled with arrow ne",
    disabled: true,
    className: "p-10",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", {
      name: /Is disabled with arrow ne/i,
    });
    const svgAfterSpan = canvasElement.querySelector("span + svg");
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveClass("p-10");
    await expect(button).toHaveClass("isDisabled");
    await expect(svgAfterSpan).toBeInTheDocument();
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(0);
  },
};

export const DefaultLink: Story = {
  args: {
    href: "/impressum",
    isLoading: false,
    children: "testlink",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: /testlink/i });
    const button = canvas.queryByRole("button");
    await expect(button).toBeNull();
    await expect(link).toHaveAttribute("href", "/impressum");
  },
};

export const DefaultWithIconLink: Story = {
  args: {
    href: "/impressum",
    variant: "nearrow",
    isLoading: false,
    children: "testlink with icon",
    className: "bg-pink-500",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: /testlink with icon/i });
    const button = canvas.queryByRole("button");
    const svgEl = canvas.getByTestId("icon-nearrow");
    const spanEl = canvas.getByText("testlink with icon");
    await expect(link).toHaveClass("bg-pink-500");
    await expect(button).toBeNull();
    await expect(link).toHaveAttribute("href", "/impressum");
    await expect(spanEl.nextElementSibling).toBe(svgEl);
  },
};
