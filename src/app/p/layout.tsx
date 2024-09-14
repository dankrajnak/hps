import { ColorOverlay } from "~/components/colorOverlay";
import LogoutButton from "~/components/logoutButton";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <>
    <div className="ml-4">{children}</div>
    <ColorOverlay animateOnMount={false} />
    <div className="absolute right-3 top-3">
      <LogoutButton variant="outline" />
    </div>
  </>
);

export default layout;
