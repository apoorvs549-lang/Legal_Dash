import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const projects = [
  {
    name: "Asana",
    budget: "$2,500",
    status: "working",
    progress: 60,
    color: "bg-blue-600",
    icon: "🟣",
  },
  {
    name: "Github",
    budget: "$5,000",
    status: "done",
    progress: 100,
    color: "bg-green-600",
    icon: "🐙",
  },
  {
    name: "Atlassian",
    budget: "$3,400",
    status: "canceled",
    progress: 30,
    color: "bg-red-600",
    icon: "🔺",
  },
  {
    name: "Spotify",
    budget: "$14,000",
    status: "working",
    progress: 80,
    color: "bg-blue-600",
    icon: "🟢",
  },
  {
    name: "Slack",
    budget: "$1,000",
    status: "canceled",
    progress: 0,
    color: "bg-gray-400",
    icon: "💬",
  },
  {
    name: "Invision",
    budget: "$2,300",
    status: "done",
    progress: 100,
    color: "bg-green-600",
    icon: "🔴",
  },
];

export default function ProjectsTable() {
  return (
    <div className="relative mt-16">
      {/* Floating header */}
      <div
        className="
          absolute -top-8 left-6
          w-[calc(100%-3rem)]
          rounded-xl
          bg-gradient-to-r from-blue-500 to-blue-500
          px-6 py-4
          text-white font-semibold
          shadow-lg
        "
      >
        Projects Table
      </div>

      {/* Main card */}
      <div className="rounded-xl bg-white shadow-md pt-10">
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#8898AA] uppercase text-xs font-semibold">
                Project
              </TableHead>
              <TableHead className="text-[#8898AA] uppercase text-xs font-semibold">
                Budget
              </TableHead>
              <TableHead className="text-[#8898AA] uppercase text-xs font-semibold">
                Status
              </TableHead>
              <TableHead className="w-[160px] text-[#8898AA] uppercase text-xs font-semibold">
                Completion
              </TableHead>
              <TableHead className="w-[80px] text-[#8898AA] uppercase text-xs font-semibold text-right pr-8">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {projects.map((p) => (
              <TableRow key={p.name}>
                {/* Project */}
                <TableCell>
                  <div className="flex items-center gap-3 font-medium">
                    <span className="text-lg">{p.icon}</span>
                    {p.name}
                  </div>
                </TableCell>

                {/* Budget */}
                <TableCell className="text-muted-foreground">
                  {p.budget}
                </TableCell>

                {/* Status */}
                <TableCell className="capitalize text-muted-foreground">
                  {p.status}
                </TableCell>

                {/* Progress */}
                <TableCell>
                  <div className="flex items-center gap-3  ">
                    <span className="text-sm text-muted-foreground">
                      {p.progress}%
                    </span>
                    <div className="w-28 shrink-0">
                      <Progress
                        value={p.progress}
                        className="h-2 bg-gray-200"
                        indicatorClassName={p.color}
                      />
                    </div>
                  </div>
                </TableCell>
               
          
                {/* Action */}
                <TableCell className="text-right text-muted-foreground pr-12">
                  ⋮ 
                  </TableCell>
              </TableRow>
            ))}
                  </TableBody>
        </Table>
      </div>
    </div> 
  );
}
 
