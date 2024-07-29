"use client";

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { z } from "zod";
import dayjs from "dayjs";

import type { InteractionListValidation } from "@/validations/InteractionValidation";
import { Box } from "@mui/system";
import InteractionsModal from "@/components/InteractionsModal";

export default function InteractionsList() {
  const [interactions, setInteractions] = useState<
    z.infer<typeof InteractionListValidation>
  >([]);
  const [interactionsLoading, setInteractionsLoading] = useState(true);
  const [interactionsModalOpen, setInteractionsModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/interactions")
      .then((response) => response.json())
      .then((data) => setInteractions(data))
      .then(() => setInteractionsLoading(false));
  }, [interactionsModalOpen]);

  return (
    <Box>
      <InteractionsModal
        setModalIsOpen={setInteractionsModalOpen}
        modalIsOpen={interactionsModalOpen}
      />
      <Box
        id="interactions-header-container"
        sx={{ display: "grid", gridTemplateColumns: "1fr 200px" }}
      >
        <Typography variant="h4" sx={{ margin: "10px" }}>
          Interactions
        </Typography>
        <Button
          variant="contained"
          sx={{ justifySelf: "right", margin: "10px" }}
          onClick={() => setInteractionsModalOpen(true)}
        >
          Add Interaction
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {interactionsLoading ? (
              <TableRow>
                <TableCell>Loading...</TableCell>
              </TableRow>
            ) : (
              interactions.map((interaction, index) => (
                <TableRow key={index}>
                  <TableCell>{interaction.companyName}</TableCell>
                  <TableCell>
                    {dayjs(interaction.date).format("DD.MM.YYYY")}
                  </TableCell>
                  <TableCell>{interaction.notes}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
