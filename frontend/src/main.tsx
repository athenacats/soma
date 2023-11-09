import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.tsx";
import "./index.css";
import HomePage from "./pages/HomePage.tsx";
import BookPage from "./pages/BookPage.tsx";

import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StoreProvider } from "./Store.tsx";
import FictionPage from "./pages/FictionPage.tsx";
import MysteryCrimePage from "./pages/MysteryCrimePage.tsx";
import RomancePage from "./pages/RomancePage.tsx";
import ScienceTechPage from "./pages/ScienceTechPage.tsx";
import ScifiFantasyPage from "./pages/ScifiFantasyPage.tsx";
import TeensYAPage from "./pages/TeensYAPage.tsx";
import SeachResultsPage from "./pages/SearchResultsPage.tsx";
import { SignInPage } from "./pages/SignInPage.tsx";
import { SignUpPage } from "./pages/SignUpPage.tsx";
import { ProfilePage } from "./pages/ProfilePage.tsx";
import { FantasyPage } from "./pages/FantasyPage.tsx";
import { HorrorPage } from "./pages/HorrorPage.tsx";
import { ThrillerPage } from "./pages/ThrillerPage.tsx";
import { NonfictionPage } from "./pages/NonfictionPage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />}></Route>
      <Route path="book/:slugName/:slugAuthor" element={<BookPage />}></Route>
      <Route path="search/:slugName" element={<SeachResultsPage />}></Route>
      <Route path="fiction" element={<FictionPage />}></Route>
      <Route path="horror" element={<HorrorPage />}></Route>
      <Route path="thriller" element={<ThrillerPage />}></Route>
      <Route path="nonfiction" element={<NonfictionPage />}></Route>
      <Route path="mystery&crime" element={<MysteryCrimePage />}></Route>
      <Route path="romance" element={<RomancePage />}></Route>
      <Route path="science&tech" element={<ScienceTechPage />}></Route>
      <Route path="scifi" element={<ScifiFantasyPage />}></Route>
      <Route path="fantasy" element={<FantasyPage />}></Route>
      <Route path="teens&ya" element={<TeensYAPage />}></Route>
      <Route path="signin" element={<SignInPage />}></Route>
      <Route path="signout" element={<SignInPage />}></Route>
      <Route path="signup" element={<SignUpPage />} />
      <Route path="profile/:userId" element={<ProfilePage />}></Route>
    </Route>
  )
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);
