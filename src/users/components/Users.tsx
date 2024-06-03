import {
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { UserSchema, defaultValues } from "../types/user.schema";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import {
  useGenders,
  useLanguages,
  useSkills,
  useStates,
  useUser,
  useUsers,
} from "../services/queries";
import { RHFAutocomplete } from "@/components/RHFAutocomplete";
import { RHFToggleButtonGroup } from "@/components/RHFToggleButtonGroup";
import { RHFRadioGroup } from "@/components/RHFRadioGroup";
import { RHFCheckbox } from "@/components/RHFCheckbox";
import { RHFDateTimePicker } from "@/components/RHFDateTimePicker";
import { RHFDateRangePicker } from "@/components/RHFDateRangePicker";
import { RHFSlider } from "@/components/RHFSlider";
import { RHFSwitch } from "@/components/RHFSwitch";
import { RHFTextField } from "@/components/RHFTextField";
import { Fragment, useEffect } from "react";

export function Users() {
  const { control, unregister, reset, setValue, handleSubmit } =
    useFormContext<UserSchema>();

  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();
  const usersQuery = useUsers();

  const isTeacher = useWatch({ control, name: "isTeacher" });
  const id = useWatch({ control, name: "id" });
  const variant = useWatch({ control, name: "variant" });

  const userQuery = useUser(id);

  const { append, fields, remove, replace } = useFieldArray({
    control,
    name: "students",
  });

  const handleUserClick = (id: string) => {
    setValue("id", id);
  };

  useEffect(() => {
    if (!isTeacher) {
      replace([]);
      unregister("students");
    }
  }, [isTeacher, replace, unregister]);

  useEffect(() => {
    if (userQuery.data) {
      reset(userQuery.data);
    }
  }, [reset, userQuery.data]);

  const handleReset = () => {
    reset(defaultValues);
  };

  // const createUserMutation = useCreateUser();
  // const editUserMutation = useEditUser();

  // const onSubmit: SubmitHandler<Schema> = (data) => {
  //   if (variant === "create") {
  //     createUserMutation.mutate(data);
  //   } else {
  //     editUserMutation.mutate(data);
  //   }
  //};

  return (
    <Container
      maxWidth="sm"
      component="form"
    >
      <Stack sx={{ flexDirection: "row", gap: 2 }}>
        <List subheader={<ListSubheader>Users</ListSubheader>}>
          {usersQuery.data?.map((user) => (
            <ListItem
              disablePadding
              key={user.id}
            >
              <ListItemButton
                onClick={() => handleUserClick(user.id)}
                selected={id === user.id}
              >
                <ListItemText primary={user.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Stack sx={{ gap: 2 }}>
          <RHFTextField<UserSchema>
            name="name"
            label="Name"
          />
          <RHFTextField<UserSchema>
            name="email"
            label="Email"
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
          <RHFSlider<UserSchema>
            name="salaryRange"
            label="Salary Range"
          />
          <RHFSwitch<UserSchema>
            name="isTeacher"
            label="Are you teacher?"
          />
          {isTeacher && (
            <Button
              onClick={() => append({ name: "" })}
              type="button"
            >
              Add new student
            </Button>
          )}

          {fields.map((field, index) => (
            <Fragment key={field.id}>
              <RHFTextField<UserSchema>
                name={`students.${index}.name`}
                label="Name"
              />
              <Button
                color="error"
                onClick={() => {
                  remove(index);
                }}
                type="button"
              >
                Remove
              </Button>
            </Fragment>
          ))}
          <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              type="submit"
            >
              {variant === "create" ? "New user" : "Edit user"}
            </Button>
            <Button onClick={handleReset}>Reset</Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
