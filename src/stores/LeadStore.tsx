import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LeadCompanyInfoProps } from "./LeadInfo";

interface LeadStore {
  leads: LeadCompanyInfoProps[];
  setLeads: (leads: LeadCompanyInfoProps[]) => void;
}

export const useLeadStore = create<LeadStore>()(
  persist(
    (set) => ({
      leads: [],
      setLeads: (leads: LeadCompanyInfoProps[]) => set({ leads }),
    }),
    {
      name: "lead-store",
    }
  )
);
