import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmailPreview } from './EmailPreview';
import { buildWaitlistWelcomeEmail } from './waitlistWelcome';

const meta: Meta<typeof EmailPreview> = {
  title: 'Emails/WaitlistWelcome',
  component: EmailPreview,
};

export default meta;

type Story = StoryObj<typeof EmailPreview>;

const PREVIEW_SITE_URL = '';

export const General: Story = {
  args: { html: buildWaitlistWelcomeEmail('general', { siteUrl: PREVIEW_SITE_URL }).html },
};

export const Result: Story = {
  args: { html: buildWaitlistWelcomeEmail('result', { siteUrl: PREVIEW_SITE_URL }).html },
};

export const ResultWithGarment: Story = {
  args: {
    html: buildWaitlistWelcomeEmail('result', {
      siteUrl: PREVIEW_SITE_URL,
      garmentName: 'Remera Classic BZK Negra',
    }).html,
  },
};
