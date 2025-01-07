import { Label } from "./ui/label";
import { Switch } from "./ui/switch";


export default function ShadcnToggle() {
  
   return (
     <div className="flex items-center space-x-2">
       <Switch id="airplane-mode" />
       <Label htmlFor="airplane-mode">Airplane Mode</Label>
     </div>
   );
}