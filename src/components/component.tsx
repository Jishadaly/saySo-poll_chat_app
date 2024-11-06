
import Link from "next/link"
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Button } from './ui/button'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ModeToggle } from "./ModeToggle";

export async function Component() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  
  return (
    
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 md:mt-3 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <WebcamIcon className="h-6 w-6" />    
          <span className="text-xl font-bold">Sayso</span>
        </Link>
        <nav className="ml-auto flex gap-4 items-center  sm:gap-6">
          {!(await isAuthenticated()) ? (
            <>
              <LoginLink postLoginRedirectURL={process.env.KINDE_POST_LOGIN_REDIRECT_URL} className="text-sm font-medium hover:underline underline-offset-4" >Sign in</LoginLink>
              <RegisterLink orgCode="org_58532118368"
                postLoginRedirectURL="/registrationCallback" className="text-sm font-medium hover:underline underline-offset-4" >Sign up</RegisterLink>
              {/* <ModeToggle /> */}
            </>
          ) : (
            <>
              {/* <ModeToggle /> */}
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
                  <DropdownMenuItem>{ user && user.family_name }</DropdownMenuItem>
                  {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild ><LogoutLink><span className="cursor-pointer 0 70% 35.3% text-red-600">Logout</span></LogoutLink></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

        </nav>
      </header>
      <main className="flex-1 md:ml-32">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 ">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-10">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none ">
                    Engage Your Audience with Sayso
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Sayso is a powerful poll-chat application that allows you to gather real-time feedback, spark
                    discussions, and visualize data with ease.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/dashboard"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Start with Sayso
                  </Link>
                </div>
              </div>
              <img
                src='https://images.pexels.com/photos/2503374/pexels-photo-2503374.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                alt="Sayso App"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                width="550"
                height="550"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32" id="features">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Powerful Features for Engaging Audiences
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Sayso offers a suite of features to help you gather feedback, spark discussions, and visualize data in
                  real-time.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Real-Time Polling</h3>
                      <p className="text-muted-foreground">
                        Gather instant feedback from your audience with real-time polling.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Chat Functionality</h3>
                      <p className="text-muted-foreground">
                        Facilitate discussions and engage with your audience through the built-in chat.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Data Visualization</h3>

                      <p className="text-muted-foreground">
                        Visualize your poll results and audience data with intuitive charts and graphs.
                      </p>

                    </div>
                  </li>
                </ul>
              </div>
              <img
                src="https://images.pexels.com/photos/9430709/pexels-photo-9430709.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Sayso Features"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                width="550"
                height="310"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32" id="testimonials">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg px-3 py-1 text-sm">Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Users Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from real users who have found success with Sayso.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-1 bg-background p-6 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full w-10 h-10 bg-[#55efc4] flex items-center justify-center">🙂</div>
                    <div>
                      <h3 className="text-lg font-bold">Jane Doe</h3>
                      <p className="text-sm text-muted-foreground">Marketing Manager</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "Sayso has been a game-changer for our events. The real-time\n polling and chat features have helped
                    us engage our\n audience like never before."
                  </p>
                </div>
                <div className="grid gap-1 bg-background p-6 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full w-10 h-10 bg-[#55efc4] flex items-center justify-center">😄</div>
                    <div>
                      <h3 className="text-lg font-bold">John Smith</h3>
                      <p className="text-sm text-muted-foreground">Event Organizer</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "Sayso has made it so much easier to gather feedback and\n insights from our attendees. The data
                    visualization tools\n are top-notch."
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-1 bg-background p-6 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full w-10 h-10 bg-[#55efc4] flex items-center justify-center">😊</div>
                    <div>
                      <h3 className="text-lg font-bold">Sarah Johnson</h3>
                      <p className="text-sm text-muted-foreground">Conference Speaker</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "I love using Sayso to engage with my audience during my\n presentations. The real-time feedback and
                    discussion\n features are invaluable."
                  </p>
                </div>
                <div className="grid gap-1 bg-background p-6 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full w-10 h-10 bg-[#55efc4] flex items-center justify-center">😀</div>
                    <div>
                      <h3 className="text-lg font-bold">Michael Brown</h3>
                      <p className="text-sm text-muted-foreground">Community Manager</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "Sayso has been a game-changer for our online community.\n The polling and chat features have helped
                    us better\n understand and engage our members."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32" id="download">
          <div className="container grid items-center gap-4 px-4 md:px-6 text-center">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Download Sayso Today</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get started with Sayso and start engaging your audience like never before.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Download for iOS
              </Link>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Download for Android
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
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
      </footer>
    </div>
  )
}

export function WebcamIcon(props: any) {
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
      <circle cx="12" cy="10" r="8" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 22h10" />
      <path d="M12 22v-4" />
    </svg>
  )
}