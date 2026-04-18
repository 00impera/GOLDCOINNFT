<div align="center">

# ◈ GoldCoins NFT

### *82 Legendary Gold Coins. One Chain. Infinite Lore.*

[![Monad Mainnet](https://img.shields.io/badge/Chain-Monad%20Mainnet-7c3aed?style=for-the-badge&logo=ethereum&logoColor=white)](https://explorer.monad.xyz)
[![Chain ID](https://img.shields.io/badge/Chain%20ID-143-ffd700?style=for-the-badge)](https://rpc.monad.xyz)
[![ERC-721](https://img.shields.io/badge/Standard-ERC--721-00ffaa?style=for-the-badge)](https://explorer.monad.xyz/address/0x588273B8bC50E5A16E6286D4e63EBa7C3E69e948)
[![License](https://img.shields.io/badge/License-MIT-ff4500?style=for-the-badge)](LICENSE)

<br/>

```
  ██████╗  ██████╗ ██╗     ██████╗  ██████╗ ██████╗ ██╗███╗   ██╗███████╗
 ██╔════╝ ██╔═══██╗██║     ██╔══██╗██╔════╝██╔═══██╗██║████╗  ██║██╔════╝
 ██║  ███╗██║   ██║██║     ██║  ██║██║     ██║   ██║██║██╔██╗ ██║███████╗
 ██║   ██║██║   ██║██║     ██║  ██║██║     ██║   ██║██║██║╚██╗██║╚════██║
 ╚██████╔╝╚██████╔╝███████╗██████╔╝╚██████╗╚██████╔╝██║██║ ╚████║███████║
  ╚═════╝  ╚═════╝ ╚══════╝╚═════╝  ╚═════╝ ╚═════╝ ╚═╝╚═╝  ╚═══╝╚══════╝
                              N  F  T
```

<br/>

**82 unique ERC-721 NFTs · Monad Mainnet · Live Oracle Pricing · On-Chain Stats**

[🌐 Launch dApp](https://fragrant-bush-115e.nelutz2you.workers.dev/) · [📜 Contract](https://explorer.monad.xyz/address/0x588273B8bC50E5A16E6286D4e63EBa7C3E69e948) · [🐦 Twitter](https://x.com/bnbgold277983) · [💬 Telegram](https://t.me/gemsrock_bot) · [🎮 Discord](https://discord.com/channels/1316093079090106472)

</div>

---

## 📖 Overview

**GoldCoins NFT** is a collection of **82 unique ERC-721 tokens** deployed on **Monad Mainnet** (Chain ID 143). Each NFT represents a legendary gold coin drawn from mythology, history, and the cosmos — forged with on-chain combat stats, lore, and live USD pricing via oracle.

> *From AureusPrime to ObscuraSunNexus — every coin tells a story written forever on-chain.*

### ✨ Key Features

| Feature | Details |
|---|---|
| 🪙 **Collection** | 82 unique NFTs (IDs 0–81, excluding 46, 47, 49) |
| ⛓️ **Blockchain** | Monad Mainnet · Chain ID 143 |
| 💰 **Base Price** | 1.0 MON (live oracle conversion to USD) |
| 📊 **On-Chain Stats** | Attack · Defense · Speed · Power · Rarity |
| 🖼️ **Storage** | IPFS via Pinata (~155 MB, 82 PNGs) |
| 🔮 **Oracle** | Live MON/USD feed · Chainlink-standard |
| 🎮 **Staking** | Stake NFTs to earn MOTO token rewards |
| 🔥 **Burn** | Burn NFT for immediate MOTO reward |
| 🌐 **Wallets** | MetaMask · WalletConnect · Trust · Coinbase · Rabby · NEAR |

---

## 🏗️ Contract Architecture

### 📋 Contract Details

```
Contract Address:  0x588273B8bC50E5A16E6286D4e63EBa7C3E69e948
Owner / Treasury:  0x592B35c8917eD36c39Ef73D0F5e92B0173560b2e
MOTO Token:        0xf2a14390668e34CD546748c04424960b29050861
RPC Endpoint:      https://rpc.monad.xyz
Explorer:          https://explorer.monad.xyz
IPFS CID:          Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT
```

### 🔧 Contract Functions

<details>
<summary><b>📝 Core NFT Functions</b></summary>

| Function | Access | Description |
|---|---|---|
| `mint(address, tokenId)` | Owner only | Mint a new NFT to a specific address |
| `setBaseURI(string)` | Owner only | Set the IPFS base URI for token metadata |
| `setCoinInfo(tokenId, name, imageURI, multiplier)` | Owner only | Set name and image for each NFT |
| `setStats(tokenId, attack, defense, speed)` | Owner only | Set on-chain combat stats |
| `setLore(tokenId, text)` | Owner only | Set lore/description text |
| `setBasePrice(uint256)` | Owner only | Set the minting price in wei |
| `tokenURI(tokenId)` | Public | Returns `baseURI + tokenId + .png` |

</details>

<details>
<summary><b>📈 Oracle & Pricing</b></summary>

| Function | Description |
|---|---|
| `livePrice(tokenId)` | Get current USD price via oracle |

```
Oracle Address:   0x723d62bef5eeb3f0d2255e5cab6ae763c59ca0e6
Function:         0x50d25bcd (latestAnswer)
Format:           int256 · 8 decimals (Chainlink standard)
RPC:              https://monad-mainnet.drpc.org
```

</details>

<details>
<summary><b>🏆 Staking & Rewards</b></summary>

| Function | Description |
|---|---|
| `stake(tokenId)` | Stake an NFT to earn MOTO rewards |
| `unstake(tokenId)` | Unstake an NFT |
| `claimReward(tokenId)` | Claim accumulated MOTO reward |
| `burnForReward(tokenId)` | Burn NFT for immediate MOTO reward |
| `upgrade(tokenId)` | Upgrade NFT stats |

</details>

### 🖼️ Token URI Structure

```
tokenURI(id) = baseURI + id + ".png"

Example:
  ipfs://Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT/0.png
  ipfs://Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT/81.png
```

---

## 🌐 Frontend dApp

### 🛠️ Tech Stack

```
├── index.html          Single-file app (no build step)
├── ethers.js v5.7.2    Web3 library (CDN)
├── Syne + Space Mono   Google Fonts
├── HTML5 Canvas        Asteroid rain background animation
└── Cloudflare Workers  Hosting
```

### 🎨 Visual Effects

#### 🌠 Asteroid Rain Background
70 animated neon asteroid particles fall continuously across the screen:
- Random polygon shapes (3–8 sides) with neon glow
- Glowing trails · 8 neon colors · 60fps

#### 🔥 Neon Fire on NFT Cards

Each NFT card pulses with neon fire glow assigned by `tokenId % 6`:

| Fire Class | Color Name | Neon Colors | Speed |
|---|---|---|---|
| `fire-0` (ID % 6 = 0) | 🟠 Orange / Red | `#FF4500` → `#FF6A00` | 2.1s |
| `fire-1` (ID % 6 = 1) | 🔵 Cyan / Blue | `#00FFFF` → `#0088FF` | 1.9s |
| `fire-2` (ID % 6 = 2) | 🟣 Magenta / Purple | `#FF00FF` → `#AA00FF` | 2.3s |
| `fire-3` (ID % 6 = 3) | 🟢 Green / Teal | `#00FF88` → `#00FFAA` | 1.8s |
| `fire-4` (ID % 6 = 4) | 🟡 Gold / Yellow | `#FFD700` → `#FFAA00` | 2.5s |
| `fire-5` (ID % 6 = 5) | 🩷 Hot Pink | `#FF1493` → `#FF69B4` | 2.0s |

### 💼 Wallet Support

#### EVM Wallets
| Wallet | Method |
|---|---|
| 🦊 MetaMask | `window.ethereum` injected |
| 🔵 WalletConnect | URI + QR code (Reown v2) |
| 🛡️ Trust Wallet | `window.ethereum.isTrust` / deeplink |
| 🔵 Coinbase Wallet | `window.ethereum.isCoinbaseWallet` / deeplink |
| 🐰 Rabby | `window.ethereum.isRabby` |
| 🌐 Browser Wallet | Generic `window.ethereum` |
| 📝 Manual Address | Read-only via address injection |

```
Reown Project ID: 83764e5a442fd38d9827e3302a37517a
Protocol:         WalletConnect v2
```

#### NEAR Wallets
| Wallet | Method |
|---|---|
| 🌊 MyNearWallet | OAuth popup redirect |
| 📤 Sender | `window.near.isSender` |
| 📍 HERE Wallet | `herewallet://` deeplink |
| ☄️ Meteor Wallet | `window.meteorWallet` |
| 📝 Manual Input | Direct `yourname.near` entry |

### 🌐 Network Configuration

```javascript
{
  chainName:    "Monad Mainnet",
  chainId:      "0x8F",           // 143 decimal
  rpcUrls:      ["https://rpc.monad.xyz"],
  explorer:     "https://explorer.monad.xyz",
  nativeCurrency: { name: "MON", symbol: "MON", decimals: 18 }
}
```

---

## 🪙 NFT Collection

### Rarity Tiers

```
◆ Mythic      ████░░░░░░  Rarest
◆ Legendary   ██████░░░░
◆ Epic        ████████░░
◆ Rare        ████████░░
◆ Uncommon    ██████████
◆ Common      ██████████  Most Common
```

### First 20 NFTs

| ID | Name | Fire Class | IPFS |
|---|---|---|---|
| 0 | AureusPrime | fire-0 🟠 | [view](https://ipfs.io/ipfs/Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT/0.png) |
| 1 | SolarisCrown | fire-1 🔵 | [view](https://ipfs.io/ipfs/Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT/1.png) |
| 2 | ImperialDragonGold | fire-2 🟣 | [view](https://ipfs.io/ipfs/Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT/2.png) |
| 3 | CelestialPhoenix | fire-3 🟢 | [view](https://ipfs.io/ipfs/Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT/3.png) |
| 4 | TitaniumSunDisc | fire-4 🟡 | [view](https://ipfs.io/ipfs/Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT/4.png) |
| 5 | EternalMonarchSeal | fire-5 🩷 | [view](https://ipfs.io/ipfs/Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT/5.png) |
| 6 | NebulaGoldCore | fire-0 🟠 | [view](https://ipfs.io/ipfs/Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT/6.png) |
| 7 | RoyalGriffinMedallion | fire-1 🔵 | [view](https://ipfs.io/ipfs/Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT/7.png) |
| 8 | ObsidianGoldRelic | fire-2 🟣 | [view](https://ipfs.io/ipfs/Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT/8.png) |
| 9 | AstralEmperor | fire-3 🟢 | [view](https://ipfs.io/ipfs/Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT/9.png) |
| 10 | LionheartSovereign | fire-4 🟡 | [view](https://ipfs.io/ipfs/Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT/10.png) |
| 11 | GoldenSerpentCrest | fire-5 🩷 | [view](https://ipfs.io/ipfs/Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT/11.png) |
| 12 | StormforgeHalo | fire-0 🟠 | [view](https://ipfs.io/ipfs/Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT/12.png) |
| 13 | OracleSunstone | fire-1 🔵 | [view](https://ipfs.io/ipfs/Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT/13.png) |
| 14 | EclipseCrown | fire-2 🟣 | [view](https://ipfs.io/ipfs/Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT/14.png) |
| 15 | LeviathanScale | fire-3 🟢 | [view](https://ipfs.io/ipfs/Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT/15.png) |
| 16 | ArchonSigil | fire-4 🟡 | [view](https://ipfs.io/ipfs/Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT/16.png) |
| 17 | PrimevalSunRelic | fire-5 🩷 | [view](https://ipfs.io/ipfs/Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT/17.png) |
| 18 | AuroraKingsCrest | fire-0 🟠 | [view](https://ipfs.io/ipfs/Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT/18.png) |
| 19 | InfinityGoldNexus | fire-1 🔵 | [view](https://ipfs.io/ipfs/Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT/19.png) |
| … | *62 more up to ID 81 (ObscuraSunNexus)* | | |

> 📋 See the full `NFTS` array in `index.html` for all 82 coins.

---

## 📦 IPFS Storage

```
Provider:    Pinata (pinata.cloud)
Folder CID:  Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT
Files:       82 PNG images
Pin Name:    GoldCoinsNFT-Images
Pin Size:    ~155 MB
Upload Date: April 10, 2026
```

### 🌐 IPFS Gateways (tried in order)

```
1. https://ipfs.io/ipfs/
2. https://dweb.link/ipfs/
3. https://w3s.link/ipfs/
4. https://nftstorage.link/ipfs/
5. https://gateway.pinata.cloud/ipfs/
6. https://4everland.io/ipfs/
```

### Image Naming Convention

```bash
# Renamed from descriptive → numeric format required by contract
# Before: 0_AureusPrime.png, 1_SolarisCrown.png ...
# After:  0.png, 1.png, 2.png ... 81.png

i=0; for f in $(ls -1 *.png | sort -V); do mv "$f" "$i.png"; i=$((i+1)); done
```

---

## 🚀 Deployment

### Update Base URI

```bash
cd ~/goldcoins
node setBaseURI.js
# Sets: ipfs://Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT/
```

### Upload Images to IPFS

```bash
cd ~/goldcoins
python3 upload_folder.py
# Uploads entire images-upload/ folder as one IPFS directory pin
```

### Deploy to Cloudflare Pages

```bash
cd ~/winnowin/goldcoins-app
npm run build

# Push dist/ to GitHub
git add -A
git commit -m "Deploy update"
git push origin main
# Cloudflare auto-deploys from GitHub
```

---

## 🔗 Links & Socials

<div align="center">

| Platform | Link |
|---|---|
| 🌐 **dApp** | [fragrant-bush-115e.nelutz2you.workers.dev](https://fragrant-bush-115e.nelutz2you.workers.dev/) |
| 📜 **Contract** | [explorer.monad.xyz/address/0x5882...](https://explorer.monad.xyz/address/0x588273B8bC50E5A16E6286D4e63EBa7C3E69e948) |
| 🪙 **MOTO Token** | [explorer.monad.xyz/address/0xf2a1...](https://explorer.monad.xyz/address/0xf2a14390668e34CD546748c04424960b29050861) |
| 🤖 **Telegram Bot** | [@gemsrock_bot](https://t.me/gemsrock_bot) |
| 🎮 **Mini App** | [GemsRock](https://t.me/gemsrock_bot/RockGems) |
| 🐦 **Twitter / X** | [@bnbgold277983](https://x.com/bnbgold277983) |
| 💬 **Discord** | [Join Server](https://discord.com/channels/1316093079090106472) |
| 🖼️ **OpenSea** | [SUPERRARECOINS](https://opensea.io/SUPERRARECOINS) |
| 🌉 **Rainbow Bridge** | [NEAR ↔ EVM](https://rainbowbridge.app/transfer) |

</div>

---

## 📄 License

MIT License — © 2026 GoldCoins NFT · Built on Monad · Reown AppKit v2

---

<div align="center">

```
◈ goldcoins.monad · SUPERRARECOINS · Chain 143
```

*Forged in fire. Written on-chain. Eternal.*

</div>
