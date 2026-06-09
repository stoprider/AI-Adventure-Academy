import { Router } from "express";
import * as XLSX from "xlsx";
import { listPlayers } from "../services/playerService.js";
import { getDashboardStats, getExportRows } from "../services/adminService.js";

export const adminRouter = Router();

adminRouter.get("/stats", (_req, res) => {
  const players = listPlayers() as Array<{ xp: number }>;
  res.json({
    stats: getDashboardStats(),
    players,
    leaderboard: [...players].sort((a, b) => b.xp - a.xp).slice(0, 5)
  });
});

adminRouter.get("/export", (_req, res) => {
  const rows = getExportRows();
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(workbook, sheet, "Players");
  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.setHeader("Content-Disposition", 'attachment; filename="ai-adventure-academy-report.xlsx"');
  res.send(buffer);
});
