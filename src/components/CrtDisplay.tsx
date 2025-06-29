import { type PropsWithChildren } from "react"
import { cn } from "../lib/utils"

type Props = PropsWithChildren<{ isPoweredOn?: boolean }>

const CrtDisplay = ({ children, isPoweredOn = true }: Props) => {
    return (
        <div className={cn("crt fixed inset-0 w-screen h-screen", isPoweredOn)}>
            {children}
        </div>
    )
}

export default CrtDisplay