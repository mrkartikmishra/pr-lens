import { Button } from "@/components/ui/button";
import { requireAuth } from "@/module/auth/utils/auth-utils";

export default async function Home() {
  await requireAuth();

  return (
    <div className="flex justify-center items-center h-screen">
      <Button>Hello</Button>
    </div>
  );
}
