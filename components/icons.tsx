type IconProps = React.HTMLAttributes<SVGElement>
import {DynamicIcon,IconName} from "lucide-react/dynamic";

export const Icon = ({name, ...props}: {name: IconName} & IconProps) => {
    return <DynamicIcon name={name} {...props} />
}