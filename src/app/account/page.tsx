"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/client";
import { toast } from "react-hot-toast";
import uniqid from "uniqid";

import { useUser } from "@/hooks/useUser";
import Box from "@/components/Box";
// import Input from "@/components/Input";
import { Input } from "@/components/ui/input";
import Button from "@/components/Button";
import AccountWrapper from "./components/AccountWrapper";
import { useRouter } from "next/navigation";

const Account = () => {
  const supabase = createClient();
  const { user, userDetails } = useUser();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata?.full_name || "");
      setAvatarUrl(user.user_metadata?.avatar_url || "");
    }
  }, [user]);

  const handleNameUpdate = async () => {
    if (!user) return;

    setUpdating(true);

    const { error } = await supabase
      .from("users")
      .update({ full_name: fullName })
      .eq("id", user.id);

    setUpdating(false);

    if (error) {
      toast.error("Failed to update name.");
    } else {
      toast.success("Name updated.");
    }

    router.refresh();
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files || e.target.files.length === 0) {
      toast.error("No file selected");
      return;
    }

    const file = e.target.files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${uniqid()}.${fileExt}`;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      return;
    }

    setUploading(true);

    const { error: uploadError } = await supabase
      .storage
      .from("useravatar")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      setUploading(false);
      toast.error("Upload failed.");
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("useravatar").getPublicUrl(fileName);

    const { error: dbError } = await supabase
      .from("users")
      .update({ avatar_url: fileName })
      .eq("id", user.id);

    setUploading(false);

    if (dbError) {
      toast.error("Failed to update avatar.");
    } else {
      toast.success("Avatar updated.");
      setAvatarUrl(publicUrl); // update local preview
    }

    router.refresh();
  };

  return (
    <AccountWrapper>
      <div className="flex flex-col {bg-neutral-900 rounded-lg h-full w-full overflow-y-auto items-center space-y-6 py-10">
        
        <Box className="flex flex-col gap-y-2 py-4 px-6 w-[60%] bg-neutral-800/50 hover:bg-neutral-800/70 transition-colors text-md text-white/80 items-center">
          <label className="w-full">Your ID:</label>
          <div className="text-white/80">
            {userDetails?.short_id}
          </div>
        </Box>

        {/* Name Box */}
        <Box className="flex flex-col gap-y-2 py-4 px-6 w-[60%] bg-neutral-800/50 hover:bg-neutral-800/70 transition-colors text-md text-white/80 items-center">
          <label className="w-full">Your Name:</label>
          <Input
            className="placeholder:text-neutral-300/80"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={userDetails?.full_name || "Enter your full name"}
          />
          <Button
            onClick={handleNameUpdate}
            disabled={updating}
            className="mt-2 w-80"
          >
            {updating ? "Updating..." : "Update Name"}
          </Button>
        </Box>

        {/* Avatar Box */}
        <Box className="flex flex-col gap-y-2 py-4 px-6 w-[60%] bg-neutral-800/50 hover:bg-neutral-800/70 transition-colors text-md text-white/80">
          <label>Your Avatar:</label>
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover"
              sizes="80"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="text-white/80 mt-2"
          />
          {uploading && <p className="text-sm text-gray-400">Uploading...</p>}
        </Box>
      </div>
    </AccountWrapper>
  );
};

export default Account;
