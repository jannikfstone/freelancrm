import SignUpForm from "@/components/SignUpForm";

export async function generateMetadata() {
  return {
    title: "meta_title",
    description: "meta_description",
  };
}

const SignUpPage = () => <SignUpForm />;
export default SignUpPage;
