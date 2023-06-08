import { SmallHeader } from "@/components/Typography";

export function Question({ text, hint }: { text: string; hint?: string }) {
  return <SmallHeader className="text-left">{text}</SmallHeader>;
}
