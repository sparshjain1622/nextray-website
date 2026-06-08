export const strengthSubnav = [
  { label: "Infrastructure", href: "/strength/infrastructure" },
  { label: "Our Presence", href: "/strength/our-presence" },
] as const;

export const gallerySubnav = [
  { label: "Projects", href: "/gallery/projects" },
  { label: "Events", href: "/gallery/events" },
] as const;

export const associateRoles = [
  { value: "agent", label: "Be An Agent" },
  { value: "distributor", label: "Be A Distributor" },
] as const;

export const contactDepartments = [
  {
    title: "Main Office",
    phone: "0265 2638151",
    href: "tel:02652638151",
  },
  {
    title: "Purchase Dept",
    phone: "9081215151",
    email: "Purchase@nextray-tech.com",
    phoneHref: "tel:9081215151",
    emailHref: "mailto:Purchase@nextray-tech.com",
  },
  {
    title: "Sales Dept",
    phone: "7096015151",
    email: "Sales@nextray-tech.com",
    phoneHref: "tel:7096015151",
    emailHref: "mailto:Sales@nextray-tech.com",
  },
  {
    title: "Govt Projects & GeM inquiry",
    contact: "Mr. Bhargav Patel",
    phone: "+91 7284949791",
    phoneHref: "tel:+917284949791",
  },
] as const;

export const companyAddress = {
  lines: [
    "Nextray Technologies",
    "908/3 GIDC Makarpura,",
    "Opp. to Kiran Motors Service Center,",
    "Vadodara - 390010",
    "Gujarat - India",
  ],
  mapQuery: "908/3 GIDC Makarpura Vadodara Gujarat",
};

export const strengthInfrastructure = {
  intro: [
    "More than 10000 Sq. ft. of Contemporary Manufacturing Facilities for solid state LED lights.",
    "Well defined Quality management system to support the systematic flow of material, data and work.",
    "State of art machinery and equipment for the entire production cycle with well-trained human power. Perfectly chained work process for higher production.",
  ],
  machinery: [
    "Laser Marking Machine",
    "Pressure Die Casting Machine 650T and 420T",
    "Stencil Printer",
    "Pick and Place Machine",
    "Wave Soldering Machine",
    "Power Analyzer",
    "Digital Test Meter",
    "CCT Meter",
  ],
};

export const strengthPresence = {
  intro: [
    "Nextray Technologies serves clients across India with precision-engineered LED lighting solutions — from residential and commercial projects to industrial and government installations.",
    "With manufacturing based in Vadodara, Gujarat, we supply trusted lighting partners, distributors and OEM clients nationwide and in global markets.",
  ],
  highlights: [
    { label: "Headquarters", value: "Vadodara, Gujarat" },
    { label: "Manufacturing", value: "10,000+ Sq. ft." },
    { label: "Reach", value: "Pan-India & Global" },
  ],
};

export const projectGalleryItems = [
  { title: "Commercial LED installation — retail lighting project", image: "/images/project/project-01.webp" },
  { title: "Industrial warehouse high-bay LED lighting", image: "/images/project/project-02.webp" },
  { title: "Residential society outdoor LED street lighting", image: "/images/project/project-03.webp" },
  { title: "Office building indoor LED downlight project", image: "/images/project/project-04.webp" },
  { title: "Hospital corridor LED lighting installation", image: "/images/project/project-05.webp" },
  { title: "Government campus outdoor LED flood lighting", image: "/images/project/project-06.webp" },
  { title: "Manufacturing plant industrial LED lighting", image: "/images/project/project-07.webp" },
  { title: "Shopping mall architectural LED lighting", image: "/images/project/project-08.webp" },
  { title: "Smart city LED street light deployment", image: "/images/project/project-09.webp" },
] as const;

/** @deprecated Use projectGalleryItems */
export const projectImages = projectGalleryItems.map((p) => p.image);

export const eventItems = [
  {
    title: "Birthday Celebration",
    image: "/images/gallery/1.jpg",
  },
  {
    title: "Diwali Celebration",
    image: "/images/gallery/2.jpg",
  },
  {
    title: "Women's Day Celebration",
    image: "/images/gallery/3.jpg",
  },
  {
    title: "Ganpati Celebration",
    image: "/images/gallery/5.jpg",
  },
  {
    title: "LED Expo 2019",
    image: "/images/gallery/6.jpg",
  },
  {
    title: "Acetech 2022",
    image: "/images/exhibition/Acetech 2022.webp",
  },
  {
    title: "D-Arc Build 2022",
    image: "/images/exhibition/D-Arc build 2022.webp",
  },
  {
    title: "D-Arc Build 2023",
    image: "/images/exhibition/D-Arc build 2023.webp",
  },
  {
    title: "Indian Builders Congress 2023, Raipur",
    image: "/images/exhibition/Indian Builders Congress 2023, Raipur.webp",
  },
  {
    title: "Smart City Expo 2022",
    image: "/images/exhibition/Smart CityExpo '2022.webp",
  },
] as const;
