import { SignIn } from "@clerk/nextjs"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <SignIn />
    </div>
  )
}
