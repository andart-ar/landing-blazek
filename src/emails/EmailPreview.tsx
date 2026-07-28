interface EmailPreviewProps {
  html: string;
}

export function EmailPreview({ html }: EmailPreviewProps) {
  return (
    <iframe
      title="email-preview"
      srcDoc={html}
      style={{ width: '100%', height: '100vh', border: 'none' }}
    />
  );
}
