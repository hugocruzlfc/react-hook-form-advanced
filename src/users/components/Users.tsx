import { Stack, TextField } from "@mui/material";
import { UserSchema } from "../types/user.schema";
import { RHFAutocomplete } from "../../components/RHFAutocomplete";
import { useFormContext } from "react-hook-form";

export function Users() {
  const {
    register,
    formState: { errors },
  } = useFormContext<UserSchema>();

  return (
    <Stack sx={{ gap: 2 }}>
      <TextField
        {...register("name")}
        label="Name"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        {...register("email")}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <RHFAutocomplete<UserSchema>
        name="states"
        label="States"
        options={[
          { id: "1", label: "Alabama" },
          { id: "2", label: "Alaska" },
        ]}
      />
    </Stack>
  );
}
