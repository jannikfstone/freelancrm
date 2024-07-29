import { SignIn } from "@/components/SignIn";

export async function generateMetadata() {
  return {
    title: 'meta_title',
    description: 'meta_description',
  };
}

const SignInPage = () => <SignIn />;

export default SignInPage;
