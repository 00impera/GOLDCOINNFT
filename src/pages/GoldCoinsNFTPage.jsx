import { useState, useEffect, useCallback, useRef } from "react";
import {
  ThirdwebProvider,
  ConnectButton,
  useActiveAccount,
  useActiveWalletChain,
  BuyWidget,
} from "thirdweb/react";
import {
  createThirdwebClient,
  defineChain,
} from "thirdweb";
import {
  JsonRpcProvider,
  BrowserProvider,
  Contract,
  formatEther,
  parseEther,
} from "ethers";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const CLIENT_ID   = "821819db832d1a313ae3b1a62fbeafb7";
const CONTRACT    = "0x588273B8bC50E5A16E6286D4e63EBa7C3E69e948";
const ORACLE_ADDR = "0x723d62bef5eeb3f0d2255e5cab6ae763c59ca0e6";
const OWNER_ADDR  = "0x592B35c8917eD36c39Ef73D0F5e92B0173560b2e";
const MONAD_ID    = 143;
const ALCHEMY_RPC = "https://monad-mainnet.g.alchemy.com/v2/Uwb7T0DbXMQHjiJBNf9_b005qYjLmJqk";
const DRPC_RPC    = "https://monad-mainnet.drpc.org";
const PUBLIC_RPC  = "https://rpc.monad.xyz";
const BASE_CID    = "Qma9ayc43qUbrfAaZFYhD47Dgi5ZwVjFw94gG7RvWQUJhT";
const NEAR_JWT    = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjIwMjUtMDEtMTItdjEifQ.eyJ2IjoxLCJrZXlfdHlwZSI6ImRpc3RyaWJ1dGlvbl9jaGFubmVsIiwicGFydG5lcl9pZCI6ImNyeXB0b2Nhc2gtbmZ0IiwiaWF0IjoxNzczMDc3MzExLCJleHAiOjE4MDQ2MTMzMTF9.Wi55S8cwVmAXPtOG0ymr7ldX-5CXVygzuanbjAAJHP-Am14_52C6i4cQG5FvjcAorw0KD8k8JD_YX5AM4QKhNqYtU5gsI4-KKe0KavO5_69NowzUKc_ubtjYn85eFjWskzZQvICMqSZkdGOSnMT_hNEePA8qYi_wSov4a4bQh4zIfNA0znEdDIV3rGI_bDM9dgOk0PnJRIpwi_aXOQ8Q4e50IO2UMrZEDtBVmUhK5-Mno3S_iS7tZl4QSui_4_bNCapQolFwUPB9Zqyxay_6rPVEr7j-8Ez5-htwkR5ZYvTb1mJaj3DVPpWPL9QTxhjvhbJ7nKrWpibcWX3AVoXZ6g";
const GATEWAYS = [
  "https://ipfs.io/ipfs/",
  "https://dweb.link/ipfs/",
  "https://w3s.link/ipfs/",
  "https://nftstorage.link/ipfs/",
  "https://gateway.pinata.cloud/ipfs/",
  "https://4everland.io/ipfs/",
];
const RARITY         = ["Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythic"];
const MAX_CONCURRENT = 3;
const BATCH_DELAY    = 400;

const client = createThirdwebClient({ clientId: CLIENT_ID });
const MONAD_CHAIN = defineChain({
  id: MONAD_ID,
  name: "Monad Mainnet",
  nativeCurrency: { name: "MON", symbol: "MON", decimals: 18 },
  rpc: ALCHEMY_RPC,
  blockExplorers: [{ name: "Monad Explorer", url: "https://explorer.monad.xyz" }],
});

const ETHERS_ABI = [
  "function ownerOf(uint256) view returns (address)",
  "function stats(uint256) view returns (uint256 attack,uint256 defense,uint256 speed)",
  "function lore(uint256) view returns (string)",
  "function livePrice(uint256) view returns (uint256)",
  "function staked(uint256) view returns (bool)",
  "function basePrice() view returns (uint256)",
  "function rarity(uint256) view returns (uint256)",
  "function power(uint256) view returns (uint256)",
  "function coins(uint256) view returns (string name,string imageURI,uint256 multiplier)",
];

const NFT_LIST = [
  {id:0,name:"AureusPrime"},{id:1,name:"SolarisCrown"},{id:2,name:"ImperialDragonGold"},
  {id:3,name:"CelestialPhoenix"},{id:4,name:"TitaniumSunDisc"},{id:5,name:"EternalMonarchSeal"},
  {id:6,name:"NebulaGoldCore"},{id:7,name:"RoyalGriffinMedallion"},{id:8,name:"ObsidianGoldRelic"},
  {id:9,name:"AstralEmperor"},{id:10,name:"LionheartSovereign"},{id:11,name:"GoldenSerpentCrest"},
  {id:12,name:"StormforgeHalo"},{id:13,name:"OracleSunstone"},{id:14,name:"EclipseCrown"},
  {id:15,name:"LeviathanScale"},{id:16,name:"ArchonSigil"},{id:17,name:"PrimevalSunRelic"},
  {id:18,name:"AuroraKingsCrest"},{id:19,name:"InfinityGoldNexus"},{id:20,name:"AnubisSolarMark"},
  {id:21,name:"HorusGoldenEye"},{id:22,name:"IsisMoonCrest"},{id:23,name:"RaSunForge"},
  {id:24,name:"SekhmetLionEmblem"},{id:25,name:"ThothWisdomSeal"},{id:26,name:"OsirisEternalCrown"},
  {id:27,name:"BastetNightGold"},{id:28,name:"SobekRiverCoin"},{id:29,name:"AmunPrimeDisc"},
  {id:30,name:"JupiterImperium"},{id:31,name:"MarsWarCrest"},{id:32,name:"VenusGoldenBloom"},
  {id:33,name:"NeptuneDeepSeal"},{id:34,name:"PlutoShadowMark"},{id:35,name:"MercuryWingedCoin"},
  {id:36,name:"MinervaWisdomHalo"},{id:37,name:"ApolloSunStrike"},{id:38,name:"DianaMoonSigil"},
  {id:39,name:"JunoRoyalEmblem"},{id:40,name:"ZeusThunderCrown"},{id:41,name:"HeraGoldenThrone"},
  {id:42,name:"PoseidonSeaCore"},{id:43,name:"AthenaWarSigil"},{id:44,name:"AresIronSun"},
  {id:45,name:"HephaestusForgeCoin"},{id:48,name:"HadesUnderworldGold"},
  {id:50,name:"DacianWolfGold"},{id:51,name:"ZalmoxisSacredSeal"},{id:52,name:"DecebalusIronCrown"},
  {id:53,name:"DracoDacorum"},{id:54,name:"CarpatiSunRelic"},{id:55,name:"TransylvanianMoonMark"},
  {id:56,name:"GetaeGoldenSpirit"},{id:57,name:"DanubianSunCore"},{id:58,name:"RomanianEagleCrest"},
  {id:59,name:"ValhallaStormCoin"},{id:60,name:"OdinAllfatherMark"},{id:61,name:"ThorThunderSigil"},
  {id:62,name:"FreyaGoldenBloom"},{id:63,name:"LokiShadowCrest"},{id:64,name:"TyrWarEmblem"},
  {id:65,name:"HeimdallLightHalo"},{id:66,name:"FenrirIronFang"},{id:67,name:"JormungandrSeaRing"},
  {id:68,name:"KrakenDeepGold"},{id:69,name:"LeviathanAbyssCore"},{id:70,name:"PirateKingsGold"},
  {id:71,name:"BlackSailCrown"},{id:72,name:"SeaReaverMedallion"},{id:73,name:"StormCorsairCoin"},
  {id:74,name:"GhostCaptainMark"},{id:75,name:"RogueMarinerSeal"},{id:76,name:"SkullHarborGold"},
  {id:77,name:"AncientCorsairRelic"},{id:78,name:"ForbiddenTreasureCore"},{id:79,name:"ShadowNavigatorCoin"},
  {id:80,name:"EternalVoyagerMark"},{id:81,name:"ObscuraSunNexus"},
];

