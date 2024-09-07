// @see https://v0.dev/t/RYNJliUIXHx

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { getKindeServerSession, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server';
import { WebcamIcon } from "@/components/component"
import { ModeToggle } from "@/components/ModeToggle"
import { PollCreator } from "@/components/Poll-creator"
import { PollDrower } from "@/components/PollDrower"
export default async function Page() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  console.log("User Information:", { user });
  console.log("Authenticated:", { isAuthenticated });

  return (
    <div className="flex flex-col h-screen">
      <header className="  py-4 px-6 flex items-center justify-between border-b   ">
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

      <div className="flex-1 flex flex-col md:flex-row">
        <div className="bg-background border-r w-full md:w-64 p-4 overflow-auto">
          <div className="text-sm font-medium mb-2">Active Polls</div>
          <div className="space-y-2">
            <Link href="#" className="block p-2 rounded-md hover:bg-muted transition-colors" prefetch={false}>
              <div className="font-medium">Should we switch to a 4-day work week?</div>
              <div className="text-xs text-muted-foreground">23 votes • 15 min ago</div>
            </Link>
            <Link href="#" className="block p-2 rounded-md hover:bg-muted transition-colors" prefetch={false}>
              <div className="font-medium">Favorite programming language?</div>
              <div className="text-xs text-muted-foreground">87 votes • 1 hour ago</div>
            </Link>
            <Link href="#" className="block p-2 rounded-md hover:bg-muted transition-colors" prefetch={false}>
              <div className="font-medium">Should we adopt a remote-first policy?</div>
              <div className="text-xs text-muted-foreground">45 votes • 3 hours ago</div>
            </Link>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <PollDrower/>

          <div className="flex-1 flex flex-col">
            <div className="bg-background border-b p-4 md:p-6">
              <div className="text-sm font-medium mb-2">Chat</div>
              <ScrollArea className="flex-1 overflow-auto">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <div className="bg-card rounded-md p-3 max-w-[80%]">
                      <div className="font-medium">John Doe</div>
                      <div className="text-sm">I think a 4-day work week is a great idea!</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="bg-card rounded-md p-3 max-w-[80%]">
                      <div className="font-medium">Jane Doe</div>
                      <div className="text-sm">I'm not sure, I'd need to see more data on the impact.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div className="bg-card rounded-md p-3 max-w-[80%]">
                      <div className="font-medium">Sarah Miller</div>
                      <div className="text-sm">I think it's worth trying, as long as productivity doesn't suffer.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div className="bg-card rounded-md p-3 max-w-[80%]">
                      <div className="font-medium">Sarah Miller</div>
                      <div className="text-sm">I think it's worth trying, as long as productivity doesn't suffer.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div className="bg-card rounded-md p-3 max-w-[80%]">
                      <div className="font-medium">Sarah Miller</div>
                      <div className="text-sm">I think it's worth trying, as long as productivity doesn't suffer.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div className="bg-card rounded-md p-3 max-w-[80%]">
                      <div className="font-medium">Sarah Miller</div>
                      <div className="text-sm">I think it's worth trying, as long as productivity doesn't suffer.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div className="bg-card rounded-md p-3 max-w-[80%]">
                      <div className="font-medium">Sarah Miller</div>
                      <div className="text-sm">I think it's worth trying, as long as productivity doesn't suffer.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div className="bg-card rounded-md p-3 max-w-[80%]">
                      <div className="font-medium">Sarah Miller</div>
                      <div className="text-sm">I think it's worth trying, as long as productivity doesn't suffer.</div>
                    </div>
                  </div>
                  
                  
                </div>
              </ScrollArea>
            </div>
            <div className="bg-background p-4 md:p-6 ">
              <form className="flex items-center gap-2">
                <Input type="text" placeholder="Type your message..." className="flex-1" />
                <Button type="submit">Send</Button>
              </form>
            </div>
          </div>
        </div>

      </div>

      {/* <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Sayso. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Twitter
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Facebook
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Instagram
          </Link>
        </nav>
      </footer> */}

    </div>
  )
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}


function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}