◈ GoldCoins NFT
Complete Project Documentation
Monad Mainnet · Chain 143 · 82 Unique NFTs

1. Project Overview
GoldCoins NFT is a collection of 82 unique ERC-721 non-fungible tokens deployed on Monad Mainnet (Chain ID 143). Each NFT represents a unique gold coin from various mythologies and historical periods, with on-chain attributes including attack, defense, speed, power stats, rarity, lore, and live USD pricing via oracle.

Collection Name	GoldCoins NFT
Token Standard	ERC-721
Blockchain	Monad Mainnet
Chain ID	143
Total Supply	82 NFTs (IDs 0–81, excluding 46, 47, 49)
Contract Address	0x588273B8bC50E5A16E6286D4e63EBa7C3E69e948
Owner / Treasury	0x592B35c8917eD36c39Ef73D0F5e92B0173560b2e
MOTO Token	0xf2a14390668e34CD546748c04424960b29050861
RPC Endpoint	https://rpc.monad.xyz
Explorer	https://explorer.monad.xyz
Base Price	1.0 MON (live oracle conversion)
IPFS CID	Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT

2. Smart Contract
2.1 Contract Functions
The GoldCoinsNft contract extends ERC-721 with additional on-chain features:

mint(address, tokenId)	Mint a new NFT to a specific address (owner only)
setBaseURI(string)	Set the IPFS base URI for token metadata
setCoinInfo(tokenId, name, imageURI, multiplier)	Set name and image for each NFT
setStats(tokenId, attack, defense, speed)	Set on-chain combat stats
setLore(tokenId, text)	Set lore/description text for each coin
setBasePrice(uint256)	Set the base minting price in wei
livePrice(tokenId)	Get current USD price via oracle for a token
stake(tokenId)	Stake an NFT to earn MOTO rewards
unstake(tokenId)	Unstake an NFT
claimReward(tokenId)	Claim accumulated MOTO reward
burnForReward(tokenId)	Burn NFT for immediate MOTO reward
upgrade(tokenId)	Upgrade NFT stats
tokenURI(tokenId)	Returns: baseURI + tokenId + .png

2.2 Token URI Structure
The contract constructs the image URL as:
tokenURI(id) = baseURI + id + ".png"
Example: ipfs://Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT/0.png
Files must be named exactly 0.png, 1.png ... 81.png in the IPFS folder.

2.3 Oracle Integration
Live MON/USD price is fetched from:
Oracle Address	0x723d62bef5eeb3f0d2255e5cab6ae763c59ca0e6
Function Selector	0x50d25bcd (latestAnswer)
Format	int256 with 8 decimals (Chainlink standard)
RPC Used	https://monad-mainnet.drpc.org

3. IPFS Image Storage
3.1 Pinata Upload
All 82 images are stored on IPFS via Pinata with the following configuration:

Storage Provider	Pinata (pinata.cloud)
Folder CID	Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT
Number of Files	82 PNG images
Pin Name	GoldCoinsNFT-Images
Pin Size	~155 MB
Upload Date	April 10, 2026

3.2 Image Naming Convention
Images were renamed from descriptive names to numeric format required by the contract:
Before rename	0_AureusPrime.png, 1_SolarisCrown.png ...
After rename	0.png, 1.png, 2.png ... 81.png
Rename method	WSL bash script (sort -V for correct numeric order)
Rename command	i=0; for f in $(ls -1 *.png | sort -V); do mv "$f" "$i.png"; i=$((i+1)); done

3.3 IPFS Gateways
The frontend tries multiple gateways in order for reliability:
https://ipfs.io/ipfs/
https://dweb.link/ipfs/
https://w3s.link/ipfs/
https://nftstorage.link/ipfs/
https://gateway.pinata.cloud/ipfs/
https://4everland.io/ipfs/

