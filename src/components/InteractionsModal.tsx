import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Autocomplete, Button, Grid, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { InteractionPostValidation } from "@/validations/InteractionValidation";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";
import type { CompanyValidation } from "@/validations/CompanyValidation";

interface InteractionsModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: (isOpen: boolean) => void;
}

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function InteractionsModal({
  modalIsOpen,
  setModalIsOpen,
}: InteractionsModalProps) {
  const {
    handleSubmit,
    register,
    // formState: { errors },
  } = useForm<z.infer<typeof InteractionPostValidation>>({
    // resolver: zodResolver(InteractionPostValidation),
  });
  const t = useTranslations("InteractionsPage");
  type CompanyDisplay = { id: number; label: string };
  const [companies, setCompanies] = useState<CompanyDisplay[]>([]);
  const [companiesLoading, setCompaniesLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState<CompanyDisplay | null>(
    null,
  );
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());

  async function getCompanies() {
    setCompaniesLoading(true)
    const response = await fetch(`/api/companies`);
    const data = await response.json();
    setCompanies(
      data.map((company: z.infer<typeof CompanyValidation>) => ({
        id: company.id,
        label: company.name,
      })),
    );
  }

  useEffect(() => {
    getCompanies().then(() => setCompaniesLoading(false));
  }, []);

  const onSubmit = async (
    formData: z.infer<typeof InteractionPostValidation>,
  ) => {
    const sendData = {
      ...formData,
      companyId: selectedCompany?.id,
      date: selectedDate?.toISOString(),
    };
    console.log("sending data", sendData);
    await fetch(`/api/interactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    });
    setModalIsOpen(false);
  };

  return (
    <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
      <Box sx={modalStyle}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item>
                <Autocomplete
                  sx={{ width: 300 }}
                  options={companies}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(_, newValue) => {
                    setSelectedCompany(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label={t("company")} />
                  )}
                  loading={companiesLoading}
                  id="select-company"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="notes-input"
                  label={t("notes")}
                  multiline
                  minRows={3}
                  sx={{ width: 300 }}
                  {...register("notes")}
                />
              </Grid>
              <Grid item>
                <DatePicker
                  value={selectedDate}
                  onChange={(value) => setSelectedDate(value)}
                />
              </Grid>
              <Grid item>
                <Button variant="outlined" type="submit">
                  {t("save")}
                </Button>
              </Grid>
            </Grid>
          </form>
        </LocalizationProvider>
      </Box>
    </Modal>
  );
}
