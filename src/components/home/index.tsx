import { useEffect, useState } from "react";
import { Modal } from "bootstrap";
import axiosClient from "../../api/axiosClient";
import { useLoginStore } from "../../stores/LoginStore";
import { useLeadStore } from "../../stores/LeadStore";
import { LeadCompanyInfoProps } from "../../stores/LeadInfo";
import { useSelectedCompanyStore } from "../../stores/SelectedCompanyStore";

import ScrollTop from "./single-components/ScrollTop";
import WelcomeToast from "./single-components/WelcomeToast";
import PolicySlider from "./single-components/PolicySlider";
import CreateCertificateCard from "./single-components/CreateCertificateCard";
import CertificateHistoryCard from "./single-components/CertificateHistoryCard";
import SelectCompanyModal from "./single-components/SelectCompanyModal";
import AdsSlider from "./single-components/AdsSlider";

const HomeIndex: React.FC = () => {
  const { user } = useLoginStore();
  const userId = user?.id;
  const { leads, setLeads } = useLeadStore();
  const { selectedCompany, setSelectedCompany } = useSelectedCompanyStore();
  const [modalInstance, setModalInstance] = useState<Modal | null>(null);
  const [selectedLocalCompanyId, setSelectedLocalCompanyId] = useState<
    number | null
  >(null);

  useEffect(() => {
    const fetchLeadData = async () => {
      if (!userId) return;
      try {
        const res = await axiosClient.get(`/api/lead-data/${userId}`);
        if (res.data.success) {
          useLeadStore.setState({
            leads: res.data.data,
          });
        } else {
          console.error("Failed to fetch lead data");
        }
      } catch (error: unknown) {
        console.error("Error fetching lead data:", error);
      }
    };
    fetchLeadData();
  }, [userId, setLeads]);

  const openSelectCompanyModal = () => {
    modalInstance?.show();
  };

  const closeSelectCompanyModal = () => {
    modalInstance?.hide();
  };

  useEffect(() => {
    if (!leads) return;
    if (!selectedCompany) {
      openSelectCompanyModal();
    }
  }, [leads, selectedCompany]);

  const handleCompanyChange = (company: LeadCompanyInfoProps) => {
    setSelectedCompany(company);
    closeSelectCompanyModal();
  };

  const handleSaveChanges = () => {
    if (!leads || selectedLocalCompanyId == null) return;
    const foundLead = leads.find((lead) => lead.id === selectedLocalCompanyId);
    if (foundLead) {
      handleCompanyChange(foundLead);
    }
  };

  return (
    <>
      <SelectCompanyModal
        leads={leads}
        setModalInstance={setModalInstance}
        handleSaveChanges={handleSaveChanges}
        selectedLocalCompanyId={selectedLocalCompanyId}
        setSelectedLocalCompanyId={setSelectedLocalCompanyId}
      />
      <ScrollTop />
      <div className="page-content-wrapper">
        <WelcomeToast />
        <PolicySlider />
        <CreateCertificateCard />
        <CertificateHistoryCard />
        <AdsSlider />
      </div>
    </>
  );
};

export default HomeIndex;
