import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Button onClick={() => alert("Coderabbit")}>Hello</Button>
    </div>
  );
}
