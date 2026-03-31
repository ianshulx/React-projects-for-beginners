// src/components/WeightConverter.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConversionTrie from "../utils/ConversionTrie";
import GlassCard from "./ui/GlassCard";
import AnalyticsDashboard from "./AnalyticsDashboard"; // file you already have or we'll create (see below)

/**
 * Modern Weight Converter (Hybrid glass + clean)
 * - Trie-based deduped history with metadata
 * - localStorage persistence
 * - autocomplete suggestions
 * - collapsible analytics with smooth animation
 */
export default function WeightConverter() {
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("kg");
  const [convertedWeight, setConvertedWeight] = useState("");
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    kgToLb: 0,
    lbToKg: 0,
    lastConversion: null,
  });
  const [showAnalytics, setShowAnalytics] = useState(false);

  const trieRef = useRef(new ConversionTrie());

  // Load from localStorage once
  useEffect(() => {
    const savedTrie = localStorage.getItem("conversionTrie");
    const savedHistory = localStorage.getItem("conversionHistory");
    const savedStats = localStorage.getItem("conversionStats");

    if (savedTrie) {
      try {
        trieRef.current = ConversionTrie.deserialize(savedTrie);
      } catch (e) {
        // fallback: ignore bad saved trie
        trieRef.current = new ConversionTrie();
      }
    }
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        setHistory([]);
      }
    }
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (e) {
        setStats({
          total: 0,
          kgToLb: 0,
          lbToKg: 0,
          lastConversion: null,
        });
      }
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem("conversionTrie", trieRef.current.serialize());
      localStorage.setItem("conversionHistory", JSON.stringify(history));
      localStorage.setItem("conversionStats", JSON.stringify(stats));
    } catch (e) {
      // ignore localStorage exceptions (private mode etc.)
    }
  }, [history, stats]);

  const convertWeight = (e) => {
    e?.preventDefault?.();
    if (!weight) return;

    const numeric = Number(weight);
    if (!Number.isFinite(numeric)) return;

    let result;
    if (unit === "kg") {
      result = (numeric * 2.20462).toFixed(2);
    } else {
      result = (numeric / 2.20462).toFixed(2);
    }

    const conversionText = `${numeric} ${unit} → ${result} ${unit === "kg" ? "lb" : "kg"}`;
    const timestampISO = new Date().toISOString();
    const timestamp = new Date(timestampISO).toLocaleString();

    // Insert only when unique
    if (!trieRef.current.exists(conversionText)) {
      const conversion = {
        text: conversionText,
        timestamp,
        iso: timestampISO,
        from: unit,
        to: unit === "kg" ? "lb" : "kg",
      };
      trieRef.current.insert(conversion);
      setHistory((prev) => [conversion, ...prev]);

      setStats((prev) => ({
        total: prev.total + 1,
        kgToLb: unit === "kg" ? prev.kgToLb + 1 : prev.kgToLb,
        lbToKg: unit === "lb" ? prev.lbToKg + 1 : prev.lbToKg,
        lastConversion: timestamp,
      }));
    }

    setConvertedWeight(result);
  };

  const handleReset = () => {
    setWeight("");
    setConvertedWeight("");
  };

  const clearHistory = () => {
    trieRef.current = new ConversionTrie();
    setHistory([]);
    setStats({
      total: 0,
      kgToLb: 0,
      lbToKg: 0,
      lastConversion: null,
    });
    localStorage.removeItem("conversionTrie");
    localStorage.removeItem("conversionHistory");
    localStorage.removeItem("conversionStats");
  };

  // For filtering: if searchTerm present use Trie prefix search (returns objects with data)
  const filteredHistory = (() => {
    const term = searchTerm?.trim();
    if (!term) return history;
    // Trie.startsWith returns array of node.data or strings depending on impl — normalize:
    try {
      const res = trieRef.current.startsWith(term);
      // res entries may be {text, timestamp...} or 'string'; normalize to object with text+timestamp
      return res.map((r) => (r && r.text ? r : { text: String(r), timestamp: "" }));
    } catch {
      return history.filter((h) => h.text?.toLowerCase().includes(term.toLowerCase()));
    }
  })();

  // suggestions for autocomplete (top 6)
  const suggestions =
    searchTerm && searchTerm.length > 0
      ? trieRef.current.startsWith(searchTerm).slice(0, 6).map((s) => (s?.text ? s.text : String(s)))
      : [];

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="min-h-screen flex items-center justify-center py-12">
        <GlassCard className="p-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start"
          >
            {/* Left: Converter + Search + History */}
            <div className="space-y-6">
              <header className="text-left">
                <h1 className="text-3xl font-extrabold text-blue-600">Weight Converter</h1>
                <p className="text-sm text-gray-600 mt-1">Convert weights quickly — history saved locally.</p>
              </header>

              <form onSubmit={convertWeight} className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="number"
                    inputMode="decimal"
                    step="any"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Enter weight (e.g. 100)"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label="weight input"
                  />
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-36 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label="unit select"
                  >
                    <option value="kg">Kilograms</option>
                    <option value="lb">Pounds</option>
                  </select>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-3 rounded-lg transition"
                  >
                    Convert
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-36 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 rounded-lg px-4 py-3 transition"
                  >
                    Reset
                  </button>
                </div>

                {convertedWeight && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-left"
                  >
                    <p className="text-lg text-gray-800">
                      Result:{" "}
                      <span className="font-semibold text-blue-600">
                        {convertedWeight} {unit === "kg" ? "lbs" : "kg"}
                      </span>
                    </p>
                  </motion.div>
                )}
              </form>

              {/* Search & Autocomplete */}
              <div>
                <label htmlFor="search" className="sr-only">Search conversions</label>
                <div className="relative">
                  <input
                    id="search"
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search history (try: 100 kg)"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    aria-label="search history"
                  />
                  <AnimatePresence>
                    {suggestions.length > 0 && (
                      <motion.ul
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="absolute z-30 left-0 right-0 mt-2 bg-white border border-gray-100 rounded-lg shadow-sm max-h-44 overflow-auto"
                      >
                        {suggestions.map((s, i) => (
                          <li
                            key={i}
                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-left text-sm"
                            onClick={() => setSearchTerm(s)}
                          >
                            {s}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* History list */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-semibold text-gray-800">Conversion History</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setHistory((h) => h.slice(0, 10));
                      }}
                      className="text-sm text-gray-600 hover:underline"
                    >
                      Show recent
                    </button>
                    <button
                      onClick={clearHistory}
                      className="text-sm text-red-500 hover:underline"
                      aria-label="clear history"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {filteredHistory.length === 0 ? (
                  <p className="text-sm text-gray-500">No conversions yet — convert something to populate history.</p>
                ) : (
                  <motion.ul
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2 max-h-56 overflow-y-auto"
                  >
                    {filteredHistory.map((item, idx) => (
                      <motion.li
                        key={item?.iso || item?.text || idx}
                        layout
                        className="px-4 py-2 rounded-lg bg-white border border-gray-100 shadow-sm flex justify-between items-center"
                      >
                        <div className="text-sm text-gray-800">{item.text}</div>
                        <div className="text-xs text-gray-500 ml-4 whitespace-nowrap">{item.timestamp}</div>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </div>
            </div>

            {/* Right: Analytics (collapsible) */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Analytics</h3>
                <button
                  onClick={() => setShowAnalytics((s) => !s)}
                  className="text-sm px-3 py-1 rounded-full bg-white border border-gray-200 hover:bg-gray-50"
                >
                  {showAnalytics ? "Hide" : "Show"}
                </button>
              </div>

              <AnimatePresence>
                {showAnalytics && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.36 }}
                  >
                    <AnalyticsDashboard stats={stats} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* small summary cards */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm text-center">
                  <div className="text-xs text-gray-500">Total</div>
                  <div className="text-xl font-semibold text-blue-600">{stats.total}</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm text-center">
                  <div className="text-xs text-gray-500">Last</div>
                  <div className="text-sm text-gray-700">{stats.lastConversion || "N/A"}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </GlassCard>
      </div>
    </div>
  );
}
