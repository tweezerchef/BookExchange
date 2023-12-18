import { Button, Stack } from "@mui/material";
import AviAdd from "../components/Registration/components/AviAdd";
import { UserAddress } from "../components/Registration/components/UserAddress";
import { UserName } from "../components/Registration/components/UserName";
import { useHomeState } from "../context/context";
import { FormProvider, useFormData } from "../context/regContext";
import { CenteredContainer } from "../styles/pageStyles/pageStyles";

// Separate component outside of ProfileInfo
const WrappedFormContent = ({ userId }) => {
  const { formData } = useFormData();

  const submitForm = async () => {
    // existing submitForm code
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm().catch((error) =>
      console.error("Form submission failed", error)
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <AviAdd />
        <UserName />
        <UserAddress />
      </Stack>

      <Button
        type='submit'
        variant='contained'
        color='primary'
        sx={{ margin: 3 }}
      >
        Next
      </Button>
    </form>
  );
};

const ProfileInfo = (props) => {
  const state = useHomeState();
  const { user } = state;
  const userId = user?.id;

  return (
    <FormProvider>
      <CenteredContainer>
        <WrappedFormContent userId={userId} />
      </CenteredContainer>
    </FormProvider>
  );
};

export default ProfileInfo;
