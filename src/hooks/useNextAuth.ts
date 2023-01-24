import {useSession} from "next-auth/react";

let session = useSession;
if (process.env.NEXT_PUBLIC_TESTING || process.env.NODE_ENV === "test") {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  session = () => ({data: {session: true, user: {id: 1}}});
}

export default session;