/*
 * PLACEHOLDER IMAGE LIBRARY
 * Every image below is temporary Unsplash stock, kept in one file so each
 * inner-page image can be replaced with final client photography in one place.
 * The `note` on each entry records where the image is used.
 */

const photo = (id, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

const dimensions = {
  "photo-1432888622747-4eb9a8efeb07": [1600, 1063],
  "photo-1460925895917-afdab827c52f": [1600, 1140],
  "photo-1467232004584-a241de8bcf5d": [1600, 1068],
  "photo-1485846234645-a62644f84728": [1600, 1081],
  "photo-1492619375914-88005aa9e8fb": [1600, 1073],
  "photo-1492724441997-5dc865305da7": [1600, 1067],
  "photo-1494790108377-be9c29b29330": [1600, 2400],
  "photo-1497366754035-f200968a6e72": [1600, 1068],
  "photo-1497366811353-6870744d04b2": [1600, 1068],
  "photo-1498050108023-c5249f4df085": [1600, 1065],
  "photo-1500648767791-00dcc994a43e": [1600, 2399],
  "photo-1506794778202-cad84cf45f1d": [1600, 2400],
  "photo-1512941937669-90a1b58e7e9c": [1600, 1067],
  "photo-1516280440614-37939bbacd81": [1600, 1067],
  "photo-1522071820081-009f0129c71c": [1600, 1067],
  "photo-1523275335684-37898b6baf30": [1600, 1162],
  "photo-1533750349088-cd871a92f312": [1600, 1067],
  "photo-1534528741775-53994a69daeb": [1600, 2000],
  "photo-1551650975-87deedd944c3": [1600, 1200],
  "photo-1552664730-d307ca884978": [1600, 1067],
  "photo-1558655146-9f40138edfeb": [1600, 2000],
  "photo-1558655146-d09347e92766": [1600, 2000],
  "photo-1561070791-2526d30994b5": [1600, 2000],
  "photo-1574717024653-61fd2cf4d44d": [1600, 1067],
  "photo-1626785774573-4b799315345d": [1600, 1067],
};

const image = (id, alt, note, width = 1600) => {
  const [baseWidth, baseHeight] = dimensions[id] ?? [width, width];

  return {
    src: photo(id, width),
    alt,
    note,
    width,
    height: Math.round((width * baseHeight) / baseWidth),
  };
};

export const placeholderImages = {
  aboutHero: image(
    "photo-1522071820081-009f0129c71c",
    "A digital team collaborating around a table",
    "About hero — replace with an e2e Cyber Solutions studio or team photograph.",
  ),
  aboutStory: image(
    "photo-1497366754035-f200968a6e72",
    "A bright, modern studio workspace",
    "About story — replace with a portrait of the e2e studio or working environment.",
  ),
  servicesHero: image(
    "photo-1552664730-d307ca884978",
    "A creative team planning a digital project",
    "Services hero — replace with an e2e strategy or workshop photograph.",
  ),
  portfolioHero: image(
    "photo-1558655146-d09347e92766",
    "A designer reviewing printed brand materials",
    "Portfolio hero — replace with a selection of finished e2e client work.",
  ),
  contactHero: image(
    "photo-1497366811353-6870744d04b2",
    "A welcoming modern office interior",
    "Contact hero — replace with the e2e Cyber Solutions Birmingham office.",
  ),
  webDesignMockup: image(
    "photo-1467232004584-a241de8bcf5d",
    "A responsive website displayed on a laptop",
    "Web Design hero mockup — replace with a live e2e client website screenshot.",
  ),
  mobileAppPrimary: image(
    "photo-1512941937669-90a1b58e7e9c",
    "A mobile app interface held in one hand",
    "Mobile Apps hero, front phone — replace with an e2e app screen.",
    900,
  ),
  mobileAppSecondary: image(
    "photo-1551650975-87deedd944c3",
    "A mobile app dashboard on a phone",
    "Mobile Apps hero, rear phone — replace with a second e2e app screen.",
    900,
  ),
  marketingDashboard: image(
    "photo-1460925895917-afdab827c52f",
    "Marketing analytics displayed on a laptop",
    "Digital Marketing hero — replace with an e2e campaign dashboard.",
  ),
  processStrategy: image(
    "photo-1552664730-d307ca884978",
    "A team mapping out a digital strategy",
    "Process step 01 / Strategy — replace with an e2e workshop photograph.",
    900,
  ),
  processDesign: image(
    "photo-1561070791-2526d30994b5",
    "A designer working through a visual layout",
    "Process step 02 / Design — replace with an e2e design-in-progress photograph.",
    900,
  ),
  processDevelopment: image(
    "photo-1498050108023-c5249f4df085",
    "Code on a developer's screen",
    "Process step 03 / Develop — replace with an e2e development photograph.",
    900,
  ),
  processMarketing: image(
    "photo-1533750349088-cd871a92f312",
    "A marketing team reviewing campaign results",
    "Process step 04 / Marketing — replace with an e2e campaign review photograph.",
    900,
  ),
  processCreative: image(
    "photo-1558655146-9f40138edfeb",
    "A creative reviewing colour and layout references",
    "Process step 05 / Creative — replace with an e2e creative session photograph.",
    900,
  ),
  testimonialAvatars: [
    image(
      "photo-1494790108377-be9c29b29330",
      "",
      "Testimonial avatar 01 — replace with a client portrait.",
      160,
    ),
    image(
      "photo-1500648767791-00dcc994a43e",
      "",
      "Testimonial avatar 02 — replace with a client portrait.",
      160,
    ),
    image(
      "photo-1506794778202-cad84cf45f1d",
      "",
      "Testimonial avatar 03 — replace with a client portrait.",
      160,
    ),
    image(
      "photo-1534528741775-53994a69daeb",
      "",
      "Testimonial avatar 04 — replace with a client portrait.",
      160,
    ),
  ],
  testimonialFeature: image(
    "photo-1531123897727-8f129e1688ce",
    "",
    "Large testimonial portrait — replace with a client photograph.",
    900,
  ),
  team: [
    image(
      "photo-1494790108377-be9c29b29330",
      "Portrait of a creative director",
      "Team member 01 — replace with the real team portrait. Name and role are also placeholders.",
      900,
    ),
    image(
      "photo-1500648767791-00dcc994a43e",
      "Portrait of a lead developer",
      "Team member 02 — replace with the real team portrait. Name and role are also placeholders.",
      900,
    ),
    image(
      "photo-1534528741775-53994a69daeb",
      "Portrait of a digital strategist",
      "Team member 03 — replace with the real team portrait. Name and role are also placeholders.",
      900,
    ),
    image(
      "photo-1506794778202-cad84cf45f1d",
      "Portrait of a content lead",
      "Team member 04 — replace with the real team portrait. Name and role are also placeholders.",
      900,
    ),
  ],
  videoPosters: [
    image(
      "photo-1492724441997-5dc865305da7",
      "A production team filming on location",
      "Video card 01 — replace with an e2e film still.",
      1100,
    ),
    image(
      "photo-1485846234645-a62644f84728",
      "A cinema camera on a film set",
      "Video card 02 — replace with an e2e film still.",
      1100,
    ),
    image(
      "photo-1516280440614-37939bbacd81",
      "A camera operator filming a scene",
      "Video card 03 — replace with an e2e film still.",
      1100,
    ),
    image(
      "photo-1574717024653-61fd2cf4d44d",
      "Video editing and colour grading",
      "Video card 04 — replace with an e2e film still.",
      1100,
    ),
  ],
  portfolio: {
    "Web Design": image(
      "photo-1467232004584-a241de8bcf5d",
      "A responsive website displayed on a laptop",
      "Portfolio / Web Design — replace with the finished client project.",
    ),
    "Web Development": image(
      "photo-1498050108023-c5249f4df085",
      "A developer working in a code editor",
      "Portfolio / Web Development — replace with the finished client project.",
    ),
    "Mobile Apps": image(
      "photo-1512941937669-90a1b58e7e9c",
      "A mobile app interface held in one hand",
      "Portfolio / Mobile Apps — replace with the finished client project.",
    ),
    Ecommerce: image(
      "photo-1523275335684-37898b6baf30",
      "A product photographed for an online store",
      "Portfolio / Ecommerce — replace with the finished client store.",
    ),
    "Digital Marketing": image(
      "photo-1460925895917-afdab827c52f",
      "Marketing analytics displayed on a laptop",
      "Portfolio / Digital Marketing — replace with the finished campaign.",
    ),
    Branding: image(
      "photo-1558655146-d09347e92766",
      "A designer reviewing printed brand materials",
      "Portfolio / Branding — replace with the finished identity work.",
    ),
    "Graphic Design": image(
      "photo-1626785774573-4b799315345d",
      "A colourful graphic design layout",
      "Portfolio / Graphic Design — replace with the finished design work.",
    ),
    Videos: image(
      "photo-1492619375914-88005aa9e8fb",
      "A film production scene",
      "Portfolio / Videos — replace with an e2e film still.",
    ),
    SEO: image(
      "photo-1432888622747-4eb9a8efeb07",
      "Search and performance data on a screen",
      "Portfolio / SEO — replace with the finished campaign.",
    ),
  },
  serviceFallbacks: {
    "design-and-development": image(
      "photo-1498050108023-c5249f4df085",
      "A digital product being developed",
      "Generic Design & Development service page — replace with e2e project work.",
    ),
    "digital-marketing": image(
      "photo-1460925895917-afdab827c52f",
      "Marketing analytics displayed on a laptop",
      "Generic Digital Marketing service page — replace with e2e campaign work.",
    ),
    creative: image(
      "photo-1558655146-d09347e92766",
      "A designer reviewing creative work",
      "Generic Creative service page — replace with e2e creative work.",
    ),
  },
};

export const placeholderTeam = [
  { name: "Team member 01", role: "Creative Director" },
  { name: "Team member 02", role: "Lead Developer" },
  { name: "Team member 03", role: "Digital Strategist" },
  { name: "Team member 04", role: "Content Lead" },
];
