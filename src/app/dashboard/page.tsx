
import Header from "@/components/Header"
import Main from "@/components/Main";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'; // Adjust import paths as needed


async function getPolls() {
  // Fetch the polls data from your API
  const response = await fetch(`${process.env.API_URL}/api/polls`, {
    cache: 'no-store', 
  });

  if (!response) {
    throw new Error("Failed to fetch polls");
  }
  
  const polls = await response.json();
  return polls;
}

export default async function Page() {


  const { isAuthenticated , getUser } =  getKindeServerSession();
  
  // console.log(user);
  
  const user = await getUser();

  if (!isAuthenticated() && !user) {
      return(
        <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold mb-4">
          Welcome! Please sign up or log in to continue.
        </h1>

        {/* <div className="flex space-x-4">
          <LoginLink
            postLoginRedirectURL={process.env.KINDE_POST_LOGIN_REDIRECT_URL}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Sign in
          </LoginLink>
          <RegisterLink
            orgCode="org_58532118368"
            postLoginRedirectURL="/registrationCallback"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Sign up
          </RegisterLink>
        </div> */}

        <Button className="mt-4">Learn More</Button> 
      </div>
      );
  }

  const polls = await getPolls();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 flex flex-col md:flex-row">
      <Main polls={polls}/>
      </div>
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