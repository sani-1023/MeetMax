import Header from "../components/Header";
import { PageTitleAndDescription } from "../components/PageTitleAndDescription";
import SignUpForm from "../components/SignUpForm";
import SocialLogin from "../components/SocialLogin";

export default function SignUp() {
  return (
    <section className="w-full max-w-sm px-4 py-8 ">
      <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-6">
        <Header />
        <PageTitleAndDescription
          title={"Sign Up"}
          description="Create an account to continue and connect with the people."
        />
        <SocialLogin />
        <SignUpForm />
      </div>
    </section>
  );
}
