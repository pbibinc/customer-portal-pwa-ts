export interface LeadCompanyInfoProps {
  id: number;
  disposition_id: number;
  company_name: string;
  tel_num: string;
  state_abbr: string;
  class_code: string;
  website_originated: string;
  status: number;
  is_spanish: number;
  created_at: Date | null;
  updated_at: Date | null;
  prime_lead: number;
  deleted_at: Date | null;
  activePolicies: ActivePolicy[];
  pivot: Pivot;
  general_information: GeneralInformation;
  quote_lead: QuoteLead;
  certificate: unknown[];
}

export interface ActivePolicy {
  id: number;
  selected_quote_id: number;
  quotation_product_id: number;
  policy_number: string;
  carrier: string;
  market: string;
  payment_mode: string;
  effective_date: Date;
  expiration_date: Date;
  media_id: number;
  status: string;
  created_at: Date | null;
  updated_at: Date | null;
  QuotationProduct: QuotationProduct;
  GeneralLiabilty?: GeneralLiabilty;
  financingAgreement?: FinancingAgreement;
  file: string;
  WorkersCompensation?: WorkersCompensation;
  CommercialAuto?: CommercialAuto;
  ExcessLiability?: ExcessLiability;
  ToolsEquipment?: ToolsEquipment;
  BuildersRisk?: BuildersRisk;
  BusinessOwners?: BusinessOwners;
}

export interface QuotationProduct {
  id: number;
  quote_information_id: number;
  product: string;
  sent_out_date: Date;
  callback_date: Date | null;
  status: number;
  user_profile_id: number;
  product_appointer_id: number;
  created_at: Date | null;
  updated_at: Date | null;
  selected_quote_id: number;
}

export interface GeneralLiabilty {
  id: number;
  policy_details_id: number;
  is_commercial_gl: number;
  is_occur: number;
  is_policy: number;
  is_project: number;
  is_loc: number;
  is_additional_insd: number;
  is_subr_wvd: number;
  is_claims_made: number;
  each_occurence: string;
  damage_to_rented: string;
  medical_expenses: string;
  per_adv_injury: string;
  gen_aggregate: string;
  product_comp: string;
  status: string;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface FinancingAgreement {
  id: number;
  selected_quote_id: number;
  financing_company_id: number;
  is_auto_pay: number;
  due_date: number;
  payment_start: string;
  monthly_payment: string;
  down_payment: string;
  amount_financed: string;
  media_id: number;
  created_at: Date | null;
  updated_at: Date | null;
  media: Media;
}

export interface Media {
  id: number;
  basename: string;
  filename: string;
  filepath: string;
  type: string;
  size: string;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface WorkersCompensation {
  id: number;
  policy_details_id: number;
  is_subr_wvd: number;
  is_per_statute: number;
  el_each_accident: string;
  el_disease_policy_limit: string;
  el_disease_each_employee: string;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface CommercialAuto {
  id: number;
  policy_details_id: number;
  is_any_auto: number;
  is_owned_auto: number;
  is_scheduled_auto: number;
  is_hired_auto: number;
  is_non_owned_auto: number;
  is_addl_insd: number;
  is_subr_wvd: number;
  combined_single_unit: string;
  bi_per_person: string;
  bi_per_accident: string;
  property_damage: string;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface ExcessLiability {
  id: number;
  policy_details_id: number;
  is_umbrella_liability: number;
  is_excess_liability: number;
  is_occur: number;
  is_claims_made: number;
  is_ded: number;
  is_retention: number;
  is_addl_insd: number;
  is_subr_wvd: number;
  each_occurrence: string;
  aggregate: string;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface ToolsEquipment {
  id: number;
  policy_details_id: number;
  is_subr_wvd: number;
  is_addl_insd: number;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface BuildersRisk {
  id: number;
  policy_details_id: number;
  is_subr_wvd: number;
  is_addl_insd: number;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface BusinessOwners {
  id: number;
  policy_details_id: number;
  is_subr_wvd: number;
  is_addl_insd: number;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface Pivot {
  user_id: number;
  lead_id: number;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface GeneralInformation {
  id: number;
  leads_id: number;
  job_position: string;
  address: string;
  zipcode: string;
  state: string;
  firstname: string;
  lastname: string;
  alt_num: number;
  email_address: string;
  fax: string;
  gross_receipt: number;
  full_time_employee: number;
  part_time_employee: number;
  employee_payroll: number;
  owners_payroll: number;
  all_trade_work: string;
  sub_out: number;
  material_cost: string | null;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface QuoteLead {
  id: number;
  leads_id: number;
  user_profiles_id: number | null;
  created_at: Date | null;
  updated_at: Date | null;
  quote_information: QuoteInformation;
}

export interface QuoteInformation {
  id: number;
  telemarket_id: number;
  quoting_lead_id: number;
  status: number;
  remarks: string;
  created_at: Date | null;
  updated_at: Date | null;
  quotation_products: QuotationProduct2[];
}

export interface QuotationProduct2 {
  id: number;
  quote_information_id: number;
  product: string;
  sent_out_date: Date | null;
  callback_date: Date | null;
  status: number;
  user_profile_id: number;
  product_appointer_id: number;
  created_at: Date | null;
  updated_at: Date | null;
  selected_quote_id: number;
  policy_detail: PolicyDetail[];
  qoute_comparison: QouteComparison[];
}

export interface PolicyDetail {
  id: number;
  selected_quote_id: number;
  quotation_product_id: number;
  policy_number: string;
  carrier: string;
  market: string;
  payment_mode: string;
  effective_date: Date | null;
  expiration_date: Date | null;
  media_id: number;
  status: string;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface QouteComparison {
  id: number;
  quotation_product_id: number;
  quotation_market_id: number;
  pricing_breakdown_id: number;
  quote_no: string;
  full_payment: string;
  down_payment: string;
  monthly_payment: string;
  number_of_payments?: number;
  broker_fee: string;
  recommended: number;
  effective_date: Date | null;
  created_at: Date | null;
  updated_at: Date | null;
}
