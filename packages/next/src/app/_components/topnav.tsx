import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "~/app/_components/simple-upload-button";

export function TopNav() {

  return (
    <nav className="flex w-full items-center justify-between p-6 text-xl font-semibold">
      <div>ScrapHome</div>

      <div className="flex flex-row gap-4 items-center">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <SimpleUploadButton />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
