import { getTranslations } from "next-intl/server";
import SignUpForm from "@/components/SignUpForm";

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: "SignUp",
  });

  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

const SignUpPage = () => <SignUpForm/>
export default SignUpPage;