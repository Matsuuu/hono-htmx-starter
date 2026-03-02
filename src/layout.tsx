import type { FC } from "hono/jsx";

export const Layout: FC = (props) => {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="/main.css" />
        <script type="text/javascript" src="/htmx.js" />
      </head>
      <body>{props.children}</body>
    </html>
  );
};
