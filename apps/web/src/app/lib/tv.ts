import { createTV } from "tailwind-variants";

export const tv = createTV({
  twMergeConfig: {
    extend: {
      classGroups: {
        // sagt tailwind-merge: DAS sind font-sizes, keine Farben
        "font-size": [
          { text: ["h1", "h2", "h3", "h4", "p", "small", "langswitch"] },
        ],
      },
    },
  },
});