3.4 NFT List (First 20 of 82)
ID	Name	Fire Class	IPFS Image
0	AureusPrime	fire-0	ipfs://Qma9ay.../0.png
1	SolarisCrown	fire-1	ipfs://Qma9ay.../1.png
2	ImperialDragonGold	fire-2	ipfs://Qma9ay.../2.png
3	CelestialPhoenix	fire-3	ipfs://Qma9ay.../3.png
4	TitaniumSunDisc	fire-4	ipfs://Qma9ay.../4.png
5	EternalMonarchSeal	fire-5	ipfs://Qma9ay.../5.png
6	NebulaGoldCore	fire-0	ipfs://Qma9ay.../6.png
7	RoyalGriffinMedallion	fire-1	ipfs://Qma9ay.../7.png
8	ObsidianGoldRelic	fire-2	ipfs://Qma9ay.../8.png
9	AstralEmperor	fire-3	ipfs://Qma9ay.../9.png
10	LionheartSovereign	fire-4	ipfs://Qma9ay.../10.png
11	GoldenSerpentCrest	fire-5	ipfs://Qma9ay.../11.png
12	StormforgeHalo	fire-0	ipfs://Qma9ay.../12.png
13	OracleSunstone	fire-1	ipfs://Qma9ay.../13.png
14	EclipseCrown	fire-2	ipfs://Qma9ay.../14.png
15	LeviathanScale	fire-3	ipfs://Qma9ay.../15.png
16	ArchonSigil	fire-4	ipfs://Qma9ay.../16.png
17	PrimevalSunRelic	fire-5	ipfs://Qma9ay.../17.png
18	AuroraKingsCrest	fire-0	ipfs://Qma9ay.../18.png
19	InfinityGoldNexus	fire-1	ipfs://Qma9ay.../19.png
... and 62 more NFTs up to ID 81 (ObscuraSunNexus). See NFTS array in index.html for complete list.

4. Frontend Application
4.1 Technology Stack
File	Single-file index.html (no build step required)
Web3 Library	ethers.js v5.7.2 (CDN)
Fonts	Syne (headings) + Space Mono (monospace) via Google Fonts
Hosting	Cloudflare Workers (fragrant-bush-115e.nelutz2you.workers.dev)
Wallet Support	MetaMask, WalletConnect, Trust, Coinbase, Rabby, Browser Wallet
NEAR Support	MyNearWallet, Sender, HERE, Meteor (+ manual input)

4.2 Key Features
On-chain data loading — reads ownerOf, stats, lore, rarity, power, livePrice, coins per NFT
Live oracle price — MON/USD fetched via eth_call every session
Multi-gateway IPFS image loading with automatic fallback
NFT grid with filter by rarity (Common/Uncommon/Rare/Epic/Legendary/Mythic)
Search by name or token ID
NFT detail modal with full stats, lore, owner, and buy button
Buy flow — sends MON to owner address, manual transfer within 24h
Staking status display — staked NFTs shown as unavailable
NEAR wallet integration for cross-chain identity
Connect / Disconnect button with wallet state management
Auto-reconnect on page load if wallet was previously connected

4.3 Visual Effects
Asteroid Rain Background
70 animated asteroid particles fall continuously across the screen background using HTML5 Canvas:
Random polygon shapes (3–8 sides) with neon glow (shadowBlur)
Glowing trails behind each asteroid
8 neon colors: purple, teal, gold, red, blue, pink, green, lavender
Runs at 60fps via requestAnimationFrame
Fully responsive — resizes with window

Neon Fire on NFT Cards
Each NFT card has a continuously pulsing neon fire glow assigned by token ID modulo 6:

Fire Class	Color Name	Neon Colors	Pulse Speed
fire-0 (ID % 6 = 0)	Orange / Red	#FF4500 → #FF6A00	2.1s
fire-1 (ID % 6 = 1)	Cyan / Blue	#00FFFF → #0088FF	1.9s
fire-2 (ID % 6 = 2)	Magenta / Purple	#FF00FF → #AA00FF	2.3s
fire-3 (ID % 6 = 3)	Green / Teal	#00FF88 → #00FFAA	1.8s
fire-4 (ID % 6 = 4)	Gold / Yellow	#FFD700 → #FFAA00	2.5s
fire-5 (ID % 6 = 5)	Hot Pink	#FF1493 → #FF69B4	2.0s

