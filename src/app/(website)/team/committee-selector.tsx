"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

interface CommitteeSelectorProps {
  committees: string[];
  selectedCommittee: number;
}

export default function CommitteeSelector({
  committees,
  selectedCommittee,
}: CommitteeSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCommitteeChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("committee", value);
    router.push(`/team?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-xs">
      <Select
        value={selectedCommittee.toString()}
        onValueChange={handleCommitteeChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select committee" />
        </SelectTrigger>
        <SelectContent>
          {committees.map((committee, i) => (
            <SelectItem key={i} value={i.toString()}>
              {committee} Committee
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
