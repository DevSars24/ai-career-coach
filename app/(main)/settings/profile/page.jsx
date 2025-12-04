import { getUser } from "@/actions/user";
import { industries } from "@/data/industries";
import OnboardingForm from "@/app/(main)/onboarding/_components/onboarding-form";

export default async function ProfileSettingsPage() {
  const user = await getUser(); // fetch current logged-in user data

  return (
    <main className="container py-10">
      <h1 className="text-4xl font-bold gradient-title mb-6">
        Edit Profile
      </h1>

      <OnboardingForm
        industries={industries}
        defaultValues={user}      // ⭐ Prefill form
        mode="edit"               // ⭐ Switch to edit mode
      />
    </main>
  );
}
