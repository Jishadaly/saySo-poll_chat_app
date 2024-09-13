import React from 'react'
import Link from 'next/link'
import { WebcamIcon } from './component'
import { PollCreator } from './Poll-creator'
import { ModeToggle } from './ModeToggle'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Button } from './ui/button'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export default async function Header() {
    
    const { isAuthenticated, getUser } = getKindeServerSession();
    const user = await getUser();
    console.log("User Information:", { user });
    console.log("Authenticated:", { isAuthenticated });

    return (
        <header className="  py-4 px-6 flex items-center justify-between border-b ">
            <Link href="#" className="flex items-center justify-center text-white" prefetch={false}>
                <WebcamIcon className="h-6 w-6" />
                <span className="text-xl font-bold ">Sayso</span>
            </Link>
            <div className="flex items-center gap-2">
                <PollCreator />
                <ModeToggle />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user && user.picture || "/placeholder-user.jpg"} alt="@shadcn" />
                                <AvatarFallback>{user && user.family_name}</AvatarFallback>
                            </Avatar>
                        </Button>

                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>My Account</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild ><LogoutLink><span className="cursor-pointer 0 70% 35.3%">Logout</span></LogoutLink></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

        </header>
    )
}
