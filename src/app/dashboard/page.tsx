import Header from "@/components/Header"
import Main from "@/components/Main";

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

  const polls = await getPolls();
  console.log("polls", polls);

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