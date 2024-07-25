import { getTranslations } from "next-intl/server";
import { Typography } from "@mui/material";

const Hello = async () => {
  const t = await getTranslations("Dashboard");

  return <Typography>👋 {t("hello_message")}</Typography>;
};

export { Hello };