Additional Animations
Cards vibrate on mobile touch (touchstart event, 0.4s vibrate keyframe)
Cards lift and scale on hover with purple glow
Buy button shimmers and vibrates on card hover
Close buttons (X) rotate 90° on hover
Filter buttons scale up on hover with purple accent
All footer links lift and scale on hover

5. Wallet Integration
5.1 EVM Wallets (Reown / WalletConnect)
Reown Project ID	83764e5a442fd38d9827e3302a37517a
Protocol	WalletConnect v2
MetaMask	Injected window.ethereum
Trust Wallet	window.ethereum.isTrust / deeplink fallback
Coinbase Wallet	window.ethereum.isCoinbaseWallet / deeplink fallback
Rabby	window.ethereum.isRabby
Browser Wallet	Generic window.ethereum
WalletConnect	URI generation with QR display
Manual Address	Read-only mode via address injection

5.2 NEAR Wallets
MyNearWallet	OAuth popup redirect, account_id from URL param
Sender Wallet	window.near.isSender injection
HERE Wallet	herewallet:// deeplink + fallback URL
Meteor Wallet	window.meteorWallet injection
Manual Input	Direct account ID entry (yourname.near format)
Persistence	localStorage key: near_account_id

5.3 Network Configuration
Network Name	Monad Mainnet
Chain ID (hex)	0x8F
Chain ID (decimal)	143
RPC URL	https://rpc.monad.xyz
Block Explorer	https://explorer.monad.xyz
Currency	MON (18 decimals)
Auto-switch	wallet_switchEthereumChain → wallet_addEthereumChain if not found

6. Social Links & Platforms
Telegram Bot	https://t.me/gemsrock_bot (@gemsrock_bot)
Telegram Mini App	https://t.me/gemsrock_bot/RockGems (GemsRock)
Twitter / X	https://x.com/bnbgold277983 (@bnbgold277983)
Discord Server	https://discord.com/channels/1316093079090106472
Website / dApp	https://fragrant-bush-115e.nelutz2you.workers.dev/
OpenSea Collection	https://opensea.io/SUPERRARECOINS
Monad Contract	https://explorer.monad.xyz/address/0x588273B8bC50E5A16E6286D4e63EBa7C3E69e948
MOTO Token	https://explorer.monad.xyz/address/0xf2a14390668e34CD546748c04424960b29050861
Rainbow Bridge	https://rainbowbridge.app/transfer (NEAR ↔ EVM)

7. Deployment Notes
7.1 Image Upload Process
Step-by-step process used to upload images to IPFS:
Original files: 0_AureusPrime.png ... 81_ObscuraSunNexus.png (in C:\Users\nelut\Desktop\foto contract)
Renamed via WSL: cd /mnt/c/Users/nelut/Desktop/foto\ contract
Rename command: i=0; for f in $(ls -1 *.png | sort -V); do mv "$f" "$i.png"; i=$((i+1)); done
Copied to WSL home: cp *.png ~/goldcoins/images-upload/
Uploaded via Python script using Pinata API (pinata_secret_api_key header)
Final folder upload returned CID: Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT

7.2 setBaseURI Command
To update the base URI in the contract, run from ~/goldcoins:
node setBaseURI.js
The script uses ethers.js v5 with the contract ABI function:
setBaseURI("ipfs://Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT/")

7.3 Pinata Upload Script
Located at ~/goldcoins/upload_folder.py — uploads entire images-upload/ folder as one IPFS directory pin.
python3 upload_folder.py

© 2026 GoldCoins NFT · Built on Monad · Reown AppKit v2
◈ goldcoins.monad · SUPERRARECOINS
