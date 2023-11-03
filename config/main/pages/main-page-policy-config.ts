import { PolicyPageType } from "@/types";

const mainPagePolicyConfig: PolicyPageType = {
  title: "Privacy Policy",
  description:
    "This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from ub.cafe (the “Site”).",
  paragraphs: [
    {
      title: "Personal Information we collect",
      description:
        "When you create an account on the site, we collect your name and email address. We use your name and email address for identification and authentication. You will also receive authentication emails at the email address provided. We DO NOT share any personal information to third parties.",
    },
    {
      title: "Changes",
      description:
        "We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.",
    },
    {
      title: "Contact Us",
      description:
        "For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at support@domain.com.",
    },
  ],
};

export default mainPagePolicyConfig;
