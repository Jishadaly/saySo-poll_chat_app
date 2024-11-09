// export function SendIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <line x1="22" y1="2" x2="11" y2="13" />
//       <polygon points="22 2 15 22 11 13 2 9 22 2" />
//     </svg>
//   );
// }


export function SendIcon(props: any) {
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
        {/* Rounded line with strokeLinecap property */}
        <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" strokeLinecap="round" />
        {/* Modified polygon for a rounded design */}
        <path d="M22 2 L15 22 L11 13 L2 9 Q12 8 22 2" fill="none" stroke="currentColor" strokeLinejoin="round" />
      </svg>
    );
  }
  