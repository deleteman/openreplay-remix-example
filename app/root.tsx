import { json, LoaderFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { useEffect } from "react";
import { startTracker } from "./tracker";


type LoaderData = {
  ENV: {
    projectKey: string | undefined
  }
};

export const loader: LoaderFunction = async ({ }) => {
  return json<LoaderData>({
    ENV: {
      projectKey: process.env.OPENREPLAY_PROJECT_KEY
    }
  });
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {

  let loaderData = useLoaderData()

  useEffect(() => {
    startTracker({
      projectKey:  loaderData.ENV.projectKey
    })
  }, []) 

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
