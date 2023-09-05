// Will only import `react-p5` on client-side
import dynamic from "next/dynamic";

export const Sketch = dynamic(
  () =>
    import(/* webpackPreload: true */ "react-p5").then((mod) => mod.default),
  {
    ssr: false,
  },
);
