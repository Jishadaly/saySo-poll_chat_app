import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { CheckIcon } from "lucide-react"
import { IPoll } from "@/types/poll"
import { IOption } from "@/types/options"


export function PollDrower({ poll }: { poll: IPoll }) {

    return (

        <Drawer >
            <DrawerTrigger asChild>
                <div className=" border-b">
                    <div className="flex items-center justify-between m-3">
                        <h2 className="text-2xl font-bold">{poll.question}</h2>
                        <Button variant="outline" className="ml-4 cursor-pointer">View Poll</Button>
                    </div>
                </div>

            </DrawerTrigger>
            <DrawerContent  >
                <div className="bg-background border-b p-6 md:p-8 ">
                    <h2 className="text-2xl font-bold mb-2">{poll.question}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                    {poll.options.map((option: IOption) => (
                        <div key={option._id} className="bg-card rounded-md p-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-medium">{option.text}</div>
                            <div className="text-sm font-medium">5%</div>
                        </div>
                        <div className="h-2 bg-muted rounded-full">
                            <div className="h-2 bg-primary rounded-full w-[5%]" />
                        </div>
                        <Button variant="ghost" size="icon" className="mt-2">
                            <CheckIcon className="w-5 h-5" />
                            <span className="sr-only">Select</span>
                        </Button>
                    </div>

                            ))}

                           

                                
                           


                    </div>
                </div>


            </DrawerContent>
        </Drawer>
    )
}
