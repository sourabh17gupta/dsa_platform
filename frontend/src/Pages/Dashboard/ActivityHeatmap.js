import { useMemo } from "react";

const WEEKS = 26;
const DAYS  = 7;
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function getDateGrid() {
  const grid = [];
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - WEEKS * DAYS + 1);
  for (let w = 0; w < WEEKS; w++) {
    const week = [];
    for (let d = 0; d < DAYS; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + w * DAYS + d);
      week.push(date.toISOString().split("T")[0]);
    }
    grid.push(week);
  }
  return grid;
}

const getColor = (count) => {
  if (!count)    return "#1e1e22";
  if (count === 1) return "#3b0764";
  if (count === 2) return "#6d28d9";
  if (count <= 4)  return "#7c3aed";
  return "#a78bfa";
};

export default function ActivityHeatmap({ submissions = [] }) {
  const grid = useMemo(() => getDateGrid(), []);

  const countMap = useMemo(() => {
    const map = {};
    submissions.forEach((s) => {
      const day = new Date(s.createdAt).toISOString().split("T")[0];
      map[day] = (map[day] || 0) + 1;
    });
    return map;
  }, [submissions]);

  const totalThisYear = useMemo(() => {
    const y = new Date().getFullYear().toString();
    return Object.entries(countMap)
      .filter(([d]) => d.startsWith(y))
      .reduce((a, [, v]) => a + v, 0);
  }, [countMap]);

  const monthLabels = useMemo(() => {
    const labels = [];
    grid.forEach((week, wi) => {
      const first = new Date(week[0]);
      if (first.getDate() <= 7) labels.push({ wi, month: MONTHS[first.getMonth()] });
    });
    return labels;
  }, [grid]);

  return (
    <div className="bg-[#2a2a2e] rounded-3xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#9ca3af]">Activity</span>
        <span className="text-xs text-[#6b7280]">{totalThisYear} submissions this year</span>
      </div>

      <div className="overflow-x-auto">
        {/* Month labels */}
        <div
          className="grid gap-[3px] mb-1 ml-0.5"
          style={{ gridTemplateColumns: `repeat(${WEEKS}, 13px)` }}
        >
          {Array.from({ length: WEEKS }).map((_, wi) => {
            const lbl = monthLabels.find((m) => m.wi === wi);
            return (
              <span key={wi} className="text-[9px] text-[#6b7280] whitespace-nowrap">
                {lbl ? lbl.month : ""}
              </span>
            );
          })}
        </div>

        {/* Grid */}
        <div
          className="grid gap-[3px]"
          style={{
            gridTemplateColumns: `repeat(${WEEKS}, 13px)`,
            gridTemplateRows:    `repeat(${DAYS}, 13px)`,
          }}
        >
          {grid.map((week, wi) =>
            week.map((day, di) => {
              const count = countMap[day] || 0;
              return (
                <div
                  key={day}
                  title={`${day}: ${count} submission${count !== 1 ? "s" : ""}`}
                  className="w-[13px] h-[13px] rounded-[3px] hover:opacity-75 transition-opacity cursor-pointer"
                  style={{
                    gridColumn: wi + 1,
                    gridRow:    di + 1,
                    background: getColor(count),
                  }}
                />
              );
            })
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1 mt-3 justify-end">
        <span className="text-[10px] text-[#6b7280] mr-1">Less</span>
        {["#1e1e22","#3b0764","#6d28d9","#7c3aed","#a78bfa"].map((c) => (
          <div key={c} className="w-[13px] h-[13px] rounded-[3px]" style={{ background: c }} />
        ))}
        <span className="text-[10px] text-[#6b7280] ml-1">More</span>
      </div>
    </div>
  );
}