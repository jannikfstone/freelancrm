import { signIn, signOut, auth } from "@/auth";


export async function SignInOrOut() {
  const session = await auth();
  const SignOut = () => (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  );
  const SignIn = () => (
    <form
      action={async () => {
        "use server";
        await signIn("cognito");
      }}
    >
      <button type="submit">Signin with Cognito</button>
    </form>
  );

  return (
    <>
      {session ? <SignOut /> : <SignIn />}
    </>
  );
}