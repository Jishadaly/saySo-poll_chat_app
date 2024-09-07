import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { CheckIcon } from "lucide-react"

export function PollDrower() {


    return (
        <Drawer >
            <DrawerTrigger asChild>
                <div className=" border-b">
                    <div className="flex items-center justify-between m-3">
                    <h2 className="text-2xl font-bold">Should we switch to a 4-day work week?</h2>
                    <Button variant="outline" className="ml-4 cursor-pointer">View Poll</Button>
                    </div>
                    
                </div>

            </DrawerTrigger>
            <DrawerContent  >
                <div className="bg-background border-b p-6 md:p-8 ">
                    <h2 className="text-2xl font-bold mb-2">Should we switch to a 4-day work week?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-card rounded-md p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-sm font-medium">Yes</div>
                                <div className="text-sm font-medium">72%</div>
                            </div>
                            <div className="h-2 bg-muted rounded-full">
                                <div className="h-2 bg-primary rounded-full w-[72%]" />
                            </div>
                            <Button variant="ghost" size="icon" className="mt-2">
                                <CheckIcon className="w-5 h-5" />
                                <span className="sr-only">Select</span>
                            </Button>
                        </div>
                        <div className="bg-card rounded-md p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-sm font-medium">No</div>
                                <div className="text-sm font-medium">28%</div>
                            </div>
                            <div className="h-2 bg-muted rounded-full">
                                <div className="h-2 bg-primary rounded-full w-[28%]" />
                            </div>
                            <Button variant="ghost" size="icon" className="mt-2">
                                <CheckIcon className="w-5 h-5" />
                                <span className="sr-only">Select</span>
                            </Button>
                        </div>
                        <div className="bg-card rounded-md p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-sm font-medium">Maybe</div>
                                <div className="text-sm font-medium">15%</div>
                            </div>
                            <div className="h-2 bg-muted rounded-full">
                                <div className="h-2 bg-primary rounded-full w-[15%]" />
                            </div>
                            <Button variant="ghost" size="icon" className="mt-2">
                                <CheckIcon className="w-5 h-5" />
                                <span className="sr-only">Select</span>
                            </Button>
                        </div>
                        <div className="bg-card rounded-md p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-sm font-medium">Unsure</div>
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
                        <div className="bg-card rounded-md p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-sm font-medium">Unsure</div>
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
                        <div className="bg-card rounded-md p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-sm font-medium">Unsure</div>
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
                        <div className="bg-card rounded-md p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-sm font-medium">Unsure</div>
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
                        <div className="bg-card rounded-md p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-sm font-medium">Unsure</div>
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
                    </div>
                </div>

                
            </DrawerContent>
        </Drawer>
    )
}
