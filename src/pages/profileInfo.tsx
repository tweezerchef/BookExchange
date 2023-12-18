import AviAdd from "../components/Registration/components/AviAdd";
import { UserAddress } from "../components/Registration/components/UserAddress";
import { UserName } from "../components/Registration/components/UserName";
import { useHomeState } from "../context/context";

const ProfileInfo = (props) => {
  const state = useHomeState();
  const { user } = state;
  return (
    <>
      <AviAdd />
      <UserName />
      <UserAddress />
    </>
  );
};

export default ProfileInfo;
