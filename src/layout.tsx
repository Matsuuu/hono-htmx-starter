import type { FC } from "hono/jsx";

export const Layout: FC = (props) => {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="/main.css" />
        <script type="text/javascript" src="/htmx.js" />
        <script type="text/javascript" src="/htmx-sse.js" />
      </head>
      <body class="bg-black ">{props.children}</body>
    </html>
  );
};
