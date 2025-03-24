"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrawlPassPlusRewardsTable = exports.BrawlPassPremiumRewardsTable = exports.BrawlPassFreeRewardsTable = exports.BrawlerRarityTable = exports.UpgradeTable = exports.BrawlStarsAPI = exports.PORT = exports.ACCOUNT_TAG_REGEX = void 0;
const BrawlStarsAPIProvider_1 = __importDefault(require("../di/BrawlStarsAPIProvider"));
const PORT = parseInt(process.env.PORT || "3000");
exports.PORT = PORT;
const ACCOUNT_TAG_REGEX = /^[#][0-9A-Za-z]{3,}$/;
exports.ACCOUNT_TAG_REGEX = ACCOUNT_TAG_REGEX;
const BrawlStarsAPI = BrawlStarsAPIProvider_1.default.getInstance();
exports.BrawlStarsAPI = BrawlStarsAPI;
const UpgradeTable = {
    levels: [
        {
            level: 1,
            coins: 0,
            powerPoints: 0,
            totalCoins: 0,
            totalPowerPoints: 0,
        },
        {
            level: 2,
            coins: 20,
            powerPoints: 20,
            totalCoins: 20,
            totalPowerPoints: 20,
        },
        {
            level: 3,
            coins: 35,
            powerPoints: 30,
            totalCoins: 55,
            totalPowerPoints: 50,
        },
        {
            level: 4,
            coins: 75,
            powerPoints: 50,
            totalCoins: 130,
            totalPowerPoints: 100,
        },
        {
            level: 5,
            coins: 140,
            powerPoints: 80,
            totalCoins: 270,
            totalPowerPoints: 180,
        },
        {
            level: 6,
            coins: 290,
            powerPoints: 130,
            totalCoins: 560,
            totalPowerPoints: 310,
        },
        {
            level: 7,
            coins: 480,
            powerPoints: 210,
            totalCoins: 1040,
            totalPowerPoints: 520,
        },
        {
            level: 8,
            coins: 800,
            powerPoints: 340,
            totalCoins: 1840,
            totalPowerPoints: 860,
        },
        {
            level: 9,
            coins: 1250,
            powerPoints: 550,
            totalCoins: 3090,
            totalPowerPoints: 1410,
        },
        {
            level: 10,
            coins: 1875,
            powerPoints: 890,
            totalCoins: 4965,
            totalPowerPoints: 2300,
        },
        {
            level: 11,
            coins: 2800,
            powerPoints: 1440,
            totalCoins: 7765,
            totalPowerPoints: 3740,
        },
    ],
};
exports.UpgradeTable = UpgradeTable;
const BrawlerRarityTable = {
    Common: 0,
    SuperRare: 400,
};
exports.BrawlerRarityTable = BrawlerRarityTable;
const StarrDropChancesTable = [
    {
        id: 1,
        name: "StarrDrop",
        rarity: "Rare",
        chanceToDrop: 0.5,
        rewards: [
            {
                type: "Coins",
                chance: 0.419,
                resource: {
                    name: "Coins",
                    amount: 50,
                },
            },
            {
                type: "PowerPoints",
                chance: 0.326,
                resource: {
                    name: "PowerPoints",
                    amount: 25,
                },
            },
            {
                type: "XP Doubler",
                chance: 0.209,
                resource: {
                    name: "XP Doubler",
                    amount: 1,
                },
            },
            {
                type: "Blings",
                chance: 0.023,
                resource: {
                    name: "Bling",
                    amount: 20,
                },
            },
            {
                type: "Credit",
                chance: 0.023,
                resource: {
                    name: "Credit",
                    amount: 10,
                },
            },
        ],
    },
    {
        id: 2,
        name: "StarrDrop",
        rarity: "SuperRare",
        chanceToDrop: 0.28,
        rewards: [
            {
                type: "Coins",
                chance: 0.4238,
                resource: {
                    name: "Coins",
                    amount: 100,
                },
            },
            {
                type: "PowerPoints",
                chance: 0.3311,
                resource: {
                    name: "PowerPoints",
                    amount: 50,
                },
            },
            {
                type: "XP Doubler",
                chance: 0.1325,
                resource: {
                    name: "XP Doubler",
                    amount: 200,
                },
            },
            {
                type: "Blings",
                chance: 0.0331,
                resource: {
                    name: "Bling",
                    amount: 50,
                },
            },
            {
                type: "Credit",
                chance: 0.0331,
                resource: {
                    name: "Credit",
                    amount: 30,
                },
            },
            {
                type: "Pins",
                chance: 0.0331,
                resource: {
                    name: "Pin",
                    amount: 1,
                },
            },
            {
                type: "Spray",
                chance: 0.0331,
                resource: {
                    name: "Spray",
                    amount: 1,
                },
            },
        ],
    },
    {
        id: 3,
        name: "StarrDrop",
        rarity: "Epic",
        chanceToDrop: 0.15,
        rewards: [
            {
                type: "Coins",
                chance: 0.2105,
                resource: {
                    name: "Coins",
                    amount: 200,
                },
            },
            {
                type: "PowerPoints",
                chance: 0.2105,
                resource: {
                    name: "PowerPoints",
                    amount: 100,
                },
            },
            {
                type: "Pins",
                chance: 0.1579,
                resource: {
                    name: "Pin",
                    amount: 1,
                },
            },
            {
                type: "Spray",
                chance: 0.1579,
                resource: {
                    name: "Spray",
                    amount: 1,
                },
            },
            {
                type: "XP Doubler",
                chance: 0.1053,
                resource: {
                    name: "XP Doubler",
                    amount: 500,
                },
            },
            {
                type: "Brawler",
                chance: 0.526,
                resource: {
                    name: "Brawler",
                    rarity: "Rare",
                    amount: 1,
                },
            },
        ],
    },
    {
        id: 4,
        name: "StarrDrop",
        rarity: "Mythic",
        chanceToDrop: 0.05,
        rewards: [
            {
                type: "PowerPoints",
                chance: 0.1899,
                resource: {
                    name: "PowerPoints",
                    amount: 200,
                },
            },
            {
                type: "Gadgets",
                chance: 0.1582,
                resource: {
                    name: "Gadget",
                    amount: 1,
                },
            },
            {
                type: "Skin",
                chance: 0.1582,
                resource: {
                    name: "Skin",
                    rarity: "Rare",
                    amount: 1,
                },
            },
            {
                type: "Coins",
                chance: 0.0949,
                resource: {
                    name: "Coins",
                    amount: 500,
                },
            },
            {
                type: "Brawler",
                chance: 0.0949,
                resource: {
                    name: "Brawler",
                    rarity: "SuperRare",
                    amount: 1,
                },
            },
            {
                type: "Brawler",
                chance: 0.0633,
                resource: {
                    name: "Brawler",
                    rarity: "Epic",
                    amount: 1,
                },
            },
            {
                type: "ProfileIcon",
                chance: 0.0633,
                resource: {
                    name: "ProfileIcon",
                    amount: 1,
                },
            },
            {
                type: "Pin",
                chance: 0.0633,
                resource: {
                    name: "Pin",
                    amount: 1,
                },
            },
            {
                type: "Spray",
                chance: 0.0633,
                resource: {
                    name: "Spray",
                    amount: 1,
                },
            },
            {
                type: "Pin",
                chance: 0.0316,
                resource: {
                    name: "Pin",
                    amount: 1,
                },
            },
            {
                type: "Brawler",
                chance: 0.019,
                resource: {
                    name: "Brawler",
                    rarity: "Mythic",
                    amount: 1,
                },
            },
        ],
    },
    {
        id: 5,
        name: "StarrDrop",
        rarity: "Legendary",
        chanceToDrop: 0.02,
        rewards: [
            {
                type: "Skin",
                chance: 0.3587,
                resource: {
                    name: "Skin",
                    rarity: "SuperRare",
                    amount: 1,
                },
            },
            {
                type: "StarPower",
                chance: 0.2717,
                resource: {
                    name: "StarPower",
                    amount: 1,
                },
            },
            {
                type: "Hypercharge",
                chance: 0.163,
                resource: {
                    name: "Hypercharge",
                    amount: 1,
                },
            },
            {
                type: "Brawler",
                chance: 0.1087,
                resource: {
                    name: "Brawler",
                    rarity: "Epic",
                    amount: 1,
                },
            },
            {
                type: "Brawler",
                chance: 0.0543,
                resource: {
                    name: "Brawler",
                    rarity: "Mythic",
                    amount: 1,
                },
            },
            {
                type: "Skin",
                chance: 0.0217,
                resource: {
                    name: "Skin",
                    rarity: "Epic",
                    amount: 1,
                },
            },
            {
                type: "Brawler",
                chance: 0.0217,
                resource: {
                    name: "Brawler",
                    rarity: "Legendary",
                    amount: 1,
                },
            },
        ],
    },
];
const BrawlPassFreeRewardsTable = {
    id: 1,
    name: "BrawlPass",
    resources: [
        {
            name: "Coins",
            amount: 8000,
        },
        {
            name: "PowerPoints",
            amount: 2500,
        },
        {
            name: "Credit",
            amount: 1000,
        },
        {
            name: "Gem",
            amount: 50,
        },
        {
            name: "StarrDrop",
            amount: 29,
            rarity: "Rare",
        },
        {
            name: "StarrDrop",
            amount: 1,
            rarity: "Legendary",
        },
    ],
};
exports.BrawlPassFreeRewardsTable = BrawlPassFreeRewardsTable;
const BrawlPassPremiumRewardsTable = {
    id: 2,
    name: "BrawlPass",
    resources: [
        {
            name: "Credit",
            amount: 1000,
        },
        {
            name: "Gem",
            amount: 50,
        },
        {
            name: "PowerPoints",
            amount: 2000,
        },
        {
            name: "Coins",
            amount: 8000,
        },
        {
            name: "Bling",
            amount: 2200,
        },
    ],
};
exports.BrawlPassPremiumRewardsTable = BrawlPassPremiumRewardsTable;
const BrawlPassPlusRewardsTable = {
    id: 3,
    name: "BrawlPassPlus",
    resources: [
        { name: "Coins", amount: 3000 },
        {
            name: "PowerPoints",
            amount: 1500,
        },
        {
            name: "Bling",
            amount: 3700,
        },
        {
            name: "Gem",
            amount: 50,
        },
    ],
};
exports.BrawlPassPlusRewardsTable = BrawlPassPlusRewardsTable;
