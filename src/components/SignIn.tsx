import { signIn } from "@/auth"
import { Button, TextField } from "@mui/material";

export function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server"

        await signIn("credentials", formData)
      }}
    >
      <label>
        Email
        <TextField name="email" type="email" />
      </label>
      <label>
        Password
        <TextField name="password" type="password" />
      </label>
      <Button>Sign In</Button>
    </form>
  )
}