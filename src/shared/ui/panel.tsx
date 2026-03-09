import type { PropsWithChildren } from "react";

interface PanelProps {
  title: string;
  description: string;
}

export function Panel({ children, title, description }: PropsWithChildren<PanelProps>) {
  return (
    <aside className="detail-panel">
      <header className="detail-panel-header">
        <h3>{title}</h3>
        <p>{description}</p>
      </header>
      {children}
    </aside>
  );
}
