import { LucideProps } from "lucide-react";
import { cloneElement, ReactElement } from "react";

export function emboss(x: ReactElement<LucideProps>) {
  return cloneElement(
    x,
    { filter: "url(#inset-shadow)" },
    <filter id="inset-shadow">
      <feOffset dx="0" dy="0" />
      <feGaussianBlur stdDeviation="1" result="offset-blur" />
      <feComposite
        operator="out"
        in="SourceGraphic"
        in2="offset-blur"
        result="inverse"
      />
      <feFlood floodColor="black" floodOpacity=".95" result="color" />
      <feComposite operator="in" in="color" in2="inverse" result="shadow" />
      <feComposite operator="over" in="shadow" in2="SourceGraphic" />
    </filter>,
    <g filter="url(#inset-shadow)">{x.props.children}</g>,
  );
}
