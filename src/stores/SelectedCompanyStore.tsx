import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LeadCompanyInfoProps } from "./LeadInfo";

interface SelectedCompanyStore {
  selectedCompany: LeadCompanyInfoProps | null;
  setSelectedCompany: (company: LeadCompanyInfoProps | null) => void;
}

export const useSelectedCompanyStore = create<SelectedCompanyStore>()(
  persist(
    (set) => ({
      selectedCompany: null,
      setSelectedCompany: (company: LeadCompanyInfoProps | null) =>
        set({ selectedCompany: company }),
    }),
    {
      name: "selectedCompany",
    }
  )
);
