
import { Box } from '@mui/system';
import { CompaniesList } from "@/components/CompaniesList";
import InteractionsList from "@/components/InteractionsList";

export async function generateMetadata() {

  return {
    title: "freelanCRM",
    description: "Cool Page",
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
