import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Router } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "../layout/RootLayout";
import Home from "../component/Home/Home";
import { Component } from "react";
import Navber from "../component/Navber/Navber";
import Footer from "../component/Footer/Footer";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home,
        },
        {
            index: "Navber",
            Component: Navber,
        },
        {
            index: "Footer",
            Component: Footer,
        }

    ]
  },
]);