// ─── NEAR INTENTS API ─────────────────────────────────────────────────────────
async function getNearIntentsTokens() {
  try {
    const res = await fetch("https://1click.chaindefuser.com/v0/tokens", {
      headers: { Authorization: "Bearer " + NEAR_JWT },
    });
    return res.json();
  } catch { return []; }
}

async function getNearIntentsQuote({ originAsset, destinationAsset, amount, recipient }) {
  const deadline = new Date(Date.now() + 10 * 60 * 1000).toISOString();
  const res = await fetch("https://1click.chaindefuser.com/v0/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + NEAR_JWT },
    body: JSON.stringify({
      dry: false, swapType: "EXACT_INPUT", slippageTolerance: 100,
      originAsset, depositType: "ORIGIN_CHAIN", destinationAsset, amount,
      recipient, recipientType: "DESTINATION_CHAIN",
      refundTo: recipient, refundType: "ORIGIN_CHAIN", deadline,
    }),
  });
  return res.json();
}

// ─── UTILS ────────────────────────────────────────────────────────────────────
async function pingRPC(url) {
  try {
    const r = await fetch(url, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_blockNumber", params: [] }),
      signal: AbortSignal.timeout(4000),
    }).then(x => x.json());
    return !!r.result;
  } catch { return false; }
}

async function getBestRPC() {
  const custom = typeof localStorage !== "undefined" ? localStorage.getItem("custom_rpc") : null;
  const list = [custom || ALCHEMY_RPC, DRPC_RPC, PUBLIC_RPC].filter((v, i, a) => v && a.indexOf(v) === i);
  for (const url of list) { if (await pingRPC(url)) return url; }
  return PUBLIC_RPC;
}

function rpcLabelText(url) {
  if (url.includes("alchemy"))   return "Alchemy RPC ✓";
  if (url.includes("drpc"))      return "dRPC Fallback ✓";
  if (url.includes("monad.xyz")) return "Public RPC (rate-limited)";
  return url.slice(0, 28) + "…";
}

// ─── BIGINT HELPERS (ethers v6 returns native bigint) ────────────────────────
function toBigInt(v) {
  if (v == null || v === undefined) return null;
  try {
    if (typeof v === "bigint") return v;
    const s = v.toString().trim();
    if (s === "" || s === "0x") return 0n;
    return BigInt(s);
  } catch { return null; }
}

function isZero(v) {
  if (v == null || v === undefined) return true;
  try {
    const bn = toBigInt(v);
    return bn === null || bn === 0n;
  } catch { return true; }
}

function monFmt(w) {
  if (w == null) return "—";
  try {
    const bn = toBigInt(w);
    if (bn === null) return "—";
    if (bn === 0n) return "0 MON";
    const f = parseFloat(formatEther(bn));
    if (f < 1e-6)  return f.toExponential(3) + " MON";
    if (f < 0.001) return f.toFixed(8) + " MON";
    if (f < 1)     return f.toFixed(6) + " MON";
    return f.toFixed(4) + " MON";
  } catch { return "—"; }
}

function usdFmt(w, oracleUSD) {
  if (!w || !oracleUSD) return "";
  try {
    const bn = toBigInt(w);
    if (bn === null || bn === 0n) return "";
    const f = parseFloat(formatEther(bn));
    const u = f * oracleUSD;
    return "≈ $" + (u < 0.01 ? u.toFixed(4) : u.toFixed(2));
  } catch { return ""; }
}

function safePrice(livePrice, basePrice) {
  try {
    if (livePrice !== null && livePrice !== undefined) {
      const lp = typeof livePrice === "bigint" ? livePrice : BigInt(String(livePrice).replace(/[^0-9]/g, "") || "0");
      if (lp > 0n) return lp;
    }
  } catch { }
  try {
    if (basePrice !== null && basePrice !== undefined) {
      const bp = typeof basePrice === "bigint" ? basePrice : BigInt(String(basePrice).replace(/[^0-9]/g, "") || "0");
      if (bp > 0n) return bp;
    }
  } catch { }
  return parseEther("10000.0");
}
function buildIpfsUrls(id, imgURI) {
  const urls = [];
  if (imgURI?.startsWith("ipfs://"))   GATEWAYS.forEach(g => urls.push(g + imgURI.slice(7)));
  else if (imgURI?.startsWith("http")) urls.push(imgURI);
  GATEWAYS.forEach(g => {
    urls.push(`${g}${BASE_CID}/${id}.png`);
    urls.push(`${g}${BASE_CID}/${id}`);
  });
  return [...new Set(urls)];
}

// ─── ROOT EXPORT ──────────────────────────────────────────────────────────────
export default function GoldCoinsNFTPage() {
  return (
    <ThirdwebProvider>
      <GoldCoinsApp />
    </ThirdwebProvider>
  );
}

