"use client";

import {
  Autocomplete,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import type { CompanyValidation } from "@/validations/CompanyValidation";
import { InteractionPostValidation } from "@/validations/InteractionValidation";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import 'dayjs/locale/de';

export default function InteractionsPage() {
  const {
    handleSubmit,
    register,
    // formState: { errors },
  } = useForm<z.infer<typeof InteractionPostValidation>>({
    // resolver: zodResolver(InteractionPostValidation),
  });
  type CompanyDisplay = { id: number; label: string };
  const [companies, setCompanies] = useState<CompanyDisplay[]>([]);
  const [companiesLoading, setCompaniesLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState<CompanyDisplay | null>(
    null,
  );
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());

  async function getCompanies() {
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

  const onSubmit = async (formData: z.infer<typeof InteractionPostValidation>) => {
    const sendData = {
      ...formData,
      companyId: selectedCompany?.id,
      date: selectedDate?.toISOString(),
    };
    console.log("sending data", sendData)
    await fetch(`/api/interactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    });
  };

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
      <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item>
              <Autocomplete
                sx={{ width: 300 }}
                options={companies}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(_, newValue) => {
                  setSelectedCompany(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="company" />
                )}
                loading={companiesLoading}
                id="select-company"
              />
            </Grid>
            <Grid item>
              <TextField
                id="notes-input"
                label="notes"
                multiline
                minRows={3}
                sx={{ width: 300 }}
                {...register("notes")}
              />
            </Grid>
            <DatePicker value={selectedDate} onChange={(value) => setSelectedDate(value)}/>
          </Grid>
        <Button variant="outlined" type="submit">
          Save
        </Button>
      </form>
      </LocalizationProvider>
    </Box>
  );
}
