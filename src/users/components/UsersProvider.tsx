import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { UserSchema, defaultValues, userSchema } from "../types/user.schema";
import { Users } from "./Users";
import { DevTool } from "@hookform/devtools";

export function UsersProvider() {
  const methods = useForm<UserSchema>({
    mode: "all",
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <Users />
      <DevTool control={methods.control} />
    </FormProvider>
  );
}
