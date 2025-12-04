"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useFetch from "@/hooks/use-fetch";
import { onboardingSchema } from "@/app/lib/schema";
import { updateUser } from "@/actions/user";

export default function OnboardingForm({
  industries,
  defaultValues = {},
  mode = "onboarding", // ⭐ onboarding | edit
}) {
  const router = useRouter();

  // ⭐ PRESELECTED INDUSTRY IF EDIT MODE
  const [selectedIndustry, setSelectedIndustry] = useState(() => {
    if (!defaultValues?.industry) return null;
    const base = defaultValues.industry.split("-")[0]; // extract main industry
    return industries.find((ind) => ind.id === base) || null;
  });

  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser);

  // ⭐ REACT HOOK FORM WITH DEFAULT VALUES
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      industry: defaultValues?.industry?.split("-")[0] || "",
      subIndustry: defaultValues?.industry?.split("-")[1]?.replace(/-/g, " ") || "",
      experience: defaultValues?.experience || "",
      skills: defaultValues?.skills?.join(", ") || "",
      bio: defaultValues?.bio || "",
    },
  });

  const watchIndustry = watch("industry");

  // ⭐ SUBMIT HANDLER
  const onSubmit = async (values) => {
    try {
      const formattedIndustry =
        `${values.industry}-${values.subIndustry.toLowerCase().replace(/ /g, "-")}`;

      await updateUserFn({
        ...values,
        industry: formattedIndustry,
      });
    } catch (error) {
      console.error("Onboarding error:", error);
      toast.error("Something went wrong.");
    }
  };

  // ⭐ SUCCESS HANDLING
  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success(
        mode === "onboarding"
          ? "Profile completed successfully!"
          : "Profile updated successfully!"
      );

      if (mode === "onboarding") {
        router.push("/dashboard");
      } else {
        router.refresh();
      }
    }
  }, [updateResult, updateLoading]);

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-lg mt-10 mx-2">
        <CardHeader>
          <CardTitle className="gradient-title text-4xl">
            {mode === "onboarding" ? "Complete Your Profile" : "Edit Profile"}
          </CardTitle>

          <CardDescription>
            {mode === "onboarding"
              ? "Select your industry to get personalized insights."
              : "Update your information to improve your insights."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* INDUSTRY */}
            <div className="space-y-2">
              <Label>Industry</Label>

              <Select
                onValueChange={(value) => {
                  setValue("industry", value);
                  setSelectedIndustry(industries.find((ind) => ind.id === value));
                  setValue("subIndustry", "");
                }}
                defaultValue={defaultValues?.industry?.split("-")[0] || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Industries</SelectLabel>
                    {industries.map((ind) => (
                      <SelectItem key={ind.id} value={ind.id}>
                        {ind.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {errors.industry && (
                <p className="text-sm text-red-500">{errors.industry.message}</p>
              )}
            </div>

            {/* SUB INDUSTRY */}
            {watchIndustry && (
              <div className="space-y-2">
                <Label>Specialization</Label>

                <Select
                  onValueChange={(value) => setValue("subIndustry", value)}
                  defaultValue={
                    defaultValues?.industry?.split("-")[1]?.replace(/-/g, " ") || ""
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Specializations</SelectLabel>
                      {selectedIndustry?.subIndustries?.map((sub) => (
                        <SelectItem key={sub} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {errors.subIndustry && (
                  <p className="text-sm text-red-500">
                    {errors.subIndustry.message}
                  </p>
                )}
              </div>
            )}

            {/* EXPERIENCE */}
            <div className="space-y-2">
              <Label>Years of Experience</Label>
              <Input
                type="number"
                min="0"
                max="50"
                placeholder="Enter experience"
                {...register("experience")}
              />
              {errors.experience && (
                <p className="text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* SKILLS */}
            <div className="space-y-2">
              <Label>Skills</Label>
              <Input
                placeholder="e.g., React, Python, Project Management"
                {...register("skills")}
              />
              <p className="text-sm text-muted-foreground">
                Separate skills with commas
              </p>
              {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills.message}</p>
              )}
            </div>

            {/* BIO */}
            <div className="space-y-2">
              <Label>Professional Bio</Label>
              <Textarea
                className="h-32"
                placeholder="Tell us about your background..."
                {...register("bio")}
              />
              {errors.bio && (
                <p className="text-sm text-red-500">{errors.bio.message}</p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <Button type="submit" className="w-full" disabled={updateLoading}>
              {updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : mode === "onboarding" ? (
                "Complete Profile"
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
