export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Jobs",
      href: "/dashboard/jobs",
    },
    {
      label: "New Job",
      href: "/dashboard/new-job",
    },
    {
      label: "Analitics",
      href: "/dashboard/analytics",
    },
  ],
  navMenuItems: [
    {
      label: "Jobs",
      href: "/dashboard/jobs",
    },
    {
      label: "New Job",
      href: "/dashboard/new-job",
    },
    {
      label: "Analytics",
      href: "/dashboard/analytics",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
