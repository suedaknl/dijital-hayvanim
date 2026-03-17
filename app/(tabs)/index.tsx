import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  // --- 1. HOOK'LAR (Mutlaka en üstte ve bu sırada olmalı) ---
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [hunger, setHunger] = useState(50);
  const [happiness, setHappiness] = useState(50);
  const [cleanliness, setCleanliness] = useState(50);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isMaxLevel, setIsMaxLevel] = useState(false);

  // --- 2. ZAMANLA DÜŞEN DEĞERLER (Timer) ---
  useEffect(() => {
    if (isGameOver || isMaxLevel) return;

    const timer = setInterval(() => {
      setHunger((prev) => {
        const val = prev - 4;
        if (val <= 0) setIsGameOver(true);
        return Math.max(0, val);
      });
      setHappiness((prev) => {
        const val = prev - 3;
        if (val <= 0) setIsGameOver(true);
        return Math.max(0, val);
      });
      setCleanliness((prev) => {
        const val = prev - 2;
        if (val <= 0) setIsGameOver(true);
        return Math.max(0, val);
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [isGameOver, isMaxLevel]);

  // --- 3. FONKSİYONLAR ---
  const gainXp = () => {
    if (isMaxLevel || isGameOver) return;

    setXp((prevXp) => {
      const newXp = prevXp + 20;
      if (newXp >= 100) {
        if (level < 6) {
          setLevel((prevLevel) => prevLevel + 1);
          return 0;
        } else {
          setIsMaxLevel(true);
          return 100;
        }
      }
      return newXp;
    });
  };

  const feed = () => {
    if (!isGameOver) {
      setHunger(100);
      gainXp();
    }
  };
  const play = () => {
    if (!isGameOver) {
      setHappiness(100);
      gainXp();
    }
  };
  const clean = () => {
    if (!isGameOver) {
      setCleanliness(100);
      gainXp();
    }
  };

  const restartGame = () => {
    setLevel(1);
    setXp(0);
    setHunger(50);
    setHappiness(50);
    setCleanliness(50);
    setIsGameOver(false);
    setIsMaxLevel(false);
  };

  const getBaseImage = () => {
    if (level === 1) return require("../../assets/images/images/yumurta.jpg");
    if (level === 2) return require("../../assets/images/images/bebek.png");
    return require("../../assets/images/images/base_pet.jpg");
  };

  // --- 4. GÖRÜNÜM (UI) ---
  return (
    <SafeAreaView style={styles.container}>
      {/* GAME OVER EKRANI */}
      {isGameOver && (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>GAME OVER</Text>
          <TouchableOpacity style={styles.restartBtn} onPress={restartGame}>
            <Text style={styles.restartBtnText}>Yeniden Başla 🔄</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.mainTitle}>Dijital Hayvanım</Text>
      <View style={styles.levelBadge}>
        <Text style={styles.levelText}>SEVİYE {level}</Text>
      </View>

      {/* İSTATİSTİK BARLARI */}
      <View style={styles.statsPanel}>
        <View style={styles.barRow}>
          <Text style={styles.label}>TECRÜBE</Text>
          <View style={styles.barBg}>
            <View style={[styles.barFillXp, { width: `${xp}%` }]} />
          </View>
        </View>
        <View style={styles.barRow}>
          <Text style={styles.label}>AÇLIK</Text>
          <View style={styles.barBg}>
            <View style={[styles.barFillHunger, { width: `${hunger}%` }]} />
          </View>
        </View>
        <View style={styles.barRow}>
          <Text style={styles.label}>MUTLULUK</Text>
          <View style={styles.barBg}>
            <View style={[styles.barFillHappy, { width: `${happiness}%` }]} />
          </View>
        </View>
        <View style={styles.barRow}>
          <Text style={styles.label}>TEMİZLİK</Text>
          <View style={styles.barBg}>
            <View style={[styles.barFillClean, { width: `${cleanliness}%` }]} />
          </View>
        </View>
      </View>

      {/* KARAKTER VE AKSESUARLAR */}
      <View style={styles.petContainer}>
        <Image
          source={getBaseImage()}
          style={styles.basePet}
          resizeMode="contain"
        />
        {level >= 4 && (
          <Image
            source={require("../../assets/images/images/gozluk.png")}
            style={styles.gozluk}
            resizeMode="contain"
          />
        )}
        {level >= 5 && (
          <Image
            source={require("../../assets/images/images/sapka.png")}
            style={styles.sapka}
            resizeMode="contain"
          />
        )}
        {level >= 6 && (
          <Image
            source={require("../../assets/images/images/kure.png")}
            style={styles.kure}
            resizeMode="contain"
          />
        )}
      </View>

      {/* TEBRİKLER MESAJI */}
      {isMaxLevel && (
        <View style={styles.congratsBox}>
          <Text style={styles.congratsText}>
            🏆 TEBRİKLER! En Üst Seviye! 🏆
          </Text>
        </View>
      )}

      {/* GARDIROP ÖNİZLEME */}
      <View style={styles.wardrobe}>
        <Text style={[styles.wEmoji, level < 4 && styles.locked]}>🕶️</Text>
        <Text style={[styles.wEmoji, level < 5 && styles.locked]}>🎩</Text>
        <Text style={[styles.wEmoji, level < 6 && styles.locked]}>🔮</Text>
      </View>

      {/* BUTONLAR */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: "#FF7675" }]}
          onPress={feed}
        >
          <Text style={styles.btnText}>🍎 Besle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: "#FDCB6E" }]}
          onPress={play}
        >
          <Text style={styles.btnText}>⚽ Oyna</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: "#00CEC9" }]}
          onPress={clean}
        >
          <Text style={styles.btnText}>🧼 Yıka</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- 5. STİLLER ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    alignItems: "center",
    paddingTop: 40,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2D3436",
    marginBottom: 5,
  },
  levelBadge: {
    backgroundColor: "#6C5CE7",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  levelText: { color: "#FFF", fontWeight: "bold" },
  statsPanel: {
    width: "90%",
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 20,
    elevation: 3,
    marginBottom: 10,
  },
  barRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  label: { width: 70, fontWeight: "bold", color: "#636E72", fontSize: 11 },
  barBg: {
    flex: 1,
    height: 12,
    backgroundColor: "#DFE6E9",
    borderRadius: 6,
    overflow: "hidden",
  },
  barFillXp: { height: "100%", backgroundColor: "#0984E3" },
  barFillHunger: { height: "100%", backgroundColor: "#E17055" },
  barFillHappy: { height: "100%", backgroundColor: "#FDCB6E" },
  barFillClean: { height: "100%", backgroundColor: "#00CEC9" },
  petContainer: {
    height: 300,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  basePet: { width: 250, height: 250, zIndex: 2 },
  sapka: { position: "absolute", width: 230, height: 230, top: -60, zIndex: 3 },
  gozluk: { position: "absolute", width: 170, height: 85, top: 85, zIndex: 4 },
  kure: {
    position: "absolute",
    width: 80,
    height: 80,
    bottom: 40,
    right: 30,
    zIndex: 5,
  },
  wardrobe: {
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  wEmoji: { fontSize: 28 },
  locked: { opacity: 0.2 },
  actionRow: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 5,
  },
  btnText: { color: "#FFF", fontWeight: "bold" },
  congratsBox: {
    backgroundColor: "#55E6C1",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  congratsText: { color: "#1B1464", fontWeight: "bold" },
  gameOverContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
  },
  gameOverText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FF7675",
    marginBottom: 20,
  },
  restartBtn: {
    backgroundColor: "#6C5CE7",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 15,
  },
  restartBtnText: { color: "#FFF", fontWeight: "bold" },
});
