import { Input } from "@/components/ui/input";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
export default function TablesHeader() {
  return (
    <div
      className="
        sticky top-0 z-50
        backdrop-blur-md
        bg-white/70 
        border-b dark:bg-gray-800/70
      "
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left */}
        <div>
          <p className="text-sm text-gray-500"><HomeIcon/> / Tables</p>
          <h1 className="text-xl font-semibold">Tables</h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search here"
            className="w-48"
          />
          <div className="flex gap-3 text-gray-600">
            <AccountBoxIcon className="cursor-pointer" />
            <SettingsIcon className="cursor-pointer" />
            <NotificationsIcon className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}
