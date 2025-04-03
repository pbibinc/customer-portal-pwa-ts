import { createBrowserRouter } from "react-router-dom";

import WithAuthPages from "./WithAuthPages";
import WithoutAuthPages from "./WithoutAuthPages";

import LoginIndex from "../components/login/index";
import ForgotPasswordIndex from "../components/forgot-password/index";

import HomeIndex from "../components/home/index";
import DocumentIndex from "../components/documents/index";
import CertFormIndex from "../components/certificate-form";
import ErrorPage from "../components/error-page";
import SettingsIndex from "../components/settings";
import IframeWrapper from "../components/iframe-wrapper";
import CertificateListIndex from "../components/certificate-history/single-components/CertificateList";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <IframeWrapper />,
  },
  {
    element: <WithoutAuthPages />,
    children: [
      {
        path: "/login",
        element: <LoginIndex />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordIndex />,
      },
    ],
  },
  {
    element: <WithAuthPages />,
    children: [
      {
        path: "/home",
        element: <HomeIndex />,
      },
      {
        path: "/documents",
        element: <DocumentIndex />,
      },
      {
        path: "/certificate-form",
        element: <CertFormIndex />,
      },
      {
        path: "/certificate-list",
        element: <CertificateListIndex />,
      },
      {
        path: "/settings",
        element: <SettingsIndex />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default routes;
