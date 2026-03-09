import { Button } from "@/components/ui/button";
import Logout from "@/module/auth/components/logout";

const DashboardPage = () => {
  return (
    <div>
      DashboardPage
      <Logout>
        <Button>Logout</Button>
      </Logout>
    </div>
  );
};

export default DashboardPage;
