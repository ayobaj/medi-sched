import Image from "next/image"
import { Button } from "./ui/button"


interface ButtonProps {
    isLoading: boolean,
    className?: string,
    children: React.ReactNode,
}

const SubmitButton = ({isLoading, className, children}: ButtonProps) => {
return (
    
        <Button type='submit' disabled={isLoading} className="bg-indigo-600 p-4 rounded-lg transition-transform duration-300 ease-in-out hover:scale-110 w-[200px]" >
            {isLoading ? (
            <div className="flex items-center gap-4">
                <Image 
                    src="/assets/icons/lolo.svg"
                    alt="loader"
                    width={24}
                    height={24}
                    className="animate-spin"
                />
                Loading ...
            </div>)
            : children }
        </Button>
    
)
}

export default SubmitButton
