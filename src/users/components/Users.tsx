import { Stack, TextField, Typography } from "@mui/material";
import { UserSchema } from "../types/user.schema";
import { useFormContext } from "react-hook-form";
import {
  useGenders,
  useLanguages,
  useSkills,
  useStates,
} from "../services/queries";
import { RHFAutocomplete } from "@/components/RHFAutocomplete";
import { RHFToggleButtonGroup } from "@/components/RHFToggleButtonGroup";
import { RHFRadioGroup } from "@/components/RHFRadioGroup";
import { RHFCheckbox } from "@/components/RHFCheckbox";
import { RHFDateTimePicker } from "@/components/RHFDateTimePicker";
import { RHFDateRangePicker } from "@/components/RHFDateRangePicker";

export function Users() {
  const {
    register,
    formState: { errors },
  } = useFormContext<UserSchema>();

  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();

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
        options={statesQuery.data}
      />
      <RHFToggleButtonGroup<UserSchema>
        name="languagesSpoken"
        options={languagesQuery.data}
      />
      <RHFRadioGroup<UserSchema>
        name="gender"
        options={gendersQuery.data}
        label="Gender"
      />
      <RHFCheckbox<UserSchema>
        name="skills"
        options={skillsQuery.data}
        label="Skills"
      />
      <RHFDateTimePicker<UserSchema>
        name="registrationDateAndTime"
        label="Registration Date & Time"
      />
      <Typography>Former Employment Period:</Typography>
      <RHFDateRangePicker<UserSchema> name="formerEmploymentPeriod" />
    </Stack>
  );
}