// ─── NEAR SWAP / BRIDGE PANEL ─────────────────────────────────────────────────
function NearSwapPanel({ account, addToast }) {
  const [swapTokens,  setSwapTokens]  = useState([]);
  const [swapOrigin,  setSwapOrigin]  = useState("");
  const [swapAmount,  setSwapAmount]  = useState("");
  const [swapQuote,   setSwapQuote]   = useState(null);
  const [swapLoading, setSwapLoading] = useState(false);
  const [swapError,   setSwapError]   = useState(null);
  const [showBuy,     setShowBuy]     = useState(false);

  useEffect(() => {
    getNearIntentsTokens().then(tokens => {
      if (!Array.isArray(tokens)) return;
      setSwapTokens(tokens.filter(t =>
        t && t.symbol && ["eth", "btc", "sol", "usdc", "usdt", "near"].some(s =>
          t.symbol.toLowerCase().includes(s)
        )
      ));
    }).catch(() => {});
  }, []);

  async function handleGetQuote() {
    if (!swapOrigin || !swapAmount || !account) return;
    setSwapLoading(true); setSwapError(null); setSwapQuote(null);
    try {
      const destAsset   = "nep141:monad-" + CONTRACT.toLowerCase() + ".omft.near";
      const originToken = swapTokens.find(t => t.assetId === swapOrigin);
      const decimals    = originToken?.decimals || 18;
      const amountRaw   = (BigInt(Math.round(parseFloat(swapAmount) * Math.pow(10, decimals)))).toString();
      const quote = await getNearIntentsQuote({
        originAsset: swapOrigin, destinationAsset: destAsset,
        amount: amountRaw, recipient: account.address,
      });
      setSwapQuote(quote);
      addToast("Quote received ✓", "ok");
    } catch {
      setSwapError("Could not fetch quote. Try a different token or amount.");
      addToast("Quote failed", "err");
    }
    setSwapLoading(false);
  }

  const originSym = swapTokens.find(t => t.assetId === swapOrigin)?.symbol || "";

  return (
    <div className="gc-near-panel">
      <div className="gc-np-title">
        <span className="gc-np-icon">⇄</span> NEAR Intents Bridge
        <span className="gc-np-sub">Swap ETH · BTC · SOL · USDC → MON</span>
      </div>
      <div className="gc-np-section">
        <div className="gc-np-sec-label">💳 Buy MON with Card</div>
        {!showBuy ? (
          <button className="gc-np-btn-gold" onClick={() => setShowBuy(true)}>
            💳 Buy MON with Card (thirdweb)
          </button>
        ) : (
          <>
            <button className="gc-np-btn-outline" style={{ marginBottom: 10 }} onClick={() => setShowBuy(false)}>✕ Close</button>
            <div className="gc-np-widget-wrap">
              <BuyWidget client={client} chain={MONAD_CHAIN} theme="dark" />
            </div>
          </>
        )}
      </div>
      <div className="gc-np-section">
        <div className="gc-np-sec-label">🌉 Bridge via NEAR Intents</div>
        <div className="gc-np-field">
          <label>From Token</label>
          <select value={swapOrigin} onChange={e => setSwapOrigin(e.target.value)}>
            <option value="">Select token…</option>
            {swapTokens.map(t => (
              <option key={t.assetId} value={t.assetId}>
                {t.symbol} — {t.blockchain?.toUpperCase() || ""}
                {t.price ? ` ($${Number(t.price).toFixed(2)})` : ""}
              </option>
            ))}
          </select>
        </div>
        <div className="gc-np-field">
          <label>Amount</label>
          <input type="number" placeholder="0.00" value={swapAmount} onChange={e => setSwapAmount(e.target.value)} />
        </div>
        {!account && <div className="gc-np-warn">⚠️ Connect your wallet to get a quote &amp; deposit address</div>}
        <button
          className="gc-np-btn-neon"
          onClick={handleGetQuote}
          disabled={!account || !swapOrigin || !swapAmount || swapLoading}
          style={{ marginTop: 8 }}
        >
          {!account ? "Connect Wallet First" : swapLoading ? "Fetching quote…" : "⚡ Get Best Quote"}
        </button>
        {swapError && <div className="gc-np-error">{swapError}</div>}
        {swapQuote && !swapError && (
          <div className="gc-np-quote">
            {[
              ["You Send",           `${swapAmount} ${originSym}`],
              ["You Receive (est.)", `${swapQuote.amountOutFormatted || "—"} MON`],
              ["Deadline",           swapQuote.deadline ? new Date(swapQuote.deadline).toLocaleTimeString() : "10 min"],
            ].map(([k, v]) => (
              <div className="gc-np-qrow" key={k}><span>{k}</span><span>{v}</span></div>
            ))}
            {swapQuote.depositAddress && (
              <div className="gc-np-deposit">
                <div className="gc-np-deposit-label">DEPOSIT ADDRESS</div>
                {swapQuote.depositAddress}
                <div className="gc-np-deposit-hint">Send your tokens here. NEAR Intents swaps and delivers MON to your wallet automatically.</div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="gc-np-section">
        <div className="gc-np-sec-label">🌈 NEAR Rainbow Bridge</div>
        <button className="gc-np-btn-outline" onClick={() => window.open("https://rainbowbridge.app/transfer", "_blank")}>
          🌉 Open Rainbow Bridge ↗
        </button>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
function GoldCoinsApp() {
  const account     = useActiveAccount();
  const activeChain = useActiveWalletChain();

  const [nftData,       setNftData]    = useState({});
  const [oracleUSD,     setOracleUSD]  = useState(null);
  const [basePrice,     setBasePrice]  = useState(null);
  const [loaded,        setLoaded]     = useState(0);
  const [rpcLabelState, setRpcLabel]   = useState("Connecting…");
  const [filter,        setFilter]     = useState("all");
  const [search,        setSearch]     = useState("");
  const [modal,         setModal]      = useState(null);
  const [toasts,        setToasts]     = useState([]);
  const [buying,        setBuying]     = useState(false);
  const [showBridge,    setShowBridge] = useState(false);

  const isWrongChain = account && activeChain?.id !== MONAD_ID;

  const addToast = useCallback((msg, type = "inf") => {
    const id = Date.now() + Math.random();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 5000);
  }, []);

  const loadOracle = useCallback(async () => {
    for (const rpc of [DRPC_RPC, ALCHEMY_RPC, PUBLIC_RPC]) {
      try {
        const r = await fetch(rpc, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0", id: 1, method: "eth_call",
            params: [{ to: ORACLE_ADDR, data: "0x50d25bcd" }, "latest"],
          }),
          signal: AbortSignal.timeout(5000),
        }).then(x => x.json());
        if (!r.result || r.result === "0x") continue;
        const p = parseInt(r.result, 16);
        if (p > 0) { setOracleUSD(p / 1e8); return; }
      } catch { /* try next */ }
    }
  }, []);

  const loadBase = useCallback(async () => {
    for (const rpc of [ALCHEMY_RPC, DRPC_RPC, PUBLIC_RPC]) {
      try {
        const rp = new JsonRpcProvider(rpc);
        const rc = new Contract(CONTRACT, ETHERS_ABI, rp);
        const bp = await rc.basePrice();
        // ethers v6 returns bigint — store as bigint directly
        setBasePrice(bp);
        return;
      } catch { /* try next */ }
    }
  }, []);

  const loadAll = useCallback(async () => {
    setNftData({}); setLoaded(0);
    const best = await getBestRPC();
    setRpcLabel(rpcLabelText(best));
    const rp = new JsonRpcProvider(best);
    const rc = new Contract(CONTRACT, ETHERS_ABI, rp);
    let count = 0;
    for (let s = 0; s < NFT_LIST.length; s += MAX_CONCURRENT) {
      await Promise.allSettled(
        NFT_LIST.slice(s, s + MAX_CONCURRENT).map(async n => {
          try {
            const [own, st, lr, stk, lp, rar, pow, co] = await Promise.all([
              rc.ownerOf(n.id).catch(() => null),
              rc.stats(n.id).catch(() => null),
              rc.lore(n.id).catch(() => ""),
              rc.staked(n.id).catch(() => false),
              rc.livePrice(n.id).catch(() => null),
              rc.rarity(n.id).catch(() => 0n),
              rc.power(n.id).catch(() => 0n),
              rc.coins(n.id).catch(() => null),
            ]);
            const entry = {
              id: n.id,
              owner: own,
              atk: st ? Number(st.attack) : 0,
              def: st ? Number(st.defense) : 0,
              spd: st ? Number(st.speed) : 0,
              lore: lr || "",
              staked: !!stk,
              livePrice: lp,        // bigint | null
              rarity: Number(rar),
              power: Number(pow),
              coinName: co ? co.name : "",
              imgURI: co ? co.imageURI : "",
              isMinted: !!own,
              isOwnerNFT: own && own.toLowerCase() === OWNER_ADDR.toLowerCase(),
            };
            count++;
            setNftData(prev => ({ ...prev, [n.id]: entry }));
            setLoaded(count);
          } catch { /* skip failed NFT */ }
        })
      );
      await new Promise(r => setTimeout(r, BATCH_DELAY));
    }
    addToast(`Loaded ${count} NFTs ✓`, "ok");
  }, [addToast]);

  const switchToMonad = useCallback(async () => {
    if (!window.ethereum) { addToast("No injected wallet to switch with", "err"); return; }
    try {
      await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0x8F" }] });
      addToast("Switched to Monad Mainnet", "ok");
    } catch (e) {
      if (e.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: "0x8F", chainName: "Monad Mainnet",
              nativeCurrency: { name: "MON", symbol: "MON", decimals: 18 },
              rpcUrls: [ALCHEMY_RPC, PUBLIC_RPC],
              blockExplorerUrls: ["https://explorer.monad.xyz"],
            }],
          });
          addToast("Monad chain added ✓", "ok");
        } catch (e2) { addToast("Add chain error: " + e2.message, "err"); }
      } else { addToast("Switch error: " + e.message, "err"); }
    }
  }, [addToast]);

  // ─── BUY NFT — FIXED FOR ETHERS v6 BIGINT ────────────────────────────────
  const buyNFT = useCallback(async (id) => {
    if (!account) { addToast("Connect your wallet first", "err"); return; }
    if (activeChain?.id !== MONAD_ID) { addToast("Switch to Monad first", "err"); await switchToMonad(); return; }
    if (!window.ethereum) { addToast("No injected wallet found", "err"); return; }

    const d = nftData[id] || {};

    // safePrice always returns a native bigint
    const pw = safePrice(d.livePrice, basePrice);

    setBuying(true);
    try {
      // ethers v6: BrowserProvider + async getSigner()
      const provider_ = new BrowserProvider(window.ethereum);
      const signer_   = await provider_.getSigner();

      addToast(`Sending ${monFmt(pw)} for NFT #${id}…`, "inf");

      const tx = await signer_.sendTransaction({
        to:    OWNER_ADDR,
        value: pw,          // already a native bigint — no wrapping needed
      });

      addToast("TX: " + tx.hash.slice(0, 18) + "…", "ok");
      await tx.wait();
      addToast(`Payment confirmed! NFT #${id} reserved 🎉`, "ok");
      addToast("Transfer to your wallet within 24h", "near");
      setModal(null);
    } catch (e) {
      const msg = e?.reason || e?.message || "Unknown error";
      addToast("Error: " + msg.slice(0, 90), "err");
    }
    setBuying(false);
  }, [account, activeChain, nftData, basePrice, addToast, switchToMonad]);

  useEffect(() => { loadOracle(); loadBase(); loadAll(); }, [loadOracle, loadBase, loadAll]);

  const filteredNFTs = NFT_LIST.filter(n => {
    const d = nftData[n.id] || {};
    if (filter === "staked" && !d.staked) return false;
    if (filter !== "all" && filter !== "staked" && Number(filter) !== (d.rarity || 0)) return false;
    if (search) {
      const q = search.toLowerCase();
      return n.name.toLowerCase().includes(q) || String(n.id).includes(q);
    }
    return true;
  });

  const modalData   = modal !== null ? nftData[modal] || {} : null;
  const modalNFT    = modal !== null ? NFT_LIST.find(x => x.id === modal) : null;
  const modalName   = modalNFT?.name || modalData?.coinName || (modal !== null ? `GoldCoin #${modal}` : "");
  const modalCanBuy = modalData && !modalData.staked && (!modalData.isMinted || modalData.isOwnerNFT);
  const modalPrice  = modalData ? safePrice(modalData.livePrice, basePrice) : null;

  return (
    <>
      <style>{CSS}</style>
      <AsteroidCanvas />
      <header className="gc-header">
        <a className="gc-logo" href="#">
          <span className="gc-logo-icon">◈</span>
          <div>
            <div className="gc-logo-text">GoldCoins NFT</div>
            <div className="gc-logo-chain">Monad Mainnet · Chain 143</div>
          </div>
        </a>
        <div className="gc-hdr-right">
          {oracleUSD && <span className="gc-pill gc-pill-gold">MON ${oracleUSD.toFixed(2)}</span>}
          <span className={`gc-pill ${activeChain?.id === MONAD_ID ? "gc-pill-purple" : "gc-pill-gray"}`}>
            {activeChain?.id === MONAD_ID ? "✓ Monad 143" : activeChain ? `Chain ${activeChain.id}` : "Chain —"}
          </span>
          <ConnectButton client={client} chain={MONAD_CHAIN} theme="dark" btnTitle="⚡ Connect Wallet" />
        </div>
      </header>

      {isWrongChain && (
        <div className="gc-chain-warn">
          ⚠️ Wrong network — please switch to Monad Mainnet (Chain ID 143)
          <button className="gc-warn-btn" onClick={switchToMonad}>Switch Now</button>
        </div>
      )}

      <div className="gc-wbar">
        <button className="gc-wb gc-wb-mon"  onClick={switchToMonad}>Switch to Monad</button>
        <button className="gc-wb gc-wb-near" onClick={() => setShowBridge(b => !b)}>
          {showBridge ? "✕ Close Bridge" : "⇄ Bridge / Swap"}
        </button>
        <button className="gc-wb gc-wb-out" onClick={async () => {
          setNftData({}); setLoaded(0);
          await loadOracle(); await loadBase(); await loadAll();
          addToast("Refreshed ✓", "ok");
        }}>↻ Refresh</button>
        <button className="gc-wb gc-wb-out" onClick={async () => {
          addToast("Testing RPCs…", "inf");
          for (const url of [ALCHEMY_RPC, DRPC_RPC, PUBLIC_RPC]) {
            const ok    = await pingRPC(url);
            const label = url.includes("alchemy") ? "Alchemy" : url.includes("drpc") ? "dRPC" : "Public";
            addToast(label + ": " + (ok ? "✓ OK" : "✗ Failed"), ok ? "ok" : "err");
          }
        }}>Test RPC</button>
      </div>

      {showBridge && (
        <div className="gc-bridge-wrap">
          <NearSwapPanel account={account} addToast={addToast} />
        </div>
      )}

      <section className="gc-hero">
        <h1 className="gc-hero-title">
          <span className="gc-g1">GoldCoins</span><br />
          <span className="gc-g2">NFT Collection</span>
        </h1>
        <div className="gc-rpc-badge"><span className="gc-rpc-dot" />{rpcLabelState}</div>
        <div className="gc-hchips">
          {[
            { v: NFT_LIST.length,                              l: "Total NFTs" },
            { v: basePrice ? monFmt(basePrice) : "…",          l: "Base Price" },
            { v: oracleUSD ? `$${oracleUSD.toFixed(2)}` : "…", l: "MON / USD"  },
            { v: loaded,                                        l: "Loaded"     },
          ].map(c => (
            <div className="gc-hchip" key={c.l}>
              <div className="gc-hv">{c.v}</div>
              <div className="gc-hl">{c.l}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="gc-sec-title">All <span className="gc-h">GoldCoins</span> NFTs</div>

      <div className="gc-filter-bar">
        <input
          className="gc-search" type="text" placeholder="Search name or #ID…"
          value={search} onChange={e => setSearch(e.target.value)}
        />
        {[
          { f: "all",    l: "All"       },
          { f: "0",      l: "Common"    },
          { f: "1",      l: "Uncommon"  },
          { f: "2",      l: "Rare"      },
          { f: "3",      l: "Epic"      },
          { f: "4",      l: "Legendary" },
          { f: "5",      l: "Mythic"    },
          { f: "staked", l: "⚡ Staked" },
        ].map(b => (
          <button key={b.f} className={`gc-fbtn${filter === b.f ? " active" : ""}`} onClick={() => setFilter(b.f)}>
            {b.l}
          </button>
        ))}
      </div>

      <div className="gc-grid">
        {filteredNFTs.length === 0 ? (
          <div className="gc-loader">
            <div className="gc-spin" />
            {Object.keys(nftData).length === 0 ? `Scanning ${NFT_LIST.length} NFTs…` : "No NFTs match filter."}
          </div>
        ) : (
          filteredNFTs.map(n => (
            <NFTCard
              key={n.id} n={n} d={nftData[n.id] || {}}
              basePrice={basePrice} oracleUSD={oracleUSD}
              onClick={() => setModal(n.id)}
            />
          ))
        )}
      </div>

      <footer className="gc-footer">
        <div className="gc-fi">
          <div className="gc-flogo">◈ GoldCoins NFT</div>
          <div className="gc-ftag">On-chain · Monad Mainnet · Powered by MOTO</div>
          <div className="gc-flinks">
            {[
              { href: "https://t.me/gemsrock_bot",                        l: "🤖 Telegram Bot", cls: "fl-tg"   },
              { href: "https://t.me/gemsrock_bot/RockGems",               l: "🎲 Mini App",      cls: "fl-mini" },
              { href: "https://x.com/bnbgold277983",                      l: "𝕏 Twitter",        cls: "fl-x"    },
              { href: "https://discord.com/channels/1316093079090106472", l: "💬 Discord",        cls: "fl-dc"   },
              { href: "https://fragrant-bush-115e.nelutz2you.workers.dev/",l:"🌎 Website",        cls: "fl-web"  },
              { href: "https://opensea.io/SUPERRARECOINS",                 l: "OpenSea",           cls: "fl-os"   },
              { href: "https://rainbowbridge.app/transfer",                l: "🌉 NEAR Bridge",    cls: "fl-near" },
            ].map(f => (
              <a key={f.href} className={`gc-fl ${f.cls}`} href={f.href} target="_blank" rel="noopener noreferrer">{f.l}</a>
            ))}
          </div>
          <div className="gc-fct">
            Contract:{" "}
            <a href={`https://explorer.monad.xyz/address/${CONTRACT}`} target="_blank" rel="noopener noreferrer">{CONTRACT}</a>
          </div>
          <div className="gc-fcopy">© 2026 GoldCoins NFT · Built on Monad</div>
        </div>
      </footer>

      {modal !== null && (
        <div className="gc-modal-bg" onClick={() => setModal(null)}>
          <div className="gc-modal" onClick={e => e.stopPropagation()}>
            <button className="gc-mcl" onClick={() => setModal(null)}>✕</button>
            <h2 className="gc-modal-title">{modalName}</h2>
            <div className="gc-modal-sub">Token #{modal} · {RARITY[Math.min(modalData?.rarity || 0, 5)]}</div>
            <IPFSImage id={modal} imgURI={modalData?.imgURI || ""} className="gc-modal-img" />
            <div className="gc-modal-rows">
              {[
                ["Token ID", `#${modal}`],
                ["Owner",    modalData?.owner ? modalData.owner.slice(0, 10) + "…" + modalData.owner.slice(-6) : "—"],
                ["Stats",    `ATK ${modalData?.atk||0} / DEF ${modalData?.def||0} / SPD ${modalData?.spd||0} / PWR ${modalData?.power||0}`],
                ["Rarity",   RARITY[Math.min(modalData?.rarity || 0, 5)]],
                ["Coin",     modalData?.coinName || "—"],
                ["Status",   modalCanBuy ? "✓ Available" : modalData?.staked ? "⚡ Staked" : "✓ Sold"],
                ["Price",    modalCanBuy && modalPrice ? `${monFmt(modalPrice)} ${usdFmt(modalPrice, oracleUSD)}` : "—"],
                ...(modalData?.lore ? [["Lore", modalData.lore]] : []),
              ].map(([k, v]) => (
                <div className="gc-mrow" key={k}>
                  <span className="gc-mk">{k}</span>
                  <span className="gc-mv">{v}</span>
                </div>
              ))}
            </div>
            <div className="gc-mbtns">
              <button className="gc-mbtn-cancel" onClick={() => setModal(null)}>Cancel</button>
              <button
                className="gc-mbtn-buy"
                disabled={!modalCanBuy || buying}
                onClick={() => buyNFT(modal)}
              >
                {buying ? "Confirming…" : modalCanBuy ? `⚡ Buy · ${monFmt(modalPrice)}` : modalData?.staked ? "⚡ Staked" : "✓ Sold"}
              </button>
            </div>
            <button
              className="gc-mbtn-near"
              onClick={() => { setModal(null); setShowBridge(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            >
              ⇄ Need MON? Bridge via NEAR Intents
            </button>
          </div>
        </div>
      )}

      <div className="gc-toast-wrap">
        {toasts.map(t => (
          <div key={t.id} className={`gc-ti gc-t${t.type}`}>{t.msg}</div>
        ))}
      </div>
    </>
  );
}

// ─── NFT CARD ─────────────────────────────────────────────────────────────────
function NFTCard({ n, d, basePrice, oracleUSD, onClick }) {
  const r      = Math.min(d.rarity || 0, 5);
  const name   = n.name || d.coinName || `GoldCoin #${n.id}`;
  const canBuy = !d.staked && (!d.isMinted || d.isOwnerNFT);
  const pw     = safePrice(d.livePrice, basePrice);

  return (
    <div className={`gc-card gc-fire-${n.id % 6}`} onClick={onClick}>
      <div className="gc-card-glow" />
      <div className="gc-img-wrap">
        <IPFSImage id={n.id} imgURI={d.imgURI || ""} className="gc-nft-img" />
        <span className={`gc-rb gc-r${r}`}>{RARITY[r]}</span>
        <span className="gc-tid">#{n.id}</span>
      </div>
      <div className="gc-body">
        <div className="gc-name">{name}</div>
        <div className="gc-lore">{d.lore || "Ancient lore not yet revealed…"}</div>
        <div className="gc-stats">
          {[["ATK", d.atk||0], ["DEF", d.def||0], ["SPD", d.spd||0], ["PWR", d.power||0]].map(([k, v]) => (
            <div className="gc-ns" key={k}>
              <div className="gc-nsv">{v}</div>
              <div className="gc-nsk">{k}</div>
            </div>
          ))}
        </div>
        {d.staked && <div className="gc-stag">⚡ Staked</div>}
        {!d.staked && d.isMinted && !d.isOwnerNFT && <div className="gc-stag gc-stag-sold">✓ Sold</div>}
        <div className="gc-price-row">
          <div>
            <div className="gc-price-label">Price</div>
            <div className="gc-price-mon">{canBuy ? monFmt(pw) : d.staked ? "Staked" : "Sold"}</div>
          </div>
          <div className="gc-price-usd">{canBuy ? usdFmt(pw, oracleUSD) : ""}</div>
        </div>
        <button
          className={`gc-btn-buy ${canBuy ? "gc-btn-avail" : "gc-btn-staked"}`}
          disabled={!canBuy}
          onClick={e => { e.stopPropagation(); onClick(); }}
        >
          {canBuy ? "⚡ Buy Now" : d.staked ? "⚡ Staked" : "✓ Sold"}
        </button>
      </div>
    </div>
  );
}

// ─── IPFS IMAGE ───────────────────────────────────────────────────────────────
function IPFSImage({ id, imgURI, className }) {
  const [src,     setSrc]     = useState(null);
  const [loading, setLoading] = useState(true);
  const tried = useRef(0);
  const urls  = useRef([]);

  useEffect(() => {
    urls.current  = buildIpfsUrls(id, imgURI);
    tried.current = 0;
    setSrc(urls.current[0] || null);
    setLoading(true);
  }, [id, imgURI]);

  function tryNext() {
    tried.current++;
    if (tried.current < urls.current.length) { setSrc(urls.current[tried.current]); }
    else { setLoading(false); setSrc(null); }
  }

  return (
    <div className="gc-img-inner">
      {loading && src === null && <div className="gc-img-ph">◈🪙</div>}
      {loading && src !== null && <div className="gc-img-spin-wrap"><div className="gc-spin gc-spin-sm" /></div>}
      {src && (
        <img
          className={className} src={src} alt={`NFT #${id}`}
          style={{ opacity: loading ? 0 : 1, transition: "opacity .3s" }}
          onLoad={() => setLoading(false)} onError={tryNext}
        />
      )}
      {!loading && !src && <div className="gc-img-ph">◈🪙</div>}
    </div>
  );
}

// ─── ASTEROID CANVAS ──────────────────────────────────────────────────────────
function AsteroidCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const COLS = ["#836EF9","#00FFD1","#FFB800","#FF4757","#00C3FF","#FF69B4","#00FF88","#A896FF"];
    const rand = (a, b) => Math.random() * (b - a) + a;
    let W, H, asts = [];
    function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
    function mkA(sy) {
      return {
        x: rand(0, W), y: sy !== undefined ? sy : rand(-200, -10),
        vx: rand(-1.2, 1.2), vy: rand(1.5, 5),
        r: rand(2, 8), trail: [], maxT: Math.floor(rand(8, 22)),
        col: COLS[Math.floor(Math.random() * COLS.length)],
        alpha: rand(.5, 1), spin: rand(-.06, .06),
        angle: rand(0, Math.PI * 2), sides: Math.floor(rand(3, 8)),
      };
    }
    function draw(a) {
      a.trail.forEach((t, i) => {
        const p = i / a.trail.length;
        ctx.beginPath(); ctx.arc(t.x, t.y, a.r * p * .5, 0, Math.PI * 2);
        ctx.fillStyle = a.col + Math.floor(p * 80).toString(16).padStart(2, "0"); ctx.fill();
      });
      ctx.save(); ctx.translate(a.x, a.y); ctx.rotate(a.angle); ctx.beginPath();
      for (let i = 0; i < a.sides; i++) {
        const ang = (i / a.sides) * Math.PI * 2, rr = a.r * (.75 + Math.random() * .5);
        i === 0 ? ctx.moveTo(Math.cos(ang) * rr, Math.sin(ang) * rr) : ctx.lineTo(Math.cos(ang) * rr, Math.sin(ang) * rr);
      }
      ctx.closePath();
      ctx.fillStyle = a.col + Math.floor(a.alpha * 180).toString(16).padStart(2, "0");
      ctx.shadowColor = a.col; ctx.shadowBlur = a.r * 4; ctx.fill(); ctx.restore();
    }
    function loop() {
      ctx.clearRect(0, 0, W, H);
      asts.forEach(a => {
        a.trail.push({ x: a.x, y: a.y });
        if (a.trail.length > a.maxT) a.trail.shift();
        a.x += a.vx; a.y += a.vy; a.angle += a.spin;
        if (a.y > H + 20 || a.x < -30 || a.x > W + 30) { Object.assign(a, mkA()); a.x = rand(0, W); a.trail = []; }
        draw(a);
      });
      animId = requestAnimationFrame(loop);
    }
    resize(); addEventListener("resize", resize);
    asts = Array.from({ length: 70 }, (_, i) => mkA(rand(0, innerHeight)));
    loop();
    return () => { cancelAnimationFrame(animId); removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Space+Mono:wght@400;700&display=swap');
:root{
  --bg:#050509;--bg2:#0B0B12;--bg3:#11111A;--bg4:#181824;
  --border:#252538;--border2:#30304A;
  --text:#F5F5FF;--text2:#C5C5E0;--text3:#8A8AA5;
  --monad:#836EF9;--monad-l:#A896FF;--teal:#00FFD1;
  --blue:#00C3FF;--green:#00FF88;--gold:#FFB800;--gold-l:#FFE38A;--red:#FF4757;
  --near:#00C08B;
}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:radial-gradient(circle at top,#151528 0,#050509 55%);color:var(--text);min-height:100vh;overflow-x:hidden}
.gc-header,.gc-wbar,.gc-hero,.gc-sec-title,.gc-filter-bar,.gc-grid,.gc-footer,.gc-modal-bg,.gc-toast-wrap,.gc-bridge-wrap{position:relative;z-index:1}
.gc-header{display:flex;justify-content:space-between;align-items:center;padding:14px 18px;border-bottom:1px solid var(--border);background:rgba(5,5,12,.96);position:sticky;top:0;z-index:10;backdrop-filter:blur(14px);flex-wrap:wrap;gap:8px}
.gc-logo{display:flex;align-items:center;gap:10px;text-decoration:none;color:inherit}
.gc-logo-icon{width:30px;height:30px;border-radius:10px;background:radial-gradient(circle at 30% 20%,var(--gold-l),var(--gold));display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 0 18px rgba(255,184,0,.45);flex-shrink:0}
.gc-logo-text{font-family:'Syne',sans-serif;font-size:16px;font-weight:900}
.gc-logo-chain{font-size:10px;color:var(--text3)}
.gc-hdr-right{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.gc-pill{font-family:'Space Mono',monospace;font-size:10px;padding:6px 10px;border-radius:999px;border:1px solid var(--border2);background:rgba(10,10,20,.9);color:var(--text3)}
.gc-pill-gold{border-color:rgba(255,184,0,.4);color:var(--gold);background:rgba(255,184,0,.08)}
.gc-pill-purple{border-color:rgba(131,110,249,.5);color:var(--monad-l);background:rgba(131,110,249,.12)}
.gc-pill-gray{border-color:var(--border2);color:var(--text3)}
.gc-chain-warn{background:rgba(255,68,0,.12);border:1px solid rgba(255,68,0,.4);border-radius:10px;padding:12px 20px;margin:12px 18px;color:#ff8844;font-size:12px;display:flex;align-items:center;justify-content:space-between;gap:12px;position:relative;z-index:2}
.gc-warn-btn{padding:6px 14px;background:rgba(255,68,0,.2);border:1px solid rgba(255,68,0,.5);border-radius:6px;color:#ff8844;cursor:pointer;font-size:11px;font-family:'Space Mono',monospace;transition:background .2s}
.gc-warn-btn:hover{background:rgba(255,68,0,.35)}
.gc-wbar{display:flex;flex-wrap:wrap;gap:8px;padding:10px 18px;border-bottom:1px solid var(--border);background:rgba(5,5,12,.96);position:sticky;top:57px;z-index:9;backdrop-filter:blur(14px)}
.gc-wb{font-family:'Space Mono',monospace;font-size:10px;font-weight:700;padding:6px 11px;border-radius:999px;border:1px solid var(--border2);background:rgba(10,10,20,.9);color:var(--text2);cursor:pointer;letter-spacing:.3px;white-space:nowrap;transition:transform .15s,filter .15s,background .15s,border-color .15s}
.gc-wb:hover{transform:scale(1.07);filter:brightness(1.2)}
.gc-wb:active{transform:scale(0.95)}
.gc-wb-mon{border-color:rgba(0,255,136,.4);color:var(--green)}
.gc-wb-mon:hover{background:rgba(0,255,136,.1);border-color:var(--green)}
.gc-wb-near{border-color:rgba(0,192,139,.4);color:var(--near)}
.gc-wb-near:hover{background:rgba(0,192,139,.1);border-color:var(--near)}
.gc-wb-out{border-color:var(--border2);color:var(--text3)}
.gc-wb-out:hover{background:rgba(255,255,255,.05);border-color:var(--text3);color:var(--text)}
.gc-bridge-wrap{padding:12px 18px 0;max-width:700px;margin:0 auto}
.gc-near-panel{background:var(--bg2);border:1px solid rgba(0,192,139,.3);border-radius:16px;padding:22px;animation:fadeDown .3s ease}
@keyframes fadeDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
.gc-np-title{font-family:'Syne',sans-serif;font-size:15px;font-weight:800;color:var(--near);margin-bottom:18px;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.gc-np-icon{font-size:18px}
.gc-np-sub{font-size:10px;color:var(--text3);font-weight:400;letter-spacing:1px}
.gc-np-section{margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid var(--border)}
.gc-np-section:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
.gc-np-sec-label{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--text3);margin-bottom:10px;font-family:'Space Mono',monospace}
.gc-np-field{margin-bottom:10px}
.gc-np-field label{display:block;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--text3);margin-bottom:5px;font-family:'Space Mono',monospace}
.gc-np-field input,.gc-np-field select{width:100%;padding:9px 12px;border-radius:8px;background:rgba(5,10,14,.85);border:1px solid var(--border2);color:var(--text);font-family:'Space Mono',monospace;font-size:12px;outline:none;transition:border-color .2s}
.gc-np-field input:focus,.gc-np-field select:focus{border-color:rgba(0,192,139,.5)}
.gc-np-field select option{background:#0a2e12;color:var(--text)}
.gc-np-btn-neon{width:100%;padding:11px;border-radius:8px;border:none;cursor:pointer;background:linear-gradient(90deg,var(--monad),#B060FF);color:#fff;font-family:'Syne',sans-serif;font-size:12px;font-weight:800;letter-spacing:2px;transition:filter .2s,transform .15s;box-shadow:0 0 14px rgba(131,110,249,.3)}
.gc-np-btn-neon:hover:not(:disabled){filter:brightness(1.15);transform:scale(1.02)}
.gc-np-btn-neon:disabled{opacity:.4;cursor:not-allowed}
.gc-np-btn-gold{width:100%;padding:11px;border-radius:8px;border:none;cursor:pointer;background:linear-gradient(90deg,var(--gold),var(--gold-l));color:#111;font-family:'Syne',sans-serif;font-size:12px;font-weight:800;letter-spacing:2px;transition:filter .2s,transform .15s;box-shadow:0 0 14px rgba(255,184,0,.3)}
.gc-np-btn-gold:hover{filter:brightness(1.12);transform:scale(1.02)}
.gc-np-btn-outline{width:100%;padding:10px;border-radius:8px;border:1px solid rgba(0,192,139,.35);background:transparent;color:var(--near);font-family:'Space Mono',monospace;font-size:10px;cursor:pointer;transition:all .2s;letter-spacing:1px}
.gc-np-btn-outline:hover{background:rgba(0,192,139,.08);border-color:var(--near)}
.gc-np-warn{font-size:11px;color:#ffaa44;text-align:center;padding:10px 14px;border:1px solid rgba(255,170,68,.25);border-radius:8px;background:rgba(255,170,68,.06);margin-bottom:6px}
.gc-np-error{margin-top:10px;padding:10px 12px;border-radius:8px;background:rgba(255,71,87,.08);color:var(--red);border:1px solid rgba(255,71,87,.25);font-size:11px}
.gc-np-quote{margin-top:12px;padding:12px;border-radius:10px;background:rgba(0,192,139,.05);border:1px solid rgba(0,192,139,.2)}
.gc-np-qrow{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(0,192,139,.08);font-size:12px}
.gc-np-qrow:last-child{border-bottom:none}
.gc-np-qrow span:first-child{color:var(--text3)}
.gc-np-qrow span:last-child{color:var(--near);font-weight:700;font-family:'Space Mono',monospace;font-size:11px}
.gc-np-deposit{margin-top:12px;padding:12px;border-radius:8px;background:rgba(0,192,139,.08);border:1px solid rgba(0,192,139,.3);word-break:break-all;font-size:11px;color:var(--near);font-family:monospace;line-height:1.7}
.gc-np-deposit-label{color:var(--near);margin-bottom:6px;font-family:'Space Mono',monospace;font-weight:700;font-size:10px;letter-spacing:1px}
.gc-np-deposit-hint{margin-top:8px;color:var(--text3);font-family:system-ui;font-size:11px}
.gc-np-widget-wrap{border-radius:12px;overflow:hidden;border:1px solid rgba(0,192,139,.28);background:rgba(5,10,14,.95)}
.gc-hero{text-align:center;padding:54px 20px 40px;position:relative}
.gc-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 65% 50% at 50% 0%,rgba(131,110,249,.1),transparent);pointer-events:none}
.gc-hero-title{font-family:'Syne',sans-serif;font-size:clamp(26px,6vw,56px);font-weight:900;line-height:1.1;margin-bottom:12px}
.gc-g1{background:linear-gradient(135deg,var(--gold-l),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.gc-g2{background:linear-gradient(135deg,var(--monad-l),var(--teal));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.gc-rpc-badge{display:inline-flex;align-items:center;gap:5px;font-family:'Space Mono',monospace;font-size:9px;padding:3px 8px;border-radius:999px;background:rgba(0,255,136,.08);color:var(--green);border:1px solid rgba(0,255,136,.2);margin-bottom:18px}
.gc-rpc-dot{width:5px;height:5px;border-radius:50%;background:var(--green);animation:pulse-dot 2s ease-in-out infinite;flex-shrink:0}
@keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
.gc-hchips{display:flex;justify-content:center;gap:28px;flex-wrap:wrap}
.gc-hchip .gc-hv{font-family:'Syne',sans-serif;font-size:28px;font-weight:900;color:var(--monad-l);filter:drop-shadow(0 0 8px rgba(131,110,249,.45))}
.gc-hchip .gc-hl{font-size:9px;color:var(--text3);letter-spacing:2px;text-transform:uppercase;margin-top:3px}
.gc-sec-title{text-align:center;font-family:'Syne',sans-serif;font-size:19px;font-weight:800;margin:38px 0 18px}
.gc-h{color:var(--monad-l)}
.gc-filter-bar{display:flex;justify-content:center;gap:7px;flex-wrap:wrap;margin-bottom:22px;padding:0 16px}
.gc-search{font-family:'Space Mono',monospace;font-size:11px;padding:7px 13px;background:var(--bg3);border:1px solid var(--border2);color:var(--text);border-radius:20px;outline:none;width:190px;transition:border-color .15s,box-shadow .15s}
.gc-search:focus{border-color:var(--monad);box-shadow:0 0 0 3px rgba(131,110,249,.15)}
.gc-search::placeholder{color:var(--text3)}
.gc-fbtn{font-family:'Space Mono',monospace;font-size:10px;font-weight:700;padding:6px 13px;border-radius:20px;border:1px solid var(--border2);background:transparent;color:var(--text2);cursor:pointer;transition:all .15s;letter-spacing:.4px}
.gc-fbtn:hover{background:rgba(131,110,249,.15);color:var(--monad-l);border-color:var(--monad);transform:scale(1.06)}
.gc-fbtn:active{transform:scale(0.96)}
.gc-fbtn.active{background:var(--monad);color:#fff;border-color:var(--monad)}
.gc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px;padding:0 16px 20px;max-width:1400px;margin:0 auto}
.gc-loader{text-align:center;padding:60px;color:var(--text3);font-size:12px;grid-column:1/-1;display:flex;flex-direction:column;align-items:center;gap:12px}
.gc-spin{width:28px;height:28px;border:2px solid var(--border);border-top-color:var(--monad);border-radius:50%;animation:spin .7s linear infinite}
.gc-spin-sm{width:18px;height:18px;border-width:1.5px}
@keyframes spin{to{transform:rotate(360deg)}}
.gc-card{background:var(--bg2);border:1px solid var(--border);border-radius:16px;overflow:hidden;transition:transform .22s cubic-bezier(.34,1.56,.64,1),border-color .2s,box-shadow .2s;cursor:pointer;position:relative}
.gc-card:hover{transform:translateY(-7px) scale(1.022);border-color:var(--monad);box-shadow:0 0 28px rgba(131,110,249,.28),0 18px 36px rgba(0,0,0,.45)}
.gc-card:hover .gc-card-glow{opacity:1}
.gc-card-glow{position:absolute;inset:0;background:radial-gradient(ellipse 80% 50% at 50% 0%,rgba(131,110,249,.16),transparent);opacity:0;transition:opacity .3s;pointer-events:none}
@keyframes fire0{0%,100%{box-shadow:0 0 8px 2px #FF4500,0 0 20px 6px #FF6A00}50%{box-shadow:0 0 12px 4px #FF2200,0 0 28px 10px #FF8000}}
@keyframes fire1{0%,100%{box-shadow:0 0 8px 2px #00FFFF,0 0 20px 6px #0088FF}50%{box-shadow:0 0 12px 4px #00DDFF,0 0 28px 10px #0044FF}}
@keyframes fire2{0%,100%{box-shadow:0 0 8px 2px #FF00FF,0 0 20px 6px #AA00FF}50%{box-shadow:0 0 12px 4px #FF00DD,0 0 28px 10px #8800FF}}
@keyframes fire3{0%,100%{box-shadow:0 0 8px 2px #00FF88,0 0 20px 6px #00FFAA}50%{box-shadow:0 0 12px 4px #00FF44,0 0 28px 10px #00DDAA}}
@keyframes fire4{0%,100%{box-shadow:0 0 8px 2px #FFD700,0 0 20px 6px #FFAA00}50%{box-shadow:0 0 12px 4px #FFE000,0 0 28px 10px #FF9900}}
@keyframes fire5{0%,100%{box-shadow:0 0 8px 2px #FF1493,0 0 20px 6px #FF69B4}50%{box-shadow:0 0 12px 4px #FF0080,0 0 28px 10px #FF44AA}}
.gc-fire-0{animation:fire0 2.1s ease-in-out infinite}.gc-fire-1{animation:fire1 1.9s ease-in-out infinite}
.gc-fire-2{animation:fire2 2.3s ease-in-out infinite}.gc-fire-3{animation:fire3 1.8s ease-in-out infinite}
.gc-fire-4{animation:fire4 2.5s ease-in-out infinite}.gc-fire-5{animation:fire5 2.0s ease-in-out infinite}
.gc-img-wrap{position:relative;width:100%;aspect-ratio:1;background:var(--bg3);overflow:hidden}
.gc-img-inner{width:100%;height:100%;position:relative;display:flex;align-items:center;justify-content:center}
.gc-nft-img{width:100%;height:100%;object-fit:cover;display:block}
.gc-img-ph{font-size:52px;background:linear-gradient(135deg,var(--bg3),var(--bg4));width:100%;height:100%;display:flex;align-items:center;justify-content:center}
.gc-img-spin-wrap{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:var(--bg3)}
.gc-rb{position:absolute;top:9px;right:9px;font-size:9px;font-weight:700;padding:3px 8px;border-radius:20px;letter-spacing:1px;text-transform:uppercase;backdrop-filter:blur(8px)}
.gc-r0{background:rgba(80,80,80,.8);color:#aaa;border:1px solid rgba(130,130,130,.3)}
.gc-r1{background:rgba(0,255,136,.14);color:var(--green);border:1px solid rgba(0,255,136,.3)}
.gc-r2{background:rgba(0,255,209,.14);color:var(--teal);border:1px solid rgba(0,255,209,.3)}
.gc-r3{background:rgba(0,195,255,.14);color:var(--blue);border:1px solid rgba(0,195,255,.3)}
.gc-r4{background:rgba(131,110,249,.2);color:var(--monad-l);border:1px solid rgba(131,110,249,.42)}
.gc-r5{background:rgba(255,184,0,.17);color:var(--gold);border:1px solid rgba(255,184,0,.38);box-shadow:0 0 8px rgba(255,184,0,.18)}
.gc-tid{position:absolute;top:9px;left:9px;font-size:9px;font-weight:700;padding:2px 7px;border-radius:5px;background:rgba(0,0,0,.7);color:var(--text3);backdrop-filter:blur(4px)}
.gc-body{padding:13px}
.gc-name{font-family:'Syne',sans-serif;font-size:13px;font-weight:800;color:var(--text);margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.gc-lore{font-size:10px;color:var(--text3);line-height:1.6;margin-bottom:9px;min-height:28px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.gc-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin-bottom:9px}
.gc-ns{background:var(--bg3);border-radius:6px;padding:5px 2px;text-align:center;border:1px solid var(--border)}
.gc-nsv{font-size:12px;font-weight:700;color:var(--monad-l)}
.gc-nsk{font-size:7px;color:var(--text3);text-transform:uppercase;letter-spacing:.8px;margin-top:1px}
.gc-stag{display:inline-flex;align-items:center;gap:3px;font-size:9px;padding:2px 8px;border-radius:20px;margin-bottom:7px;background:rgba(0,255,136,.07);color:var(--green);border:1px solid rgba(0,255,136,.2)}
.gc-stag-sold{background:rgba(0,195,255,.07);color:var(--blue);border-color:rgba(0,195,255,.2)}
.gc-price-row{display:flex;align-items:center;justify-content:space-between;padding:7px 9px;background:var(--bg3);border-radius:7px;border:1px solid rgba(255,184,0,.13);margin-bottom:9px}
.gc-price-label{font-size:8px;color:var(--text3);text-transform:uppercase;letter-spacing:1px}
.gc-price-mon{font-family:'Syne',sans-serif;font-size:14px;font-weight:900;color:var(--gold);filter:drop-shadow(0 0 5px rgba(255,184,0,.35))}
.gc-price-usd{font-size:9px;color:var(--text3);text-align:right}
.gc-btn-buy{width:100%;font-family:'Syne',sans-serif;font-size:13px;font-weight:800;padding:11px;border-radius:9px;border:none;cursor:pointer;transition:transform .18s,filter .18s,box-shadow .18s;letter-spacing:.4px}
.gc-btn-avail{background:linear-gradient(135deg,var(--monad),#B060FF);color:#fff;box-shadow:0 0 14px rgba(131,110,249,.3)}
.gc-btn-avail:hover{filter:brightness(1.18);transform:scale(1.03);box-shadow:0 0 24px rgba(131,110,249,.55)}
.gc-btn-avail:active{transform:scale(0.97)}
.gc-btn-staked{background:rgba(255,255,255,.04);color:var(--text3);border:1px solid var(--border);cursor:not-allowed}
.gc-modal-bg{display:flex;position:fixed;inset:0;background:rgba(0,0,0,.78);backdrop-filter:blur(6px);z-index:300;align-items:center;justify-content:center;padding:16px}
.gc-modal{background:var(--bg2);border:1px solid var(--border2);border-radius:18px;padding:24px;width:100%;max-width:410px;position:relative;box-shadow:0 0 36px rgba(131,110,249,.18);max-height:90vh;overflow-y:auto}
.gc-modal::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--monad),var(--teal),transparent);border-radius:18px 18px 0 0}
.gc-modal-title{font-family:'Syne',sans-serif;font-size:17px;font-weight:800;margin-bottom:3px}
.gc-modal-sub{font-size:10px;color:var(--text2);margin-bottom:14px}
.gc-mcl{position:absolute;top:13px;right:14px;background:transparent;border:none;color:var(--text3);font-size:17px;cursor:pointer;transition:color .15s,transform .15s}
.gc-mcl:hover{color:var(--text);transform:rotate(90deg)}
.gc-modal-img{width:100%;aspect-ratio:1;object-fit:cover}
.gc-modal-rows{margin:14px 0}
.gc-mrow{display:flex;justify-content:space-between;align-items:flex-start;padding:8px 0;border-bottom:1px solid var(--border);font-size:11px}
.gc-mrow:last-child{border:none}
.gc-mk{color:var(--text2);flex-shrink:0;margin-right:10px}
.gc-mv{color:var(--text);text-align:right;word-break:break-all;max-width:230px}
.gc-mbtns{display:flex;gap:8px;margin-top:16px}
.gc-mbtn-buy{flex:1;font-family:'Syne',sans-serif;font-size:13px;font-weight:800;padding:12px;background:linear-gradient(135deg,var(--monad),#B060FF);color:#fff;border:none;border-radius:10px;cursor:pointer;transition:filter .2s,transform .15s;box-shadow:0 0 14px rgba(131,110,249,.28)}
.gc-mbtn-buy:hover:not(:disabled){filter:brightness(1.12);transform:scale(1.03)}
.gc-mbtn-buy:disabled{opacity:.35;cursor:not-allowed}
.gc-mbtn-cancel{font-family:'Space Mono',monospace;font-size:10px;padding:12px 14px;background:transparent;color:var(--text2);border:1px solid var(--border2);border-radius:10px;cursor:pointer;transition:border-color .15s,color .15s}
.gc-mbtn-cancel:hover{border-color:var(--monad);color:var(--monad-l)}
.gc-mbtn-near{width:100%;margin-top:10px;padding:10px;border-radius:9px;background:transparent;border:1px solid rgba(0,192,139,.4);color:var(--near);font-family:'Space Mono',monospace;font-size:10px;cursor:pointer;transition:all .2s;letter-spacing:1px}
.gc-mbtn-near:hover{background:rgba(0,192,139,.1);border-color:var(--near)}
.gc-footer{margin-top:56px;background:var(--bg2);border-top:1px solid var(--border);padding:38px 20px}
.gc-footer::before{content:'';display:block;height:1px;background:linear-gradient(90deg,transparent,var(--monad),var(--teal),transparent);margin-bottom:38px;margin-top:-38px;margin-left:-20px;margin-right:-20px}
.gc-fi{max-width:880px;margin:0 auto;text-align:center}
.gc-flogo{font-family:'Syne',sans-serif;font-size:22px;font-weight:900;background:linear-gradient(135deg,var(--gold-l),var(--monad-l),var(--teal));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:5px}
.gc-ftag{font-size:10px;color:var(--text3);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:28px}
.gc-flinks{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-bottom:24px}
.gc-fl{display:inline-flex;align-items:center;gap:7px;font-family:'Space Mono',monospace;font-size:11px;font-weight:700;padding:9px 16px;border-radius:9px;text-decoration:none;transition:all .2s;letter-spacing:.3px;white-space:nowrap}
.gc-fl:hover{transform:translateY(-3px) scale(1.04)}
.fl-tg{background:rgba(38,165,228,.12);color:#29B6F6;border:1px solid rgba(38,165,228,.28)}
.fl-mini{background:rgba(38,165,228,.1);color:#4FC3F7;border:1px solid rgba(38,165,228,.22)}
.fl-x{background:rgba(255,255,255,.06);color:#E0E0E0;border:1px solid rgba(255,255,255,.13)}
.fl-dc{background:rgba(88,101,242,.12);color:#7986F7;border:1px solid rgba(88,101,242,.28)}
.fl-web{background:rgba(0,207,255,.09);color:var(--blue);border:1px solid rgba(0,207,255,.25)}
.fl-os{background:rgba(32,129,226,.12);color:#2081E2;border:1px solid rgba(32,129,226,.3)}
.fl-near{background:rgba(0,192,139,.1);color:var(--near);border:1px solid rgba(0,192,139,.3)}
.gc-fct{font-size:9px;color:var(--text3);margin-top:7px}
.gc-fct a{color:var(--monad-l);text-decoration:none}
.gc-fct a:hover{text-decoration:underline}
.gc-fcopy{font-size:9px;color:var(--text3);letter-spacing:.8px;margin-top:14px}
.gc-toast-wrap{position:fixed;bottom:18px;right:18px;z-index:999;display:flex;flex-direction:column;gap:6px;max-width:320px;pointer-events:none}
.gc-ti{font-size:11px;padding:9px 13px;border-radius:8px;border:1px solid;animation:tslide .2s ease;word-break:break-all}
@keyframes tslide{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
.gc-tok{background:rgba(0,255,136,.1);color:var(--green);border-color:rgba(0,255,136,.3)}
.gc-terr{background:rgba(255,71,87,.1);color:var(--red);border-color:rgba(255,71,87,.3)}
.gc-tinf{background:rgba(131,110,249,.1);color:var(--monad-l);border-color:rgba(131,110,249,.3)}
.gc-tnear{background:rgba(0,192,139,.1);color:var(--near);border-color:rgba(0,192,139,.3)}
@media(max-width:640px){.gc-header{flex-direction:column;align-items:flex-start}.gc-wbar{top:90px}}
`;
