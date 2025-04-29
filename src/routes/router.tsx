import { createBrowserRouter, Navigate } from "react-router-dom";

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
import CertificateHistoryIndex from "../components/certificate-history";
import ChangePasswordIndex from "../components/change-password";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <IframeWrapper />,
  },
  {
    element: <WithoutAuthPages />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
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
        path: "/certificate-history",
        element: <CertificateHistoryIndex />,
      },
      {
        path: "/settings",
        element: <SettingsIndex />,
      },
      {
        path: "/change-password",
        element: <ChangePasswordIndex />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default routes;
