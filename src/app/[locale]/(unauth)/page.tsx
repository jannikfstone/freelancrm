import { getTranslations } from "next-intl/server";

import { Box } from "@mui/system";
import { CompaniesList } from "@/components/CompaniesList";
import InteractionsList from "@/components/InteractionsList";

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: "Index",
  });

  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

export default function Index() {
  return (
    <Box>
      <Box sx={{ border: "1px solid black" }} width="100%">
        <CompaniesList />
      </Box>
      <Box
        sx={{
          border: "1px solid black",
          marginTop: "20px",
        }}
        width="100%"
      >
        <InteractionsList />
      </Box>
    </Box>
  );
}
