/* ══ Every word on the site lives here. Edit this file, not the components. ══ */

export const SITE = {
  name: "DAWGZ",
  token: "$DAWGZ",
  chain: "Robinhood Chain",
  supply: "10,000",
  price: "0.005 ETH",
  tagline: "10,000 dawgz off the leash on Robinhood Chain.",
  x: "https://x.com/dawgz",
  pinnedPost: "https://x.com/dawgz/status/1",
  marketplace: "#",
  origin: "https://dawgz.xyz", // used to build referral links
};

export const DAWGZ_IMAGES = [
  "/dawgz-1.jpg", "/dawgz-2.jpg", "/dawgz-3.jpg",
];

export const TICKER = [
  "you don't exist",
  "$DAWGZ",
  "no roadmap, only dawgz",
  "10,000 on Robinhood Chain",
  "judging you",
  "error 999",
  "off the leash",
];

export const ABOUT = {
  heading: "We are not building a brand. We're building a pound.",
  body: [
    "DAWGZ started as a folder of cursed JPEGs on somebody's desktop — bulldogs wearing clown wigs, gold AKs, McDonald's hats, a Windows dialog telling you that you don't exist. We kept the folder. We put it on-chain.",
    "Every dawg is assembled from the junk drawer of the internet: dead memes, pirated software UI, 2003 wallpaper, whatever was in the recycle bin. Nothing is tasteful. Everything is deliberate.",
    "The collection is backed by $DAWGZ, and it lives on Robinhood Chain — fast, cheap, and close to the people who actually trade this stuff.",
  ],
  stats: [
    ["10,000", "Dawgz"],
    ["Robinhood", "Chain"],
    ["$DAWGZ", "Backed by"],
    ["1", "Per wallet"],
  ] as [string, string][],
};

export const TRAITS = [
  "Wigs", "Headwear", "Eyes", "Fits", "Held items",
  "Mouth", "Fur", "Desktop backgrounds", "Popups",
];

export const BREEDS = [
  { name: "Strays",    desc: "Base model. Still meaner than your dog.",              img: DAWGZ_IMAGES[0] },
  { name: "Show Dawgz", desc: "Groomed, accessorized, insufferable about it.",       img: DAWGZ_IMAGES[1] },
  { name: "Junkyard",  desc: "Loud traits, worse combinations, no supervision.",     img: DAWGZ_IMAGES[2] },
  { name: "Kennel Bosses", desc: "Rare. You'll know one when it scrolls past.",      img: DAWGZ_IMAGES[0] },
  { name: "Originals", desc: "The first litter. Deepest tie to $DAWGZ.",             img: DAWGZ_IMAGES[1] },
];

export const SYSTEMS = [
  { name: "The Pound",   desc: "Stake your dawg. It sits there. It earns $DAWGZ." },
  { name: "The Yard",    desc: "Head-to-head games, leaderboards, weekly payouts." },
  { name: "The Groomer", desc: "Burn $DAWGZ to reroll traits. No refunds, no mercy." },
  { name: "The Bowl",    desc: "Raffles, drops, and whatever the community votes into it." },
];

export const ROADMAP = [
  { title: "Whitelist opens", desc: "Apply, refer your frens, climb the list.", state: "live" },
  { title: "Mint",            desc: "Whitelisted wallets mint on Robinhood Chain.", state: "next" },
  { title: "Reveal",          desc: "Traits, breeds, and rarity go public.", state: "next" },
  { title: "$DAWGZ",          desc: "Supply, distribution, and claim mechanics published.", state: "next" },
  { title: "Systems online",  desc: "The Pound, The Yard, The Groomer, The Bowl.", state: "next" },
];

export const FAQS = [
  { q: "What is DAWGZ?",              a: "10,000 collaged bulldog NFTs on Robinhood Chain, backed by $DAWGZ." },
  { q: "What chain?",                 a: "Robinhood Chain." },
  { q: "What's the mint price?",      a: SITE.price },
  { q: "How do I get on the list?",   a: "Complete the four steps in the whitelist application. Referrals move you up." },
  { q: "How does the referral work?", a: "After you apply you get a link. Every wallet that applies through it is credited to you." },
  { q: "Is there a public mint?",     a: "Only if the whitelist doesn't clear the supply." },
  { q: "What does $DAWGZ do?",        a: "It powers staking, rerolls, games, and rewards after mint. Full details post-mint." },
  { q: "Is this financial advice?",   a: "No. It's a picture of a dog in a clown wig. DYOR." },
];
