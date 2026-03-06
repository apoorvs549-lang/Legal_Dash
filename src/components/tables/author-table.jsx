import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const authors = [
  {
    name: "John Michael",
    email: "john@creative-tim.com",
    role: "Manager",
    dept: "Organization",
    status: "online",
    date: "23/04/18",
    img: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    role: "Programator",
    dept: "Developer",
    status: "offline",
    date: "11/01/19",
    img: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    role: "Executive",
    dept: "Projects",
    status: "online",
    date: "19/09/17",
    img: "https://i.pravatar.cc/100?img=3",
  },
{
  name: "Michael Levi",
  email: "michael@creative-tim.com",
  role: "Programator",
  dept: "Developer",
  status: "online",
  date: "24/12/08",
  img: "https://i.pravatar.cc/100?img=4",
},
{
  name: "Richard Gran",
  email: "richard@creative-tim.com",
  role: "Manager",
  dept: "Executive",
  status: "offline",
  date: "04/10/21",
  img: "https://i.pravatar.cc/100?img=5",
},
{
  name: "Miriam Eric",
  email: "miriam@creative-tim.com",
  role: "Programator",
  dept: "Developer",
  status: "offline",
  date: "14/09/20",
  img: "https://i.pravatar.cc/100?img=6",
}


];

export default function AuthorsTable() {
  return (
    <div className="relative mt-16">
      {/* Blue floating header */}
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
        Authors Table
      </div>

      {/* Main table card */}
      <div className="rounded-xl bg-white shadow-md pt-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="table-header sticky top-16 bg-white/70 backdrop-blur-sm z-40">AUTHOR</TableHead>
              <TableHead className="table-header sticky top-16 bg-white/70 backdrop-blur-sm z-40">FUNCTION</TableHead>
              <TableHead className="table-header sticky top-16 bg-white/70 backdrop-blur-sm z-40">STATUS</TableHead>
              <TableHead className="table-header sticky top-16 bg-white/70 backdrop-blur-sm z-40">EMPLOYED</TableHead>
              <TableHead className="table-header sticky top-16 bg-white/70 backdrop-blur-sm z-40">ACTION</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {authors.map((a) => (
              <TableRow key={a.email}>
                {/* Author */}
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={a.img} />
                      <AvatarFallback>
                        {a.name[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-medium">{a.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {a.email}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* Function */}
                <TableCell>
                  <p className="font-medium">{a.role}</p>
                  <p className="text-sm text-muted-foreground">
                    {a.dept}
                  </p>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Badge
                    className={
                      a.status === "online"
                        ? "bg-green-600 hover:bg-green-600"
                        : "bg-gray-800 hover:bg-gray-800"
                    }
                  >
                    {a.status.toUpperCase()}
                  </Badge>
                </TableCell>

                {/* Date */}
                <TableCell className="text-muted-foreground">
                  {a.date}
                </TableCell>

                {/* Action */}
                <TableCell>
                  <button className="text-sm font-medium text-gray-500 hover:text-gray-800">
                    Edit
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
