import { useState, useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useSelectedCompanyStore } from "../../../stores/SelectedCompanyStore";
import axiosClient from "../../../api/axiosClient";
import "./form.css";
import statesList from "./states";

// interface Company {
//   name: string;
// }

interface CertificateFormProps {
  projLocationState: string;
  projectDescription: string;
  descriptionOperation: string;
  certHolderName: { value: string }[];
  address: string;
  city: string;
  state: string;
  zipCode: string;
  emailAddress: string;
  contactNumber: string;
  sendEmailCopy: boolean;
  selectedData: {
    leadId: number;
  };
}

const RequestCertificateForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CertificateFormProps>({
    defaultValues: {
      projLocationState: "",
      projectDescription: "",
      descriptionOperation: "",
      certHolderName: [{ value: "" }],
      address: "",
      city: "",
      state: "",
      zipCode: "",
      emailAddress: "",
      contactNumber: "",
      sendEmailCopy: false,
    },
  });

  const { fields, append, remove } = useFieldArray<
    CertificateFormProps,
    "certHolderName"
  >({
    control,
    name: "certHolderName",
  });

  const { selectedCompany } = useSelectedCompanyStore();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const currentCompanyState = selectedCompany?.state_abbr;
  const projectDescriptionValue = watch("projectDescription");
  const isFieldsDisabled = !projectDescriptionValue;

  const toggleProjLocState = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedState = e.target.value;
    if (selectedState === currentCompanyState) {
      setValue("projectDescription", "default");
      setValue(
        "descriptionOperation",
        "All locations as required by written contract."
      );
    } else {
      setValue("projectDescription", "manual");
      setValue("descriptionOperation", "As required by written contract.");
    }
  };

  useEffect(() => {
    const toggleProjDesc = () => {
      if (projectDescriptionValue === "default") {
        setValue(
          "descriptionOperation",
          "All locations as required by written contract."
        );
      } else if (projectDescriptionValue === "manual") {
        setValue("descriptionOperation", "As required by written contract.");
      }
    };

    toggleProjDesc();
  }, [setValue, projectDescriptionValue]);

  const [submitStatus, setSubmitStatus] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({
    message: "",
    type: null,
  });

  const onSubmit: SubmitHandler<CertificateFormProps> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus({ message: "", type: null });

    try {
      const payload = {
        projLocationState: data.projLocationState,
        projectDescription: data.projectDescription,
        descriptionOperation: data.descriptionOperation,
        certHolderName: data.certHolderName,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        emailAddress: data.emailAddress,
        contactNumber: data.contactNumber,
        sendEmailCopy: data.sendEmailCopy,
        lead_id: selectedCompany?.id,
      };
      console.log("Payload: ", payload);
      const submit = await axiosClient.post(
        `${import.meta.env.VITE_BASE_URL}/api/generate-cert-pdf`,
        payload
      );
      console.log("Submit status:", submit);
      if (submit.data.status === 200) {
        setSubmitStatus({
          message: "Certificate request submitted successfully!",
          type: "success",
        });
        reset();
      } else {
        setSubmitStatus({
          message:
            submit.data.message || "Failed to submit certificate request.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error submitting certificate request:", error);
      setSubmitStatus({
        message:
          "An error occurred while submitting your request. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-content-wrapper py-3">
      <div className="container">
        <div className="element-heading">
          <h6>Certificate Form</h6>
        </div>
      </div>
      <div className="container">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="form-group">
              <label className="form-label" htmlFor="state">
                Project location state
              </label>
              <select
                id="projLocationState"
                className="form-select"
                aria-label="State"
                {...register("projLocationState", {
                  required: "State is required",
                })}
                onChange={toggleProjLocState}
                required
              >
                <option value="">Select State</option>
                {statesList.map((state) => (
                  <option key={state.id} value={state.states}>
                    {state.statesname}
                  </option>
                ))}
              </select>
              {errors.projLocationState && (
                <p className="fw-normal mt-2 text-danger">
                  {errors.projLocationState.message}
                </p>
              )}
            </div>

            {/* Disable all remaining fields if no project description is selected */}
            <fieldset
              disabled={isFieldsDisabled}
              style={isFieldsDisabled ? { cursor: "not-allowed" } : {}}
            >
              {/* Project Description (Always Enabled) */}
              <div className="form-group">
                <label className="form-label" htmlFor="project_description">
                  Project Description:
                </label>
                <select
                  id="projectDescription"
                  className="form-select"
                  aria-label="Project Description"
                  {...register("projectDescription", {
                    required: "Project description is required",
                  })}
                >
                  <option value="">-- Select Project Description --</option>
                  <option value="default">
                    (Default) All locations as required by written contract.
                  </option>
                  <option value="manual">
                    Manual Input (Requires Approval)
                  </option>
                </select>
                {errors.projectDescription && (
                  <p className="fw-normal mt-2 text-danger">
                    {errors.projectDescription.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="descriptionOperation">
                  Description of Operation
                </label>
                <textarea
                  className="form-control"
                  id="descriptionOperation"
                  cols={3}
                  rows={5}
                  placeholder="Write something..."
                  {...register("descriptionOperation", {
                    required: "Description of operation is required",
                  })}
                  required
                  readOnly={projectDescriptionValue === "default"}
                  style={
                    projectDescriptionValue === "default"
                      ? { cursor: "not-allowed" }
                      : {}
                  }
                ></textarea>
                {errors.descriptionOperation && (
                  <p className="fw-normal mt-2 text-danger">
                    {errors.descriptionOperation.message}
                  </p>
                )}
              </div>

              {/* Dynamic Company Name Fields */}
              <div className="form-group">
                <label className="form-label" htmlFor="company_name">
                  Certificate Holder's Name
                </label>
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="d-flex align-items-center mb-2"
                  >
                    <input
                      className="form-control"
                      id={`certHolderName${index}`}
                      type="text"
                      placeholder="Certificate Holder's Name"
                      {...register(`certHolderName.${index}.value` as const, {
                        required: true,
                      })}
                      required
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        className="btn btn-danger ms-2"
                        onClick={() => remove(index)}
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-primary mt-2"
                  onClick={() => append({ value: "" })}
                >
                  <i className="bi bi-plus"></i> Add certificate holder name
                </button>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="address">
                  Address
                </label>
                <textarea
                  className="form-control"
                  id="address"
                  cols={3}
                  rows={5}
                  placeholder="Enter Address..."
                  {...register("address", {
                    required: "Address is required",
                  })}
                  required
                ></textarea>
                {errors.address && (
                  <p className="fw-normal mt-2 text-danger">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="city">
                  City
                </label>
                <input
                  className="form-control"
                  id="city"
                  type="text"
                  placeholder="Enter City"
                  {...register("city", {
                    required: "City is required",
                  })}
                  required
                />
                {errors.city && (
                  <p className="fw-normal mt-2 text-danger">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="state">
                  State
                </label>
                <select
                  id="state"
                  className="form-select"
                  aria-label="State"
                  {...register("state", {
                    required: "State is required",
                  })}
                  required
                >
                  <option value="">Select State</option>
                  {statesList.map((state) => (
                    <option key={state.id} value={state.states}>
                      {state.statesname}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="fw-normal mt-2 text-danger">
                    {errors.state.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="zip_code">
                  Zip Code
                </label>
                <input
                  className="form-control"
                  id="zipCode"
                  type="text"
                  placeholder="Enter Zip Code"
                  {...register("zipCode", {
                    required: "Zip code is required",
                  })}
                  required
                />
                {errors.zipCode && (
                  <p className="fw-normal mt-2 text-danger">
                    {errors.zipCode.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email_address">
                  Email Address
                </label>
                <input
                  className="form-control"
                  id="email_address"
                  type="email"
                  placeholder="Enter Email Address"
                  {...register("emailAddress", {
                    required: "Email address is required",
                  })}
                  required
                />
                {errors.emailAddress && (
                  <p className="fw-normal mt-2 text-danger">
                    {errors.emailAddress.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact_number">
                  Contact Number
                </label>
                <input
                  className="form-control"
                  id="contact_number"
                  type="phone"
                  placeholder="Enter Contact Number"
                  {...register("contactNumber", {
                    required: "Contact number is required",
                  })}
                  required
                />
                {errors.contactNumber && (
                  <p className="fw-normal mt-2 text-danger">
                    {errors.contactNumber.message}
                  </p>
                )}
              </div>

              <div className="form-check mb-4">
                <input
                  className="form-check-input form-check-input-lg form-check-info"
                  id="send_email_copy"
                  type="checkbox"
                  {...register("sendEmailCopy")}
                />
                <label className="form-check-label" htmlFor="send_email_copy">
                  Send copy to my email?
                </label>
              </div>

              {submitStatus.type && (
                <div
                  className={`alert alert-${
                    submitStatus.type === "success" ? "success" : "danger"
                  } mt-3`}
                  role="alert"
                >
                  {submitStatus.message}
                </div>
              )}
              <button
                className="btn btn-primary w-100 d-flex align-items-center justify-content-center mt-3"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit
                    <i className="bi bi-arrow-right fz-16 ms-1"></i>
                  </>
                )}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestCertificateForm;
